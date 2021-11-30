import {doDelete, doGet, doPost, doPut} from '../helpers/request-helper'
import {Post} from '../pages/type'

const baseURL = '/api/posts'

const addPost = async (post: Post) => {
    return doPost(`${baseURL}`, post)
}

const getAllPosts = async (ownerId: number) => {
    return doGet(`${baseURL}?owner_id=${ownerId}`)
}

const getMyPosts = async (ownerId: number) => {
    return doGet(`${baseURL}?owner_id=${ownerId}`)
}

const deletePost = async (id: number) => {
    return doDelete(`${baseURL}/${id}`)
}

const updatePost = async (id: number, post: Post) => {
    return doPut(`${baseURL}/${id}`, post)
}

export const postService = {
    addPost,
    deletePost,
    getAllPosts,
    getMyPosts,
    updatePost,
}