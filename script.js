const identityInput = document.querySelector('#identity');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('#login-button');
const loginForm = document.querySelector('#login-form');
const togglePassword = document.querySelector('#toggle-password');
const message = document.querySelector('#form-message');

function updateButtonState() {
  loginButton.disabled = !identityInput.value.trim() || !passwordInput.value.trim();
}

identityInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.textContent = isPassword ? 'Hide' : 'Show';
  togglePassword.setAttribute('aria-label', `${isPassword ? 'Hide' : 'Show'} password`);
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = 'Thanks! Your login details are ready to submit.';
});