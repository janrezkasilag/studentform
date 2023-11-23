const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://janrezvkasilag:ot8mhadoHqN7Utms@surveyform.zg3bsca.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const surveySchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
});

const Survey = mongoose.model('Survey', surveySchema);

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const formData = JSON.parse(event.body);

        const newSurvey = new Survey(formData);

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
