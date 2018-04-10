const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const studentController = require('./StudentController');

const PORT = 4000;

mongoose.connect('mongodb://localhost/db');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const studentRouter = express.Router();
//
// // Create a student in the database
// // localhost://3000/student
// studentRouter.post('/', studentController.createStudent);
//
// // Get a student from the database
// // localhost://3000/student/"name"
// studentRouter.get('/:name', studentController.getStudent);
//
// // Change a students name
// // localhost://3000/student/"name"
// studentRouter.patch('/:name', studentController.updateStudent);
//
// // Delete a student from the database
// // localhost://3000/student/"name"
// studentRouter.delete('/:name', studentController.deleteStudent);
//
// app.use('/student', studentRouter);



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
