function createAccount(event) {
    event.preventDefault();
    var fullName = document.getElementById('fullname').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    if (!fullName || !email || !password) {
        showAlert('All fields are required');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Invalid email address');
        return;
    }

    if (isEmailExists(email)) {
        showAlert('Email already exists. Please choose a different email.');
        return;
    }

    fetch('data/trainer.json')
        .then(response => response.json())
        .then(trainers => {
            trainers.push({ fullName, email, password });
            return fetch('data/trainer.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trainers)
            });
        })
        .then(() => {
            document.getElementById('fullname').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            displayStoredData();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Added successfully',
                confirmButtonText: 'OK'
            });
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred. Please try again later.');
        });
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isEmailExists(email) {
    return fetch('data/trainer.json')
        .then(response => response.json())
        .then(trainers => trainers.some(trainer => trainer.email === email));
}

function showAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'OK'
    });
}

function logout() {
    window.location.replace('loginPage.html');
}
