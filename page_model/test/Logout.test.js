import InventoryPage from '../pages/InventoryPage'
import LoginPage from '../pages/LoginPage'
import { regularAccUser } from '../roles/Roles'

fixture `Logout feature testing`

test('Logout from product\'s page', async t => {
    await t.useRole(regularAccUser)
        await InventoryPage.logout()
        await t.expect(LoginPage.loginButton.exists).ok()
})