function handleRegister() {
    // Get the values from the input fields
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let email = document.getElementById("email").value;

    // Check if username, password, and email are not empty
    if (!username || !password || !email) {
        displayInfoMessage("Please enter all required fields", 'error');
        return;
    }

    // Construct the API URL
    let apiUrl = 'https://webapi-b17z.onrender.com/api/register';

    // Make a fetch request to the API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
    })
    .then(response => {
        // Check if the response status is OK (201)
        if (response.ok) {
            return response.json();
        } else {
            // Handle non-OK responses
            throw new Error(`Registration failed with status: ${response.status}`);
        }
    })
    .then(data => {
        // Check the response data for success or failure
        if (data && data.message) {
            displayInfoMessage(data.message, 'success');
            // Redirect to the login page after a short delay
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000); // 1000 milliseconds (1 second)
        } else {
            // Display a generic message for unexpected response
            displayInfoMessage('Registration failed. Please try again later.', 'error');
        }
    })
    .catch(error => {
        // Handle fetch errors
        console.error('Error:', error.message);
        displayInfoMessage('Registration failed. Please try again later.', 'error');
    });
}

function displayInfoMessage(message, type) {
    // Update the content and display the information div
    let infoMessageDiv = document.getElementById("info-message");
    infoMessageDiv.textContent = message;

    // Set the background color based on the type
    if (type === 'error') {
        infoMessageDiv.style.backgroundColor = '#f44336';  // Red for errors
    } else if (type === 'success') {
        infoMessageDiv.style.backgroundColor = '#4CAF50';  // Green for success
    }

    infoMessageDiv.style.display = 'block';
}
