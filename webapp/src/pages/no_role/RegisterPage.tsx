import React, {useState} from 'react'
import {Container, FormControl, Link, TextField} from '@material-ui/core'
import {LABELS, URIS} from '../global'
import {AppButton} from '../../styled-mui-custom'
import {AppUser} from '../type'
import {userService} from '../../services/UserService'

export const RegisterPage = () => {
    const EMPTY = ''
    const [firstName, setFirstName] = useState<string>(EMPTY)
    const [lastName, setLastName] = useState<string>(EMPTY)
    const [username, setUsername] = useState<string>(EMPTY)
    const [password, setPassword] = useState<string>(EMPTY)

    const register = () => {
        const data: AppUser = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            disabled: false,
            password: password,
        }

        userService.addUser(data)
            .then(() => alert('Successfully registered!'))
            .catch(() => alert('Error, please try again later!'))
    }

    const isValid = () => {
        let isValid = true

        if (firstName === EMPTY) isValid = false
        if (lastName === EMPTY) isValid = false
        if (username === EMPTY) isValid = false
        if (password === EMPTY) isValid = false

        return isValid
    }

    return (
        <div className={'login-container'}>
            <Container className={'form-container'} maxWidth={'xs'}>
                <form onSubmit={register}>
                    <FormControl className={'form-text-field-control'} margin={'normal'} component={'div'}>
                        <TextField
                            label={LABELS.FIRST_NAME}
                            variant={'outlined'}
                            onChange={event => setFirstName(event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={'form-text-field-control'} margin={'normal'} component={'div'}>
                        <TextField
                            label={LABELS.LAST_NAME}
                            variant={'outlined'}
                            onChange={event => setLastName(event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={'form-text-field-control'} margin={'normal'} component={'div'}>
                        <TextField
                            label={LABELS.USERNAME}
                            variant={'outlined'}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={'form-text-field-control'} margin={'normal'} component={'div'}>
                        <TextField
                            label={LABELS.PASSWORD}
                            variant={'outlined'}
                            type={'password'}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </FormControl>
                    <AppButton
                        type={'submit'}
                        className={'form-button'}
                        variant={'contained'}
                        color={'primary'}
                        disabled={!isValid()}
                    >
                        {LABELS.REGISTER}
                    </AppButton>
                    <Link href={URIS.LOGIN}>{LABELS.BACK_TO_LOGIN}</Link>
                </form>
            </Container>
        </div>
    )
}