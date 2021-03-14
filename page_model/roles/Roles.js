import { Role } from 'testcafe';
import { CREDENTIALS } from '../data/Constants'
import LoginPage from '../pages/LoginPage'

export const regularAccUser = Role('https://www.saucedemo.com/', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
}, { preserveUrl: true })