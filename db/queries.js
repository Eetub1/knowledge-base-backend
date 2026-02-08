import pool from "./pool.js"

export const createUser = async (username, passwordHash) => {
    const result = await pool.query(
        "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at",
        [username, passwordHash]
    )
    return result.rows[0]
}

export const findUserByUsername = async username => {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    )
    return result.rows[0]
}

export const addNoteById = async (title, content, userId, folderId=null) => {
    try {
        const result = await pool.query(
            //palautetaan juuri luotu rivi
            "INSERT INTO notes (title, content, user_id, folder_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, userId, folderId]
        )
        console.log("Note created:", result.rows[0])
        return result.rows[0]

    } catch (err) {
        console.error("Tapahtui virhe lisätessä muistiinpanoa:", err.message)
        return null
    }
}