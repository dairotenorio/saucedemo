import { ClientFunction } from 'testcafe'
import LoginPage from '../pages/LoginPage'
import { CREDENTIALS } from '../data/Constants'
import { regularAccUser } from '../roles/Roles'

fixture `Login feature testing`
    .page `https://www.saucedemo.com/`

test('Login with a valid user', async t => {
    await t.useRole(regularAccUser)
    const getLocation = ClientFunction(() => document.location.href)
    await t
        .expect(getLocation()).contains('https://www.saucedemo.com/inventory.html')
    
})

test('Login with an invalid user', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD)
    await t
        .expect(LoginPage.errorMessage.exists).ok()
        .expect(LoginPage.errorMessage.textContent)
        .eql('Epic sadface: Username and password do not match any user in this service')
})