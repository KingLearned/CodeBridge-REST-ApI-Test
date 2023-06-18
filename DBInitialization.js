const mysql = require('mysql2/promise');

const DatabaseName = 'codebridge'
const Host = 'localhost'
const User = 'root'
const Password = 'Learned 45'
// Create a connection pool
const initDB = mysql.createPool({
  host: Host,
  user: User,
  password: Password
});

// Function to create a database
async function createDatabase(databaseName) {
  try {
    // Acquire a connection from the pool
    const createDB = await initDB.getConnection();

    // Create the database
    await createDB.query(`CREATE DATABASE ${databaseName}`);

    createDB.release();
    console.log(`Database '${databaseName}' created successfully.`);

  } catch (error) {

    //to check if the database is existing
    if(error.code == 'ER_DB_CREATE_EXISTS'){

    }else{
        console.error('Error ==>: ', error);
    }

  } finally { initDB.end(); }

}
//Initialize the database creation from here
createDatabase(DatabaseName)

setTimeout(() => {
    const initTable = mysql.createPool({
      host: Host,
      user: User,
      password: Password,
      database: DatabaseName
    });
      
      // Function to create the table and insert data
      async function createTable() {
        try {
          // Acquire a connection from the pool
          const connection = await initTable.getConnection();
      
          // Create the table
          await connection.query(`
            CREATE TABLE dogs (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) UNIQUE,
              color VARCHAR(255),
              tail_length INT,
              weight INT
            )
          `);
      
          // populate table with the given data
          await connection.query(`
            INSERT INTO dogs (name, color, tail_length, weight)
            VALUES
              ('Neo', 'red & amber', 22, 32),
              ('Jessy', 'black & white', 7, 14)
          `);
      
          connection.release();
          console.log('Table created and data inserted successfully.')

        } catch (error) {

            if(error.code == 'ER_TABLE_EXISTS_ERROR'){

            }else{
                console.error('Error ===>: ', error);
            }

        } finally { initTable.end() }
      }
      
      createTable();
}, 1500);


module.exports = { initDB }
