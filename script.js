async function submitForm() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        feedback: document.getElementById('feedback').value,
    };

    try {
        const response = await fetch('/.netlify/functions/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        alert(result.message);
        // Optionally, you can redirect or perform other actions after successful submission.
    } catch (error) {
        console.error('Error submitting survey:', error);
        alert('Error submitting survey. Please try again later.');
    }
}
