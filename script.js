let members = []; // Array per memorizzare i membri
const correctPhone1 = "3292413810"; // Primo numero di telefono
const correctPassword1 = "1"; // Prima password
const correctPhone2 = "3791905110"; // Secondo numero di telefono
const correctPassword2 = "spettacoli"; // Seconda password

// Funzione di accesso
document.getElementById("login-button").onclick = function() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if ((phone === correctPhone1 && password === correctPassword1) || 
        (phone === correctPhone2 && password === correctPassword2)) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("content-section").style.display = "block";
        errorMessage.innerText = "";
        loadMembers();
    } else {
        errorMessage.innerText = "Numero di telefono o password errati.";
    }
};

// Funzione per caricare i membri dal localStorage
function loadMembers() {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
        members = JSON.parse(storedMembers);
    }
    displayMembers();
}

// Funzione per visualizzare i membri
function displayMembers() {
    const membersBody = document.getElementById("members-body");
    membersBody.innerHTML = "";

    members.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.surname}</td>
            <td>${member.phoneFather}</td>
            <td>${member.phoneMother}</td>
            <td>
                <button onclick="showInfo(${index})">Info</button>
                <button onclick="openEditModal(${index})">✏️</button>
                <button onclick="confirmDelete(${index})">🗑️</button>
            </td>
        `;
        membersBody.appendChild(row);
    });
}

// Funzione per aprire il modale delle informazioni
function showInfo(index) {
    const member = members[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <strong>Nome:</strong> ${member.name}<br>
        <strong>Cognome:</strong> ${member.surname}<br>
        <strong>Telefono Padre:</strong> ${member.phoneFather}<br>
        <strong>Telefono Madre:</strong> ${member.phoneMother}<br>
        <strong>Data di Iscrizione:</strong> ${member.registrationDate}
    `;
    document.getElementById("info-modal").style.display = "block";
}

// Funzione per chiudere il modale
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per aprire il modale di modifica
function openEditModal(index) {
    const member = members[index];
    document.getElementById("edit-name").value = member.name;
    document.getElementById("edit-surname").value = member.surname;
    document.getElementById("edit-phone-father").value = member.phoneFather;
    document.getElementById("edit-phone-mother").value = member.phoneMother;
    document.getElementById("edit-modal").style.display = "block";

    document.getElementById("save-changes").onclick = function() {
        saveChanges(index);
    };
}

// Funzione per salvare le modifiche
function saveChanges(index) {
    members[index] = {
        name: document.getElementById("edit-name").value,
        surname: document.getElementById("edit-surname").value,
        phoneFather: document.getElementById("edit-phone-father").value,
        phoneMother: document.getElementById("edit-phone-mother").value,
        registrationDate: new Date().toLocaleString()
    };
    localStorage.setItem("members", JSON.stringify(members));
    displayMembers();
    closeEditModal();
}

// Funzione per chiudere il modale di modifica
function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
}

// Funzione per confermare l'eliminazione
function confirmDelete(index) {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questo bambino?");
    if (confirmDelete) {
        members.splice(index, 1);
        localStorage.setItem("members", JSON.stringify(members));
        displayMembers();
    }
}

// Funzione per aprire il modale di iscrizione
function openRegistration() {
    const name = prompt("Inserisci il nome del bambino:");
    const surname = prompt("Inserisci il cognome del bambino:");
    const phoneFather = prompt("Inserisci il telefono del padre:");
    const phoneMother = prompt("Inserisci il telefono della madre:");

    const newMember = {
        name,
        surname,
        phoneFather,
        phoneMother,
        registrationDate: new Date().toLocaleString()
    };

    members.push(newMember);
    localStorage.setItem("members", JSON.stringify(members));
    displayMembers();
}
