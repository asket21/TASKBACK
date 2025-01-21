
async function createTables(pool) {


    try {


        const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (

            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            role VARCHAR(10) NOT NULL DEFAULT 'student'
        )
        `;

        const createPostsTable = `
        
        CREATE TABLE IF NOT EXISTS tasks (

            id SERIAL PRIMARY KEY,
            creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            deskription TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `;

    await pool.query(createUsersTable);
    console.log('Users table created');

    await pool.query(createPostsTable);
    console.log('Tasks table created');

    } catch (error) {
    
        console.error('Error creating tables:', error.massage);

    }
}

module.exports = createTables; 