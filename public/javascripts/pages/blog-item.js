import {
  setDoc,
  doc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
const db = getFirestore();
let url = window.location.href;
let index = url.slice(-1);
const idk = query(collection(db, "blog_post"), where("index", "==", index));
const querySnapshot = await getDocs(idk);
let title = document.getElementById('titleElement');
let sub_title = document.getElementById('subTitleElement');
let description = document.getElementById('descriptionElement');
let qoutes = document.getElementById('qoutesElement');
let image = document.getElementById('imagePostElement');
let selfReflection = document.getElementById('selfReflectionElement');
querySnapshot.forEach((doc) => {
    title.innerHTML = doc.data().title
    sub_title.innerHTML = doc.data().sub_title
    description.innerHTML = doc.data().description
    qoutes.innerHTML = doc.data().qoutes
    image.src = doc.data().image
    selfReflection.innerHTML = doc.data().self_reflection
});
