document.addEventListener("DOMContentLoaded", () => {
    const passwordPopup = document.getElementById('password-popup');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');

    passwordSubmit.addEventListener('click', () => {
        const password = passwordInput.value;
        if (password === 'DotnetC#Kakheti') {
            window.location.href = "dashboard.html";
        } else {
            errorMessage.style.display = 'block';
        }
    });
});
