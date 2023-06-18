const express = require('express');
const bodyParser = require('body-parser');
const PORT = 2000
const app = express();

//Requiring of the DB Connection Module
const { initDB } = require('./DBInitialization');
const MYSQL = require('./DBconnection')
const { findKey, invalidOrEmpty, validateIntegers, validateString } = require('./queryValidator');

app.use(bodyParser.json());
app.use(express.json());

//Ping Getway
app.get('/ping', (req, res) => {
    res.send('Dogshouseservice.Version1.0.1')
});
  
// Dogs API endpoint with sorting and pagination support
//Posible format for the query => http://localhost:2000/dogs?pageNumber=1&order=desc&attribute=tail_length&pageSize=3
app.get('/dogs',  (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (pageNumber - 1) * pageSize;

        const sortAttribute = req.query.attribute || 'name';
        const sortOrder = req.query.order || 'asc';

        // Validate sortOrder input
        const validSortOrder = ['asc', 'desc'];
        if (!validSortOrder.includes(sortOrder.toLowerCase())) {
            return res.send('Error: ==> Invalid sort order. Allowed values are "asc" or "desc".');
        }

        // Query the dogs table with sorting and pagination
        // const [Dogs] = await MYSQL.query(` SELECT * FROM dogs ORDER BY ${sortAttribute} ${sortOrder.toUpperCase()} LIMIT ${offset}, ${pageSize} `)
        MYSQL.query(` SELECT * FROM dogs ORDER BY ${sortAttribute} ${sortOrder.toUpperCase()} LIMIT ${offset}, ${pageSize} `, (err, result) => {
            res.send(result)
        })

    } catch (error) {
        console.error('Error retrieving dogs: ', error);
        res.send("error: ==> 'Internal Server Error'")
    }
})

//dynamic creation of dogs
//possible format => http://localhost:2000/dog?name=doggy&color=red&tail_length=173&weight=33
app.get('/dog', (req, res) => {
    const { name, color, tail_length, weight } = req.query;

    // Get the query from the user
    const values = [name, color, tail_length, weight]

    const missingKey = findKey(values)
    const emptyKey = invalidOrEmpty(values)
    const IntNumbers = validateIntegers(values)
    const StrValid = validateString(values)


    if(missingKey){//Look for missing key function
        
        res.send(`The variableName "${missingKey}" is not declared in your Query!`)
    }else if(emptyKey){ //Look for missing value of a key

        res.send(`The value for "${emptyKey}" is invalid or empty!`)
    }else if(IntNumbers){// validation of Integers for tail_length and weight

        res.send(IntNumbers)
    }else if(StrValid){
        
        res.send(StrValid)
    }else{
        const validValues = [name.replace(/\s+/g, " "), color.replace(/\s+/g, " "), tail_length, weight]
        
        const query = `INSERT INTO dogs (name, color, tail_length, weight) VALUES (?, ?, ?, ?)`;
        MYSQL.query(query, validValues, (err, results) => {
            if(err){
                try{
                    if (err.code == 'ER_DUP_ENTRY') {
                        res.send('Error ==> The Dog name already Exist in the DataBase')
                    }
                } catch(error) {
                    console.log(error)
                }
            }else{
                res.send(`Dog with the name "${validValues[0]}" was successfully created to the database`);
            }
        })
        
    }
})

// Start the server
app.listen(PORT, () => {
  console.log(`ApI server is running on port http://localhost:${PORT}`);
});
