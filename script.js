

const answer = await fetch("http://localhost:5678/api/works")
const projects = await answer.json();





async function generateProject (projects){

    
    for (let project = 0; project < projects.length; project++) {
    
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML += `<figure><img src=${projects[project].imageUrl}><figcaption>${projects[project].title}</figcaption></figure>`;
    }
    }
    
generateProject (projects)





