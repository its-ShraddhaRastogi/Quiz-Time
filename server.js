const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const pool = require("./db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/", async (request, response) => {
    const client = await pool.connect();
    const subject = request.body.subject_name;
    try {
        const res = await client.query(`select 
    qoa.question_id,
    qoa.question_text,
    qoa.option1,
    qoa.option2,
    qoa.option3,
    qoa.option4,
    qoa.correct_option,
    s.subject_name,
    s.subject_id
    from
    questions_options_answer qoa 
    join
     subjects s 
     on qoa.subject_id =s.subject_id 
     where s.subject_id=$1 `, [subject]);
        response.json({ data: res.rows, message: 'data found' });
    } catch (e) {
        response.json({
            error: e,
            message: 'data not found'
        })
    } finally {
        console.log("hii");
        client.release();
    }
});

app.post("/retrieveEditQuestion", async (request, response) => {
    const client = await pool.connect();
    const subject = request.body.subject_id;
    const question = request.body.question_id;
    try {
        const res = await client.query(
            `SELECT 
                qoa.question_id,
                qoa.question_text,
                qoa.option1,
                qoa.option2,
                qoa.option3,
                qoa.option4,
                qoa.correct_option,
                s.subject_name,
                s.subject_id
            FROM
                questions_options_answer qoa
                JOIN subjects s ON qoa.subject_id = s.subject_id
            WHERE s.subject_id = $1 AND qoa.question_id = $2`,
            [subject, question]
        );
        if (res.rows.length > 0) {
            response.json({ data: res.rows[0], message: 'Data found' });
        } else {
            response.json({ data: null, message: 'Data not found' });
        }
    } catch (e) {
        response.status(500).json({ error: e.message, message: 'Data not found' });
    } finally {
        client.release();
    }
});

app.post('/updateFormData', async (request, response) => {
    const client = await pool.connect();
    const { questionId, subjectId, question, option1, option2, option3, option4, correct_option } = request.body;
    try {
        await client.query(
            `UPDATE questions_options_answer
            SET question_text = $1,
                option1 = $2,
                option2 = $3,
                option3 = $4,
                option4 = $5,
                correct_option = $6
            WHERE question_id = $7 AND subject_id = $8`,
            [question, option1, option2, option3, option4, correct_option, questionId, subjectId]
        );
        response.json({ message: 'Data updated successfully!' });
    } catch (e) {
        response.status(500).json({ error: e.message, message: 'Error updating data' });
    } finally {
        client.release();
    }
});


app.post("/getBySubjectId", async (request, response) => {
    const client = await pool.connect();
    const subjectId = request.body.subjectId;
    try {
        const res = await client.query(`
        select 
        qoa.question_id,
        qoa.question_text,
        qoa.option1,
        qoa.option2,
        qoa.option3,
        qoa.option4,
        qoa.correct_option,
        s.subject_name,
        s.subject_id
        from
        questions_options_answer qoa 
        join
         subjects s 
         on qoa.subject_id =s.subject_id 
         where s.subject_id=$1`, [subjectId]);
        response.json({ data: res.rows, message: 'data found' });
    } catch (e) {
        response.json({ error: e });
    } finally {
        console.log("hii");
        client.release();
    }
});


app.get("/get", async (request, response) => {
    const client = await pool.connect();
    const subject = request.body.subjectId;
    try {
        const res = await client.query(`
            select * from questions_options_answer qoa where subject_id=$1;`[subject]);
        response.json({ data: res.rows, message: 'data found' });
    } catch (e) {
        response.json({
            error: e,
        })
    } finally {
        console.log("hii");
        client.release();
    }
});

app.post("/checkAnswers", async (request, response) => {
    console.log("API to check answers called");
    try {
        const { selectedAnswers, subjectId } = request.body;
        console.log(selectedAnswers, subjectId);
        const client = await pool.connect();
        const query = 'select correct_option from questions_options_answer qoa where subject_id=$1';
        const values = [subjectId];

        const dbResult = await client.query(query, values);

        console.log("result fron db", dbResult.rows);
        let correctCount = 0;
        for (let i = 0; i < selectedAnswers.length; i++) {
            if (selectedAnswers[i] === dbResult.rows[i].correct_option) {
                correctCount++;
            }
        }
        console.log(correctCount)
        response.status(200).json({ success: true, message: 'Answers checked successfully.', count: correctCount });
    } catch (error) {
        console.error('Error checking answers:', error);
        response.status(500).json({ success: false, message: 'Error checking answers.' });
    }
});

app.post("/saveFormData", async (request, response) => {
    try {
        const { questionId, subjectId, question, option1, option2, option3, option4, correct_option } = request.body;
        console.log(questionId);
        await pool.query('INSERT INTO questions_options_answer (question_id, subject_id, question_text, option1, option2, option3, option4, correct_option) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [questionId, subjectId, question, option1, option2, option3, option4, correct_option]);

        response.json({ success: true, message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);
        response.status(500).json({ success: false, message: 'Error saving form data' });
    }
});

app.post('/submit-form', async (req, res) => {
    console.log("Submit form endpoint called");
    try {
        const { userName, userEmail, userOtp } = req.body;
        const client = await pool.connect();
        const query = 'INSERT INTO signup_data (user_name, email_id, user_otp) VALUES ($1, $2, $3)';
        const values = [userName, userEmail, userOtp];
        await client.query(query, values);
        await client.release();
        res.status(200).json({ success: true, message: 'Form data saved successfully.' });
    } catch (error) {
        console.error('Error inserting form data:', error);
        res.status(500).json({ success: false, message: 'Error inserting form data.' });
    }
});

app.post("/checkOtp", async (req, res) => {
    try {
        const { userName, userEmail, otpEntered } = req.body;
        console.log('Request Body:', req.body);
        const client = await pool.connect();
        const queryUser = 'SELECT * FROM signup_data WHERE user_name = $1 AND email_id = $2';
        console.log('Query:', queryUser, [userName, userEmail]);
        const resultUser = await client.query(queryUser, [userName, userEmail]);
        const user = resultUser.rows;
        if (user.length === 0) {
            console.error('User not found');
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        console.log('Stored OTP:', user[0].user_otp);
        console.log('Entered OTP:', otpEntered);

        if (user[0].user_otp !== parseInt(otpEntered, 10)) {
            console.error('Invalid OTP');
            return res.status(401).json({ success: false, message: 'Invalid OTP' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error during OTP confirmation:', error);
        res.status(500).json({ success: false, message: 'Error in OTP validation' });
    }
});

app.post("/checkUpdatedOtp", async (req, res) => {
    try {
        const { userEmail, otpEntered } = req.body;
        console.log('Request Body:', req.body);
        const client = await pool.connect();
        const queryUser = 'SELECT * FROM signup_data WHERE email_id = $1';
        console.log('Query:', queryUser, [userEmail]);
        const resultUser = await client.query(queryUser, [userEmail]);
        const user = resultUser.rows;
        console.log('Stored OTP:', user[0].user_otp);
        console.log('Entered OTP:', otpEntered);

        if (user[0].user_otp !== parseInt(otpEntered, 10)) {
            console.error('Invalid OTP');
            return res.status(401).json({ success: false, message: 'Invalid OTP' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error during OTP confirmation:', error);
        res.status(500).json({ success: false, message: 'Error in OTP validation' });
    }
});


app.post('/checkEmail', async (req, res) => {
    console.log("Check email endpoint called");
    try {
        const { userEmail } = req.body;
        const client = await pool.connect();
        const query = 'SELECT * FROM signup_data WHERE email_id = $1';
        const result = await client.query(query, [userEmail]);
        await client.release();
        if (result.rows.length > 0) {
            return res.status(200).json({ exists: true, message: "mail exists" });
        }
        res.status(200).json({ exists: false, });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Error checking email' });
    }
});

app.post('/checkEmailExistance', async (req, res) => {
    console.log("checking email");
    const { userEmail } = req.body;
    console.log("Received userEmail:", userEmail); // Log received data
    try {
        const result = await pool.query('SELECT * FROM signup_data WHERE email_id = $1', [userEmail]);
        console.log(result);
        if (result.rows.length > 0) {
            res.json({ exists: true, message: 'Email already exists' });
        } else {
            res.json({ exists: false, message: 'Email does not exist' });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/updateOtp', async (req, res) => {
    console.log("otp sent");
    try {
        const { userOtp, userEmail } = req.body;
        console.log("Received userOtp:", userOtp);
        console.log("Received userEmail:", userEmail);
        const client = await pool.connect();
        const query = `UPDATE signup_data 
            SET user_otp=$1
            WHERE email_id=$2`;
        await client.query(query, [userOtp, userEmail]);
        await client.release();
        res.status(200).json({ success: true, message: 'otp updated successfully.' });
    } catch (error) {
        console.error('Error in updating otp', error);
        res.status(500).json({ error: 'Error in updating otp' });
    }
});
app.post('/savePassword', async (req, res) => {
    console.log("Entered saving password");
    try {
        const { userConfirmPassword, userTypeSelected, userEmail } = req.body;
        const client = await pool.connect();
        const query = `UPDATE signup_data 
            SET user_password=$1, user_type=$2
            WHERE email_id=$3`;
        await client.query(query, [userConfirmPassword, userTypeSelected, userEmail]);
        await client.release();
        res.status(200).json({ success: true, message: 'password saved successfully.' });
    } catch (error) {
        console.error('Error in saving password:', error);
        res.status(500).json({ error: 'Error saving password' });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { userName, userEmail, password } = req.body;
        console.log('Request Body:', req.body);
        if (!userName || !userEmail || !password) {
            console.error('Missing required fields:', req.body);
            return res.status(400).json({ success: false, message: 'Please fill in all fields' });
        }
        const client = await pool.connect();
        const queryUser = 'SELECT * FROM signup_data WHERE user_name = $1 AND email_id = $2';
        console.log('Query:', queryUser, [userName, userEmail]);
        const resultUser = await client.query(queryUser, [userName, userEmail]);
        const user = resultUser.rows;
        console.log(user);
        if (!user) {
            console.error('User not found:', userName, userEmail);
            return res.status(401).json({ success: false, message: 'Invalid username or email address' });
        } else {
            if (password !== user[0].user_password) {
                console.error('Invalid password:', user[0].user_password);
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
            console.log("the user type is", user[0].user_type);
            console.log("the user name is", user[0].user_name);
            res.status(200).json({ success: true, userType: user[0].user_type, name: user[0].user_name });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error during login' });
    }
});

app.listen(port, () => {
    console.log(`server is running on this port ${port}`)
});
