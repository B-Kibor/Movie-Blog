const BASE_URL = "http://localhost:3000/posts";

function main() {
  displayPosts();
  addNewPostListener();
}

function displayPosts() {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((posts) => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = ""; 
      posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post-item");
        postDiv.innerHTML = `
          <h3 class="post-title" data-id="${post.id}">${post.title}</h3>
          <p><strong>Author:</strong> ${post.author}</p>
          <p>${post.content}</p>
          <img src="${post.image}" alt="${post.title}" width="150">
        `;
        postList.appendChild(postDiv);

        postDiv.querySelector(".post-title").addEventListener("click", () => {
          handlePostClick(post.id);
        });
      });
    });
}

function handlePostClick(postId) {
  fetch(`${BASE_URL}/${postId}`)
    .then((res) => res.json())
    .then((post) => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
        <img src="${post.image}" alt="${post.title}" width="200">
      `;
    });
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      title: document.getElementById("new-title").value,
      author: document.getElementById("new-author").value,
      content: document.getElementById("new-content").value,
      image: document.getElementById("new-image").value || "https://via.placeholder.com/150"
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(post => {
        displayPosts();
        form.reset();
      });
  });
}

document.addEventListener("DOMContentLoaded", main);