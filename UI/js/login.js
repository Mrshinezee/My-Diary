const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
// const url = 'https://my-diary-collins.herokuapp.com/api/v1/auth/login';
const url = 'http://127.0.0.1:4500/api/v1/auth/login';

const validateErrorMessage = (data) => {
  const loginMessage = document.getElementById('loginMessage');
  if (data.message) {
    loginMessage.style.display = 'block';
    loginMessage.innerHTML = data.message;
  } else {
    loginMessage.innerHTML = '';
  }
};
const validateErrorField = (data) => {
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const { email, password } = data.errors;
  if (email) {
    emailError.style.display = 'block';
    emailError.innerHTML = email;
  } else {
    emailError.innerHTML = '';
  }
  if (password) {
    passwordError.style.display = 'block';
    passwordError.innerHTML = password;
  } else {
    passwordError.innerHTML = '';
  }
};

const successLogin = (response) => {
  localStorage.setItem('authToken', `Bearer ${response.token}`);
  localStorage.setItem('diaryName', response.firstName);
  document.getElementById('loginMessage').innerHTML = '';
  const roller = document.getElementById('loginSuccess');
  roller.innerHTML = 'Login was successful...';
  setTimeout(() => {
    // window.location.href = 'https://my-diary-collins.herokuapp.com/allEntry.html';
    window.location.href = 'http://127.0.0.1:4500/allEntry.html';
  }, 3000);
};

const login = () => {
  const registerBody = {
    email: emailField.value,
    password: passwordField.value,
  };
  const content = {
    method: 'POST',
    body: JSON.stringify(registerBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(url, content)
    .then(data => data.json())
    .then((response) => {
      console.log(response);
      if (response.success === false) {
        validateErrorMessage(response);
        validateErrorField(response);
      } else {
        successLogin(response);
      }
    });
};
