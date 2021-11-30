import {createBrowserHistory} from 'history'
import {BehaviorSubject} from 'rxjs'
import {handleResponse} from '../helpers/handle-response'
import {axiosInstance} from '../helpers/request-helper'
import {URIS} from '../pages/global'
import {Utils} from '../utils/Utils'

const history = createBrowserHistory()

const currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!))

const login = (username: string, password: string) => {
    return axiosInstance.post('/api/users/login', {
        username: username,
        password: password
    })
    .then(handleResponse)
    .then(response => {
        localStorage.setItem('currentUser', JSON.stringify(response))
        return response
    })
}

const logout = (redirectUri: string = URIS.LOGIN) => {
    localStorage.removeItem('currentUser')
    redirectUri && history.push(redirectUri)
    window.location.reload()
}

const isLoggedIn = (): boolean => {
    return currentUser.value !== null
}

const getUserId = (): number => {
    return currentUser.getValue().id
}

const getUserFirstName = (): string => {
    return currentUser.getValue().first_name
}

const getUserFullName = (): string => {
    return Utils.createFullName(currentUser.getValue().first_name, currentUser.getValue().last_name)
}

export const authenticationService = {
    isLoggedIn,
    getUserFirstName,
    getUserFullName,
    getUserId,
    login,
    logout,
}