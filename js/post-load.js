document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");

    fetch("posts/posts.json")
        .then(response => response.json())
        .then(posts => {
            const post = posts.find(p => p.slug === slug);
            if (!post) {
                document.body.innerHTML = "<h1>Post not found</h1>";
                return;
            }

            // Set post details
            document.getElementById("post-title").textContent = post.title;
            document.getElementById("post-subtitle").textContent = post.subtitle || "";
            document.getElementById("post-category").textContent = post.category;
            document.getElementById("post-date").textContent = post.date;

            // Set hero background image
            if (post.hero_image) {
                const heroElement = document.getElementById("hero");
                heroElement.style.backgroundImage = `url('posts/images/${post.hero_image}')`;
                heroElement.style.backgroundSize = "cover";
                heroElement.style.backgroundPosition = "center";
                heroElement.style.color = "white";
                heroElement.style.textAlign = "center";

                document.title = post.title + " ||| Daniel Biel"

                // Function to resize the hero height
                function resizeHero() {
                    const screenHeight = window.innerHeight;
                    const maxHeight = screenHeight * 0.75; // 75% of screen height
                    heroElement.style.height = `${maxHeight}px`;
                }

                // Resize the hero on page load and when the window is resized
                resizeHero();
                window.addEventListener("resize", resizeHero);
            }


            // Load Markdown content
            fetch(`posts/${post.markdown_file}`)
                .then(response => response.text())
                .then(markdown => {
                    const converter = new showdown.Converter();
                    document.getElementById("post-content").innerHTML = converter.makeHtml(markdown);
                })
                .catch(error => console.error("Error loading Markdown:", error));
        })
        .catch(error => console.error("Error loading blog posts:", error));
});