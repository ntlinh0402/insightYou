import {
  setDoc,
  doc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
const db = getFirestore();
const querySnapshot = await getDocs(collection(db, "blog_post"));
let blog_post = document.getElementById("blog_post");
let blogPostHTML = "";
let styleOfArtical = "";
querySnapshot.forEach((doc) => {
  blogPostHTML += `
      <article class="hentry">
            <header class="entry-header">
                <div class="entry-thumbnail">
                    <a href="/blog-item#${doc.data().index}">
                    <img src="${doc.data().image}" alt="p1" />
                    </a>
                </div>
                <h2 class="entry-title"><a href="/blog-item#${doc.data().index}" rel="bookmark">${
                  doc.data().title
                }</a></h2>
            </header>
        </article>
      `;
  blog_post.innerHTML = blogPostHTML;
});
