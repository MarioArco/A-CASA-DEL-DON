let children = [];

document.getElementById("login-button").onclick = function() {
    const phoneInput = document.getElementById("phone").value;
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if ((phoneInput === "3292413810" && passwordInput === "1") || 
        (phoneInput === "3791905110" && passwordInput === "spettacoli")) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("content-section").style.display = "block";
        errorMessage.innerText = "";
    } else {
        errorMessage.innerText = "Numero di telefono o password errata.";
    }
};

function registerChild() {
    const name = document.getElementById("child-name").value;
    const surname = document.getElementById("child-surname").value;
    const intolerances = document.getElementById("intolerances").value;
    const fatherName = document.getElementById("father-name").value;
    const fatherPhone = document.getElementById("father-phone").value;
    const motherName = document.getElementById("mother-name").value;
    const motherPhone = document.getElementById("mother-phone").value;
    const registrationDate = new Date().toLocaleString();

    const newChild = {
        name, surname, intolerances, fatherName, fatherPhone, motherName, motherPhone, registrationDate
    };

    children.push(newChild);
    displayChildren();
    document.getElementById("registration-form").reset();
}

function displayChildren() {
    const childrenTable = document.getElementById("children-table");
    childrenTable.innerHTML = "";
    children.forEach((child, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${child.name}</td>
            <td>${child.surname}</td>
            <td>${child.intolerances}</td>
            <td>${child.fatherName}</td>
            <td>${child.fatherPhone}</td>
            <td>${child.motherName}</td>
            <td>${child.motherPhone}</td>
            <td>${child.registrationDate}</td>
            <td>
                <button onclick="showInfo(${index})">ℹ️</button>
                <button onclick="confirmDelete(${index})">🗑️</button>
            </td>
        `;
        childrenTable.appendChild(row);
    });
}

function showInfo(index) {
    const child = children[index];
    const infoDetails = document.getElementById("info-details");
    infoDetails.innerHTML = `
        <strong>Nome:</strong> ${child.name} ${child.surname}<br>
        <strong>Intolleranze:</strong> ${child.intolerances}<br>
        <strong>Nome del Padre:</strong> ${child.fatherName} - Telefono: ${child.fatherPhone}<br>
        <strong>Nome della Madre:</strong> ${child.motherName} - Telefono: ${child.motherPhone}<br>
        <strong>Data di Iscrizione:</strong> ${child.registrationDate}
    `;
    document.getElementById("info-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

function confirmDelete(index) {
    if (confirm("Sei sicuro di voler eliminare questo bambino?")) {
        children.splice(index, 1);
        displayChildren();
    }
}
