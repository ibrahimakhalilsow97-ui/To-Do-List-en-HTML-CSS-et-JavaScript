
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Récupérer les tâches sauvegardées
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Afficher les tâches
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <label>
                <input 
                    type="checkbox" 
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >
                <span>${task.text}</span>
            </label>

            <button 
                class="delete-button" 
                onclick="deleteTask(${index})"
            >
                🗑️
            </button>
        `;

        taskList.appendChild(li);
    });
}

// Ajouter une tâche
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

// Marquer une tâche comme terminée
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

// Supprimer une tâche
function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

// Sauvegarder dans localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Événement du bouton Ajouter
addButton.addEventListener("click", addTask);

// Permettre d'ajouter avec la touche Entrée
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Afficher les tâches au démarrage
displayTasks();