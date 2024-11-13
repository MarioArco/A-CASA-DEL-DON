// Inizializzazione delle credenziali
let currentUser = null;
const users = {
    "3292413810": { password: "1" },
    "3791905110": { password: "spettacoli" }
};

// Funzione di login
document.getElementById("login-button").onclick = function() {
    const phoneNumber = document.getElementById("phone-number").value;
    const passwordInput = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");

    // Verifica login
    if (users[phoneNumber] && users[phoneNumber].password === passwordInput) {
        currentUser = phoneNumber;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("main-section").style.display = "block";
        errorMessage.innerText = "";
    } else {
        errorMessage.innerText = "Numero di telefono o password errati.";
    }
};

// Funzione per mostrare il menu a tendina
document.getElementById("user-icon").onclick = function() {
    const dropdown = document.getElementById("user-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
};

// Funzione per uscire dall'account
document.getElementById("logout").onclick = function() {
    currentUser = null;
    document.getElementById("main-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
};

// Funzione per aprire il modale di cambio password
document.getElementById("change-password").onclick = function() {
    document.getElementById("password-modal").style.display = "flex";
};

// Funzione per chiudere il modale
document.getElementById("close-password-modal").onclick = function() {
    document.getElementById("password-modal").style.display = "none";
};

// Funzione per salvare la nuova password
document.getElementById("save-new-password").onclick = function() {
    const newPassword = document.getElementById("new-password").value;
    if (newPassword) {
        users[currentUser].password = newPassword;
        alert("Password cambiata con successo!");
        document.getElementById("password-modal").style.display = "none";
    }
};
