// Dati di accesso
const validCredentials = [
    { phone: "3292413810", password: "1", accessLevel: "welcome" },
    { phone: "3791905110", password: "spettacoli", accessLevel: "center" }
];

// Array per i bambini iscritti
let children = [];
let editingChildIndex = -1;

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
    if (editingChildIndex === -1) {
        children.push(newChild);  // Aggiungi un nuovo bambino
    } else {
        children[editingChildIndex] = newChild;  // Modifica un bambino esistente
        editingChildIndex = -1;  // Reset per evitare che venga modificato un altro bambino
    }

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

// Funzione per modificare le informazioni
function editInfo() {
    const child = children[editingChildIndex];
    document.getElementById("first-name").value = child.firstName;
    document.getElementById("last-name").value = child.lastName;
    document.getElementById("intolerances").value = child.intolerances;
    document.getElementById("father-phone").value = child.fatherPhone;
    document.getElementById("father-password").value = child.fatherPassword;
    document.getElementById("mother-phone").value = child.motherPhone;
    document.getElementById("mother-password").value = child.motherPassword;

    document.getElementById("center-section").style.display = "block";
    document.getElementById("info-modal").style.display = "none";
    editingChildIndex = child.index;
}

// Funzione per aprire il modale di conferma eliminazione
let currentChildIndex = -1;

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

