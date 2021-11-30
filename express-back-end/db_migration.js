import pool from './db.js'

const createUserTable = async () => {
    try {
        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(255),
                    last_name VARCHAR(255),
                    username VARCHAR(255),
                    password VARCHAR(255),
                    disabled BOOLEAN default false,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            `
        )
    } catch (err) {
        console.error(err.message)
    }
}

const createPostTable = async () => {
    try {
        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS posts (
                    id SERIAL PRIMARY KEY,
                    owner_id INT,
                    post TEXT,
                    is_public BOOLEAN default false,
                    created_at TIMESTAMP DEFAULT NOW(),
                    CONSTRAINT fk_owner
                        FOREIGN KEY(owner_id)
                            REFERENCES users(id)
                )
            `
        )
    } catch (err) {
        console.error(err.message)
    }
}

const createTables = () => {
    createUserTable()
        .then(() => {
            console.info('Users table created')
            createPostTable()
                .then(() => console.info('Posts table created'))
                .then(() => {
                    seedUsers()
                })
        })
}

const seedUsers = async () => {
    try {
        await pool.query(
            `
                INSERT INTO USERS (id, first_name, last_name, username, password) 
                VALUES 
                (999999, 'Mary', 'Villacrusis', 'maryvill2021', '4e6fdab981c1076532046f4cfd610643da0d1e9f3fbc770ff1a9256d2d3e86c7') 
                ON CONFLICT (id) DO NOTHING
            `
        )
    } catch (err) {
        console.error(err.message)
    }
}

export default createTables