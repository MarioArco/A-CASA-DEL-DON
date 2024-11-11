let members = []; // Array per memorizzare i membri registrati

// Funzione per salvare i membri nel localStorage
function saveMembers() {
    localStorage.setItem("members", JSON.stringify(members));
}

// Funzione per mostrare le informazioni del membro in un modale
function showInfo(index) {
    const member = members[index];
    const infoDetails = document.getElementById("info-details");
    
    let modifications = "";
    if (member.modifications.length > 0) {
        modifications = "<strong>Modifiche apportate:</strong><br>";
        member.modifications.forEach(mod => {
            modifications += `<strong>${mod.field}</strong>: ${mod.oldValue} → ${mod.newValue} (Modificato il: ${mod.date})<br>`;
        });
    }

    infoDetails.innerHTML = `
        <strong>Nome:</strong> ${member.nome}<br>
        <strong>Cognome:</strong> ${member.cognome}<br>
        <strong>Telefono Padre:</strong> ${member.telefonoPadre}<br>
        <strong>Telefono Madre:</strong> ${member.telefonoMadre}<br>
        <strong>Intolleranze:</strong> ${member.intolleranze}<br>
        <strong>Data di Iscrizione:</strong> ${member.dataIscrizione}<br>
        ${modifications}
    `;
    
    document.getElementById("info-modal").style.display = "block"; // Mostra il modale
}

// Funzione per modificare i dati del bambino
function editMember(index) {
    const member = members[index];

    // Pre-popola i campi con i dati correnti del bambino
    document.getElementById("edit-name").value = member.nome;
    document.getElementById("edit-cognome").value = member.cognome;
    document.getElementById("edit-intolleranze").value = member.intolleranze;
    document.getElementById("edit-telefono-padre").value = member.telefonoPadre;
    document.getElementById("edit-telefono-madre").value = member.telefonoMadre;

    // Memorizza l'indice del membro che stiamo modificando
    document.getElementById("edit-modal").setAttribute("data-index", index);
    document.getElementById("edit-modal").style.display = "block"; // Mostra il modale di modifica
}

// Funzione per salvare le modifiche
function saveChanges() {
    const index = document.getElementById("edit-modal").getAttribute("data-index");
    const member = members[index];

    // Ottieni i nuovi valori dai campi di input
    const newNome = document.getElementById("edit-name").value;
    const newCognome = document.getElementById("edit-cognome").value;
    const newIntolleranze = document.getElementById("edit-intolleranze").value;
    const newTelefonoPadre = document.getElementById("edit-telefono-padre").value;
    const newTelefonoMadre = document.getElementById("edit-telefono-madre").value;

    // Memorizza le modifiche con la data e l'ora
    if (member.nome !== newNome) {
        recordModification(index, "Nome", member.nome, newNome);
        member.nome = newNome;
    }
    if (member.cognome !== newCognome) {
        recordModification(index, "Cognome", member.cognome, newCognome);
        member.cognome = newCognome;
    }
    if (member.intolleranze !== newIntolleranze) {
        recordModification(index, "Intolleranze", member.intolleranze, newIntolleranze);
        member.intolleranze = newIntolleranze;
    }
    if (member.telefonoPadre !== newTelefonoPadre) {
        recordModification(index, "Telefono Padre", member.telefonoPadre, newTelefonoPadre);
        member.telefonoPadre = newTelefonoPadre;
    }
    if (member.telefonoMadre !== newTelefonoMadre) {
        recordModification(index, "Telefono Madre", member.telefonoMadre, newTelefonoMadre);
        member.telefonoMadre = newTelefonoMadre;
    }

    // Salva i membri aggiornati
    saveMembers();
    
    // Chiudi il modale e aggiorna la visualizzazione
    document.getElementById("edit-modal").style.display = "none";
    displayMembers();
}

// Funzione per registrare le modifiche
function recordModification(index, field, oldValue, newValue) {
    const member = members[index];
    const timestamp = new Date().toLocaleString();

    member.modifications = member.modifications || [];
    member.modifications.push({
        field: field,
        oldValue: oldValue,
        newValue: newValue,
        date: timestamp
    });
}

// Funzione per chiudere il modale di modifica
function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
}
