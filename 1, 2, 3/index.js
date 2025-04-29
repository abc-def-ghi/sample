function validateRegistration() {
    let isValid = true; // Declare the flag once

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;

    // Validate Full Name
    if (!name.trim()) {
        alert('Please enter your full name');
        isValid = false;
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.trim()) {
        alert('Please enter your email address');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone Number
    const phonePattern = /^[0-9]{10}$/; // Match exactly 10 digits
    if (!phone.trim()) {
        alert('Please enter your phone number');
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        alert('Phone number must be exactly 10 digits');
        isValid = false;
    }

    // Validate Address
    if (!address.trim()) {
        alert('Please enter your address');
        isValid = false;
    }

    // Validate Role
    if (role === "") {
        alert('Please select your role');
        isValid = false;
    }

    // Validate Password
    if (!password.trim()) {
        alert('Please enter your password');
        isValid = false;
    } else if (password.length < 6) {
        alert('Password must be at least 6 characters');
        isValid = false;
    }

    return isValid; // Prevent form submission if any field is invalid
}