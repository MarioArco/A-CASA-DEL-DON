// Array per memorizzare i bambini
let children = [];

// Funzione di login
function login() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (phone === "3292413810" && password === "1") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("welcome-section").style.display = "block";
    } else if (phone === "3791905110" && password === "spettacoli") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("center-section").style.display = "block";
        displayChildren();
    } else {
        document.getElementById("error-message").innerText = "Credenziali errate. Riprova.";
    }
}

// Funzione per aggiungere un nuovo bambino
function addChild() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherPhone = document.getElementById("father-phone").value;
    const motherPhone = document.getElementById("mother-phone").value;

    const newChild = {
        nome: firstName,
        cognome: lastName,
        intolleranze: intolerances,
        telefonoPadre: fatherPhone,
        telefonoMadre: motherPhone,
        dataIscrizione: new Date().toLocaleString()
    };

    children.push(newChild);
    displayChildren();
    clearForm();
}

// Funzione per visualizzare i bambini nella tabella
function displayChildren() {
    const registrationBody = document.getElementById("registration-body");
    registrationBody.innerHTML = "";

    children.forEach((child, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${child.nome}</td>
            <td>${child.cognome}</td>
            <td>${child.intolleranze}</td>
            <td>${child.telefonoPadre}</td>
            <td>${child.telefonoMadre}</td>
            <td>
                <button onclick="showInfo(${index})">i</button>
                <button onclick="openDeleteModal(${index})">🗑️</button>
            </td>
        `;
        registrationBody.appendChild(row);
    });
}

// Funzione per cancellare il modulo di iscrizione
function clearForm() {
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("intolerances").value = "";
    document.getElementById("father-phone").value = "";
    document.getElementById("mother-phone").value = "";
}

// Funzione per mostrare informazioni
function showInfo(index) {
    const child = children[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <p><strong>Nome:</strong> ${child.nome}</p>
        <p><strong>Cognome:</strong> ${child.cognome}</p>
        <p><strong>Intolleranze:</strong> ${child.intolleranze}</p>
        <p><strong>Telefono Padre:</strong> ${child.telefonoPadre}</p>
        <p><strong>Telefono Madre:</strong> ${child.telefonoMadre}</p>
        <p><strong>Data di Iscrizione:</strong> ${child.dataIscrizione}</p>
    `;
    document.getElementById("info-modal").style.display = "block";
}

// Funzione per chiudere il modale delle informazioni
function closeInfoModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per aprire il modale di conferma eliminazione
let deleteIndex;
function openDeleteModal(index) {
    deleteIndex = index;
    document.getElementById("delete-modal").style.display = "block";
}

// Funzione per confermare eliminazione
function confirmDelete() {
    children.splice(deleteIndex, 1);
    document.getElementById("delete-modal").style.display = "none";
    displayChildren();
}

// Funzione per chiudere il modale di eliminazione
function closeDeleteModal() {
    document.getElementById("delete-modal").style.display = "none";
}
