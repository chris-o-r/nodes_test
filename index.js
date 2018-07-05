const express = require('express'); 
const app = express();
const Joi = require('joi');

app.use(express.json());

const PORT = process.env.PORT || 3000; 

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

//GET
app.get('/', (req, res) =>{
    res.send("Test");
});


app.get('/api/courses', (req, res) => {
    if (courses != null && courses.length >0 ){
        res.send(courses);
    }else{
        res.status(404).send("No Courses Avalible");
    }
});

app.get('/api/course/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course){
        res.send(course);
    }else{
        res.status(404).send(`The course with the given ID ${req.params.id} was not found`);
        return;
    }
});

//POST

app.post('/api/course', (req, res) => {

    //Validation
    const result = validateCourse(req.body);  
    res.send(result.error);
    if (result){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Adding the course
    const course = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course);
});


//PUT

app.put('/api/course/:id', (req, res) => {
    //Finding the course 
    course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send(`The course with the given ID ${req.params.id} was not found`);
        return; 
    }

    //Ensuring the request is vaild 
    const { error } = validateCourse(req.body); 
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //Repalcing the course in the array 
    course.name = req.body.name; 
    const index = courses.indexOf(c => c.id === parseInt(req.params.id)); 
    courses[index] = course;
    res.send(course);

});

//Delete

app.delete('/api/course/:id', (req, res) => {
    course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send(`The course with the given ID ${req.params.id} was not found`);
        return; 
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);

});

//Helper Methods 
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema); 
}

app.listen(PORT, () => console.log(`Listening on port ${PORT} .....`)); 
