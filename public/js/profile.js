const profileFormHandler = (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();
    const address = document.querySelector('#address-signup').value.trim();
    const city = document.querySelector('#city-signup').value.trim();
    const state = document.querySelector('#state-signup').value.trim();
    const zip = document.querySelector('#zip-signup').value.trim();
    const phone = document.querySelector('#phone-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    let selectedRadio = document.querySelector('input[name="role"]:checked');

    // Get the value of the selected radio button
    var userType = selectedRadio.value;

    // Create user profile
    fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone,
            email,
            password,
            'type': userType
        }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not create user');
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

const updateUserFormHandler = (event) => {
    event.preventDefault();

    const id = document.querySelector('#id').value.trim();
    const firstName = document.querySelector('#first-name-update').value.trim();
    const lastName = document.querySelector('#last-name-update').value.trim();
    const address = document.querySelector('#address-update').value.trim();
    const city = document.querySelector('#city-update').value.trim();
    const state = document.querySelector('#state-update').value.trim();
    const zip = document.querySelector('#zip-update').value.trim();
    const phone = document.querySelector('#phone-update').value.trim();
    const email = document.querySelector('#email-update').value.trim();
    const password = document.querySelector('#password-update').value.trim();
    let selectedRadio = document.querySelector('input[name="role"]:checked');

    var userType = selectedRadio.value;

    // Update user profile
    fetch(`/api/user/profile/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            state: state,
            zip: zip,
            phone: phone,
            userType: userType
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json().then(data => ({
            status: response.status,
            body: data
        }))
    )
    .then(obj => {
        if (obj.status === 200) {
            document.location.replace(`/api/user/profile`); // Redirect to profile page on success
        } else {
            alert(`Failed to update user: ${obj.body.message}`); // Display detailed error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
};

const profileForm = document.querySelector('#create-user-form');
if (profileForm) {
    profileForm.addEventListener('submit', profileFormHandler);
}

const updateProfileForm = document.querySelector('#update-user-form');
if (updateProfileForm) {
    updateProfileForm.addEventListener('submit', updateUserFormHandler);
    
}