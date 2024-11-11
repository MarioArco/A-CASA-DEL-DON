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
const correctPassword = "don123";

document.getElementById("login-button").onclick = async function () {
  const passwordInput = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (passwordInput === correctPassword) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("content-section").style.display = "block";
    errorMessage.innerText = "";
    await loadMembers();
  } else {
    errorMessage.innerText = "Password errata. Riprova.";
  }
};

async function loadMembers() {
  const querySnapshot = await getDocs(collection(db, "members"));
  members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  displayMembers();
}

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

async function deleteMember(id) {
  await deleteDoc(doc(db, "members", id));
  members = members.filter(member => member.id !== id);
  displayMembers();
}

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

function closeModal() {
  document.getElementById("info-modal").style.display = "none";
}

function openRegistration() {
  document.getElementById("registration-section").style.display = "block";
}

function cancelRegistration() {
  document.getElementById("registration-section").style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("intolerances").value = "";
  document.getElementById("phone").value = "";
}
