function handleLogin() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    if (!username || !password) {
        displayInfoMessage("Please enter both username and password", 'error');
        return;
    }

    const apiUrl = 'https://webapi-b17z.onrender.com/api/login';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayInfoMessage('Login successful, Logging in!', 'success');
            localStorage.setItem('token', data.token); // Store the token in local storage
            setTimeout(() => window.location.href = "handler/main.html", 1000);
        } else {
            displayInfoMessage(data.message ? data.message : 'Login failed', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        displayInfoMessage('Login failed. Please try again later.', 'error');
    });
}


function displayInfoMessage(message, type) {
    const infoMessageDiv = document.getElementById("info-message");
    infoMessageDiv.textContent = message;
    infoMessageDiv.style.backgroundColor = type === 'error' ? '#f44336' : (type === 'success' ? '#4CAF50' : '');

    infoMessageDiv.style.display = 'block';
}

function goToProfile() {
    window.location.href = "secondary/main.html";
}

function checkAndLoginWithToken() {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
        const apiUrl = 'https://webapi-b17z.onrender.com/api/verify';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: storedToken }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayInfoMessage(`Welcome back, ${data.username}!`, 'success');
                setTimeout(() => window.location.href = "handler/main.html", 1000);
            } else {
                // Token is invalid or expired, handle accordingly
                localStorage.removeItem('token'); // Remove invalid token from local storage
            }
        })
        .catch(error => {
            console.error('Token verification failed:', error.message);
            // Handle verification error
        });
    }
}

document.addEventListener('DOMContentLoaded', checkAndLoginWithToken);