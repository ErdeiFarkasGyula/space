const kartyaTarto = document.getElementById("kartyaTarto");
const szamMegjelenito = document.getElementById("szamMegjelenito");
const szuro = document.getElementById("szuro");

let urallomasok = [];

function betolt() {
    fetch("http://api.open-notify.org/astros.json")
        .then(response => response.json())
        .then(data => {
            data.people.forEach(ember => {
                const kartya = document.createElement("div");
                kartya.classList.add("kartya");
                kartya.innerHTML = `
                    <h2>${ember.name}</h2>
                    <p>Űrállomás: ${ember.craft}</p>
                `;
                kartyaTarto.appendChild(kartya);
            });

            szamMegjelenito.innerText = `${data.number} fő tartózkodik`;
        });
}

document.addEventListener("DOMContentLoaded", betolt);

