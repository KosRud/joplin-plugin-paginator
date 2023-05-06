function onUpdate() {
    document.querySelector("html").lang = "en";

    const style = document.querySelector("#rendered-md").style;
    if (document.querySelector(".pdf-paginator")) {
        style.maxWidth = "none";
    }
}

document.addEventListener("joplin-noteDidUpdate", onUpdate);
document.addEventListener("DOMContentLoaded", onUpdate);
