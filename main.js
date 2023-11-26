function handleLogin() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    if (!username || !password) {
        displayInfoMessage("Please enter both username and password", 'error');
        return;
    }

    let apiUrl = 'https://webapi-b17z.onrender.com/api/login';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Login failed with status: ${response.status}`);
        }
    })
    .then(data => {
        if (data && data.success) {
            displayInfoMessage('Login successful, Logging in!', 'success');
            setTimeout(() => {
                window.location.href = "main.html";
            }, 1000);
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
    let infoMessageDiv = document.getElementById("info-message");
    infoMessageDiv.textContent = message;

    if (type === 'error') {
        infoMessageDiv.style.backgroundColor = '#f44336';
    } else if (type === 'success') {
        infoMessageDiv.style.backgroundColor = '#4CAF50';
    }

    infoMessageDiv.style.display = 'block';
}

function goToProfile() {
    window.location.href = "secondary/index.html";
}