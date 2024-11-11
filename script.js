// Dati di accesso
const validCredentials = [
    { phone: "3292413810", password: "1", accessLevel: "welcome" },
    { phone: "3791905110", password: "spettacoli", accessLevel: "center" }
];

// Array per i bambini iscritti
let children = [];
let currentChildIndex = -1;

// Funzione di login
function login() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const user = validCredentials.find(u => u.phone === phone && u.password === password);

    if (user) {
        document.getElementById("login-section").style.display = "none";
        if (user.accessLevel === "welcome") {
            document.getElementById("welcome-section").style.display = "block";
        } else if (user.accessLevel === "center") {
            document.getElementById("center-section").style.display = "block";
        }
    } else {
        errorMessage.innerText = "Credenziali errate, riprova.";
    }
}

// Funzione per aggiungere un bambino
function addChild() {
    const newChild = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        intolerances: document.getElementById("intolerances").value,
        fatherPhone: document.getElementById("father-phone").value,
        fatherPassword: document.getElementById("father-password").value,
        motherPhone: document.getElementById("mother-phone").value,
        motherPassword: document.getElementById("mother-password").value,
        registrationTime: new Date().toLocaleString()
    };

    children.push(newChild);
    displayChildren();
}

// Funzione per visualizzare i bambini iscritti
function displayChildren() {
    const childrenBody = document.getElementById("registration-body");
    childrenBody.innerHTML = "";

    children.forEach((child, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${child.firstName}</td>
            <td>${child.lastName}</td>
            <td>${child.intolerances}</td>
            <td>${child.fatherPhone}</td>
            <td>${child.motherPhone}</td>
            <td>
                <button class="info" onclick="viewInfo(${index})">ℹ️</button>
                <button class="trash" onclick="openDeleteModal(${index})">🗑️</button>
            </td>
        `;
        childrenBody.appendChild(row);
    });
}

// Funzione per aprire il modale delle informazioni
function viewInfo(index) {
    const child = children[index];
    const infoText = `
        <strong>Nome:</strong> ${child.firstName} <br>
        <strong>Cognome:</strong> ${child.lastName} <br>
        <strong>Intolleranze:</strong> ${child.intolerances} <br>
        <strong>Telefono Padre:</strong> ${child.fatherPhone} <br>
        <strong>Password Padre:</strong> ${child.fatherPassword} <br>
        <strong>Telefono Madre:</strong> ${child.motherPhone} <br>
        <strong>Password Madre:</strong> ${child.motherPassword} <br>
        <strong>Iscritto il:</strong> ${child.registrationTime}
    `;
    document.getElementById("info-text").innerHTML = infoText;
    document.getElementById("info-modal").style.display = "block";
}

// Funzione per chiudere il modale delle informazioni
function closeInfoModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per aprire il modale di conferma eliminazione
function openDeleteModal(index) {
    currentChildIndex = index;
    document.getElementById("delete-modal").style.display = "block";
}

// Funzione per confermare l'eliminazione
function confirmDelete() {
    children.splice(currentChildIndex, 1);
    closeDeleteModal();
    displayChildren();
}

// Funzione per chiudere il modale di conferma eliminazione
function closeDeleteModal() {
    document.getElementById("delete-modal").style.display = "none";
}
