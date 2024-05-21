

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
    }; console.log(formSectionData);

    fetch("/api/contact", { //  /api/email/log
        method: 'POST', //post to inquiry.json? 
        body: JSON.stringify(formSectionData),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not create log');
        }
        return response.json();
        })
        .then(newUser => {
            // Redirect to view profile
           document.location.href("/api/email/thankyou");
        })
        .catch(error => {
            $("#error-message").text(`Error creating log`);
        });


    // const emailInputted = document.querySelector('#emailInquiry').value.trim();
    // const subject = document.querySelector('#textSubject').value.trim();
    // const textInput = document.querySelector('#inquire').value.trim();
    
       

    fetch("/api/email/contact", { //  /api/contact
        method: 'POST',
        body: JSON.stringify({
            email: emailInputted,
            subject: subject,
            text: textInput,
            html: textInput
        }),
        headers: { 'Content-Type': 'application/json' },
    })    
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not send email');
        }
        return response.json();
        })
        .then(response => {
            document.location.replace(`/api/email/thankyou`);
            return; 
            
        })
        .catch(error => {
            $("#error-message").text(`Error in email or password, please try again`);
        });
});
