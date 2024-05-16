const loginFormHandler = (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Login user
    fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ 
            email, 
            password
         }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not login user');
        }
        return response.json();
        })
        .then(newUser => {
            // Redirect to view profile
             document.location.replace(`/api/user/profile`);
        })
        .catch(error => {
            $("#error-message").text(`Error in email or password, please try again`);
        });
};

const createProfile = (event) => {
    event.preventDefault();
    document.location.replace(`/api/user/profile`);
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('#createProfile')
    .addEventListener('click', createProfile);