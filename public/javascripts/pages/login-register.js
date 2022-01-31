import * as Validates from "../validates/index.js"
import { getCookie, setCookie } from "../util/cookie.js"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";

const MINUTES59 = 59 * 60 * 1000
const auth = getAuth()
const newSwal = Swal.mixin({
    heightAuto: false,
    allowOutsideClick: false,
    allowEscapeKey: false
})

$(document).ready(() => {
    "use strict"
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setCookie("token", userCredential.user, MINUTES59)
            window.location.replace('/mood')
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
    $("form").submit(event => {
        event.preventDefault()
        if ($("form").valid()) {
            const body = serializeArrToObject($("form").serializeArray())
            if (window.login) login(body)
            else if (window.register) register(body)
        }
    })
    $("form").validate(window.login ? Validates.login : Validates.register)

    const $textInputs = $("input")
    const $submit = $(".submit")
    const handler = function () {
        const $validTextInputs = $("input:valid")
        if ($textInputs.length === $validTextInputs.length) {
            $submit.attr("disabled", null)
        } else {
            $submit.attr("disabled", "")
        }
    }
    $("form :input").keyup(handler)
    $("form :input").change(handler)
})

function serializeArrToObject(serializeArr) {
    const obj = {}
    serializeArr.map(item => (obj[item.name] = item.value))
    return obj
}

function fetchErrorHandler(error) {
    newSwal.fire({
        title: "Lỗi!",
        text: error.message,
        icon: "error"
    })
}

function responseErrorHandler(response) {
    const keys = Object.keys(response.errors)
    const errors = keys.map(key => response.errors[key])
    const msg = keys.map((key, index) => `${key}: ${errors[index]}`).join(", ")
    newSwal.fire({
        title: "Lỗi!",
        text: msg,
        icon: "error"
    })
}

function register(body) {
    newSwal.fire({
        title: "Registering",
        text: "Just a moment . . .",
        didOpen: () => {
            Swal.showLoading()
            createUserWithEmailAndPassword(auth, body.email, body.password)
                .then((userCredential) => {
                    window.location.replace('/mood')
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorMessage = error.message;
                    newSwal.fire({
                        title: "Error!",
                        text: errorMessage,
                    })
                })
        }
    })
}

function login(body) {
    newSwal.fire({
        title: "Login",
        text: "Just a moment . . .",
        didOpen: () => {
            Swal.showLoading()
            signInWithEmailAndPassword(auth, body.email, body.password)
                .then((userCredential) => {
                    setCookie("email", userCredential.user.email)
                    setCookie("token", userCredential.user.accessToken)
                    window.location.replace('/mood')
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorMessage = error.message;
                    newSwal.fire({
                        title: "Error!",
                        text: errorMessage,
                    })
                })
        }
    })
}
// function logout(){
//     firebase.auth().signOut();
// }