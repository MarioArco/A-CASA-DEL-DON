// Dati di accesso
const validCredentials = [
    { phone: "3292413810", password: "1", accessLevel: "welcome" },
    { phone: "3791905110", password: "spettacoli", accessLevel: "center" }
];

// Array per i bambini iscritti
let children = [];

// Funzione di login
function login() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const user = validCredentials.find(u => u.phone === phone && u.password === password);

    if (user) {
        // Nascondi la sezione di login
        document.getElementById("login-section").style.display = "none";

        // Mostra la sezione appropriata
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
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherPhone = document.getElementById("father-phone").value;
    const fatherPassword = document.getElementById("father-password").value;
    const motherPhone = document.getElementById("mother-phone").value;
    const motherPassword = document.getElementById("mother-password").value;

    const newChild = {
        firstName,
        lastName,
        intolerances,
        fatherPhone,
        fatherPassword,
        motherPhone,
        motherPassword,
        registrationTime: new Date().toLocaleString()
    };

    // Aggiungi il bambino all'array
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
                <button class="key" onclick="openPasswordModal(${index})">🔑</button>
                <button class="info" onclick="viewInfo(${index})">ℹ️</button>
                <button class="trash" onclick="openDeleteModal(${index})">🗑️</button>
            </td>
        `;
        childrenBody.appendChild(row);
    });
}

// Funzione per aprire il modale delle password
function openPasswordModal(index) {
    document.getElementById("password-modal").style.display = "block";
    currentChildIndex = index;
}

// Funzione per salvare le password
function savePasswords() {
    const fatherPassword = document.getElementById("father-password").value;
    const motherPassword = document.getElementById("mother-password").value;

    children[currentChildIndex].fatherPassword = fatherPassword;
    children[currentChildIndex].motherPassword = motherPassword;

    closePasswordModal();
    displayChildren();
}

// Funzione per chiudere il modale delle password
function closePasswordModal() {
    document.getElementById("password-modal").style.display = "none";
}

// Funzione per visualizzare le informazioni
function viewInfo(index) {
    const child = children[index];
    alert(`
    Nome: ${child.firstName}
    Cognome: ${child.lastName}
    Intolleranze: ${child.intolerances}
    Telefono Padre: ${child.fatherPhone}
    Telefono Madre: ${child.motherPhone}
    Password Padre: ${child.fatherPassword}
    Password Madre: ${child.motherPassword}
    Iscritto il: ${child.registrationTime}
    `);
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
