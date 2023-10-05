const api = "https://japceibal.github.io/japflix_api/movies-data.json";
let btn = document.getElementById("btnBuscar");
let list = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch(api)
        .then(response => response.json())
        .then(data => list = data)
})

btn.addEventListener("click", () => {
    let search = document.getElementById("inputBuscar").value.toLowerCase();
    if (search) {
        lisResp = [];
        list.forEach(element => {
            if (
                element.title.toLowerCase().includes(search) ||
                element.genres.some(genre => genre.name.toLowerCase() === search) ||
                element.tagline.toLowerCase().includes(search) ||
                element.overview.toLowerCase().includes(search)) {
                lisResp.push(element);
            }
        })

        function showList(array) {
            var cont = document.getElementById("lista");
            cont.innerHTML = "";
            array.forEach(element => {
                cont.innerHTML += `
                <button class="class-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <div class"list-group bg-dark">
                <div class="list-group-item bg-dark">
                    <div class="d-flex white">
                        <p><strong>${element.title} </strong></p>
                        <div class="ratings div-derecha " id="${element.id}">
                        </div>
                    </div>
                    <div class = "white div-izq">
                        <p class="div-izq">${element.tagline}</p>
                    </div>
                </div>
            
                </div>
                </button>

            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasTopLabel">${element.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <p>${element.overview}</p>
                    <hr>
                    <div>
                        <p id="${element.title}"></p>
                            <div class="dropdown div-derecha div-arriba">
                                <button>More</button>
                                <div class="dropdown-content white2">
                                    <p> Year : ${element.release_date}</p>
                                    <p> Rutime : ${element.runtime}</p>
                                    <p> Budget : ${element.budget}</p>
                                    <p> Revenue : ${element.revenue}</p>
                                </div>
                            </div>
                    </div>
                    
                </div>
                
        </div>
   
            `
            let rating = document.getElementById(element.id);
            for (let i = 1; i <= 5; i++) {
                rating.innerHTML += i <= element.vote_average / 2 ?
                    `<i class="fa fa-star rating-color"></i>` : `<i class="fa fa-star ratings-i"></i>`
            }

                let generos = document.getElementById(element.title);
                let generosHTML = "";

                element.genres.forEach((genre, index) => {
                    generosHTML += genre.name;
                    if (index < element.genres.length - 1) {
                        generosHTML += " - ";
                    }
                });

                generos.innerHTML = generosHTML;



            })

        }

        showList(lisResp);


        lisResp = [];
    }
})