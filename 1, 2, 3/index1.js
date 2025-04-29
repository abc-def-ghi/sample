function ValidateLogin(){
    let isValid=true;
    const emailPattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const email=document.getElementById('email').value;
    const password = document.getElementById('password').value;


    if(!email.trim()){
        alert('Please enter your email address')
    }
    else if(!emailPattern.test(email)){
        alert('Please enter a valid email address')
    }

    if (!password.trim()) {
        alert('Please enter your password');
        isValid = false;
    } else if (password.length < 6) {
        alert('Password must be at least 6 characters');
        isValid = false;
    }
}
