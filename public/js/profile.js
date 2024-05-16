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

document
    .querySelector('.profile-form')
    .addEventListener('submit', profileFormHandler);

    

