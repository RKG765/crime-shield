// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form's default submission behavior

    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');
    const submitButton = e.target.querySelector('button');

    // Clear previous error message
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    // Disable the submit button and show a loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Logging in...';

    // Prepare data for the backend
    const loginData = { email: username, password };

    // Send login request to the backend
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Show error message
            errorMessage.textContent = data.error;
            errorMessage.style.display = 'block';
        } else {
            // Login successful: Redirect to index.html
            alert('Login successful! Redirecting to the homepage...');
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.style.display = 'block';
    })
    .finally(() => {
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    });
});

// Optional: Clear error message when the user starts typing
document.getElementById('username').addEventListener('input', () => {
    const errorMessage = document.getElementById('login-error');
    errorMessage.style.display = 'none';
});

document.getElementById('password').addEventListener('input', () => {
    const errorMessage = document.getElementById('login-error');
    errorMessage.style.display = 'none';
});
