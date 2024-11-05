let members = []; // Array per memorizzare i membri
const correctPassword = "tua_password"; // Sostituisci con la tua password
let editIndex = -1; // Indice per tracciare l'iscrizione in fase di modifica

// Carica i membri dal local storage
function loadMembers() {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
        members = JSON.parse(storedMembers);
    }
    displayMembers(); // Visualizza i membri
}

// Funzione di accesso
document.getElementById("login-button").onclick = function () {
    const passwordInput = document.getElementById("password").value; // Ottieni input password
    const errorMessage = document.getElementById("error-message"); // Ottieni elemento di messaggio di errore

    if (passwordInput === correctPassword) { // Verifica password
        document.getElementById("login-section").style.display = "none"; // Nascondi sezione di accesso
        document.getElementById("content-section").style.display = "block"; // Mostra sezione contenuto
        errorMessage.innerText = ""; // Rimuovi messaggio di errore
        loadMembers(); // Carica membri
    } else {
        errorMessage.innerText = "Password errata. Riprova."; // Mostra messaggio di errore
    }
};

// Funzione per iniziare l'iscrizione
function startRegistration() {
    document.getElementById("registration-section").style.display = "block"; // Mostra sezione registrazione
    document.getElementById("name").focus(); // Focalizza il campo nome
    clearInputs(); // Pulisce i campi prima di iniziare
}

// Funzione per registrare un nuovo membro
function registerMember() {
    const name = document.getElementById("name").value; // Ottieni nome
    const intolerances = document.getElementById("intolerances").value; // Ottieni intolleranze
    const phone = document.getElementById("phone").value; // Ottieni telefono

    if (name && phone) { // Controlla se nome e telefono sono stati inseriti
        const newMember = { // Crea oggetto membro
            nome: name,
            intolleranze: intolerances,
            telefono: phone,
            dataIscrizione: new Date().toLocaleString() // Aggiungi data iscrizione
        };

        members.push(newMember); // Aggiungi nuovo membro all'array
        saveMembers(); // Salva membri nel local storage
        displayMembers(); // Aggiorna la visualizzazione dei membri
        clearInputs(); // Pulisce i campi per il prossimo bambino
        document.getElementById("name").focus(); // Focalizza di nuovo il campo nome
    } else {
        alert("Per favore, inserisci il nome e il numero di telefono."); // Messaggio di errore se mancano campi
    }
}

// Funzione per pulire gli input
function clearInputs() {
    document.getElementById("name").value = ""; // Pulisci il campo nome
    document.getElementById("intolerances").value = ""; // Pulisci il campo intolleranze
    document.getElementById("phone").value = ""; // Pulisci il campo telefono
}

// Funzione per visualizzare i membri
function displayMembers() {
    const membersBody = document.getElementById("members-body"); // Ottieni il corpo della tabella
    membersBody.innerHTML = ""; // Pulisci il contenuto precedente

    members.forEach((member, index) => { // Itera attraverso i membri
        const row = document.createElement("tr"); // Crea una nuova riga
        row.innerHTML = `
            <td>${member.nome}</td>
            <td>${member.intolleranze}</td>
            <td>${member.telefono}</td>
            <td>
                <button onclick="showInfo(${index})">Info</button>
                <button onclick="editMember(${index})">Modifica</button>
                <button onclick="confirmDelete(${index})">Elimina</button>
            </td>
        `;
        membersBody.appendChild(row); // Aggiungi la riga al corpo della tabella
    });
}

// Funzione per salvare i membri nel local storage
function saveMembers() {
    localStorage.setItem("members", JSON.stringify(members)); // Salva l'array dei membri nel local storage
}

// Funzione per confermare l'eliminazione di un membro
function confirmDelete(index) {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questo bambino?"); // Conferma eliminazione
    if (confirmDelete) {
        members.splice(index, 1); // Rimuovi il membro dall'array
        saveMembers(); // Salva i membri aggiornati
        displayMembers(); // Aggiorna la visualizzazione dei membri
    }
}

// Funzione per mostrare le informazioni di un membro
function showInfo(index) {
    const member = members[index]; // Ottieni il membro specifico
    const infoDetails = document.getElementById("info-details"); // Ottieni dettagli info
    infoDetails.innerHTML = `
        <p><strong>Nome:</strong> ${member.nome}</p>
        <p><strong>Intolleranze:</strong> ${member.intolleranze}</p>
        <p><strong>Telefono:</strong> ${member.telefono}</p>
        <p><strong>Data di Iscrizione:</strong> ${member.dataIscrizione}</p>
    `;
    document.getElementById("info-modal").style.display = "block"; // Mostra modale
}

// Funzione per chiudere il modale delle informazioni
function closeModal() {
    document.getElementById("info-modal").style.display = "none"; // Nascondi modale
}

// Funzione per annullare la registrazione
function cancelRegistration() {
    document.getElementById("registration-section").style.display = "none"; // Nascondi sezione di registrazione
    clearInputs(); // Pulisci i campi
}

// Funzione per modificare un membro
function editMember(index) {
    const member = members[index]; // Ottieni il membro da modificare
    editIndex = index; // Memorizza l'indice del membro da modificare

    // Imposta i campi del modulo di modifica
    document.getElementById("edit-name").value = member.nome;
    document.getElementById("edit-intolerances").value = member.intolleranze;
    document.getElementById("edit-phone").value = member.telefono;

    // Mostra la sezione di modifica
    document.getElementById("edit-section").style.display = "block";
}

// Funzione per salvare le modifiche
function saveEdit() {
    const updatedName = document.getElementById("edit-name").value; // Ottieni il nuovo nome
    const updatedIntolerances = document.getElementById("edit-intolerances").value; // Ottieni le nuove intolleranze
    const updatedPhone = document.getElementById("edit-phone").value; // Ottieni il nuovo telefono

    // Aggiorna il membro
    members[editIndex] = {
        ...members[editIndex],
        nome: updatedName,
        intolleranze: updatedIntolerances,
        telefono: updatedPhone
    };

    saveMembers(); // Salva i membri aggiornati
    displayMembers(); // Aggiorna la visualizzazione dei membri
    cancelEdit(); // Nascondi sezione di modifica
}

// Funzione per annullare la modifica
function cancelEdit() {
    document.getElementById("edit-section").style.display = "none"; // Nascondi sezione di modifica
    document.getElementById("edit-name").value = ""; // Pulisci i campi
    document.getElementById("edit-intolerances").value = "";
    document.getElementById("edit-phone").value = "";
}

// Event listener per gestire l'input da tastiera per il modulo di iscrizione
document.getElementById("name").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("intolerances").focus(); // Focalizza il campo intolleranze
        event.preventDefault(); // Previene l'invio del modulo
    }
});

document.getElementById("intolerances").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("phone").focus(); // Focalizza il campo telefono
        event.preventDefault(); // Previene l'invio del modulo
    }
});

document.getElementById("phone").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        registerMember(); // Registra il membro quando si preme Invio
        event.preventDefault(); // Previene l'invio del modulo
    }
});
