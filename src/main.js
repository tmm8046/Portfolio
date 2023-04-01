const main = document.querySelector("main");
const projects = document.querySelector("#projects");
const _2dGallary = document.querySelector("#_2dGallary");
const _3dGallary = document.querySelector("#_3dGallary");
const conceptArt = document.querySelector('#turnarounds');

const projectURL = "./data/projects.json";
const _2dURL = "./data/2d.json";
const _3dURL = "./data/3d.json";
const turnaroundsURL = "./data/turnarounds.json";

const init = () => {
    
    document.querySelector("#burger_icon").onclick = burger;
    handleResponse(projectURL);
    handleResponse(_2dURL);
    handleResponse(_3dURL);
    handleResponse(turnaroundsURL);
    
}

const handleResponse = async (url, method = "get") => {
    let response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json'
        },
    });

    switch(response.status) {
        case 200: //Success
        console.log("Success");
        break;
        case 400: //Bad Request
        console.log("Bad Request");
        break;
        case 404: //Not Found
        console.log("Not Found");
        break;
        default: //Anything Else
        console.log("Status Code not Implemented By Client");
        break;
    }

    let obj = await response.json();
    switch(url) {
        case projectURL:
            loadProjects(obj);
            break;
        case _2dURL:
            loadArtwork(obj);
            break;
        case _3dURL:
            loadArtwork(obj);
            break;
        case turnaroundsURL:
            loadArtwork(obj);
            break;
    }


}

const createProject = (title, imageUrl, imageAlt, about, role, linkUrl = null, linkText = linkUrl) => {
    let project = document.createElement("div");
    project.className = "project";

    let flip = document.createElement("div");
    flip.className = "flip";
    project.appendChild(flip);

    let image = document.createElement("img");
    image.src = imageUrl;
    image.alt = imageAlt;
    flip.appendChild(image);

    let info = document.createElement("div");
    info.className = "info";
    flip.appendChild(info);

    let projDesc = document.createElement("div");
    projDesc.className = "proj_desc";
    info.appendChild(projDesc);

    let h2 = document.createElement("h2");
    h2.innerHTML = title;
    projDesc.appendChild(h2);

    projDesc.innerHTML += `${about}<br><br>`;
    projDesc.innerHTML += `Role: ${role}<br><br>`;

    if(linkUrl != null){
        let a = document.createElement("a");
        a.href = linkUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = linkText;
        projDesc.appendChild(a);
    }
    
    projects.appendChild(project);

}

const loadProjects = (obj) => {
    let keys = Object.keys(obj);

    for(let i = 0; i < keys.length; i++) {
        let project = obj[keys[i]];
        if(project.linkUrl && project.linkText){
            createProject(project.title, project.imageUrl, project.imageAlt, project.about, project.role, project.linkUrl, project.linkText);
        }
        else if(project.linkUrl) {
            createProject(project.title, project.imageUrl, project.imageAlt, project.about, project.role, project.linkUrl);
        } 
        else {
            createProject(project.title, project.imageUrl, project.imageAlt, project.about, project.role);
        }
    }
}

const createArtwork = (title, imageUrl, imageAlt, type = "2D") => {
    let graphic = document.createElement("div");
    graphic.className = "graphic";

    let image = document.createElement("img");
    image.src = imageUrl;
    image.alt = imageAlt;
    image.onclick = function() {
        expandImg(imageUrl, imageAlt);
    };
    graphic.appendChild(image);

    let desc = document.createElement("div");
    desc.className = "graphic_desc";
    graphic.appendChild(desc);

    let h2 = document.createElement("h2");
    h2.innerHTML = title;
    desc.appendChild(h2);

    if (type === "3D") {
        _3dGallary.appendChild(graphic);
    }
    else {
        if(type === "2D") _2dGallary.appendChild(graphic);
        else conceptArt.appendChild(graphic);
    }
}

const loadArtwork = (obj) => {
    let keys = Object.keys(obj);

    for(let i = 0; i < keys.length; i++) {
        let graphic = obj[keys[i]];
        createArtwork(graphic.title, graphic.imageUrl, graphic.imageAlt, graphic.type);
    }
}

const expandImg = (imageUrl, imageAlt) => {
    let container = document.createElement('div');
    container.className = "container";
    let overlay = document.createElement('div');
    overlay.className = "overlay";
    let image = document.createElement("img");
    image.id = "expanded";
    image.src = imageUrl;
    image.alt = imageAlt;
    container.onclick = function() {
        deleteImage(container);
    };
    container.appendChild(image);
    container.appendChild(overlay);
    main.appendChild(container);
}

const deleteImage = (container) => {
    if(main.contains(container)) {
        main.removeChild(container);
    }

}

const burger = () => {
  var links = document.getElementById("burger_links");
    if (links.style.display === "block") {
        links.style.display = "none";
    } else {
        links.style.display = "block";
    }
}

window.onload = init;