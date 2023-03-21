import {printLoginForm, printLogoutBtn} from "./userform.js";

let root = document.getElementById("blogPosts");



if (localStorage.getItem("username")) {
    console.log("ÄR INLOGGAD");
    printLogoutBtn();
} else {
    console.log("ÄR EJ INLOGGAD");
    printLoginForm();
}

// function printBlogPosts() {

//     fetch("http://localhost:3000/blogposts")
//     .then(res => res.json())
//     .then(posts => {
//         //console.log(data);
//        // printposts(data);

//        console.log(posts);

//     let blogPosts = document.createElement("ul");
//     blogPosts.classList.add("blogPosts");
//     blogPosts.innerHTML = "";

//     posts.map(post => {
//         let li = document.createElement("li")
//         li.id = post.author;
//         li.innerHTML = `<h1>${post.title}</h1><p>${post.content}</p>`;
//         blogPosts.appendChild(li);
//     })

//     root.innerHTML = "";
//     root.appendChild(blogPosts);
//     });  
// }
