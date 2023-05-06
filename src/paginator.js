function onUpdate() {
    document.querySelector("html").lang = "en";

    const style = document.querySelector("#rendered-md").style;
    if (document.querySelector(".pdf-paginator")) {
        style.maxWidth = "none";
    }

    const paginators = document.querySelectorAll(".pdf-paginator");
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
        const ancestor = heading.closest(".pdf-paginator");
        if (!ancestor) {
            return "Error";
        }
        const pageNum = [...paginators].findIndex((x) => x == ancestor);
        if (pageNum == -1) {
            return "Error";
        }
        return pageNum;
    }

    document
        .querySelectorAll(".pdf-paginator .table-of-contents a")
        .forEach((a) => {
            a.outerHTML = `${
                a.outerHTML
            }<div class="toc-page-number">${getPageNum(a.href)}</div>`;
        });
}

document.addEventListener("joplin-noteDidUpdate", onUpdate);
document.addEventListener("DOMContentLoaded", onUpdate);
