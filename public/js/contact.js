

const contactForm = document.querySelector("#inquiry-form");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailInputted = document.querySelector('#emailInquiry').value.trim();
    const subject = document.querySelector('#textSubject').value.trim();
    const textInput = document.querySelector('#inquire').value.trim();
    
    const formSectionData = { //convert values into an object array
        emailInquiry: emailInputted,
        textSubject: subject,
        inquire: textInput
    }; 
    console.log(formSectionData);

    return;

    fetch("/contact", { //  /api/contact
        method: 'POST',
        body: JSON.stringify({
            emailInquiry,
            textSubject,
            inquire
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
});
