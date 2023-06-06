

const answer = await fetch("http://localhost:5678/api/works", {

method: "GET",
headers: { "Content-Type": "application/json" },
});


const projects = await answer.json();






async function generateProject (projects){

    
    for (let project = 0; project < projects.length; project++) {
    
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML += `<figure><img src=${projects[project].imageUrl}><figcaption>${projects[project].title}</figcaption></figure>`;
    }
    }
    
generateProject (projects)






let buttons = document.querySelectorAll(".button")

const buttonAll = document.querySelector("#buttonAll");




buttonAll.addEventListener("click", function () {
    
    button_class(buttons);
    buttonAll.classList.toggle("button-selected");
    document.querySelector(".gallery").innerHTML = "";
    generateProject(projects);
});

    
const buttonObjects = document.querySelector("#buttonObjects");

buttonObjects.addEventListener("click", function () {
    button_class(buttons);
    buttonObjects.classList.toggle("button-selected");
    const projectFiltered = projects.filter(function (project) {
        return project.category.name == "Objets"
    });

    document.querySelector(".gallery").innerHTML = "";
    generateProject(projectFiltered);
});


const buttonApartments = document.querySelector("#buttonApartments");

buttonApartments.addEventListener("click", function () {

    button_class(buttons);
    buttonApartments.classList.toggle("button-selected");
    const projectFiltered = projects.filter(function (project) {
        return project.category.name == "Appartements"
    });
    document.querySelector(".gallery").innerHTML = "";
    generateProject(projectFiltered);
});


const buttonHotel = document.querySelector("#buttonHotel");

buttonHotel.addEventListener("click", function () {

    button_class(buttons);
    buttonHotel.classList.toggle("button-selected");
    const projectFiltered = projects.filter(function (project) {
        return project.category.name == "Hotels & restaurants"
    });
    document.querySelector(".gallery").innerHTML = "";
    generateProject(projectFiltered);
});

function button_class (buttons){

    for (let position = 0; position < buttons.length ; position++) {
            buttons[position].classList.remove("button-selected")
        
    }
}
