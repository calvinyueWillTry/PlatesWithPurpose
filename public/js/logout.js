const logout = (event) => {
    event.preventDefault();

    // Logout user
    fetch('/api/user/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not logout user');
        }
        return response.json();
        })
        .catch(error => {
            $("#error-message").text(`Error in logout`);
        });
        
        // Redirect to login page
        document.location.replace(`/api/user/login`);
};


document.querySelector('#logout').addEventListener('click', logout);
