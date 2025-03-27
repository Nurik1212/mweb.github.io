document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливает стандартное поведение формы (перезагрузку страницы)

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password) {
        // Если логин и пароль введены, переходим на страницу ent.html
        window.location.href = 'ent.html';
    } else {
        // Если поля пустые, показываем сообщение
        alert('Please enter both username and password.');
    }
});