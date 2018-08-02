const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confpasswordField = document.getElementById('confirmpassword');
const firstNameField = document.getElementById('firstname');
const lastNameField = document.getElementById('lastname');
const registerUser = document.getElementById('registerUser');
const confirmpasswordAlert = document.getElementById('confirmpassword-alert');
const url = '/api/v1/auth/signup';


const validateError = (data) => {
  const firstNameError = document.getElementById('firstnameError');
  const lastNameError = document.getElementById('lastnameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const { email, password, firstName, lastName } = data.errors;
  if (firstName) {
    firstNameError.style.display = 'block';
    firstNameError.innerHTML = firstName;
  }
  if (lastName) {
    lastNameError.style.display = 'block';
    lastNameError.innerHTML = lastName;
  }
  if (email) {
    emailError.style.display = 'block';
    emailError.innerHTML = email;
  }
  if (password) {
    passwordError.style.display = 'block';
    passwordError.innerHTML = password;
  }
};

const validateInput = (data) => {
  if (data.message) {
    const registerMessage = document.getElementById('registerMessage');
    registerMessage.style.display = 'block';
    registerMessage.innerHTML = data.message;
  } else {
    validateError(data);
  }
};
const getfetch = (content) => {
  fetch(url, content)
    .then(data => data.json())
    .then((response) => {
      if (response.success === false) {
        validateInput(response);
      } else {
        localStorage.setItem('authToken', `Bearer ${response.token}`);
        const roller = document.getElementById('registerSuccess');
        roller.innerHTML = 'Account created successfully...';
        setTimeout(() => {
          window.location.href = 'http://127.0.0.1:4500/allEntry.html';
        }, 3000);
      }
    });
};

const signUp = () => {
  const registerBody = {
    email: emailField.value,
    password: passwordField.value,
    firstName: firstNameField.value,
    lastName: lastNameField.value,
  };
  if (passwordField.value !== confpasswordField.value) {
    confirmpasswordAlert.innerHTML = 'password mismatch';
    registerUser.setAttribute('disabled');
  } else {
    confirmpasswordAlert.innerHTML = '';
    registerUser.removeAttribute('disabled');
  }
  const content = {
    method: 'POST',
    body: JSON.stringify(registerBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  getfetch(content);
};
