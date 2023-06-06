
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


        if (verifEmail(formEmail) & verifPassword(formPassword) == true){
            const answer = fetch('http://localhost:5678/api/users/login', {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
            });
        }
        else {
            console.log("retry")
        }
       
        });
        


function verifEmail(email) {

    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")
    if (emailRegExp.test(email.value)) {
        return true
    }
    else {
        console.log("erreur email")
    }

}

function verifPassword(password) {
    let passwordRegExp = new RegExp("[a-z0-9._-]+")
    if (passwordRegExp.test(password.value)) {
        return true
    }
    else {
        console.log("erreur mdp")
    }
}







