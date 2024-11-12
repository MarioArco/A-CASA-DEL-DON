let children = []; // Array per memorizzare i bambini

// Funzione di accesso
function checkAccess() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    if ((phone === "3292413810" && password === "1") || (phone === "3791905110" && password === "spettacoli")) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("center-section").style.display = "block";
    } else {
        document.getElementById("error-message").innerText = "Numero o password errati!";
    }
}

// Funzione per aprire il modulo di registrazione
function openRegistrationForm() {
    document.getElementById("registration-form").style.display = "block";
}

// Funzione per chiudere il modulo di registrazione
function closeRegistrationForm() {
    document.getElementById("registration-form").style.display = "none";
}

// Funzione per registrare un bambino
function registerChild() {
    const name = document.getElementById("child-name").value;
    const surname = document.getElementById("child-surname").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherPhone = document.getElementById("father-phone").value;
    const motherPhone = document.getElementById("mother-phone").value;

    const child = { name, surname, intolerances, fatherPhone, motherPhone, registrationDate: new Date().toLocaleString() };
    children.push(child);
    displayChildren();
    closeRegistrationForm();
}

// Funzione per visualizzare i bambini
function displayChildren() {
    const childrenBody = document.getElementById("children-body");
    childrenBody.innerHTML = "";
    children.forEach((child, index) => {
        const row = `<tr>
            <td>${child.name}</td>
            <td>${child.surname}</td>
            <td>${child.intolerances}</td>
            <td>${child.fatherPhone}</td>
            <td>${child.motherPhone}</td>
            <td>
                <button onclick="showInfo(${index})">ℹ️</button>
                <button onclick="confirmDelete(${index})">🗑️</button>
            </td>
        </tr>`;
        childrenBody.innerHTML += row;
    });
}

// Funzione per mostrare le informazioni del bambino nel modale
function showInfo(index) {
    const child = children[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <p><strong>Nome:</strong> ${child.name}</p>
        <p><strong>Cognome:</strong> ${child.surname}</p>
        <p><strong>Intolleranze:</strong> ${child.intolerances}</p>
        <p><strong>Telefono Padre:</strong> ${child.fatherPhone}</p>
        <p><strong>Telefono Madre:</strong> ${child.motherPhone}</p>
        <p><strong>Data Iscrizione:</strong> ${child.registrationDate}</p>
    `;
    document.getElementById("info-modal").style.display = "block";
}

// Funzione per chiudere il modale delle informazioni
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Funzione per confermare ed eliminare un bambino
function confirmDelete(index) {
    if (confirm("Confermi di voler eliminare questo bambino?")) {
        children.splice(index, 1);
        displayChildren();
    }
}
