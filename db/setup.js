
async function createTables(pool) {


    try {


        const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (

            id SERIAL PRIMARY KEY,
<<<<<<< HEAD
            login VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            name VARCHAR(100) NOT NULL,
            role VARCHAR(10) NOT NULL DEFAULT 'intern',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
            // email VARCHAR(100) UNIQUE NOT NULL,
=======
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            role VARCHAR(10) NOT NULL DEFAULT 'student'
        )
        `;

>>>>>>> b124a34ea8f7ad303d456eb33f60f05d29382e79
        const createPostsTable = `
        
        CREATE TABLE IF NOT EXISTS tasks (

<<<<<<< HEAD
            id INTEGER PRIMARY KEY,       
            object_id INT REFERENCES objects(id) ON DELETE CASCADE NOT NULL,
            link TEXT NOT NULL,
            manager_id INT REFERENCES users(id) NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'Принято',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `;
// creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        const createObjectTable = `
        
        CREATE TABLE IF NOT EXISTS objects (

            id SERIAL PRIMARY KEY,
            manager VARCHAR(100) NOT NULL,
            title VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
=======
            id SERIAL PRIMARY KEY,
            creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            deskription TEXT,
>>>>>>> b124a34ea8f7ad303d456eb33f60f05d29382e79
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `;

<<<<<<< HEAD
        

=======
>>>>>>> b124a34ea8f7ad303d456eb33f60f05d29382e79
    await pool.query(createUsersTable);
    console.log('Users table created');

    await pool.query(createPostsTable);
    console.log('Tasks table created');

<<<<<<< HEAD
    await pool.query(createObjectTable);
    console.log('Objects table created');

=======
>>>>>>> b124a34ea8f7ad303d456eb33f60f05d29382e79
    } catch (error) {
    
        console.error('Error creating tables:', error.massage);

    }
}

module.exports = createTables; 