// Liste des tâches
let todos = [];

// Sélection des éléments du formulaire
const form = document.querySelector("form"); // Le formulaire
const input = form.querySelector("input");   // Le champ de texte
const list = document.querySelector(".list-group"); // La liste des tâches

// Ajout d'une tâche
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche la page de se recharger
  const taskTitle = input.value.trim(); // Récupère le texte
  if (taskTitle === "") return; // Ne rien faire si vide

  // Création d'une nouvelle tâche
  const newTask = { id: Date.now(), title: taskTitle, done: false };
  todos.push(newTask); // Ajoute la tâche à la liste
  input.value = ""; // Vide le champ
  updateDisplay(); // Met à jour l'affichage
});

// Supprime une tâche
function deleteTask(taskId) {
  todos = todos.filter(task => task.id !== taskId); // Garde seulement les autres tâches
  updateDisplay(); // Rafraîchit l'affichage
}

// Change l'état d'une tâche (faite ou non)
function toggleTask(taskId) {
  const taskIndex = todos.findIndex(task => task.id === taskId); // Trouve la tâche
  if (taskIndex !== -1) {
    todos[taskIndex].done = !todos[taskIndex].done; // Change l'état
    updateDisplay(); // Met à jour l'affichage
  }
}

// Affiche toutes les tâches
function updateDisplay() {
  list.innerHTML = ""; // Vide la liste avant d'ajouter les nouvelles

  todos.forEach(task => {
    // Création d'un élément pour la tâche
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");
    
    // Zone contenant la checkbox et le texte
    const div = document.createElement("div");
    div.classList.add("form-check");
    
    // Case à cocher pour marquer la tâche
    const checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () {
      toggleTask(task.id); // Change l'état de la tâche
    });
    
    // Texte de la tâche
    const label = document.createElement("label");
    label.classList.add("form-check-label", "ms-2");
    label.textContent = task.title;
    
    // Style si la tâche est faite (barrée et opacité réduite)
    if (task.done) {
      label.classList.add("text-decoration-line-through");
      li.classList.add("opacity-50");
    }
    
    div.appendChild(checkbox);
    div.appendChild(label);
    li.appendChild(div);
    
    // Bouton de suppression
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.innerHTML = '<i class="bi-trash"></i>'; // Icône poubelle
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id); // Supprime la tâche
    });
    li.appendChild(deleteButton);
    
    list.appendChild(li); // Ajoute la tâche à la liste
  });
}