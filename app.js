// Configurazione Firebase (inserisci i tuoi dati di Firebase)
const firebaseConfig = {
    apiKey: "TUA_API_KEY",
    authDomain: "TUO_DOMINIO.firebaseapp.com",
    projectId: "IL_TUO_ID",
    storageBucket: "IL_TUO_BUCKET",
    messagingSenderId: "IL_TUO_MESSAGING_SENDER_ID",
    appId: "IL_TUO_APP_ID",
    databaseURL: "URL_TUO_DATABASE"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

let members = []; // Array per memorizzare i membri
const correctPassword = "tua_password"; // Sostituisci con la password

// Funzione per caricare i membri da Firebase
function loadMembers() {
    firebase.database().ref('members').on('value', (snapshot) => {
        const data = snapshot.val();
        members = data ? Object.values(data) : [];
        displayMembers();
    });
}

// Funzione per il login
document.getElementById("login-button").onclick = function() {
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (passwordInput === correctPassword) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("content-section").style.display = "block";
        errorMessage.innerText = "";
        loadMembers();
    } else {
        errorMessage.innerText = "Password errata. Riprova.";
    }
};

// Funzione per registrare un nuovo membro
function registerMember() {
    const name = document.getElementById("name").value;
    const intolerances = document.getElementById("intolerances").value;
    const phone = document.getElementById("phone").value;

    const newMember = {
        nome: name,
        intolleranze: intolerances,
        telefono: phone,
        dataIscrizione: new Date().toLocaleString()
    };

    const newMemberRef = firebase.database().ref('members').push();
    newMemberRef.set(newMember)
        .then(() => {
            cancelRegistration();
        })
        .catch((error) => {
            console.error("Errore nell'aggiunta del membro:", error);
        });
}

// Funzione per visualizzare i membri nella tabella
function displayMembers() {
    const membersBody = document.getElementById("members-body");
    membersBody.innerHTML = "";

    members.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.nome}</td>
            <td>${member.intolleranze}</td>
            <td>${member.telefono}</td>
            <td>
                <button onclick="showInfo(${index})">Info</button>
                <button onclick="confirmDelete(${index})">Elimina</button>
            </td>
        `;
        membersBody.appendChild(row);
    });
}

// Funzione per confermare ed eliminare un membro
function confirmDelete(index) {
    const confirmDelete = confirm("Sei sicuro di voler eliminare questo bambino?");
    if (confirmDelete) {
        const memberId = Object.keys(members)[index];
        firebase.database().ref(`members/${memberId}`).remove()
            .then(() => {
                console.log("Membro eliminato con successo.");
            })
            .catch((error) => {
                console.error("Errore durante l'eliminazione:", error);
            });
    }
}

// Funzione per mostrare le informazioni del membro
function showInfo(index) {
    const member = members[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <strong>Nome:</strong> ${member.nome}<br>
        <strong>Intolleranze:</strong> ${member.intolleranze}<br>
        <strong>Telefono:</strong> ${member.telefono}<br>
        <strong>Data di Iscrizione:</strong> ${member.dataIscrizione}
    `;
    document.getElementById("info-modal").style.display = "block";
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
window.onload = loadMembers;
