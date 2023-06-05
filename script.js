async function generateProject (){



const answer = await fetch("http://localhost:5678/api/works")
const projects = await answer.json() 




for (let project = 0; project < projects.length; project++) {

const gallery = document.querySelector(".gallery");
const projectElement = document.createElement("figure");
const imgElement = document.createElement("img");
imgElement.src = projects[project].imageUrl;
const titleElement = document.createElement("figcaption")
titleElement.innerText = projects[project].title
gallery.appendChild(projectElement)
projectElement.appendChild(imgElement);
projectElement.appendChild(titleElement);


}
}

generateProject ()







