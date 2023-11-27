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
    .then(response => response.ok ? response.json() : Promise.reject(`Login failed with status: ${response.status}`))
    .then(data => {
        if (data && data.success) {
            displayInfoMessage('Login successful, Logging in!', 'success');
            setTimeout(() => window.location.href = "main.html", 1000);
        } else {
            displayInfoMessage(data && data.message ? data.message : 'Login failed', 'error');
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
    window.location.href = "secondary/index.html";
}

function checkAndLoginWithToken() {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
        // Call the server to verify the token
        const apiUrl = 'https://webapi-b17z.onrender.com/api/verify';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: storedToken }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Token verification failed with status: ${response.status}`);
            }
        })
        .then(data => {
            if (data && data.success) {
                // Token is valid, perform login or redirect to main page
                displayInfoMessage(`Welcome back, ${data.username}!`, 'success');
                setTimeout(() => window.location.href = "main.html", 1000);
            } else {
                // Token is invalid or expired, do nothing or handle accordingly
            }
        })
        .catch(error => {
            console.error('Token verification failed:', error.message);
            // Handle verification error
        });
    }
}
document.addEventListener('DOMContentLoaded', checkAndLoginWithToken);