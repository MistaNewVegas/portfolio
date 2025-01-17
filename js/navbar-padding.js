document.addEventListener("DOMContentLoaded", function () {
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
});
