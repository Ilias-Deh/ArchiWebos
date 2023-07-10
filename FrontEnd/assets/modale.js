const answerCategories = await fetch("http://localhost:5678/api/categories", {

    method: "GET",
    headers: { "Content-Type": "application/json" },
});

const categories = await answerCategories.json();

async function generateCategoriesForm(categories) {
    const categoryPopup = document.querySelector("#categoryPopup");
    categoryPopup.innerHTML = `<option value="0">`;
    for (let category = 0; category < categories.length; category++) {

        categoryPopup.innerHTML += `<option value="${category + 1}">${categories[category].name}`;
    }
}

const answerProjects = await fetch("http://localhost:5678/api/works", {

    method: "GET",
    headers: { "Content-Type": "application/json" },
});

const projects = await answerProjects.json();

async function generateProject(projects) {


    for (let project = 0; project < projects.length; project++) {

        const gallery = document.querySelector(".gallery");
        gallery.innerHTML += `<figure><img src=${projects[project].imageUrl}><figcaption>${projects[project].title}</figcaption></figure>`;
    }
}

async function generateProjectPopup(projects) {
    for (let i = 0; i < projects.length; i++) {
        const galleryPopup = document.querySelector(".galleryPopup");
        galleryPopup.innerHTML += `
                <div>
                    <div class="trash">
                        <img src=${projects[i].imageUrl}>
                        <i class="fa-solid fa-trash-can buttonDelete" id="${i}"></i>
                        <i class="fa-solid fa-arrows-up-down-left-right iconOnPicture undisplay"></i>
                    </div>
                    <p>éditer</p>
                </div>`;
    }
}

generateProjectPopup(projects)

let buttonExit = document.querySelector(".buttonExit")
const buttonChange = document.querySelector("#buttonChange")
const buttonSend = document.querySelector("#buttonSend")
let popup = document.querySelector(".popup")
let arrowReturn = document.querySelector(".arrowReturn")
let popupView = document.querySelector("#popupView")
let addPicture = document.querySelector("#addPicture")
let formTitle = document.querySelector("#title")
let formPicture = document.querySelector("#image")
let formCategory = document.querySelector("#categoryPopup")
let buttonValidate = document.querySelector("#buttonValidate")
let isTitleValidate = false;
let isPictureValidate = false;
let isCategoryValidate = false;
let pictureId = 0;

buttonChange.addEventListener("click",  () => {
    popup.showModal(); 
});

buttonExit.addEventListener("click",  () => {
    popup.close();
});

popup.addEventListener("click", event => {
const dialogDimensions = popup.getBoundingClientRect()
if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
) {
    popup.close()
}
})

function previewImage() {
    let image = document.getElementById("image").files
    if (image.length > 0) {
        var imageReader = new FileReader()
        imageReader.onload = function (event) {
            document.getElementById("preview").setAttribute("src", event.target.result)
        }

        imageReader.readAsDataURL(image[0])
    }
}

formPicture.addEventListener("change", () => {
    let formImgElement = document.querySelector(".formImgElement")
    let previewElement = document.querySelector("#preview")
    formImgElement.classList.add("undisplay")
    previewElement.classList.remove("undisplay")
    previewImage();
   
});

buttonSend.addEventListener("click", function () {
    arrowReturn.classList.remove("undisplay")
    popupView.classList.add("undisplay")
    addPicture.classList.remove("undisplay")
    let formPopup = document.querySelector(".formPopup")
    generateCategoriesForm(categories)

    formPopup.addEventListener("change", (event) => {

        formCategory.addEventListener("change", function () {
            if (formCategory.value != "0") {
                isCategoryValidate = true;
            }
            else {
                isCategoryValidate = false;

            }
        });

        formTitle.addEventListener("change", function () {
            if (verifTitle(formTitle.value)) {
                isTitleValidate = true;
            }
            else {
                isTitleValidate = false;
            }
        });

        if (isTitleValidate && isCategoryValidate) {
            buttonValidate.classList.add("buttonValidateOn")
        }
        else {
            buttonValidate.classList.remove("buttonValidateOn")

        }
    });

    formPopup.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(formPopup)
        fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            headers: {
                accept: "*/*",
                Authorization: 'Bearer ' + window.localStorage.getItem("token"),
            },
            body: formData
        })
            .then(answer => {
                if (answer.status == 400) {
                    alert("Formulaire incorrect, veuillez vérifier le formulaire")
                }
                if (answer.status == 401) {
                    alert("Veuillez vous reconnectez")
                }
                if (answer.status == 500) {
                    alert("Problème serveur veuillez réessayer ultérieurement")
                }
            })
            document.querySelector(".gallery").innerHTML = "";
            generateProject(projects)
    });

    let buttonExit = document.querySelector(".buttonExit")

    buttonExit.addEventListener("click", function () {
        popupDisplay()
    });

    arrowReturn.addEventListener("click", function () {
        addPicture.classList.add("undisplay")
        popupView.classList.remove("undisplay")
        arrowReturn.classList.add("undisplay")
    });
});

let buttonsDelete = document.querySelectorAll(".buttonDelete");

buttonsDelete.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        let id = btn.id;
        getPictureId(projects, id)
        fetch(`http://localhost:5678/api/works/${pictureId}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: 'Bearer ' + window.localStorage.getItem("token"),
            }
        })
            .then(answer => {
                if (answer.status == 401) {
                    alert("Veuillez vous reconnectez")
                }
                if (answer.status == 500) {
                    alert("Problème serveur veuillez réessayer ultérieurement")
                }
            })
    })
    document.querySelector(".gallery").innerHTML = "";
    generateProject(projects)
});

function verifTitle(title) {
    let titleRegExp = new RegExp("[a-zA-Z0-9._-]+")
    return titleRegExp.test(title.value)
}

function getPictureId(projects, id) {
    for (let project = 0; project < projects.length; project++) {
            if(project == id) {
                pictureId = projects[project].id
            }
        }
        return pictureId
    }
