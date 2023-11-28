function passwordCheck(password) {
    if (password.length < 7 || password.length > 32) {
        return { valid: false, error: 'Password must be between 7 and 32 characters.' };
    }

    if (!/[A-Z]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one uppercase letter.' };
    }

    if (!/\d/.test(password)) {
        return { valid: false, error: 'Password must contain at least one number.' };
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one special character.' };
    }

    return { valid: true };
}

function handleRegister() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let email = document.getElementById("email").value;

    if (!username || !password || !email) {
        displayInfoMessage("Please enter all required fields", 'error');
        return;
    }

    const passwordValidation = passwordCheck(password);

    if (!passwordValidation.valid) {
        displayInfoMessage(passwordValidation.error, 'error');
        return;
    }

    // Display loading indicator
    displayInfoMessage("Registering... Please wait.", 'info');
    document.body.style.cursor = 'wait';

    let apiUrl = 'https://webapi-b17z.onrender.com/api/register';

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
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Registration failed with status: ${response.status}`);
        }
    })
    .then(data => {
        if (data && data.message) {
            // Registration successful
            displayInfoMessage(data.message, 'success');
            setTimeout(() => {
                window.location.href = "main.html";
            }, 1000);
        } else if (data && data.error) {
            // Registration failed
            displayInfoMessage(`Registration failed. ${data.error}`, 'error');
            document.body.style.cursor = 'pointer';
        } else {
            // Unexpected response
            displayInfoMessage('Registration failed. Please try again later.', 'error');
            document.body.style.cursor = 'pointer';
        }
    })
    .catch(error => {
        // Handle fetch errors
        console.error('Error:', error.message);
        displayInfoMessage(`Registration failed. ${error.message}`, 'error');
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
