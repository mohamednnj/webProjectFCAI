document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const form = document.getElementById('paymentForm');
    const cardFields = document.getElementById('cardFields');
    const vodafoneFields = document.getElementById('vodafoneFields');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const phoneNumber = document.getElementById('phoneNumber');

    // Get course details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    // Load course details
    loadCourseDetails(courseId);

    // Handle payment method selection
    document.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardFields.style.display = 'block';
                vodafoneFields.style.display = 'none';
                enableCardValidation(true);
                enableVodafoneValidation(false);
            } else {
                cardFields.style.display = 'none';
                vodafoneFields.style.display = 'block';
                enableCardValidation(false);
                enableVodafoneValidation(true);
            }
        });
    });

    // Format card number with spaces
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/[^0-9]/g, '');
        
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
    });

    // Format expiry date
    expiryDate.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        
        e.target.value = value;
    });

    // Validate CVV (numbers only)
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Validate phone number (numbers only)
    phoneNumber.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        if (paymentMethod === 'card') {
            if (!validateCardDetails()) {
                return;
            }
        } else {
            if (!validateVodafoneNumber()) {
                return;
            }
        }

        // Here you would typically make an API call to process the payment
        // For demo purposes, we'll just show a success message
        alert('تم الدفع بنجاح! سيتم تحويلك إلى صفحة الكورس.');
        window.location.href = `course.html?id=${courseId}`;
    });

    function validateCardDetails() {
        const cardName = document.getElementById('cardName').value;
        const cardNum = cardNumber.value.replace(/\s/g, '');
        const expiry = expiryDate.value;
        const cvvValue = cvv.value;

        if (cardName.length < 3) {
            alert('يرجى إدخال اسم صحيح على البطاقة');
            return false;
        }

        if (cardNum.length !== 16) {
            alert('يرجى إدخال رقم بطاقة صحيح');
            return false;
        }

        if (!expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            alert('يرجى إدخال تاريخ صلاحية صحيح (MM/YY)');
            return false;
        }

        if (cvvValue.length !== 3) {
            alert('يرجى إدخال رمز CVV صحيح');
            return false;
        }

        return true;
    }

    function validateVodafoneNumber() {
        const phone = phoneNumber.value;
        if (!phone.match(/^010[0-9]{8}$/)) {
            alert('يرجى إدخال رقم فودافون صحيح');
            return false;
        }
        return true;
    }

    function enableCardValidation(enable) {
        const cardInputs = cardFields.querySelectorAll('input');
        cardInputs.forEach(input => input.required = enable);
    }

    function enableVodafoneValidation(enable) {
        const vodafoneInputs = vodafoneFields.querySelectorAll('input');
        vodafoneInputs.forEach(input => input.required = enable);
    }

    async function loadCourseDetails(courseId) {
        // Here you would typically fetch course details from your backend
        // For demo purposes, we'll use hardcoded data
        const courseData = {
            name: 'HTML لغة بناء المواقع',
            image: '../image/Home/html-course.png',
            instructor: {
                name: 'محمد السري',
                title: 'مهندس برمجيات',
                image: '../image/Home/srey.png'
            },
            price: '500 جنيه'
        };

        // Update the UI with course details
        document.getElementById('courseName').textContent = courseData.name;
        document.getElementById('courseImage').src = courseData.image;
        document.getElementById('instructorName').textContent = courseData.instructor.name;
        document.getElementById('instructorTitle').textContent = courseData.instructor.title;
        document.getElementById('instructorImage').src = courseData.instructor.image;
        document.getElementById('coursePrice').textContent = courseData.price;
        document.getElementById('totalPrice').textContent = courseData.price;
    }
}); 