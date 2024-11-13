// Array per memorizzare i bambini registrati
let children = [];

// Funzione per gestire l'accesso
document.getElementById("login-button").onclick = function() {
    const phoneInput = document.getElementById("phone").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Controlla le credenziali di accesso
    if (phoneInput === "3292413810" && passwordInput === "1") {
        // Accedi alla pagina di benvenuto
        document.getElementById("login-section").style.display = "none";
        document.getElementById("content-section").style.display = "block";
        errorMessage.innerText = ""; // Pulisce eventuali messaggi di errore
    } else if (phoneInput === "3791905110" && passwordInput === "spettacoli") {
        // Accedi alla tabella di gestione del centro ricreativo
        document.getElementById("login-section").style.display = "none";
        document.getElementById("content-section").style.display = "block";
        errorMessage.innerText = "";
    } else {
        // Mostra un messaggio di errore
        errorMessage.innerText = "Numero di telefono o password errata.";
    }
};

// Funzione per registrare un nuovo bambino
function registerChild() {
    const name = document.getElementById("child-name").value.trim();
    const surname = document.getElementById("child-surname").value.trim();
    const intolerances = document.getElementById("intolerances").value.trim();
    const fatherName = document.getElementById("father-name").value.trim();
    const fatherPhone = document.getElementById("father-phone").value.trim();
    const motherName = document.getElementById("mother-name").value.trim();
    const motherPhone = document.getElementById("mother-phone").value.trim();
    const registrationDate = new Date().toLocaleString();

    // Crea un oggetto bambino e lo aggiunge all'array
    const newChild = {
        name,
        surname,
        intolerances,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        registrationDate
    };

    children.push(newChild);
    displayChildren();
    document.getElementById("registration-form").reset();
}

// Funzione per visualizzare i bambini registrati nella tabella
function displayChildren() {
    const childrenTable = document.getElementById("children-table");
    childrenTable.innerHTML = "";

    children.forEach((child, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${child.name}</td>
            <td>${child.surname}</td>
            <td>${child.intolerances}</td>
            <td>${child.fatherName}</td>
            <td>${child.fatherPhone}</td>
            <td>${child.motherName}</td>
            <td>${child.motherPhone}</td>
            <td>${child.registrationDate}</td>
            <td>
                <button onclick="showInfo(${index})">ℹ️</button>
                <button onclick="confirmDelete(${index})">🗑️</button>
            </td>
        `;
        childrenTable.appendChild(row);
    });
}

// Funzione per mostrare le informazioni dettagliate di un bambino
function showInfo(index) {
    const child = children[index];
    const infoDetails = document.getElementById("info-details");

    infoDetails.innerHTML = `
        <strong>Nome:</strong> ${child.name} ${child.surname}<br>
        <strong>Intolleranze:</strong> ${child.intolerances}<br>
        <strong>Nome del Padre:</strong> ${child.fatherName} - Telefono: ${child.fatherPhone}<br>
        <strong>Nome della Madre:</strong> ${child.motherName} - Telefono: ${child.motherPhone}<br>
        <strong>Data di Iscrizione:</strong> ${child.registrationDate}
    `;

    document.getElementById("info-modal").style.display = "block";
}

// Funzione per chiudere il modale delle informazioni
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per confermare e cancellare un bambino dalla tabella
function confirmDelete(index) {
    if (confirm("Sei sicuro di voler eliminare questo bambino?")) {
        children.splice(index, 1);
        displayChildren();
    }
}
