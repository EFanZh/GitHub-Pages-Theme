const $ = document.querySelector.bind(document);

function buildToc(article) {
    const createElement = document.createElement.bind(document);
    const headingLevels = Object.freeze({ "H1": 0, "H2": 1, "H3": 2, "H4": 3, "H5": 4, "H6": 5 });

    function createHeadingAnchor(element) {
        const result = createElement("a");

        result.href = `#${element.id}`;
        result.innerText = element.innerText;

        return result;
    }

    const result = [];
    const stack = [];

    for (const child of article.children) {
        const headingLevel = headingLevels[child.tagName];

        if (headingLevel !== undefined) {
            child.replaceChildren(createHeadingAnchor(child));

            const item = createElement("li");
            const details = item.appendChild(createElement("details"));

            details.open = true;
            details.appendChild(createElement("summary")).appendChild(createHeadingAnchor(child));
            stack[headingLevel] = details;

            if (headingLevel === 0) {
                result.push(item);
            } else {
                const parent = stack[headingLevel - 1];
                const children = parent.children[1] || parent.appendChild(createElement("ul"));

                children.appendChild(item);
            }
        }
    }

    return result;
}

$("aside")?.firstElementChild.lastElementChild.append(...buildToc($("article")));
