// Function to fetch and display crime reports based on selected criteria
function fetchCrimeReports() {
    const caseType = document.getElementById('caseTypeBar').value;
    const location = document.getElementById('locationBar').value;

    // Build the URL with query parameters
    let url = '/api/reports?';  // Start the URL with a question mark for query parameters
    
    const params = [];
    if (caseType) params.push(`caseType=${encodeURIComponent(caseType)}`);
    if (location) params.push(`location=${encodeURIComponent(location)}`);
    
    // Add the query parameters to the URL
    if (params.length > 0) {
        url += params.join('&');  // Join the parameters with '&'
    } else {
        url = '/api/reports';  // No query parameters, reset to base URL
    }

    // Send GET request to fetch reports
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('crime-results');

            if (data.error) {
                resultsContainer.innerHTML = `<p style="color: red;">${data.error}</p>`;
            } else {
                // Clear previous results
                resultsContainer.innerHTML = '';

                // Create and display each report
                data.reports.forEach(report => {
                    const reportElement = document.createElement('div');
                    reportElement.classList.add('report-item');
                    reportElement.innerHTML = `
                        <h3>Incident: ${report.incident}</h3>
                        <p><strong>Location:</strong> ${report.location}</p>
                        <p><strong>Date:</strong> ${new Date(report.date).toLocaleDateString()}</p>
                        <p><strong>Contact Info:</strong> ${report.contact}</p>
                        <hr />
                    `;
                    resultsContainer.appendChild(reportElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching reports:', error);
            const resultsContainer = document.getElementById('crime-results');
            resultsContainer.innerHTML = `<p style="color: red;">An error occurred while fetching reports.</p>`;
        });
}

// Fetch reports when the page loads or when the user selects new criteria
document.addEventListener('DOMContentLoaded', fetchCrimeReports);
document.getElementById('caseTypeBar').addEventListener('change', fetchCrimeReports);
document.getElementById('locationBar').addEventListener('change', fetchCrimeReports);
