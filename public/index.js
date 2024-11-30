// Function to dynamically populate the site using existing HTML content
function loadSiteData() {
    // Update document title and header
    const siteTitle = document.querySelector('header h1').textContent;
    document.title = siteTitle;

    // Navigation menu logic - ensure the links are correctly set
    const navMenu = document.querySelectorAll('nav ul li a');
    navMenu.forEach(link => {
        console.log(`Navigation Link: ${link.textContent}, URL: ${link.href}`);
    });

    // Process "How It Works" section
    const howItWorksItems = document.querySelectorAll('#how-it-works ul li');
    howItWorksItems.forEach(item => {
        const strong = item.querySelector('strong');
        const description = item.querySelector('p');
        console.log(`How It Works: ${strong.textContent} - ${description.textContent}`);
    });

    // Process "Our Specialties" section
    const specialtiesItems = document.querySelectorAll('#specialties ul li');
    specialtiesItems.forEach(item => {
        const strong = item.querySelector('strong');
        const description = item.querySelector('p');
        console.log(`Specialty: ${strong.textContent} - ${description.textContent}`);
    });

    // Process "Why Choose Us" section
    const whyChooseUsItems = document.querySelectorAll('#why-choose-us ul li');
    whyChooseUsItems.forEach(item => {
        const strong = item.querySelector('strong');
        const description = item.querySelector('p');
        console.log(`Why Choose Us: ${strong.textContent} - ${description.textContent}`);
    });

    // Process Call to Action section
    const ctaTitle = document.querySelector('#cta h2').textContent;
    const ctaDescription = document.querySelector('#cta p').textContent;
    const ctaButton = document.querySelector('.cta-button');
    console.log(`CTA: ${ctaTitle} - ${ctaDescription}, Button Label: ${ctaButton.textContent}, Link: ${ctaButton.href}`);

    // Footer
    const footerText = document.querySelector('footer p').innerHTML;
    console.log(`Footer: ${footerText}`);
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', loadSiteData);
