// Funzione per mostrare le informazioni del bambino nel modale
function showInfo(index) {
    const child = children[index];
    const infoDetails = document.getElementById("info-details");

    // Aggiorna il contenuto del modale con tutte le informazioni
    infoDetails.innerHTML = `
        <p><strong>Nome:</strong> ${child.name}</p>
        <p><strong>Cognome:</strong> ${child.surname}</p>
        <p><strong>Intolleranze:</strong> ${child.intolerances}</p>
        <p><strong>Telefono Padre:</strong> ${child.fatherPhone}</p>
        <p><strong>Telefono Madre:</strong> ${child.motherPhone}</p>
        <p><strong>Password Padre:</strong> ${child.fatherPassword}</p> <!-- Aggiungi la password del padre -->
        <p><strong>Password Madre:</strong> ${child.motherPassword}</p> <!-- Aggiungi la password della madre -->
        <p><strong>Data Iscrizione:</strong> ${child.registrationDate}</p>
    `;

    // Mostra il modale con le informazioni
    document.getElementById("info-modal").style.display = "block";
}
