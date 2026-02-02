import pool from '../db/pool.js'; 

export const findUserByUsername = async () => {
    const username = "admin_user"
    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1', 
        [username]
    )
    return result.rows[0]
}