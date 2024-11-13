let members = []; // Array per memorizzare i membri registrati
const correctCredentials = {
    "3292413810": "1",
    "3791905110": "spettacoli"
};

// Funzione per caricare i membri dal localStorage
function loadMembers() {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
        members = JSON.parse(storedMembers); // Converte la stringa JSON in un array
    }
    displayMembers(); // Mostra i membri caricati
}

// Funzione per gestire l'accesso
document.getElementById("login-button").onclick = function() {
    const phoneInput = document.getElementById("phone").value;
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (correctCredentials[phoneInput] && correctCredentials[phoneInput] === passwordInput) {
        document.getElementById("login-section").style.display = "none"; // Nasconde la sezione di login
        document.getElementById("content-section").style.display = "block"; // Mostra la sezione principale
        errorMessage.innerText = ""; // Rimuove eventuali messaggi di errore
        loadMembers(); // Carica i membri dal localStorage
    } else {
        errorMessage.innerText = "Numero di telefono o password errata."; // Mostra messaggio di errore
    }
};

// Funzione per registrare un nuovo membro
function registerMember() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherPhone = document.getElementById("father-phone").value;
    const fatherPassword = document.getElementById("father-password").value;
    const motherPhone = document.getElementById("mother-phone").value;
    const motherPassword = document.getElementById("mother-password").value;

    // Aggiungi un nuovo membro all'array
    const newMember = {
        name: name,
        surname: surname,
        intolerances: intolerances,
        fatherPhone: fatherPhone,
        fatherPassword: fatherPhone ? fatherPassword : null,
        motherPhone: motherPhone,
        motherPassword: motherPhone ? motherPassword : null,
        registrationDate: new Date().toLocaleString() // Data e ora di registrazione
    };

    members.push(newMember);
    localStorage.setItem("members", JSON.stringify(members)); // Salva i membri nel localStorage

    displayMembers(); // Rende visibile la nuova lista di membri
}

// Funzione per visualizzare i membri nella tabella
function displayMembers() {
    const membersBody = document.getElementById("members-body");
    membersBody.innerHTML = ""; // Pulisce la tabella esistente
    members.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.surname}</td>
            <td>${member.intolerances}</td>
            <td>${member.fatherPhone}</td>
            <td>${member.motherPhone}</td>
            <td>
                <button onclick="showMemberInfo(${index})">ℹ️</button>
                <button onclick="deleteMember(${index})">🗑️</button>
            </td>
        `;
        membersBody.appendChild(row);
    });
}

// Funzione per mostrare le informazioni di un membro
function showMemberInfo(index) {
    const member = members[index];
    alert(`
        Nome: ${member.name} ${member.surname}
        Intolleranze: ${member.intolerances}
        Telefono Padre: ${member.fatherPhone} (Password: ${member.fatherPassword})
        Telefono Madre: ${member.motherPhone} (Password: ${member.motherPassword})
        Data di Iscrizione: ${member.registrationDate}
    `);
}

// Funzione per cancellare un membro
function deleteMember(index) {
    const confirmDelete = confirm("Sei sicuro di voler cancellare questa iscrizione?");
    if (confirmDelete) {
        members.splice(index, 1); // Rimuove il membro dall'array
        localStorage.setItem("members", JSON.stringify(members)); // Salva l'array aggiornato nel localStorage
        displayMembers(); // Rende visibile la lista aggiornata
    }
}

// Funzione per cambiare la password
function changePassword() {
    document.getElementById("change-password-modal").style.display = "block";
}

// Funzione per salvare la nuova password
function saveNewPassword() {
    const newPassword = document.getElementById("new-password").value;
    if (newPassword) {
        alert("Password cambiata con successo!");
        closeChangePasswordModal();
    } else {
        alert("Per favore, inserisci una nuova password.");
    }
}

// Funzione per chiudere il modale
function closeChangePasswordModal() {
    document.getElementById("change-password-modal").style.display = "none";
}

// Funzione di logout
function logout() {
    window.location.href = "index.html"; // Reindirizza alla pagina di login
}
