

const answer = await fetch('http://localhost:5678/api/users/login', {

    method: "POST",
    headers: { "Content-Type": "application/json" },
});

const projects = await answer.json();




let email = document.getElementById("email")
let password = document.getElementById("password")
let buttonLogin = document.getElementById("buttonLogin")



buttonLogin.addEventListener("submit", function () {

    event.preventDefault();


});



