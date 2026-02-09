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

    } catch (error) {
        console.error("Tapahtui virhe lisätessä muistiinpanoa:", error.message)
        return null
    }
}

export const getUserNotesById = async userId => {
    try {
        const result = await pool.query(
            "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        )
        console.log(result)
        console.log(result.rows)
        return result.rows
    } catch (error) {
        console.error("Tapahtui virhe haettaessa käyttäjän muistiinpanoja")
    }
}