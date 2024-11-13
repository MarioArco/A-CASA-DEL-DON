let members = []; // Array per i membri registrati

// Funzione di login
document.getElementById("login-button").onclick = function() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (phone === "3292413810" && password === "1") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("user-section").style.display = "block";
    } else if (phone === "3791905110" && password === "spettacoli") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("user-section").style.display = "block";
        loadMembers();
    } else {
        errorMessage.innerText = "Numero di telefono o password errata.";
    }
};

// Funzione per il logout
function logout() {
    window.location.href = "index.html";
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

// Funzione per aprire il modulo di registrazione
function openRegistration() {
    document.getElementById("registration-section").style.display = "block";
}

// Funzione per annullare la registrazione
function cancelRegistration() {
    document.getElementById("registration-section").style.display = "none";
}

// Funzione per registrare un nuovo membro
function registerMember() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherPhone = document.getElementById("father-phone").value;
    const motherPhone = document.getElementById("mother-phone").value;

    if (firstName && lastName && fatherPhone && motherPhone) {
        const newMember = {
            firstName,
            lastName,
            intolerances,
            fatherPhone,
            motherPhone
        };
        members.push(newMember);
        loadMembers();
        cancelRegistration();
    } else {
        alert("Per favore, completa tutti i campi.");
    }
}

// Funzione per caricare i membri nella tabella
function loadMembers() {
    const tableBody = document.getElementById("members-body");
    tableBody.innerHTML = "";
    members.forEach((member, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${member.firstName}</td>
            <td>${member.lastName}</td>
            <td>${member.intolerances}</td>
            <td>${member.fatherPhone}</td>
            <td>${member.motherPhone}</td>
            <td>
                <button onclick="showInfo(${index})">i</button>
                <button onclick="deleteMember(${index})">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Funzione per mostrare informazioni sul membro
function showInfo(index) {
    const member = members[index];
    alert(`
        Nome: ${member.firstName}
        Cognome: ${member.lastName}
        Intolleranze: ${member.intolerances}
        Telefono Padre: ${member.fatherPhone}
        Telefono Madre: ${member.motherPhone}
    `);
}

// Funzione per eliminare un membro
function deleteMember(index) {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questo bambino?");
    if (confirmDelete) {
        members.splice(index, 1);
        loadMembers();
    }
}
