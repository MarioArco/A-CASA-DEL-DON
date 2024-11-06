// Firebase import e configurazione
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdasW04yrccN5oERBloKm56SiP6jI_I60",
  authDomain: "a-casa-del-don.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/u/0/project/a-casa-del-don/database/a-casa-del-don-default-rtdb/data/~2F",
  projectId: "a-casa-del-don",
  storageBucket: "a-casa-del-don.firebasestorage.app",
  messagingSenderId: "96724970919",
  appId: "1:96724970919:web:4ae17950c8904793a35a82"
  measurementId: "G-QTBGDHV4FX"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let members = [];

// Accesso con password
document.getElementById("login-button").onclick = function() {
  const passwordInput = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (passwordInput === "tua_password") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("content-section").style.display = "block";
    loadMembers();
  } else {
    errorMessage.innerText = "Password errata. Riprova.";
  }
};

// Carica i membri dal database Firebase
function loadMembers() {
  const membersRef = ref(database, 'members/');
  onValue(membersRef, (snapshot) => {
    members = [];
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      members.push({ ...childData, key: childSnapshot.key });
    });
    displayMembers();
  });
}

// Funzione di registrazione in sequenza
function startRegistration() {
  registerNextMember();
}

// Funzione per registrare un nuovo membro
function registerNextMember() {
  const name = prompt("Nome:");
  if (!name) return;
  const intolerances = prompt("Intolleranze:");
  const phone = prompt("Telefono:");

  const newMember = {
    nome: name,
    intolleranze: intolerances,
    telefono: phone,
    dataIscrizione: new Date().toLocaleString()
  };

  const membersRef = ref(database, 'members/');
  push(membersRef, newMember);
}

// Visualizza i membri in tabella
function displayMembers() {
  const membersBody = document.getElementById("members-body");
  membersBody.innerHTML = "";

  members.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.nome}</td>
      <td>${member.intolleranze}</td>
      <td>${member.telefono}</td>
      <td>
        <button onclick="showInfo('${member.key}')">Info</button>
        <button onclick="deleteMember('${member.key}')">Elimina</button>
      </td>`;
    membersBody.appendChild(row);
  });
}

// Elimina un membro
function deleteMember(key) {
  const memberRef = ref(database, `members/${key}`);
  remove(memberRef).then(() => loadMembers());
}

// Mostra le informazioni del membro
function showInfo(key) {
  const member = members.find(m => m.key === key);
  const infoDetails = document.getElementById("info-details");
  infoDetails.innerHTML = `
    <strong>Nome:</strong> ${member.nome}<br>
    <strong>Intolleranze:</strong> ${member.intolleranze}<br>
    <strong>Telefono:</strong> ${member.telefono}<br>
    <strong>Data di Iscrizione:</strong> ${member.dataIscrizione}`;
  document.getElementById("info-modal").style.display = "block";
}

// Chiudi il modale
function closeModal() {
  document.getElementById("info-modal").style.display = "none";
}
