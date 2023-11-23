const mongoose = require('mongoose');

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://janrezvkasilag:ot8mhadoHqN7Utms@surveyform.zg3bsca.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the survey data
const surveySchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
});

// Create a model based on the schema
const Survey = mongoose.model('Survey', surveySchema);

// Main function to handle form submissions
exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const formData = JSON.parse(event.body);

        // Create a new survey instance from the request body
        const newSurvey = new Survey(formData);

        // Save the survey to the database
        await newSurvey.save();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Survey submitted successfully!' }),
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
