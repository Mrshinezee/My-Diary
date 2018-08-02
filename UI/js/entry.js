const token = localStorage.getItem('authToken');
if (!token) {
  window.location.href = 'http://127.0.0.1:4500/index.html';
}

const entrytitle = document.getElementById('topic');
const entrycontent = document.getElementById('content');
const url = '/api/v1/entries';

const makeEntry = () => {
  const entryMake = {
    entrytitle: entrytitle.value,
    entrycontent: entrycontent.value,
  };

  const content = {
    method: 'POST',
    body: JSON.stringify(entryMake),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  };

  fetch(url, content)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        alert('something went wrong');
      } else {
        const { message, entry } = data;
        alert(message);
        setTimeout(() => {
          window.location.href = 'http://127.0.0.1:4500/allEntry.html';
        }, 2000);
      }
    });
};
