function readTrainers() {
    fetch('data/trainers.json')
        .then(response => response.json())
        .then(trainers => {
            displayTrainersTable(trainers);
        })
        .catch(error => console.error('Error reading trainers:', error));
}

function createTrainer(trainerData) {
    fetch('data/trainers.json')
        .then(response => response.json())
        .then(trainers => {
            if (trainers.some(trainer => trainer.email === trainerData.email)) {
                console.log('Email already exists. Please choose a different email.');
                return;
            }
            trainers.push(trainerData);
            updateTrainersJSON(trainers);
        })
        .catch(error => console.error('Error creating trainer:', error));
}

function updateTrainer(email, updatedData) {
    fetch('data/trainers.json')
        .then(response => response.json())
        .then(trainers => {
            const trainerIndex = trainers.findIndex(trainer => trainer.email === email);
            if (trainerIndex === -1) {
                console.log('Trainer not found.');
                return;
            }
            trainers[trainerIndex] = { ...trainers[trainerIndex], ...updatedData };
            updateTrainersJSON(trainers);
        })
        .catch(error => console.error('Error updating trainer:', error));
}

function deleteTrainer(email) {
    fetch('data/trainers.json')
        .then(response => response.json())
        .then(trainers => {
            const filteredTrainers = trainers.filter(trainer => trainer.email !== email);
            updateTrainersJSON(filteredTrainers);
        })
        .catch(error => console.error('Error deleting trainer:', error));
}

function updateTrainersJSON(trainers) {
    fetch('data/trainers.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainers)
    })
    .then(() => {
        console.log('Trainers data updated successfully.');
        readTrainers();
    })
    .catch(error => console.error('Error updating trainers JSON:', error));
}

function displayTrainersTable(trainers) {
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    trainers.forEach(function (trainer) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${trainer.fullName}</td>
            <td>${trainer.email}</td>
            <td>${trainer.areaOfExpertise}</td>
            <td>${trainer.experience}</td>
            <td>
                <button onclick="updateTrainer('${trainer.email}', { fullName: 'New Name' })">Update</button>
                <button onclick="deleteTrainer('${trainer.email}')">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    readTrainers();
});
