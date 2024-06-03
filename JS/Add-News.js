document.addEventListener('DOMContentLoaded', function () {
    const newsForm = document.getElementById('newsForm');

    newsForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const imageUrl = document.getElementById('image').value.trim();
        const description = document.getElementById('description').value.trim();

        const newsData = {
            image: imageUrl,
            description: description
        };

        saveNewsData(newsData);
    });

    function saveNewsData(data) {
        fetch('data/news.json')
            .then(response => response.json())
            .then(news => {
                news.push(data);

                return fetch('data/news.json', {
                    method: 'PUT', 
                    body: JSON.stringify(news), 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'News added successfully',
                    confirmButtonText: 'OK'
                });
                
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred. Please try again later.',
                    confirmButtonText: 'OK'
                });
                console.error('Error adding news:', error);
            });
    }
});
