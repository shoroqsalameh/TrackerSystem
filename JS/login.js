import { getEnv, sanitizeInput } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll(".input");

    // Add focus class on input focus
    function addFocus() {
        let parent = this.parentNode.parentNode;
        parent.classList.add("focus");
    }

    // Remove focus class on input blur if input is empty
    function removeFocus() {
        let parent = this.parentNode.parentNode;
        if (this.value == "") {
            parent.classList.remove("focus");
        }
    }

    // Add event listeners to inputs
    inputs.forEach(input => {
        input.addEventListener("focus", addFocus);
        input.addEventListener("blur", removeFocus);
    });

    // Function to handle login form submission
    function handleLogin(event) {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        let flag = false; // Flag to track form validity
        let message = ""; // Variable to store error/success message

        if (email === "" || password === "") {
            message = "Empty email or password";
            flag = true;
        } else {
            const adminEmail = getEnv('ADMIN_EMAIL');
            const adminPassword = getEnv('ADMIN_PASSWORD');

            if (email === adminEmail && password === adminPassword) {
                // Admin login
                window.location.href = 'Add-trineers.html';
                window.sessionStorage.setItem(adminEmail, adminPassword);
                return;
            }

            fetch('data/trainer.json')
                .then(response => response.json())
                .then(trainers => {
                    const foundTrainer = trainers.find(trainer => trainer.email === email && trainer.password === password);
                    if (foundTrainer) {
                        window.sessionStorage.setItem(email, password);
                        window.location.href = 'news.html';
                    } else {
                        flag = true;
                        message = "Invalid email or password";
                    }
                })
                .catch(error => {
                    console.error('Error fetching trainers data:', error);
                    flag = true;
                    message = "Error occurred. Please try again later.";
                });
        }

        // Display alert message if necessary
        if (flag) {
            document.getElementById('alert').textContent = message;
        }
    }

    // Add event listener to the login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});
