const kartyaTarto = document.getElementById("cards");
const szamMegjelenito = document.getElementById("hanyFo");
const szuro = document.getElementById("station-filter");
const betoltesJelzo = document.getElementById("spinner");
const hibaJelzo = document.getElementById("error");

let urallomasok = [];

document.addEventListener("DOMContentLoaded", betolt);
szuro.addEventListener("change", szuroKezeles);

function betolt() {
    toltoJelzoMegjelenitese();

    fetch("http://api.open-notify.org/astros.json")
        .then(response => response.json())
        .then(data => {
            toltoJelzoEltuntetese();
            kartyakLetrehozasa(data);

            szamMegjelenito.innerText = `${data.number} fő tartózkodik`;
        })
        .catch(error => {
            hibaJelzo.innerText = "Hiba történt az adatok betöltése során: " + error.message;
        });
}

function kartyakLetrehozasa(data) {
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
}

function toltoJelzoMegjelenitese() {
    betoltesJelzo.style.display = "block";
}

function toltoJelzoEltuntetese() {
    betoltesJelzo.style.display = "none";
}

function szuroKezeles() {
    const valasztottAllomas = szuro.value;

    const kartyak = document.querySelectorAll(".kartya");

    kartyak.forEach(kartya => {
        const allomas = kartya.querySelector("p").innerText.split(": ")[1];
        if (valasztottAllomas === "all" || allomas === valasztottAllomas || valasztottAllomas === "") {
            kartya.style.display = "block";
        } else {
            kartya.style.display = "none";
        }
    });
}