import PG from 'pg'

const Pool = PG.Pool

// local Docker
const db = {
    user: 'postgres',
    database: 'post_db',
    host: 'localhost',
    port: 5433
}

const pool = new Pool(db)

export default pool