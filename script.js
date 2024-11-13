let children = []; // Array per memorizzare i bambini
let loggedInUser = null; // Variabile per memorizzare l'utente loggato

// Funzione di accesso
document.getElementById("login-button").onclick = function() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if ((phone === "3292413810" && password === "1") || 
        (phone === "3791905110" && password === "spettacoli")) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("content-section").style.display = "block";
        loggedInUser = { phone, password }; // Memorizziamo l'utente loggato
        document.getElementById("user-menu").style.display = "block"; // Mostra il menu
        errorMessage.innerText = "";
    } else {
        errorMessage.innerText = "Numero di telefono o password errati.";
    }
};

// Funzione per mostrare/nascondere il menu utente
function toggleUserMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Funzione per cambiare la password
function changePassword() {
    const newPassword = prompt("Inserisci la nuova password:");
    if (newPassword) {
        loggedInUser.password = newPassword; // Aggiorna la password
        alert("Password cambiata con successo!");
    }
}

// Funzione di logout
function logout() {
    loggedInUser = null;
    document.getElementById("login-section").style.display = "block";
    document.getElementById("content-section").style.display = "none";
    document.getElementById("user-menu").style.display = "none"; // Nascondi il menu
}

// Funzione per visualizzare il modale per password dimenticata
document.getElementById("forgot-password-link").onclick = function() {
    document.getElementById("forgot-password-modal").style.display = "flex";
};

// Funzione per chiudere il modale di password dimenticata
function closeForgotPasswordModal() {
    document.getElementById("forgot-password-modal").style.display = "none";
};

// Funzione per registrare un bambino
function registerChild() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherName = document.getElementById("fatherName").value;
    const fatherPhone = document.getElementById("fatherPhone").value;
    const fatherPassword = document.getElementById("fatherPassword").value;
    const motherName = document.getElementById("motherName").value;
    const motherPhone = document.getElementById("motherPhone").value;
    const motherPassword = document.getElementById("motherPassword").value;

    // Verifica della password obbligatoria per i numeri di telefono
    if ((fatherPhone && !fatherPassword) || (motherPhone && !motherPassword)) {
        alert("La password è obbligatoria se si inserisce il numero del corrispondente genitore.");
        return;
    }

    const newChild = {
        name,
        surname,
        intolerances,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        registrationDate: new Date().toLocaleString()
    };

    children.push(newChild);
    displayChildren();
    clearRegistrationForm();
}

// Funzione per visualizzare i bambini
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

// Funzione per mostrare le informazioni
function showInfo(index) {
    const child = children[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <p><strong>Nome:</strong> ${child.name}</p>
        <p><strong>Cognome:</strong> ${child.surname}</p>
        <p><strong>Intolleranze:</strong> ${child.intolerances}</p>
        <p><strong>Nome Padre:</strong> ${child.fatherName}</p>
        <p><strong>Telefono Padre:</strong> ${child.fatherPhone}</p>
        <p><strong>Nome Madre:</strong> ${child.motherName}</p>
        <p><strong>Telefono Madre:</strong> ${child.motherPhone}</p>
        <p><strong>Data Iscrizione:</strong> ${child.registrationDate}</p>
    `;
    document.getElementById("info-modal").style.display = "block";
}

// Funzione per confermare l'eliminazione
function confirmDelete(index) {
    if (confirm("Sei sicuro di voler eliminare questo bambino?")) {
        children.splice(index, 1);
        displayChildren();
    }
}

// Funzione per chiudere il modale delle informazioni
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per pulire il form di registrazione
function clearRegistrationForm() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("intolerances").value = "";
    document.getElementById("fatherName").value = "";
    document.getElementById("fatherPhone").value = "";
    document.getElementById("fatherPassword").value = "";
    document.getElementById("motherName").value = "";
    document.getElementById("motherPhone").value = "";
    document.getElementById("motherPassword").value = "";
}
