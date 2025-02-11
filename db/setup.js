
async function createTables(sequelize) {


    try {
        const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (

            id SERIAL PRIMARY KEY,
            login VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            name VARCHAR(100) NOT NULL,
            role VARCHAR(10) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        const createObjectTable = `
        
        CREATE TABLE IF NOT EXISTS objects (

            id SERIAL PRIMARY KEY,
            manager_id INT REFERENCES users(id) NOT NULL,
            title VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `;

        const createPostsTable = `
        
        CREATE TABLE IF NOT EXISTS tasks (

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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `;

        

    await pool.query(createUsersTable);
    console.log('Users table created');

    await pool.query(createPostsTable);
    console.log('Tasks table created');

    await pool.query(createObjectTable);
    console.log('Objects table created');

    } catch (error) {
    
        console.error('Error creating tables:', error.massage);

    }
}

module.exports = createTables; 