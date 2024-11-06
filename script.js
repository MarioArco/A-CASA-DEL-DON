// Importa le funzioni di Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "tuo_api_key",
  authDomain: "tuo_auth_domain",
  databaseURL: "tuo_database_url",
  projectId: "tuo_project_id",
  storageBucket: "tuo_storage_bucket",
  messagingSenderId: "tuo_messaging_sender_id",
  appId: "tuo_app_id"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let members = [];

// Gestione accesso
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
      members.push(childData);
    });
    displayMembers();
  });
}

// Avvia la registrazione continua
function startRegistration() {
  registerNextMember();
}

// Registra il prossimo membro
function registerNextMember() {
  const name = prompt("Nome:");
  if (!name) return;
  const intolerances = prompt("Intolleranze:");
  const phone = prompt("Telefono:");

  const newMember = { nome: name, intolleranze: intolerances, telefono: phone, dataIscrizione: new Date().toLocaleString() };
  const membersRef = ref(database, 'members/');
  push(membersRef, newMember);
  loadMembers();
  registerNextMember();
}

// Visualizza i membri in tabella
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
        <button onclick="deleteMember(${index})">Elimina</button>
      </td>`;
    membersBody.appendChild(row);
  });
}

// Elimina un membro
function deleteMember(index) {
  members.splice(index, 1);
  displayMembers();
}

// Mostra le informazioni del membro
function showInfo(index) {
  const member = members[index];
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
