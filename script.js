// script.js

// Importa le funzioni necessarie da Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Configurazione di Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdasW04yrccN5oERBloKm56SiP6jI_I60",
  authDomain: "a-casa-del-don.firebaseapp.com",
  projectId: "a-casa-del-don",
  storageBucket: "a-casa-del-don.appspot.com",
  messagingSenderId: "96724970919",
  appId: "1:96724970919:web:4ae17950c8904793a35a82",
  measurementId: "G-QTBGDHV4FX"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Variabili globali
let correctPassword = "tua_password"; // Cambia "tua_password" con la password desiderata
let editKey = null; // Chiave del membro in fase di modifica

// Funzione per caricare i membri dal database
function loadMembers() {
  const membersRef = ref(database, 'members/');
  onValue(membersRef, (snapshot) => {
    const data = snapshot.val();
    const members = data ? Object.entries(data) : [];
    displayMembers(members);
  });
}

// Funzione per gestire l'accesso
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

// Funzione per iniziare la registrazione batch
function startBatchRegistration() {
  document.getElementById("registration-section").style.display = "block";
  document.getElementById("name").focus();
  clearRegistrationForm();
}

// Funzione per registrare un nuovo membro
function registerMember() {
  const name = document.getElementById("name").value.trim();
  const intolerances = document.getElementById("intolerances").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    alert("Per favore, inserisci il nome e il numero di telefono.");
    return;
  }

  const newMember = {
    nome: name,
    intolleranze: intolerances,
    telefono: phone,
    dataIscrizione: new Date().toLocaleString()
  };

  // Aggiungi il nuovo membro al database
  const membersRef = ref(database, 'members/');
  push(membersRef, newMember);

  // Pulisci i campi e focalizza di nuovo sul campo nome
  clearRegistrationForm();
  document.getElementById("name").focus();
}

// Funzione per visualizzare i membri nella tabella
function displayMembers(members) {
  const membersBody = document.getElementById("members-body");
  membersBody.innerHTML = "";

  members.forEach(([key, member], index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.nome}</td>
      <td>${member.intolleranze}</td>
      <td>${member.telefono}</td>
      <td>
        <button onclick="showInfo('${key}')">Info</button>
        <button onclick="editMember('${key}', '${member.nome}', '${member.intolleranze}', '${member.telefono}')">Modifica</button>
        <button onclick="confirmDelete('${key}')">Elimina</button>
      </td>
    `;
    membersBody.appendChild(row);
  });
}

// Funzione per mostrare le informazioni di un membro
window.showInfo = function(key) {
  const membersRef = ref(database, `members/${key}`);
  onValue(membersRef, (snapshot) => {
    const member = snapshot.val();
    if (member) {
      document.getElementById("info-details").innerHTML = `
        <p><strong>Nome:</strong> ${member.nome}</p>
        <p><strong>Intolleranze:</strong> ${member.intolleranze}</p>
        <p><strong>Telefono:</strong> ${member.telefono}</p>
        <p><strong>Data di Iscrizione:</strong> ${member.dataIscrizione}</p>
      `;
      document.getElementById("info-modal").style.display = "block";
    }
  }, {
    onlyOnce: true
  });
};

// Funzione per chiudere il modale delle informazioni
window.closeModal = function() {
  document.getElementById("info-modal").style.display = "none";
};

// Funzione per modificare un membro
window.editMember = function(key, nome, intolleranze, telefono) {
  editKey = key;
  document.getElementById("edit-name").value = nome;
  document.getElementById("edit-intolerances").value = intolleranze;
  document.getElementById("edit-phone").value = telefono;
  document.getElementById("edit-section").style.display = "block";
};

// Funzione per salvare le modifiche di un membro
window.saveEdit = function() {
  const updatedName = document.getElementById("edit-name").value.trim();
  const updatedIntolerances = document.getElementById("edit-intolerances").value.trim();
  const updatedPhone = document.getElementById("edit-phone").value.trim();

  if (!updatedName || !updatedPhone) {
    alert("Per favore, inserisci il nome e il numero di telefono.");
    return;
  }

  const memberRef = ref(database, `members/${editKey}`);
  update(memberRef, {
    nome: updatedName,
    intolleranze: updatedIntolerances,
    telefono: updatedPhone
  });

  cancelEdit();
};

// Funzione per annullare la modifica
function cancelEdit() {
  editKey = null;
  document.getElementById("edit-section").style.display = "none";
  document.getElementById("edit-name").value = "";
  document.getElementById("edit-intolerances").value = "";
  document.getElementById("edit-phone").value = "";
}

// Funzione per confermare l'eliminazione di un membro
window.confirmDelete = function(key) {
  if (confirm("Sei sicuro di voler eliminare questo bambino?")) {
    const memberRef = ref(database, `members/${key}`);
    remove(memberRef);
  }
};

// Funzione per annullare la registrazione
function cancelRegistration() {
  document.getElementById("registration-section").style.display = "none";
  clearRegistrationForm();
}

// Funzione per pulire il modulo di registrazione
function clearRegistrationForm() {
  document.getElementById("name").value = "";
  document.getElementById("intolerances").value = "";
  document.getElementById("phone").value = "";
}

// Aggiungi listener per invio sequenziale dei campi
document.getElementById("name").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("intolerances").focus();
    event.preventDefault();
  }
});

document.getElementById("intolerances").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("phone").focus();
    event.preventDefault();
  }
});

document.getElementById("phone").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    registerMember();
    event.preventDefault();
  }
});

// Carica i membri quando la pagina viene caricata
window.onload = loadMembers;
