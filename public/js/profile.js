// profile.js or any other relevant JavaScript file
const updateProfileHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();
    

    if (firstName && lastName) { // Add validation as needed
        const response = await fetch(`/api/profile/update`, {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName }), // Include other form fields in the body
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Profile update failed');
        }
    }
};

// Event listener for profile form submission
document
    .querySelector('.profile-form')
    .addEventListener('submit', updateProfileHandler);
