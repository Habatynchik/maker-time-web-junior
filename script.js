let note = {
    id: '',
    createDate: "",
    description: "",
    isDone: false
}

let notes = localStorage.getItem("notes")
notes = notes == null ? new Array() : JSON.parse(notes)

$(document).ready(function () {
    drawToDO();

    $(".task-btn-submit").on("click", function () {
        let description = $(".task-input").val()

        if (description.length != 0) {
            notes.unshift({
                id: generateUUID(),
                createDate: new Date().toLocaleString(),
                description: description,
                isDone: false
            })
            saveNotes(notes)
        } else {
            alert("Cannot create empty task")
        }
    });

    $(".task-btn-delete").on("click", function () {
        let uuid = $(this).parent().attr("uuid");
        notes = notes.filter(e => e.id != uuid);
        saveNotes(notes);
        $(this).parent().html('')
    });

    $(".task-btn-clear").on("click", function () {
        notes = new Array();
        saveNotes(notes);
        $(".tasks-list").html('')
    });

    $(".task-btn-done").on("click", function () {
        let uuid = $(this).parent().attr("uuid");
        let index = notes.findIndex(e => e.id === uuid);
        notes[index].isDone = !notes[index].isDone;
        $(this).parent().children(".task").attr('isDone', notes[index].isDone);
        $(this).parent().children(".task-btn-done").html(notes[index].isDone ? 'Undone' : 'Done');
        saveNotes(notes);
    });

    $(".task-btn-edit").on("click", function () {
        let uuid = $(this).parent().attr("uuid");
        let index = notes.findIndex(e => e.id === uuid);
        let newDescription = prompt("Enter new note description")

        notes[index].description = newDescription.length != 0 ? newDescription : notes[index].description;

        $(this).parent()
            .children(".task")
            .children(".task-description")
            .html(`${notes[index].createDate}: ${notes[index].description}`)

        saveNotes(notes);
    });
});

function generateUUID() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function drawToDO() {
    notes.forEach(e => {
        $(".tasks-list").html($(".tasks-list").html().concat(`
        <li uuid = '${e.id}'>
            <div class="task" isDone = "${e.isDone}">
                <div class="task-description">  ${e.createDate}: ${e.description} </div>
            </div>
            <button class="task-btn task-btn-edit">Edit</button>
            <button button class="task-btn task-btn-delete">Delete</button>
            <button class="task-btn task-btn-done">${e.isDone ? 'Undone' : 'Done'}</button>
        </li>
        `));
    });
}