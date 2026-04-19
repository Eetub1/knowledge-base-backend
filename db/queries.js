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
    const result = await pool.query(
        "INSERT INTO notes (title, content, user_id, folder_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, content, userId, folderId]
    )
    return result.rows[0]
}

export const getUserNotesById = async userId => {
    const result = await pool.query(
        "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    )
    return result.rows
}

export const createFolderByUserId = async (title, userId) => {
    const result = await pool.query(
        "INSERT INTO folders (name, user_id) VALUES ($1, $2) RETURNING *",
        [title, userId]
    )
    return result.rows[0]
}

export const getFoldersByUserId = async userId => {
    const result = await pool.query(
        "SELECT * FROM folders WHERE user_id = $1",
        [userId]
    )
    return result.rows
}

export const updateNoteById = async (editedNote, noteId) => {
    const result = await pool.query(
        "UPDATE notes SET title = $1, content = $2, folder_id = $3 WHERE id = $4 RETURNING *",
        [editedNote.title, editedNote.content, editedNote.folder_id, noteId]
    )
    return result.rows[0]
}

export const deleteNoteById = async noteId => {
    await pool.query(
        "DELETE FROM notes WHERE id = $1",
        [noteId]
    )
}