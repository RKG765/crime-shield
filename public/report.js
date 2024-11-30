// Handle form submission
document.getElementById('report-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const incident = document.getElementById('incident').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const contact = document.getElementById('contact').value;

    // Prepare data for the backend
    const reportData = { incident, location, date, contact };

    // Send data to the backend
    fetch('/api/reports/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
    })
    .then(response => response.json())
    .then(data => {
        const note = document.querySelector('.note');

        if (data.error) {
            // Display error message
            note.textContent = data.error;
            note.style.color = 'red';
        } else {
            // Display success message and reset the form
            note.textContent = 'Crime report submitted successfully!';
            note.style.color = 'green';
            document.getElementById('report-form').reset();
        }
    })
    .catch(error => {
        console.error('Error submitting report:', error);
        const note = document.querySelector('.note');
        note.textContent = 'An error occurred. Please try again.';
        note.style.color = 'red';
    });
});
