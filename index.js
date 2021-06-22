let postsArray = [];
const titleInput = document.getElementById("post_title");
const bodyInput = document.getElementById("post_body");
const form = document.getElementById("new-post");

function renderPosts() {
    let html = "";

    for (let post of postsArray) {
        html += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
        `
    }

    document.getElementById("blog_list").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
.then(res => res.json())
.then(data => {
    postsArray = data.slice(0, 10);
    renderPosts()
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value;
    const body = bodyInput.value;
    const dataPost = { title, body };

    const options = {
        method: "POST",
        body: JSON.stringify(dataPost),
        headers: { "Content-Type": "application/json" }
    };

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then(res => res.json())
    .then(resPost =>  {
        postsArray.unshift(resPost);
        renderPosts();
        form.reset();
    })
})





