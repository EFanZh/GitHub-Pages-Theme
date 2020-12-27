const $ = document.querySelector.bind(document);

function buildToc(article) {
    const createElement = document.createElement.bind(document);
    const headingLevels = Object.freeze({ "H1": 0, "H2": 1, "H3": 2, "H4": 3, "H5": 4, "H6": 5 });
    const result = new DocumentFragment();
    const headingAnchors = [];
    const stack = [];

    for (const child of article.children) {
        const headingLevel = headingLevels[child.tagName];

        if (headingLevel !== undefined) {
            const item = createElement("li");
            const details = item.appendChild(createElement("details"));

            details.open = true;

            const headingAnchor = createElement("a");

            headingAnchor.href = `#${child.id}`;
            headingAnchor.innerText = child.innerText;

            details.appendChild(createElement("summary")).appendChild(headingAnchor);
            stack[headingLevel] = details;

            if (headingLevel === 0) {
                result.appendChild(item);
            } else {
                const parent = stack[headingLevel - 1];

                (parent.children[1] || parent.appendChild(createElement("ul"))).appendChild(item);
            }

            headingAnchors.push([child, headingAnchor.cloneNode(true)]);
        }
    }

    for (const [heading, anchor] of headingAnchors) {
        heading.replaceChildren(anchor);
    }

    return result;
}

$("aside > nav > :last-child")?.appendChild(buildToc($("article")));
