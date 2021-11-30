import {doGet, doPost} from '../helpers/request-helper'
import {AppUser} from '../pages/type'

const baseURL = '/api/users'

const addUser = async (user: AppUser) => {
    return doPost(`${baseURL}`, user)
}

const getUser = async (id: number) => {
    return doGet(`${baseURL}/${id}`)
}

export const userService = {
    addUser,
    getUser,
}