let children = []; // Array per memorizzare i bambini

// Funzione di accesso
document.getElementById("login-button").onclick = function() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if ((phone === "3292413810" && password === "1") || 
        (phone === "3791905110" && password === "spettacoli")) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("content-section").style.display = "block";
        errorMessage.innerText = "";
    } else {
        errorMessage.innerText = "Numero di telefono o password errati.";
    }
};

// Funzione di iscrizione
function registerChild() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherPhone = document.getElementById("fatherPhone").value;
    const fatherPassword = document.getElementById("fatherPassword").value;
    const motherPhone = document.getElementById("motherPhone").value;
    const motherPassword = document.getElementById("motherPassword").value;
    
    if ((fatherPhone && !fatherPassword) || (motherPhone && !motherPassword)) {
        alert("La password è obbligatoria se si inserisce il numero del corrispondente genitore.");
        return;
    }

    const newChild = {
        name,
        surname,
        intolerances,
        fatherPhone,
        fatherPassword,
        motherPhone,
        motherPassword,
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
            <td>${child.fatherPhone}</td>
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
        <p><strong>Telefono Padre:</strong> ${child.fatherPhone}</p>
        <p><strong>Password Padre:</strong> ${child.fatherPassword}</p>
        <p><strong>Telefono Madre:</strong> ${child.motherPhone}</p>
        <p><strong>Password Madre:</strong> ${child.motherPassword}</p>
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

// Funzione per chiudere il modale
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per pulire il form di registrazione
function clearRegistrationForm() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("intolerances").value = "";
    document.getElementById("fatherPhone").value = "";
    document.getElementById("fatherPassword").value = "";
    document.getElementById("motherPhone").value = "";
    document.getElementById("motherPassword").value = "";
}
