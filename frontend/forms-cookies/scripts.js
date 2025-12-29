document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email)) alert('Invalid email');
    else if (!validatePhone(phone)) alert('Invalid phone');
    else if (!validatePassword(password)) alert('Invalid password');
    else alert('Form submitted successfully');
});




function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhone(phone) {
  const regex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
  return regex.test(phone);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}