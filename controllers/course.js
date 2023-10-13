const fs = require('fs');

//return course
exports.getAll = async (req, res) => {
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //returns students array
    return res.send(data.courses);
}

//return course by his id
exports.getById = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //finds student by his id
    const course = data.courses.filter(course => course.number == id);
    //return student
    res.send(course);
}

//creates course
exports.create = async (req, res) => {
    //get requested student properties
    const {number, name, sigla, school } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //add to students array
    data.courses.push(req.body);
    //add to students array
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return new student
    return res.status(201).send(req.body);
}

//updates student
exports.update = async (req, res) => {
    const { number, name, sigla, school } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find student to update
    const course = data.courses.find(student => course.number == course);
    //update properties
    course.name = name;
    course.sigla = sigla;
    course.school = school;
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return updated student
    return res.send({number, name, sigla, school });
}

//delete student by his id (student number)
exports.delete = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //find student to delete
    const course = data.courses.filter(course => course.number == id);
    //delete student
    data.courses.splice(course, 1);
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}