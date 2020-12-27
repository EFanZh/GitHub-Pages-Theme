const $ = document.querySelector.bind(document);

function buildToc(article) {
    const createElement = document.createElement.bind(document);
    const headingLevels = Object.freeze({ "H1": 0, "H2": 1, "H3": 2, "H4": 3, "H5": 4, "H6": 5 });
    const result = [];
    const headingAnchors = [];
    const stack = [];

    for (const child of article.children) {
        const headingLevel = headingLevels[child.tagName];

        if (headingLevel !== undefined) {
            const item = createElement("li");
            const details = item.appendChild(createElement("details"));

            details.open = true;

            const headingAnchor = createElement("a");

            headingAnchor.href = "#" + child.id;
            headingAnchor.innerText = child.innerText;

            details.appendChild(createElement("summary")).appendChild(headingAnchor);
            stack[headingLevel] = details;

            if (headingLevel === 0) {
                result.push(item);
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

const sidebar = $("aside");

if (sidebar) {
    const root = $(":root");

    sidebar.firstElementChild.lastElementChild.append(...buildToc($("article")));

    sidebar.lastElementChild.addEventListener("pointerdown", function (e0) {
        const pointerId = e0.pointerId;
        const savedSidebarWidth = sidebar.offsetWidth - e0.x;

        function moveHandler(e1) {
            root.style.setProperty("--sidebar-width", (savedSidebarWidth + e1.x) + "px");
        }

        function upHandler() {
            this.removeEventListener("pointerup", upHandler);
            this.removeEventListener("pointermove", moveHandler);
            this.releasePointerCapture(pointerId);
        }

        this.setPointerCapture(pointerId);
        this.addEventListener("pointermove", moveHandler);
        this.addEventListener("pointerup", upHandler);
    });
}
