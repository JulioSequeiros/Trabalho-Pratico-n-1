const fs = require('fs');

//return all students
exports.getAll = async (req, res) => {
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //returns students array
    return res.send(data.schools);
}

//return student by his id (student number)
exports.getById = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //finds student by his id
    const school = data.schools.filter(school => school.number == id);
    if (school.length == 0) return res.status(404).send("Escola não existe!");
    //return student
    res.send(school);
}

//creates student
exports.create = async (req, res) => {
    //get requested student properties
    const {number, name, sigla, city, website} = req.body;
    if (!number || !name || !sigla || !morada || !website)
        return res.status(400).send("Dados em falta!");
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    if (data.schools.find((school) => school.number == number))
        return res.status(400).send("Escola já existe!");
    //add to students array
    data.schools.push(req.body);
    //add to students array
    try {
        fs.writeFileSync("data/local/data.json", JSON.stringify(data));
    } catch {
        return res.status(400).send("Erro!");
    } finally {
        //return new student
        return res.status(201).send(req.body);
    }
};

//updates student
exports.update = async (req, res) => {
    const {number, name, sigla, city, website} = req.body;
    if (!number || !name || !sigla || !morada || !website)
        return res.status(400).send("Dados em falta!");
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find student to update
    const school = data.schools.find(school => school.number == number);
    if (!school) return res.status(404).send("Escola não existe!");
    //update properties
    school.sigla = sigla;
    school.name = name;
    school.city = city;
    school.website = website;
    //update local database
    try {
        fs.writeFileSync("data/local/data.json", JSON.stringify(data));
    } catch {
        return res.status(400).send("Erro!");
    } finally {
        //return updated student
        return res.send({number, name, sigla, city, website});
    }
};

//delete student by his id (student number)
exports.delete = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //find student to delete
    const school = data.schools.filter(school => school.number == id);
    if (school.length == 0) return res.status(404).send("Escola não existe!");
    //delete student
    data.schools.splice(student, 1);
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}