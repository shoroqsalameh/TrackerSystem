// Function to handle popup display and close
function togglePopup(popupClass) {
  document.querySelector(`.${popupClass}`).classList.toggle("active");
}

// Function to handle increment and decrement of values
function handleCounter(operator) {
  let value = parseInt(localStorage.getItem("value")) || 0;

  if (operator === "increment") value++;
  else if (operator === "decrement") value = Math.max(0, value - 1);
  else if (operator === "reset") value = 0;

  localStorage.setItem("value", value);
  document.querySelector(".text-field").textContent = value;
  document.querySelector(".test").textContent = value;
}

// Function to handle adding solved tasks
function addSolvedTask(id) {
  let solvedTasks = parseInt(document.getElementById(`saif${id}`).textContent) || 0;
  solvedTasks++;
  document.getElementById(`saif${id}`).textContent = solvedTasks;

  let data = JSON.parse(localStorage.getItem("tableData")) || [];
  data[id].solvedTask = solvedTasks;
  localStorage.setItem("tableData", JSON.stringify(data));
}

// Function to handle adding absences
function addAbsences(id) {
  let absences = parseInt(document.getElementById(`hamza${id}`).textContent) || 0;
  absences++;
  document.getElementById(`hamza${id}`).textContent = absences;

  let data = JSON.parse(localStorage.getItem("tableData")) || [];
  data[id].absences = absences;
  localStorage.setItem("tableData", JSON.stringify(data));
}

// Function to add trainee
function addTrainee() {
  const firstName = document.getElementById("FirstName").value;
  const lastName = document.getElementById("LastName").value;
  const task = document.getElementById("task").value;
  const absence = document.getElementById("absence").value;

  if (!firstName || !lastName || !task || !absence) {
      alert("Please fill in all fields");
      return;
  }

  let nextId = localStorage.getItem("nextId") || 1;
  nextId = parseInt(nextId);

  const tbody = document.querySelector(".table__body tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${nextId}</td>
      <td>${firstName} ${lastName}</td>
      <td>${task}</td>
      <td class="test">${localStorage.getItem("value") || 0}</td>
      <td>${absence}</td>
      <td>
          <a class="link_table" href="#" onclick="editTrainee(this)">
              <i class="fa-solid fa-pen-to-square fas"></i>
          </a>
          <a class="link_table" href="#" onclick="deleteTrainee(this)">
              <i style="margin-right: 30px;" class="fa-solid fa-trash fas"></i>
          </a>
      </td>
  `;

  tbody.appendChild(newRow);
  localStorage.setItem("nextId", nextId + 1);
  saveDataToLocalStorage();

  document.getElementById("FirstName").value = "";
  document.getElementById("LastName").value = "";
  document.getElementById("task").value = "";
  document.getElementById("absence").value = "";

  togglePopup("popup");
}

// Function to delete trainee
function deleteTrainee(row) {
  if (confirm("Are you sure you want to delete this trainee?")) {
      row.parentElement.parentElement.remove();
      saveDataToLocalStorage();
  }
}

// Function to save data to local storage
function saveDataToLocalStorage() {
  const tableRows = document.querySelectorAll(".table__body tbody tr");
  const data = [];

  tableRows.forEach((row) => {
      const rowData = {
          id: row.cells[0].textContent,
          name: row.cells[1].textContent,
          solvedTask: row.cells[2].textContent,
          absences: row.cells[4].textContent,
      };

      data.push(rowData);
  });

  localStorage.setItem("tableData", JSON.stringify(data));
}

// Function to load data from local storage and display it
function loadDataFromLocalStorage() {
  const savedData = localStorage.getItem("tableData");

  if (savedData) {
      const parsedData = JSON.parse(savedData);
      const tbody = document.querySelector(".table__body tbody");
      tbody.innerHTML = "";

      let maxId = 0;
      parsedData.forEach((rowData) => {
          const id = parseInt(rowData.id);
          if (id > maxId) maxId = id;
      });

      localStorage.setItem("nextId", maxId + 1);

      parsedData.forEach((rowData) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
              <td>${rowData.id}</td>
              <td>${rowData.name}</td>
              <td id="saif${rowData.id}">${rowData.solvedTask} <i id='icon${rowData.id}' class="fa-solid fa-plus plus" onclick="addSolvedTask(${rowData.id})"></i></td>
              <td>${localStorage.getItem("value") || 0}</td>
              <td id="hamza${rowData.id}">${rowData.absences} <i id='icons${rowData.id}' class="fa-solid fa-plus plus" onclick="addAbsences(${rowData.id})"></i></td>
              <td>
                  <a class="link_table" href="#" onclick="editTrainee(this)">
                      <i class="fa-solid fa-pen-to-square fas"></i>
                  </a>
                  <a class="link_table" href="#" onclick="deleteTrainee(this)">
                      <i style="margin-right: 30px;" class="fa-solid fa-trash fas"></i>
                  </a>
              </td>
          `;

          tbody.appendChild(newRow);
      });
  }
}

// Add event listener to the "Add Trainees" button
document.querySelector(".form button").addEventListener("click", addTrainee);

// Load data from local storage and display on page load
window.addEventListener("load", loadDataFromLocalStorage);

// Function to handle feedback submission
function submitFeedback() {
  const drName = document.getElementById("doctorName").value;
  const stdName = document.getElementById("studentSelect").value;
  const feedbackText = document.getElementById("feedback").value;

  const dateAndTime = getCurrentDateTime();
  const newFeedback = `${drName},${stdName},${feedbackText},${dateAndTime}`;

  const existingData = localStorage.getItem("feedbackData") || "";
  const updatedData = existingData ? `${existingData};${newFeedback}` : newFeedback;

  localStorage.setItem("feedbackData", updatedData);
}

// Function to get current date and time
function getCurrentDateTime() {
  const currentDate = new Date();
  const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
  };

  return currentDate.toLocaleString("en-US", options);
}

// Function to handle logout
function logout() {
  localStorage.clear();
  window.location.replace("loginPage.html");
}
