import express from 'express'
import {addRow, deleteRow, updateRow} from '../crud.js'
import pool from '../db.js'

const router = express.Router()

const tableName = 'posts'

router.get('/', (req, res) => {
    const { owner_id } = req.query

    getAllPublicPosts(owner_id).then(result => res.json(result))
})

router.post('/', (req, res) => {
    const {owner_id, post, is_public} = req.body

    const data = [owner_id, post, is_public]

    addRow(tableName, data).then(result =>
        result ?
            res.status(201).send(`Post successfully added!`)
            :
            res.status(409).send('Post not added!')
    )
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    deleteRow(tableName, id).then(result =>
        result ?
            res.status(200).send('Post successfully deleted!')
            :
            res.status(404).send('Post not deleted!')
    )
})

router.put('/:id', (req, res) => {
    const id = req.params.id

    const {owner_id, post, is_public} = req.body

    const data = [id, owner_id, post, is_public]

    updateRow(tableName, data).then(result =>
        result ?
            res.status(200).send('Post successfully updated!')
            :
            res.status(404).send('Post not updated!')
    )
})

const getAllPublicPosts = async (owner_id) => {
    try {
        const result = await pool.query(`
            SELECT *, p.id as post_id from posts p
            left join users u on p.owner_id = u.id
            WHERE p.is_public = true OR p.owner_id=${owner_id}
            ORDER by p.created_at DESC
        `)

        return result.rows.map(row => convert(row))
    } catch (err) {
        console.error(err.message)
    }
}

const convert = (post) => {
    return {
        id: post.post_id,
        post: post.post,
        created_at: post.created_at,
        is_public: post.is_public,
        user: {
            id: post.owner_id,
            first_name: post.first_name,
            last_name: post.last_name,
            username: post.username,
        }
    }
}

export default router