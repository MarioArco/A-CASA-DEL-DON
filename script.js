const correctCredentials = {
    "3292413810": "1",
    "3791905110": "spettacoli"
};

let members = [];

// Funzione per caricare i membri dal localStorage
function loadMembers() {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
        members = JSON.parse(storedMembers);
    }
    displayMembers();
}

// Funzione per gestire l'accesso
document.getElementById("login-button").onclick = function() {
    const phoneInput = document.getElementById("phone").value;
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (correctCredentials[phoneInput] && correctCredentials[phoneInput] === passwordInput) {
        document.getElementById("login-section").style.display = "none"; 

        if (phoneInput === "3292413810") {
            document.getElementById("welcome-section").style.display = "block";  
        } else {
            document.getElementById("content-section").style.display = "block"; 
            loadMembers();
        }

        errorMessage.innerText = ""; 
    } else {
        errorMessage.innerText = "Numero di telefono o password errata."; 
    }
};

// Funzione per visualizzare i membri
function displayMembers() {
    const membersBody = document.getElementById("members-body");
    membersBody.innerHTML = ""; 

    members.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.nome}</td>
            <td>${member.cognome}</td>
            <td>${member.intolleranze}</td>
            <td>${member.telefonoPadre}</td>
            <td>${member.telefonoMadre}</td>
            <td>
                <button onclick="showInfo(${index})">Info</button>
                <button onclick="confirmDelete(${index})">Elimina</button>
            </td>
        `;
        membersBody.appendChild(row);
    });
}

// Funzione per mostrare le informazioni del membro
function showInfo(index) {
    const member = members[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <strong>Nome:</strong> ${member.nome} ${member.cognome}<br>
        <strong>Intolleranze:</strong> ${member.intolleranze}<br>
        <strong>Telefono Padre:</strong> ${member.telefonoPadre}<br>
        <strong>Telefono Madre:</strong> ${member.telefonoMadre}<br>
        <strong>Data di Iscrizione:</strong> ${member.dataIscrizione}
    `;
    document.getElementById("info-modal").style.display = "block";
}

// Funzione per chiudere il modale delle informazioni
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per confermare l'eliminazione di un membro
function confirmDelete(index) {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questo bambino?");
    if (confirmDelete) {
        members.splice(index, 1);
        saveMembers();
        displayMembers();
    }
}

// Funzione per salvare i membri nel localStorage
function saveMembers() {
    localStorage.setItem("members", JSON.stringify(members));
}

// Funzione per aprire il modulo di registrazione
function openRegistration() {
    document.getElementById("registration-section").style.display = "block";
}

// Funzione per annullare la registrazione
function cancelRegistration() {
    document.getElementById("registration-section").style.display = "none";
    document.getElementById("nome").value = "";
    document.getElementById("cognome").value = "";
    document.getElementById("intolleranze").value = "";
    document.getElementById("telefonoPadre").value = "";
    document.getElementById("telefonoMadre").value = "";
}

// Funzione per registrare un nuovo membro
function registerMember() {
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const intolleranze = document.getElementById("intolleranze").value;
    const telefonoPadre = document.getElementById("telefonoPadre").value;
    const telefonoMadre = document.getElementById("telefonoMadre").value;
    const dataIscrizione = new Date().toLocaleString();

    const newMember = { nome, cognome, intolleranze, telefonoPadre, telefonoMadre, dataIscrizione };
    members.push(newMember);
    saveMembers();
    displayMembers();
    cancelRegistration();
}
