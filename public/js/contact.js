

const contactForm = document.querySelector("#inquiry-form");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let emailInputted = document.querySelector('#emailInquiry').value.trim();
    let subject = document.querySelector('#textSubject').value.trim();
    let textInput = document.querySelector('#inquire').value.trim();
    // const formSectionData = { //convert values into an object array
    //     emailInquiry: emailInputted,
    //     textSubject: subject,
    //     inquire: textInput
    // }; console.log(formSectionData);

    // fetch("/api/contact", { //  /api/email/log
    //     method: 'POST', //post to inquiry.json? 
    //     body: JSON.stringify(formSectionData),
    //     headers: { 'Content-Type': 'application/json' },
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Could not create log');
    //     }
    //     return response.json();
    //     })
    //     .then(newUser => {
    //         // Redirect to view profile
    //        document.location.href("/api/email/thankyou");
    //     })
    //     .catch(error => {
    //         $("#error-message").text(`Error creating log`);
    //     });


    emailInputted = document.querySelector('#emailInquiry').value.trim();
    subject = document.querySelector('#textSubject').value.trim();
    textInput = document.querySelector('#inquire').value.trim();
    
   
    fetch("/api/email/contact", { //  /api/contact
        method: 'POST',
        body: JSON.stringify({
            email: emailInputted,
            subject: subject,
            message: textInput,
            html: textInput
        }),
        headers: { 'Content-Type': 'application/json' },
    })    
    .then(response => {

        if (!response.ok) {
            throw new Error('Could not send email');
        }
        document.location.replace(`/api/email/thankyou`);
        
        })
        .catch(error => {
            $("#error-message").text(`Error in email or password, please try again`);
        });
});
