// Handle form submission
function handleSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Prepare data to send
    const formData = { name, email, message };

    // Send data to the backend API
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Show success message
        document.getElementById('responseMessage').textContent = 'Your message has been sent successfully!';
        document.getElementById('contactForm').reset();  // Reset the form fields
    })
    .catch(error => {
        // Show error message
        document.getElementById('responseMessage').textContent = 'There was an error sending your message. Please try again.';
        console.error('Error:', error);
    });
}
