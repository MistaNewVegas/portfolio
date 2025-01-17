function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");
    elements.forEach((el) => {
        const file = el.getAttribute("data-include");
        if (file) {
            fetch(file)
                .then((response) => {
                    if (response.ok) return response.text();
                    throw new Error(`Failed to load ${file}`);
                })
                .then((content) => {
                    el.innerHTML = content;
                })
                .catch((error) => console.error(error));
        }
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);
