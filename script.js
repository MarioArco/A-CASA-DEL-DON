// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdasW04yrccN5oERBloKm56SiP6jI_I60",
  authDomain: "a-casa-del-don.firebaseapp.com",
  databaseURL: "https://a-casa-del-don-default-rtdb.firebaseio.com",
  projectId: "a-casa-del-don",
  storageBucket: "a-casa-del-don.firebasestorage.app",
  messagingSenderId: "96724970919",
  appId: "1:96724970919:web:4ae17950c8904793a35a82",
  measurementId: "G-QTBGDHV4FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let members = [];

// Carica i membri dal database
async function loadMembers() {
  const querySnapshot = await getDocs(collection(db, "members"));
  members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  displayMembers();
}

// Visualizza i membri sulla tabella
function displayMembers() {
  const membersBody = document.getElementById("members-body");
  membersBody.innerHTML = "";

  members.forEach((member, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.name}</td>
      <td>${member.intolerances}</td>
      <td>${member.phone}</td>
      <td>
        <button onclick="showInfo(${index})">Info</button>
        <button onclick="deleteMember('${member.id}')">Elimina</button>
      </td>
    `;
    membersBody.appendChild(row);
  });
}

// Funzione per registrare un nuovo membro
async function registerMember() {
  const name = document.getElementById("name").value;
  const intolerances = document.getElementById("intolerances").value;
  const phone = document.getElementById("phone").value;

  const docRef = await addDoc(collection(db, "members"), {
    name,
    intolerances,
    phone,
    date: new Date().toLocaleString()
  });

  members.push({ id: docRef.id, name, intolerances, phone });
  displayMembers();
  cancelRegistration();
}

// Funzione per eliminare un membro
async function deleteMember(id) {
  await deleteDoc(doc(db, "members", id));
  members = members.filter(member => member.id !== id);
  displayMembers();
}

// Funzione per mostrare le informazioni del membro in un modale
function showInfo(index) {
  const member = members[index];
  const infoDetails = document.getElementById("info-details");
  infoDetails.innerHTML = `
    <strong>Nome:</strong> ${member.name}<br>
    <strong>Intolleranze:</strong> ${member.intolerances}<br>
    <strong>Telefono:</strong> ${member.phone}<br>
    <strong>Data di Iscrizione:</strong> ${member.date}
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

// Carica i membri all'avvio
loadMembers();
