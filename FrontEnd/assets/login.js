let isUserConnected = false;
const formLogin = document.getElementById("form-login")
const formEmail = document.getElementById("email")
const formPassword = document.getElementById("password")

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const loginData = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    const payload = JSON.stringify(loginData);
    if (verifEmail(formEmail) && verifPassword(formPassword)) {
        submit(payload)
    }
});

async function submit(payload) {
    let answer = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
    })

    let serverResponse = await answer.status;
    if (serverResponse == 200) {
        isUserConnected = true
        let userData = await answer.json();
        window.localStorage.setItem("token", userData.token);
        window.localStorage.setItem("isUserConnected", isUserConnected);
        document.location.href = "index.html";
    }
    else if(serverResponse == 404) {
        isUserConnected = false
        alert("Utilisateur Introuvable");
    }
    else {
        isUserConnected = false
        alert("Erreur dans l’identifiant ou le mot de passe");
    }
}

function verifEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    return emailRegExp.test(email.value)
}

function verifPassword(password) {
    let passwordRegExp = new RegExp("[a-zA-Z0-9._-]+")
    return passwordRegExp.test(password.value)
}
