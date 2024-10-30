// JavaScript per la gestione della password e degli iscritti

let members = []; // Array per memorizzare i membri registrati
const correctPassword = "tua_password"; // Cambia "tua_password" con la password desiderata

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
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (passwordInput === correctPassword) {
        document.getElementById("login-section").style.display = "none"; // Nasconde la sezione di login
        document.getElementById("content-section").style.display = "block"; // Mostra la sezione principale
        errorMessage.innerText = ""; // Rimuove eventuali messaggi di errore
        loadMembers(); // Carica i membri dal localStorage
    } else {
        errorMessage.innerText = "Password errata. Riprova."; // Mostra messaggio di errore
    }
};

// Funzione per registrare un nuovo membro
function registerMember() {
    const name = document.getElementById("name").value;
    const intolerances = document.getElementById("intolerances").value;
    const phone = document.getElementById("phone").value;

    // Aggiungi un nuovo membro all'array
    const newMember = {
        nome: name,
        intolleranze: intolerances,
        telefono: phone,
        dataIscrizione: new Date().toLocaleString() // Aggiunge la data di iscrizione
    };

    members.push(newMember); // Aggiunge il nuovo membro
    saveMembers(); // Salva i membri nel localStorage
    displayMembers(); // Mostra i membri aggiornati
    cancelRegistration(); // Chiude il modulo di registrazione
}

// Funzione per visualizzare i membri
function displayMembers() {
    const membersBody = document.getElementById("members-body");
    membersBody.innerHTML = ""; // Pulisce la tabella esistente

    members.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.nome}</td>
            <td>${member.intolleranze}</td>
            <td>${member.telefono}</td>
            <td>
                <button onclick="showInfo(${index})">Info</button>
                <button onclick="confirmDelete(${index})">Elimina</button> <!-- Pulsante di eliminazione -->
            </td>
        `;
        membersBody.appendChild(row); // Aggiunge la riga alla tabella
    });
}

// Funzione per salvare i membri nel localStorage
function saveMembers() {
    localStorage.setItem("members", JSON.stringify(members)); // Salva l'array come stringa JSON
}

// Funzione per confermare l'eliminazione di un membro
function confirmDelete(index) {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questo bambino?");
    if (confirmDelete) {
        members.splice(index, 1); // Rimuove il membro dall'elenco
        saveMembers(); // Salva l'elenco aggiornato nel localStorage
        displayMembers(); // Aggiorna la visualizzazione
    }
}

// Funzione per mostrare le informazioni del membro in un modale
function showInfo(index) {
    const member = members[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <strong>Nome:</strong> ${member.nome}<br>
        <strong>Intolleranze:</strong> ${member.intolleranze}<br>
        <strong>Telefono:</strong> ${member.telefono}<br>
        <strong>Data di Iscrizione:</strong> ${member.dataIscrizione}
    `;
    document.getElementById("info-modal").style.display = "block"; // Mostra il modale
}

// Funzione per chiudere il modale
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per aprire il modulo di registrazione
function openRegistration() {
    document.getElementById("registration-section").style.display = "block";
}

// Funzione per annullare la registrazione
function cancelRegistration() {
    document.getElementById("registration-section").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("intolerances").value = "";
    document.getElementById("phone").value = "";
}

// Carica i membri quando la pagina viene caricata
window.onload = loadMembers; // Chiama la funzione per caricare i membri al caricamento della pagina
