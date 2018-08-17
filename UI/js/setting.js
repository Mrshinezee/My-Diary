const token = localStorage.getItem('authToken');
if (!token) {
//   window.location.href = 'https://my-diary-collins.herokuapp.com/index.html';
  window.location.href = 'http://127.0.0.1:4500/index.html';
}

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};
const profileUrl = 'http://127.0.0.1:4500/api/v1/user';

fetch(profileUrl, options)
  .then(response => response.json())
  .then((resp) => {
    const { data } = resp;
    document.getElementById('email').value = data[0].email;
    document.getElementById('firstname').value = data[0].firstname;
    document.getElementById('lastname').value = data[0].lastname;
  });
