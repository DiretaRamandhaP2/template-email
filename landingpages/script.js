const resetForm = document.querySelector('#reset-form');
const newPassword = document.querySelector('#new-password');
const confirmPassword = document.querySelector('#confirm-password');
const submitButton = document.querySelector('#submit-button');
const alertBox = document.querySelector('#alert');
const resetToken = new URLSearchParams(window.location.search).get('token');
const resetEndpoint = document.documentElement.dataset.resetEndpoint.trim();

function showMessage(text, type = 'error') {
  alertBox.hidden = false;
  alertBox.textContent = text;
  alertBox.className = type === 'success' ? 'alert success' : 'alert';
}

document.querySelectorAll('.password-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const input = document.getElementById(toggle.dataset.target);
    const showing = input.type === 'password';
    input.type = showing ? 'text' : 'password';
    toggle.textContent = showing ? 'Hide' : 'Show';
    toggle.setAttribute('aria-label', `${showing ? 'Hide' : 'Show'} password`);
  });
});

resetForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  alertBox.hidden = true;

  if (!resetToken) return showMessage('This reset link is missing or invalid. Please request a new one.');
  if (!resetEndpoint) return showMessage('Password reset is not configured yet. Please contact support.');
  if (newPassword.value.length < 12) return showMessage('Your password must be at least 12 characters long.');
  if (newPassword.value !== confirmPassword.value) return showMessage('The passwords do not match. Please try again.');

  submitButton.disabled = true;
  submitButton.textContent = 'Updating…';
  try {
    const response = await fetch(resetEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ token: resetToken, new_password: newPassword.value })
    });
    if (!response.ok) throw new Error('reset_failed');
    resetForm.reset();
    showMessage('Your password has been updated. You can now return to login.', 'success');
  } catch {
    showMessage('We could not update your password. The link may have expired. Please request a new one.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Update Password';
  }
});