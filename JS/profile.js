function populateFieldsFromJSON() {
    fetch('trainer.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('name').value = data.name || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('password').value = data.password || '';
        })
        .catch(error => console.error('Error fetching trainer data:', error));
}

function saveChanges() {
    const newName = document.getElementById('name').value;
    const newEmail = document.getElementById('email').value;
    const newPassword = document.getElementById('password').value;

    fetch('data/trainer.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            email: newEmail,
            password: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Changes saved successfully:', data);
        document.getElementById('saveBtn').style.display = 'none';
    })
    .catch(error => console.error('Error saving changes:', error));
}

function editProfile() {
    document.getElementById('saveBtn').style.display = 'block';
    document.getElementById('edit').style.display = 'none';

    document.getElementById('name').removeAttribute('readonly');
    document.getElementById('password').removeAttribute('readonly');
}

populateFieldsFromJSON();