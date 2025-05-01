document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('verificationForm');
    const inputs = document.querySelectorAll('.otp-input');
    const resendButton = document.getElementById('resendButton');
    const timerDisplay = document.getElementById('timer');
    const userPhoneDisplay = document.getElementById('userPhone');
    let timerInterval;

    // Display user's phone number
    const userPhone = sessionStorage.getItem('userPhone');
    if (userPhone) {
        // Format phone number for display: +20 XXX XXX XXXX
        const formattedPhone = userPhone.replace(/(\d{3})(\d{3})(\d{4})/, '+20 $1 $2 $3');
        userPhoneDisplay.textContent = formattedPhone;
    }

    // Start with 60 seconds timer
    let timeLeft = 60;

    // Function to format time as MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Function to start/restart timer
    function startTimer() {
        timeLeft = 60;
        resendButton.disabled = true;
        
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                resendButton.disabled = false;
                timerDisplay.textContent = '00:00';
            }
        }, 1000);
    }

    // Start initial timer
    startTimer();

    // Handle input in OTP fields
    inputs.forEach((input, index) => {
        // Handle numeric input and auto-focus
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
            // Remove non-numeric characters
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });

        // Handle paste
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').split('');
            
            inputs.forEach((input, i) => {
                if (pastedData[i]) {
                    input.value = pastedData[i];
                    if (i < inputs.length - 1) {
                        inputs[i + 1].focus();
                    }
                }
            });
        });
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get OTP value
        const otp = Array.from(inputs).map(input => input.value).join('');
        
        // Validate OTP length
        if (otp.length !== 4) {
            alert('يرجى إدخال رمز التحقق المكون من 4 أرقام');
            return;
        }

        // Here you would typically verify the OTP with your backend
        // For demo purposes, we'll just show success and redirect
        alert('تم التحقق بنجاح!');
        window.location.href = 'resetPassword.html';
    });

    // Handle resend code
    resendButton.addEventListener('click', () => {
        // Here you would typically make an API call to resend the code
        startTimer();
        alert('تم إعادة إرسال رمز التحقق');
    });
}); 