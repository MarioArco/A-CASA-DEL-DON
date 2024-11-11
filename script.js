let members = [];  // Array per i membri
const correctCredentials = {
  "3292413810": "1",  // Numero e password
  "3791905110": "spettacoli"
};

// Funzione per gestire il login
document.getElementById("login-button").onclick = function() {
  const phoneInput = document.getElementById("phone").value;
  const passwordInput = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (correctCredentials[phoneInput] === passwordInput) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("content-section").style.display = "block";
    errorMessage.innerText = "";
    loadMembers();  // Carica i membri
  } else {
    errorMessage.innerText = "Credenziali errate. Riprova.";
  }
};

// Funzione per caricare i membri
function loadMembers() {
  const storedMembers = localStorage.getItem("members");
  if (storedMembers) {
    members = JSON.parse(storedMembers);
  }
  displayMembers();  // Visualizza i membri
}

// Funzione per mostrare i membri nella tabella
function displayMembers() {
  const membersBody = document.getElementById("members-body");
  membersBody.innerHTML = "";

  members.forEach((member, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.name}</td>
      <td>${member.surname}</td>
      <td>${member.intolerances}</td>
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

// Funzione per salvare i membri nel localStorage
function saveMembers() {
  localStorage.setItem("members", JSON.stringify(members));
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

// Funzione per mostrare le informazioni del bambino
function showInfo(index) {
  const member = members[index];
  const infoDetails = document.getElementById("info-details");
  infoDetails.innerHTML = `
    <strong>Nome:</strong> ${member.name}<br>
    <strong>Cognome:</strong> ${member.surname}<br>
    <strong>Intolleranze:</strong> ${member.intolerances}<br>
    <strong>Telefono Padre:</strong> ${member.phoneFather}<br>
    <strong>Telefono Madre:</strong> ${member.phoneMother}<br>
    <strong>Data di Iscrizione:</strong> ${member.registrationDate}
  `;
  document.getElementById("info-modal").style.display = "block";
}

// Funzione per chiudere i modali
function closeModal() {
  document.getElementById("info-modal").style.display = "none";
}

// Funzione per aprire il modale di modifica
function openEditModal(index) {
  const member = members[index];
  document.getElementById("edit-name").value = member.name;
  document.getElementById("edit-surname").value = member.surname;
  document.getElementById("edit-intolerances").value = member.intolerances;
  document.getElementById("edit-phone-father").value = member.phoneFather;
  document.getElementById("edit-phone-mother").value = member.phoneMother;
  document.getElementById("edit-modal").style.display = "block";

  // Salva l'indice del membro da modificare
  window.currentEditingIndex = index;
}

// Funzione per salvare le modifiche
function saveChanges() {
  const name = document.getElementById("edit-name").value;
  const surname = document.getElementById("edit-surname").value;
  const intolerances = document.getElementById("edit-intolerances").value;
  const phoneFather = document.getElementById("edit-phone-father").value;
  const phoneMother = document.getElementById("edit-phone-mother").value;

  // Aggiorna il membro
  members[window.currentEditingIndex] = {
    name,
    surname,
    intolerances,
    phoneFather,
    phoneMother,
    registrationDate: new Date().toLocaleString()
  };
  
  saveMembers();
  displayMembers();
  closeEditModal();
}

// Funzione per chiudere il modale di modifica
function closeEditModal() {
  document.getElementById("edit-modal").style.display = "none";
}

// Funzione per aggiungere un nuovo bambino
function openRegistration() {
  const name = prompt("Nome del bambino:");
  const surname = prompt("Cognome del bambino:");
  const intolerances = prompt("Intolleranze (se presenti):");
  const phoneFather = prompt("Telefono del padre:");
  const phoneMother = prompt("Telefono della madre:");

  const newMember = {
    name,
    surname,
    intolerances,
    phoneFather,
    phoneMother,
    registrationDate: new Date().toLocaleString()
  };

  members.push(newMember);
  saveMembers();
  displayMembers();
}
