const profileFormHandler = async function (event) {
    event.preventDefault();

    const emailEl = document
        .querySelector('.email-signup')
        .value.trim();
    const passwordEl = document
        .querySelector('.password-signup')
        .value.trim();

    if (passwordEl.length >= 6 && emailEl) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email: emailEl,
                password: passwordEl,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up');
        }
    } else {
        alert(
            'Please include both a email and password, and make sure your password is at least 6 characters long'
        );
    }
};

document
    .querySelector('.profile-form')
    .addEventListener('submit', signupFormHandler);
