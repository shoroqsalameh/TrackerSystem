    function populateTable() {
        const tableBody = document.getElementById('tableBody');
    
        // Read data from local storage
        const feedbackData = localStorage.getItem('feedbackData');
    
        if (feedbackData) {
        // Split the data into individual feedback entries
        const feedbackEntries = feedbackData.split(';');
    
        // Loop through each entry and populate the table
        feedbackEntries.forEach(entry => {
            const [doctorName, studentName, feedback, date] = entry.split(',');
    
            const newRow = tableBody.insertRow();
    
            const cell1 = newRow.insertCell(0);
            cell1.textContent = studentName;
    
            const cell2 = newRow.insertCell(1);
            cell2.textContent = doctorName;
    
            const cell3 = newRow.insertCell(2);
            cell3.textContent = feedback;
    
            const cell4 = newRow.insertCell(3);
            cell4.textContent = date;
        });
        } else {
        }
    }
    
    window.onload = populateTable;
       function logout() {
        localStorage.clear();
        window.location.replace('loginPage.html');
    }
