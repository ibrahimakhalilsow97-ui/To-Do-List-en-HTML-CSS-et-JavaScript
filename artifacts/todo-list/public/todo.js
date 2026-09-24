(function () {
  "use strict";

  const taskInput = document.getElementById("taskInput");
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const emptyState = document.getElementById("emptyState");
  const inputError = document.getElementById("inputError");
  const taskSummary = document.getElementById("taskSummary");
  const progressBar = document.getElementById("progressBar");
  const progressPercent = document.getElementById("progressPercent");
  const clearCompletedButton = document.getElementById("clearCompletedButton");
  const completedCount = document.getElementById("completedCount");

  const exampleTasks = [
    { text: "Préparer la liste de courses", completed: true },
    { text: "Ranger le bureau", completed: true },
    { text: "Répondre aux courriels", completed: false },
    { text: "Lire 10 pages", completed: false }
  ];

  let tasks = loadTasks();

  function loadTasks() {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks === null) {
        localStorage.setItem("tasks", JSON.stringify(exampleTasks));
        return exampleTasks.map((task) => ({ ...task }));
      }

      const savedTasks = JSON.parse(storedTasks);
      if (!Array.isArray(savedTasks)) {
        return [];
      }

      return savedTasks
        .filter((task) => task && typeof task.text === "string")
        .map((task) => ({
          text: task.text,
          completed: task.completed === true
        }));
    } catch (error) {
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    taskSummary.textContent = totalTasks + (totalTasks === 1 ? " tâche" : " tâches");
    progressBar.style.width = percentage + "%";
    progressPercent.textContent = percentage + "%";
    completedCount.textContent = String(completedTasks);
    clearCompletedButton.disabled = completedTasks === 0;
    clearCompletedButton.setAttribute(
      "aria-label",
      completedTasks === 1
        ? "Effacer la tâche terminée"
        : "Effacer les " + completedTasks + " tâches terminées"
    );
  }

  function createTaskElement(task, index) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskText = document.createElement("span");
    const deleteButton = document.createElement("button");

    listItem.className = "task" + (task.completed ? " completed" : "");

    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Marquer « " + task.text + " » comme terminée");
    checkbox.addEventListener("change", function () {
      toggleTask(index);
    });

    taskText.className = "task-text";
    taskText.textContent = task.text;

    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Supprimer";
    deleteButton.setAttribute("aria-label", "Supprimer « " + task.text + " »");
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);

    return listItem;
  }

  function displayTasks() {
    taskList.replaceChildren();

    tasks.forEach(function (task, index) {
      taskList.appendChild(createTaskElement(task, index));
    });

    emptyState.hidden = tasks.length > 0;
    updateProgress();
  }

  function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
      inputError.textContent = "Écrivez une tâche avant de l’ajouter.";
      taskInput.classList.add("input-invalid");
      taskInput.setAttribute("aria-invalid", "true");
      taskInput.focus();
      return;
    }

    tasks.push({
      text: text,
      completed: false
    });

    saveTasks();
    displayTasks();
    taskInput.value = "";
    inputError.textContent = "";
    taskInput.classList.remove("input-invalid");
    taskInput.removeAttribute("aria-invalid");
    taskInput.focus();
  }

  function toggleTask(index) {
    if (!tasks[index]) {
      return;
    }

    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
  }

  function deleteTask(index) {
    if (!tasks[index]) {
      return;
    }

    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
  }

  function clearCompletedTasks() {
    const remainingTasks = tasks.filter(function (task) {
      return !task.completed;
    });

    if (remainingTasks.length === tasks.length) {
      return;
    }

    tasks = remainingTasks;
    saveTasks();
    displayTasks();
  }

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
  });

  clearCompletedButton.addEventListener("click", clearCompletedTasks);

  taskInput.addEventListener("input", function () {
    if (taskInput.value.trim() !== "") {
      inputError.textContent = "";
      taskInput.classList.remove("input-invalid");
      taskInput.removeAttribute("aria-invalid");
    }
  });

  displayTasks();
})();