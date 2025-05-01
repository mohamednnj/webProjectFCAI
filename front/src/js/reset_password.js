document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Password requirement elements
    const lengthCheck = document.getElementById('length');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numberCheck = document.getElementById('number');
    const specialCheck = document.getElementById('special');

    // Toggle password visibility
    function togglePasswordVisibility(input, toggleButton) {
        if (input.type === 'password') {
            input.type = 'text';
            toggleButton.classList.remove('fa-eye');
            toggleButton.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            toggleButton.classList.remove('fa-eye-slash');
            toggleButton.classList.add('fa-eye');
        }
    }

    // Add click event listeners for password toggles
    toggleNewPassword.addEventListener('click', () => {
        togglePasswordVisibility(newPassword, toggleNewPassword);
    });

    toggleConfirmPassword.addEventListener('click', () => {
        togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
    });

    // Password validation patterns
    const patterns = {
        length: password => password.length >= 8,
        uppercase: password => /[A-Z]/.test(password),
        lowercase: password => /[a-z]/.test(password),
        number: password => /[0-9]/.test(password),
        special: password => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Function to validate password and update UI
    function validatePassword(password) {
        const checks = {
            length: patterns.length(password),
            uppercase: patterns.uppercase(password),
            lowercase: patterns.lowercase(password),
            number: patterns.number(password),
            special: patterns.special(password)
        };

        // Update UI for each requirement
        lengthCheck.classList.toggle('valid', checks.length);
        uppercaseCheck.classList.toggle('valid', checks.uppercase);
        lowercaseCheck.classList.toggle('valid', checks.lowercase);
        numberCheck.classList.toggle('valid', checks.number);
        specialCheck.classList.toggle('valid', checks.special);

        // Return true if all requirements are met
        return Object.values(checks).every(check => check);
    }

    // Real-time password validation
    newPassword.addEventListener('input', () => {
        validatePassword(newPassword.value);
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const password = newPassword.value;
        const confirm = confirmPassword.value;

        // Validate password requirements
        if (!validatePassword(password)) {
            alert('يرجى التأكد من أن كلمة المرور تستوفي جميع المتطلبات');
            return;
        }

        // Check if passwords match
        if (password !== confirm) {
            alert('كلمات المرور غير متطابقة!');
            return;
        }

        // Here you would typically make an API call to update the password
        // For demonstration, we'll just show a success message
        alert('تم إعادة تعيين كلمة المرور بنجاح!');
        
        // Redirect to login page after successful reset
        setTimeout(() => {
            window.location.href = 'loginPage_ar.html';
        }, 1500);
    });

    // Confirm password validation
    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== newPassword.value) {
            confirmPassword.setCustomValidity('كلمات المرور غير متطابقة');
        } else {
            confirmPassword.setCustomValidity('');
        }
    });
});
