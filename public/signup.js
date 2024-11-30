// Function to validate and submit the signup form
function validateAndSubmitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error messages
    errorMessage.textContent = '';

    // Validate passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        return;
    }

    // Validate password length
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long!';
        return;
    }

    // Prepare data for the backend
    const formData = { name, email, password };

    // Send data to the backend
    fetch('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorMessage.textContent = data.error;
        } else {
            alert('Signup successful! You can now log in.');
            window.location.href = 'login.html'; // Redirect to login page
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    });
}
