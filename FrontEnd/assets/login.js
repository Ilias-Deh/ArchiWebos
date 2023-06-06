const formLogin = document.getElementById("form-login")
const formEmail = document.getElementById("email")
const formPassword = document.getElementById("password")
formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const loginData = {
        email : event.target.querySelector("[name=email]").value,
        password : event.target.querySelector("[name=password]").value,
    };
    const chargeUtile = JSON.stringify(loginData);
    if (verifEmail(formEmail) && verifPassword(formPassword)){
        submit(chargeUtile)
    }

    });
    
async function submit(chargeUtile) {

let answer = await fetch('http://localhost:5678/api/users/login', {

method: "POST",
headers: { "Content-Type": "application/json" },
body: chargeUtile

})
let data = await answer.status;
if (data == 200) {
    document.location.href="index.html";

}
}

function verifEmail(email) {

    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (emailRegExp.test(email.value)) {
        return true
    }
    else {
        console.log("erreur email")
        return false
    }

}

function verifPassword(password) {
    let passwordRegExp = new RegExp("[a-zA-Z0-9._-]+")
    if (passwordRegExp.test(password.value)) {
        return true
    }
    else {
        console.log("erreur mdp")
        return false
    }
}











