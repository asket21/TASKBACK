
async function createTables(sequelize) {


    try { 
        
        
        const createPlatformTable = `
        
        CREATE TABLE IF NOT EXISTS platforms (

            id INTEGER PRIMARY KEY,       
            title VARCHAR(255)  UNIQUE NOT NULL DEFAULT 'Уточни у менеджера, попроси админа отредактировать'
    )
        `;


        const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (

            id SERIAL PRIMARY KEY,
            login VARCHAR(100) UNIQUE NOT NULL ,
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
            title VARCHAR(255) UNIQUE NOT NULL,
            address VARCHAR(255) NOT NULL DEFAULT 'Добавьте адрес',
            telegram_object_chat_id BIGINT NOT NULL DEFAULT 0,
            telegram_object_chat_link VARCHAR NOT NULL DEFAULT 'Добавьте ссылку на чат объекта',
            platform INTEGER REFERENCES platforms(id) NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `;

        const createTaskTable = `
        
        CREATE TABLE IF NOT EXISTS tasks (

            id INTEGER PRIMARY KEY,       
            object_id INT REFERENCES objects(id) ON DELETE CASCADE NOT NULL,            
            link TEXT NOT NULL,
            manager_id INT REFERENCES users(id) NOT NULL,
            comment TEXT NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'Принято',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `;
        


      


        // const createTelegramIdTable =`
        
        //  CREATE TABLE IF NOT EXISTS telegram_id (
         

        // id INTEGER PRIMARY KEY,
        // user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        // tel_id BIGINT NOT NULL,
        // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         
        //  )
        
        
        // `;



    await sequelize.query(createPlatformTable);
    console.log('createPlatformTable table created');
    await sequelize.query(createUsersTable);
    console.log('Users table created');

    await sequelize.query(createObjectTable);
    console.log('Objects table created');

    await sequelize.query(createTaskTable);
    console.log('Tasks table created');

    
    } catch (error) {
    
        console.error('Error creating tables:', error.massage);

    }
}


module.exports = createTables; 