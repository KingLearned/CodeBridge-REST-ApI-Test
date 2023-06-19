# CodeBridge-REST-ApI-Test

## Description:
This project is a sample REST API built using Node.js and MySQL. The API allows managing dogs, including retrieving dogs with sorting and pagination, as well as creating new dogs.

## Prerequisites
* Node.js 
* MySQL database 

## Set up the database configuration:
* Open the config.js file.
* Replace the database connection details (username, password, database, host) with your MySQL configuration.

## Usage
* Start the server with: `npm run dev`
* Access the API endpoints:
- Ping: GET http://localhost:2000/ping
- Retrieve dogs: GET http://localhost:2000/dogs
- Create a dog: GET http://localhost:2000/dog

## API Endpoints
* GET /ping: Returns a message indicating the API version.
* GET /dogs: Retrieves a list of dogs with sorting and pagination support.
* GET /dog: Creates a new dog.

## Creating of New Dog
* curl -X GET `http://localhost:2000/dog?name=doggy&color=red&tail_length=173&weight=33`


## Note: 
For retrieving dogs, you can use query parameters for sorting and pagination. Example: GET `http://localhost:2000/dogs?pageNumber=1&order=desc&attribute=tail_length&pageSize=5`

