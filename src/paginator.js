function onUpdate() {
    document.querySelector("html").lang = "en";

    const style = document.querySelector("#rendered-md").style;
    if (document.querySelector(".paginator")) {
        style.maxWidth = "none";
    }

    const paginators = document.querySelectorAll(".paginator");
    function getPageNum(href) {
        let heading;
        try {
            heading = document.querySelector(
                href.slice(href.search(/#[^#.]+$/))
            );
        } catch (e) {
            // invalid selector
            return "Error";
        }
        if (!heading) {
            return "Error";
        }
        const ancestor = heading.closest(".paginator");
        if (!ancestor) {
            return "Error";
        }
        const pageNum = [...paginators].findIndex((x) => x == ancestor);
        if (pageNum == -1) {
            return "Error";
        }
        return pageNum + 1; // starts at 0
    }

    document
        .querySelectorAll(".paginator .table-of-contents a")
        .forEach((a) => {
            a.outerHTML = `${
                a.outerHTML
            }<div class="toc-page-number">${getPageNum(a.href)}</div>`;
        });

    if (document.querySelector(".paginator")) {
        const noteTitle = document.querySelector(".exported-note-title");
        if (!noteTitle) {
            return;
        }
        noteTitle.style.display = "none";

        [...document.querySelectorAll(".exported-note, #rendered-md")].forEach(
            (node) => {
                const style = node.style;
                style.padding = "0px";
                style.margin = "0px";
                style.border = "0px";
            }
        );
    }
}

document.addEventListener("joplin-noteDidUpdate", onUpdate);
document.addEventListener("DOMContentLoaded", onUpdate);
