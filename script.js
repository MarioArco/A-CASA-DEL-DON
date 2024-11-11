// Dati di accesso
const validCredentials = [
    { phone: "3292413810", password: "1", accessLevel: "welcome" },
    { phone: "3791905110", password: "spettacoli", accessLevel: "center" }
];

// Array per i bambini iscritti
let children = [];

// Funzione di login
function login() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const user = validCredentials.find(u => u.phone === phone && u.password === password);

    if (user) {
        // Nascondi la sezione di login
        document.getElementById("login-section").style.display = "none";

        // Mostra la sezione appropriata
        if (user.accessLevel === "welcome") {
            document.getElementById("welcome-section").style.display = "block";
        } else if (user.accessLevel === "center") {
            document.getElementById("center-section").style.display = "block";
        }
    } else {
        errorMessage.innerText = "Credenziali errate, riprova.";
    }
}

// Funzione per aggiungere un bambino
function addChild() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherPhone = document.getElementById("father-phone").value;
    const motherPhone = document.getElementById("mother-phone").value;

    const newChild = {
        firstName,
        lastName,
        intolerances,
        fatherPhone,
        motherPhone
    };

    // Aggiungi il bambino all'array
    children.push(newChild);
    displayChildren();
}

// Funzione per visualizzare i bambini iscritti
function displayChildren() {
    const childrenBody = document.getElementById("registration-body");
    childrenBody.innerHTML = "";

    children.forEach(child => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${child.firstName}</td>
            <td>${child.lastName}</td>
            <td>${child.intolerances}</td>
            <td>${child.fatherPhone}</td>
            <td>${child.motherPhone}</td>
        `;
        childrenBody.appendChild(row);
    });
}
