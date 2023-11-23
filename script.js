document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('surveyForm');
  
    surveyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(surveyForm);
      const surveyData = {};
      formData.forEach((value, key) => {
        surveyData[key] = value;
      });
  
      try {
        const response = await fetch('/submit-survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(surveyData),
        });
  
        if (response.ok) {
          alert('Survey submitted successfully!');
          surveyForm.reset();
        } else {
          const errorData = await response.json(); // Parse response body as JSON
          console.error('Error:', errorData.error); // Log detailed error on the client side
          console.error('Stack Trace:', errorData.stack); // Log the full error stack trace
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error submitting survey:', error);
        alert('An error occurred while submitting the survey. Please try again.');
      }
    });
  });
  