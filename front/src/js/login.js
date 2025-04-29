// Add this to your login.js file

document.addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
        // Find the login button and click it
        const loginButton = document.querySelector('#login-btn2'); // Adjust the selector based on your button's class/id
        if (loginButton) {
            loginButton.click();
        }
    }
});