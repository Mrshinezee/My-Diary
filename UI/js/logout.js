logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('diaryName');
    // window.location.href = 'https://my-diary-collins.herokuapp.com/index.html';
    window.location.href = 'http://127.0.0.1:4500/index.html';
};