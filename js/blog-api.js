document.addEventListener("DOMContentLoaded", function () {
    fetch("../posts/posts.json")
        .then(response => response.json())
        .then(posts => {
            const blogList = document.getElementById("blog-list");

            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.className = "blog-post";

                // Fetch the Markdown content
                fetch(`posts/${post.markdown_file}`)
                    .then(response => response.text())
                    .then(markdown => {
                        // Extract the first two sentences as a preview
                        let preview = markdown.split(/\.\s+/).slice(0, 2).join(". ") + "."; // Get first 2 sentences

                        postElement.innerHTML = `
                            <h1><a href="post.html?slug=${post.slug}">${post.title}</a></h1>
                            <h2>${post.subtitle || ""}</h2>
                            <p><strong>Category:</strong> ${post.category}</p>
                            <p><small>${post.date}</small></p>
                            <p>${preview} <a href="post.html?slug=${post.slug}">Read More</a></p>
                            <hr>
                        `;

                        blogList.appendChild(postElement);
                    })
                    .catch(error => console.error(`Error loading Markdown for ${post.slug}:`, error));
            });
        })
        .catch(error => console.error("Error loading blog posts:", error));
});