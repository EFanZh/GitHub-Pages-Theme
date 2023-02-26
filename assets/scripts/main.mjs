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

            const href = "#" + child.id;
            const tocAnchor = createElement("a");

            tocAnchor.href = href;
            tocAnchor.innerText = child.innerText;

            const headingAnchor = createElement("a");

            headingAnchor.classList.add("heading-anchor");
            headingAnchor.href = href;
            headingAnchor.innerText = "§";

            details.appendChild(createElement("summary")).appendChild(tocAnchor);
            stack[headingLevel] = details;

            if (headingLevel === 0) {
                result.push(item);
            } else {
                const parent = stack[headingLevel - 1];

                (parent.children[1] || parent.appendChild(createElement("ul"))).appendChild(item);
            }

            headingAnchors.push([child, headingAnchor]);
        }
    }

    for (const [heading, anchor] of headingAnchors) {
        heading.appendChild(anchor);
    }

    return result;
}

const root = $(":root");
const nav = $("nav");
const toc = nav.lastElementChild;
const splitter = nav.nextElementSibling;

toc.append(...buildToc($("article")));

splitter.addEventListener("pointerdown", function (e0) {
    const minSidebarWidth = 0;
    const savedSidebarWidth = nav.offsetWidth - e0.x;

    if (e0.pointerType === "touch") {
        function moveHandler(e1) {
            root.style.setProperty(
                "--sidebar-width",
                Math.max(savedSidebarWidth + e1.touches[0].clientX, minSidebarWidth) + "px"
            );
        }

        function upHandler() {
            this.removeEventListener("pointerup", upHandler);
            this.removeEventListener("touchmove", moveHandler);
        }

        this.addEventListener("touchmove", moveHandler);
        this.addEventListener("pointerup", upHandler);
    } else if (e0.button === 0) {
        const pointerId = e0.pointerId;

        function moveHandler(e1) {
            root.style.setProperty("--sidebar-width", Math.max(savedSidebarWidth + e1.x, minSidebarWidth) + "px");
        }

        function upHandler() {
            this.removeEventListener("lostpointercapture", upHandler);
            this.removeEventListener("pointermove", moveHandler);
        }

        this.setPointerCapture(pointerId);
        this.addEventListener("pointermove", moveHandler);
        this.addEventListener("lostpointercapture", upHandler);
    }
});

