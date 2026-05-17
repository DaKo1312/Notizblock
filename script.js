let notesTitles = JSON.parse(localStorage.getItem("notesTitles")) || []; // || ist ein ODER-Operator - wenn dort nichts exestiert dann wird ein leerer Array genutzt
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let trashNotesTitles = JSON.parse(localStorage.getItem("trashNotesTitles")) || [];
let trashNotes = JSON.parse(localStorage.getItem("trashNotes")) || [];
let archivNotesTitles = JSON.parse(localStorage.getItem("archivNotesTitles")) || [];
let archivNotes = JSON.parse(localStorage.getItem("archivNotes")) || [];

function saveToLocalStorage() {
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("archivNotesTitles", JSON.stringify(archivNotesTitles),);
    localStorage.setItem("archivNotes", JSON.stringify(archivNotes));
}

function init() {
    renderNotes();
    renderTrashNotes();
    renderArchivNotes();
}

function renderNotes() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function renderArchivNotes() {
    let archivContentRef = document.getElementById("archiv_content");
    archivContentRef.innerHTML = "";

    for (
        let indexArchivNote = 0;
        indexArchivNote < archivNotes.length;
        indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById("trash_content");
    trashContentRef.innerHTML = "";

    for (
        let indexTrashNote = 0;
        indexTrashNote < trashNotes.length;
        indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}


function getNoteTemplate(indexNote) {
    return `<p> - Aufgabe: ${notesTitles[indexNote]}  <b> | </b>  ${notes[indexNote]} <button class="archiv_button" onclick="noteToArchiv(${indexNote})">🗃️</button><button onclick="noteToTrash(${indexNote})">🗑️</button></p>`;
}

function getArchivNoteTemplate(indexArchivNote) {
    return `<p> - Aufgabe: ${archivNotesTitles[indexArchivNote]}  <b> | </b>  ${archivNotes[indexArchivNote]} <button onclick="archivToNotes(${indexArchivNote})">🗒️</button><button onclick="archivToTrash(${indexArchivNote})">🗑️</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `<p> - Aufgabe: ${trashNotesTitles[indexTrashNote]}  <b> | </b>  ${trashNotes[indexTrashNote]} <button onclick="trashToNotes(${indexTrashNote})">🗒️</button><button onclick="deleteTrashNote(${indexTrashNote})">🗑️</button></p>`;
}

function addNote() {
    let titleRef = document.getElementById("note_title_input");
    let textRef = document.getElementById("note_text_input");
    let title = titleRef.value;
    let text = textRef.value;
        if (title === "" || text === "") {
        alert("( ˘︹˘ ) Versuch es nochmal ( ˘︹˘ )");
        return;
    }

    notesTitles.push(title);
    notes.push(text);

    saveToLocalStorage();
    renderNotes();

    titleRef.value = "";
    textRef.value = "";
}

function noteToTrash(indexNote) {
    trashNotesTitles.push(notesTitles[indexNote]);
    trashNotes.push(notes[indexNote]);
    notesTitles.splice(indexNote, 1);
    notes.splice(indexNote, 1);

    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function noteToArchiv(indexNote) {
    let archivTitle = notesTitles[indexNote];
    let archivText = notes[indexNote];
    archivNotesTitles.push(archivTitle);
    archivNotes.push(archivText);
    notesTitles.splice(indexNote, 1);
    notes.splice(indexNote, 1);

    saveToLocalStorage();
    renderNotes();
    renderArchivNotes();
}

function archivToTrash(indexArchiveNote) {
    trashNotesTitles.push(archivNotesTitles[indexArchiveNote]);
    trashNotes.push(archivNotes[indexArchiveNote]);
    archivNotesTitles.splice(indexArchiveNote, 1);
    archivNotes.splice(indexArchiveNote, 1);

    saveToLocalStorage();
    renderArchivNotes();
    renderTrashNotes();
}

function archivToNotes(indexArchivNote) {
    notesTitles.push(archivNotesTitles[indexArchivNote]);
    notes.push(archivNotes[indexArchivNote]);
    archivNotesTitles.splice(indexArchivNote, 1);
    archivNotes.splice(indexArchivNote, 1);

    saveToLocalStorage();
    renderNotes();
    renderArchivNotes();
}

function deleteTrashNote(indexTrashNote) {
    trashNotesTitles.splice(indexTrashNote, 1);
    trashNotes.splice(indexTrashNote, 1);

    saveToLocalStorage();
    renderTrashNotes();
}

function trashToNotes(indexTrashNote) {
    notesTitles.push(trashNotesTitles[indexTrashNote]);
    notes.push(trashNotes[indexTrashNote]);
    trashNotesTitles.splice(indexTrashNote, 1);
    trashNotes.splice(indexTrashNote, 1);

    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}
