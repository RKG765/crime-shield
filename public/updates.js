// Function to fetch and display crime updates
function fetchCrimeUpdates() {
    const state = document.getElementById('stateFilter').value;

    // Build the URL with query parameters for filtering by state
    let url = '/api/update';
    if (state) {
        url += `?state=${encodeURIComponent(state)}`;
    }

    // Fetch reports from the backend
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const updatesContainer = document.getElementById('updates-container');
            updatesContainer.innerHTML = ''; // Clear any previous updates

            if (data.error) {
                updatesContainer.innerHTML = `<p style="color: red;">${data.error}</p>`;
            } else if (data.reports.length === 0) {
                updatesContainer.innerHTML = `<p>No reports found for the selected state.</p>`;
            } else {
                // Iterate over the reports and display them
                data.reports.forEach(report => {
                    const reportElement = document.createElement('div');
                    reportElement.classList.add('report-item');
                    reportElement.innerHTML = `
                        <h3>${report.incident}</h3>
                        <p><strong>Location:</strong> ${report.location}</p>
                        <p><strong>Date:</strong> ${new Date(report.date).toLocaleDateString()}</p>
                        <p><strong>Description:</strong> ${report.description}</p>
                        <hr />
                    `;
                    updatesContainer.appendChild(reportElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching updates:', error);
            const updatesContainer = document.getElementById('updates-container');
            updatesContainer.innerHTML = `<p style="color: red;">An error occurred while fetching updates.</p>`;
        });
}

// Add event listener for state filter changes
document.getElementById('stateFilter').addEventListener('change', fetchCrimeUpdates);

// Fetch updates on page load
document.addEventListener('DOMContentLoaded', fetchCrimeUpdates);
