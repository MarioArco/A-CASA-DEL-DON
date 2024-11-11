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

// Funzione di login anonimo
signInAnonymously(auth)
    .then(() => console.log("Autenticato anonimamente"))
    .catch((error) => console.error("Errore di autenticazione:", error));

// Funzione per registrare un bambino
async function registerMember() {
    const name = document.getElementById("name").value;
    const intolerances = document.getElementById("intolerances").value;
    const phone = document.getElementById("phone").value;

    try {
        // Aggiunge un documento alla collezione "bambini"
        await addDoc(collection(db, "bambini"), {
            nome: name,
            intolleranze: intolerances,
            telefono: phone,
            dataIscrizione: new Date().toLocaleString()
        });
        alert("Bambino registrato con successo!");
        displayMembers(); // aggiorna l'elenco
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
    }
}

// Funzione per visualizzare tutti i bambini registrati
async function displayMembers() {
    const membersBody = document.getElementById("members-body");
    membersBody.innerHTML = ""; // Svuota la tabella prima di riempirla

    const querySnapshot = await getDocs(collection(db, "bambini"));
    querySnapshot.forEach((doc) => {
        const member = doc.data();
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.nome}</td>
            <td>${member.intolleranze}</td>
            <td>${member.telefono}</td>
            <td>${member.dataIscrizione}</td>
        `;
        membersBody.appendChild(row);
    });
}

// Chiama displayMembers all'avvio per caricare i bambini già registrati
window.onload = displayMembers;

signInAnonymously(auth)
    .then(() => console.log("Autenticato anonimamente"))
    .catch((error) => console.error("Errore di autenticazione:", error));

// Funzione per registrare un bambino
async function registerMember() {
    const name = document.getElementById("name").value;
    const intolerances = document.getElementById("intolerances").value;
    const phone = document.getElementById("phone").value;

    try {
        // Aggiunge un documento alla collezione "bambini"
        await addDoc(collection(db, "bambini"), {
            nome: name,
            intolleranze: intolerances,
            telefono: phone,
            dataIscrizione: new Date().toLocaleString()
        });
        alert("Bambino registrato con successo!");
        displayMembers(); // aggiorna l'elenco
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
    }
}

// Funzione per visualizzare tutti i bambini registrati
async function displayMembers() {
    const membersBody = document.getElementById("members-body");
    membersBody.innerHTML = ""; // Svuota la tabella prima di riempirla

    const querySnapshot = await getDocs(collection(db, "bambini"));
    querySnapshot.forEach((doc) => {
        const member = doc.data();
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.nome}</td>
            <td>${member.intolleranze}</td>
            <td>${member.telefono}</td>
            <td>${member.dataIscrizione}</td>
        `;
        membersBody.appendChild(row);
    });
}

// Chiama displayMembers all'avvio per caricare i bambini già registrati
window.onload = displayMembers;
