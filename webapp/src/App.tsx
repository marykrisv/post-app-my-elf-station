import {createTheme, MuiThemeProvider} from '@material-ui/core'
import {Redirect, Route, Switch} from 'react-router-dom'
import './App.scss'
import {URIS} from './pages/global'
import {LoginPage} from './pages/no_role/LoginPage'
import {authenticationService} from './services/AuthenticationService'
import {RegisterPage} from './pages/no_role/RegisterPage'
import {HomePage} from './pages/authenticated_role/HomePage'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1abc9c',
        },
        secondary: {
            main: '#d35400',
        },
    },
})

const NoRole = () => (
    <Switch>
        <Route path={URIS.LOGIN}>
            <LoginPage/>
        </Route>
        <Route path={URIS.REGISTER}>
            <RegisterPage/>
        </Route>
        <Redirect to={URIS.LOGIN} />
    </Switch>
)

const AuthenticatedRole = () => (
    <Switch>
        <Route path={URIS.POSTS}>
            <HomePage />
        </Route>
        <Redirect to={URIS.POSTS} />
    </Switch>
)

export const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Switch>
                { !authenticationService.isLoggedIn() && <NoRole/> }
                { authenticationService.isLoggedIn() && <AuthenticatedRole /> }
            </Switch>
        </MuiThemeProvider>
    )
}