document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a new contact message object
    const contactMessage = {
        name: name,
        email: email,
        message: message
    };

    // Send the contact message to the backend
    fetch('http://127.0.0.1:8080/submit', {  // Make sure the endpoint matches your Flask app
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactMessage)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log('Message submitted:', data);
        // Clear the form fields
        document.getElementById('contact-form').reset();
        // Redirect to a new page after successful submission
        window.location.href = 'thankyou.html'; // Change 'success.html' to your desired page
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was an error sending your message. Please try again later.');
    });
});
/*document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a new contact message object
    const contactMessage = {
        name: name,
        email: email,
        message: message
    };

    // Send the contact message to the backend
    fetch('http://127.0.0.1:8080/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactMessage)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log('Message submitted:', data);
        // Clear the form fields
        document.getElementById('contact-form').reset();
        // Optionally, you can add a success message to the UI
        alert('Your message has been sent successfully!');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});
*/
