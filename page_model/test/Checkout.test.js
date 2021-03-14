import { ClientFunction } from 'testcafe'
import { regularAccUser } from '../roles/Roles'
import { USERINFO } from '../data/Constants'
import CartPage from '../pages/CartPage'
import CheckoutStepOnePage from '../pages/CheckoutStepOnePage'
import CheckoutStepTwoPage from '../pages/CheckoutStepTwoPage'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'

fixture `Checkout feature testing`
    .page `https://www.saucedemo.com/`

test('Continue with missing mail information', async t => {
    await t.useRole(regularAccUser)
    await CartPage.addRandomItemToCart(2)
    await CartPage.navigateToShoppingCart()
    await CartPage.navigateToCheckout()
    await CheckoutStepOnePage.submitCheckoutFormStepOne(USERINFO.MISSING_MAIL_INFORMATION.FIRSTNAME, 
                                                        USERINFO.MISSING_MAIL_INFORMATION.LASTNAME,
                                                        USERINFO.MISSING_MAIL_INFORMATION.POSTALCODE)
    await t
        .expect(CheckoutStepOnePage.errorCheckOutStepOne.exists).ok()
        .expect(CheckoutStepOnePage.errorCheckOutStepOne.textContent)
        .eql('Error: Postal Code is required')
})

test('Fill user\'s information', async t => {
    await t.useRole(regularAccUser)
    await CartPage.addRandomItemToCart(4)
    await CartPage.navigateToShoppingCart()
    await CartPage.navigateToCheckout()
    await CheckoutStepOnePage.submitCheckoutFormStepOne(USERINFO.VALID_INFORMATION.FIRSTNAME, 
                                                        USERINFO.VALID_INFORMATION.LASTNAME,
                                                        USERINFO.VALID_INFORMATION.POSTALCODE)
    const getLocation = ClientFunction(() => document.location.href)
    await t
        .expect(getLocation()).contains('https://www.saucedemo.com/checkout-step-two.html')
})

test('Final order items', async t => {
    await t.useRole(regularAccUser)
    var selectedItemNames = await CartPage.addRandomItemToCart(5)
    await CartPage.navigateToShoppingCart()
    await CartPage.navigateToCheckout()
    await CheckoutStepOnePage.submitCheckoutFormStepOne(USERINFO.VALID_INFORMATION.FIRSTNAME, 
                                                        USERINFO.VALID_INFORMATION.LASTNAME,
                                                        USERINFO.VALID_INFORMATION.POSTALCODE)
    
    // Validates that the item in overview has same name as the item in the inventory
    var overviewItemName = await CheckoutStepTwoPage.itemNamesInOverview()
    if (selectedItemNames.length === overviewItemName.length) {
        selectedItemNames.sort()
        overviewItemName.sort()

        for (let index = 0; index < selectedItemNames.length; index++) {
            await t
                .expect(selectedItemNames[index]).eql(overviewItemName[index])
        }

    } else {
        throw new Error('Returned arrays have different lengths')
    }
})

test('Complete a purchase', async t => {
    await t.useRole(regularAccUser)
    await CartPage.addRandomItemToCart(5)
    await CartPage.navigateToShoppingCart()
    await CartPage.navigateToCheckout()
    await CheckoutStepOnePage.submitCheckoutFormStepOne(USERINFO.VALID_INFORMATION.FIRSTNAME, 
                                                        USERINFO.VALID_INFORMATION.LASTNAME,
                                                        USERINFO.VALID_INFORMATION.POSTALCODE)
    await CheckoutStepTwoPage.completePurchase()
    const getLocation = ClientFunction(() => document.location.href)
    const textCompletePurchase = await CheckoutCompletePage.orderCompleteHeader.textContent
    await t
        .expect(getLocation()).contains('https://www.saucedemo.com/checkout-complete.html')
        .expect(textCompletePurchase.toLowerCase())
            .eql("THANK YOU FOR YOUR ORDER".toLowerCase())

    
})