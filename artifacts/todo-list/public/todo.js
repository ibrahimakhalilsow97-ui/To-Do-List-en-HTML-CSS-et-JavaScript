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
  const taskHeading = document.getElementById("taskHeading");
  const emptyTitle = document.getElementById("emptyTitle");
  const emptyMessage = document.getElementById("emptyMessage");
  const filterButtons = document.querySelectorAll(".filter-button");
  const allTaskCount = document.getElementById("allTaskCount");
  const activeTaskCount = document.getElementById("activeTaskCount");
  const completedTaskCount = document.getElementById("completedTaskCount");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeToggleText = document.getElementById("themeToggleText");

  const exampleTasks = [
    { text: "Préparer la liste de courses", completed: true },
    { text: "Ranger le bureau", completed: true },
    { text: "Répondre aux courriels", completed: false },
    { text: "Lire 10 pages", completed: false }
  ];

  let tasks = loadTasks();
  let activeFilter = "all";
  let currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";

  function applyTheme(theme, savePreference) {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;

    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Activer le thème clair" : "Activer le thème sombre"
    );
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggleText.textContent = isDark ? "Mode clair" : "Mode sombre";

    if (savePreference) {
      try {
        localStorage.setItem("todo-theme", theme);
      } catch (error) {
        // The theme still works for this session if storage is unavailable.
      }
    }
  }

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

    allTaskCount.textContent = String(totalTasks);
    activeTaskCount.textContent = String(totalTasks - completedTasks);
    completedTaskCount.textContent = String(completedTasks);
  }

  function createTaskElement(task, index) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskText = document.createElement("span");
    const deleteButton = document.createElement("button");

    listItem.className = "task" + (task.completed ? " completed" : "");
    listItem.tabIndex = 0;
    listItem.dataset.taskIndex = String(index);
    listItem.setAttribute("aria-keyshortcuts", "Delete");
    listItem.addEventListener("click", function (event) {
      if (event.target === listItem || event.target === taskText) {
        listItem.focus();
      }
    });

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
      deleteTask(index, listItem);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);

    return listItem;
  }

  function displayTasks() {
    taskList.replaceChildren();
    let visibleTasks = 0;

    tasks.forEach(function (task, index) {
      const isVisible =
        activeFilter === "all" ||
        (activeFilter === "active" && !task.completed) ||
        (activeFilter === "completed" && task.completed);

      if (isVisible) {
        taskList.appendChild(createTaskElement(task, index));
        visibleTasks += 1;
      }
    });

    const filterTitles = {
      all: "Toutes les tâches",
      active: "Tâches actives",
      completed: "Tâches terminées"
    };
    taskHeading.textContent = filterTitles[activeFilter];
    filterButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
    });

    emptyState.hidden = visibleTasks > 0;
    if (tasks.length === 0) {
      emptyTitle.textContent = "Votre liste est légère pour l’instant.";
      emptyMessage.textContent = "Ajoutez une première tâche ci-dessus.";
    } else if (activeFilter === "active") {
      emptyTitle.textContent = "Aucune tâche active.";
      emptyMessage.textContent = "Toutes vos tâches sont terminées.";
    } else if (activeFilter === "completed") {
      emptyTitle.textContent = "Aucune tâche terminée.";
      emptyMessage.textContent = "Les tâches terminées apparaîtront ici.";
    }

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

  function deleteTask(index, focusedTask) {
    if (!tasks[index]) {
      return;
    }

    const visibleIndex = focusedTask
      ? Array.prototype.indexOf.call(taskList.children, focusedTask)
      : -1;
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();

    if (visibleIndex >= 0) {
      const visibleRows = taskList.querySelectorAll(".task");
      const nextRow = visibleRows[Math.min(visibleIndex, visibleRows.length - 1)];
      if (nextRow) {
        nextRow.focus();
      } else {
        taskInput.focus();
      }
    }
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

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.dataset.filter;
      displayTasks();
    });
  });

  themeToggle.addEventListener("click", function () {
    applyTheme(currentTheme === "dark" ? "light" : "dark", true);
  });

  document.addEventListener("keydown", function (event) {
    if (
      (event.key !== "Delete" && event.key !== "Backspace") ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }

    const focusedTask = event.target.closest(".task");
    if (!focusedTask) {
      return;
    }

    const index = Number(focusedTask.dataset.taskIndex);
    if (!Number.isInteger(index)) {
      return;
    }

    event.preventDefault();
    deleteTask(index, focusedTask);
  });

  taskInput.addEventListener("input", function () {
    if (taskInput.value.trim() !== "") {
      inputError.textContent = "";
      taskInput.classList.remove("input-invalid");
      taskInput.removeAttribute("aria-invalid");
    }
  });

  applyTheme(currentTheme, false);
  displayTasks();
})();