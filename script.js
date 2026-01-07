const kartyaTarto = document.getElementById("kartyaTarto");
const szamMegjelenito = document.getElementById("szamMegjelenito");
const szuro = document.getElementById("szuro");
const allapot = document.getElementById("állapot");

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

                if (!urallomasok.includes(ember.craft)) {
                    urallomasok.push(ember.craft);
                    const option = document.createElement("option");
                    option.value = ember.craft;
                    option.innerText = ember.craft;
                    szuro.appendChild(option);
                }
            });

            szamMegjelenito.innerText = `${data.number} fő tartózkodik`;
        })
        .catch(error => {
            allapot.innerText = "Hiba történt az adatok betöltése során: " + error.message;
        });
}

document.addEventListener("DOMContentLoaded", betolt);

szuro.addEventListener("change", () => {
    const valasztottAllomas = szuro.value;

    const kartyak = document.querySelectorAll(".kartya");

    kartyak.forEach(kartya => {
        const allomas = kartya.querySelector("p").innerText.split(": ")[1];
        if (allomas === valasztottAllomas || valasztottAllomas === "" || valasztottAllomas === "all") {
            kartya.style.display = "block";
        } else {
            kartya.style.display = "none";
        }
    });
});