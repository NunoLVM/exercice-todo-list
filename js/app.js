// Liste pour stocker les tâches
let todos = [];

// Sélection du formulaire, du champ et de la liste
const form = document.querySelector("form");
const input = form.querySelector("input");
const list = document.querySelector(".list-group");

// Ajout d'une tâche
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement
  const taskTitle = input.value.trim(); // Récupère le texte
  if (taskTitle === "") return; // Ne fait rien si vide

  // Création d'une nouvelle tâche
  const newTask = { id: Date.now(), title: taskTitle, done: false };
  todos.push(newTask); // Ajoute la tâche
  input.value = "";     // Vide le champ
  updateDisplay();      // Mets à jour l'affichage
});

// Affichage des tâches
function updateDisplay() {
  list.innerHTML = ""; // Vide la liste

  todos.forEach(task => {
    // Création de l'élément de tâche
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");

    // Zone pour la case et le texte
    const div = document.createElement("div");
    div.classList.add("form-check");

    // Création de la case à cocher  
    const checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    // Création du label avec le titre
    const label = document.createElement("label");
    label.classList.add("form-check-label", "ms-2");
    label.textContent = task.title;

    // Style pour tâche terminée
    if (task.done) {
      label.classList.add("text-decoration-line-through");
      li.classList.add("opacity-50");
    }

    // Assemblage des éléments
    div.appendChild(checkbox);
    div.appendChild(label);
    li.appendChild(div);
    list.appendChild(li);
  });
}
