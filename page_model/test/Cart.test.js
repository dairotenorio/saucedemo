import { ClientFunction } from 'testcafe'
import { regularAccUser } from '../roles/Roles'
import CartPage from '../pages/CartPage'
const itemsInCart = require('../data/items.json')

fixture `Cart feature testing`
    .page `https://www.saucedemo.com/`

test('Navigate to the shopping cart', async t => {
    await t.useRole(regularAccUser)
    await CartPage.navigateToShoppingCart()
    const getLocation = ClientFunction(() => document.location.href)
    await t
        .expect(getLocation()).contains('https://www.saucedemo.com/cart.html')
    
})

itemsInCart.forEach(items => {
    test(`Add ${items.numberOfItems} item(s) to the shopping cart`, async t => {
        // Validates that the cart has a number 1 on the icon
        await t.useRole(regularAccUser)
        var selectedItemNames = await CartPage.addRandomItemToCart(items.numberOfItems)
        var cartSelectedItems = await CartPage.cartSelectedItems()
        await t
            .expect(cartSelectedItems).eql(items.numberOfItems)
    
        // Validates that the cart has only one item inside
        await CartPage.navigateToShoppingCart()
        var cartCounterItems = await CartPage.countItemsInCart()
        await t
            .expect(cartCounterItems).eql(items.numberOfItems)
    
        // Validates that the item in cart has same name as the item in the inventory
        var cartItemName = await CartPage.itemNamesInCart()
        
        if (selectedItemNames.length === cartItemName.length) {

            selectedItemNames.sort()
            cartItemName.sort()

            for (let index = 0; index < selectedItemNames.length; index++) {
                await t
                    .expect(selectedItemNames[index]).eql(cartItemName[index])
                
            }
        } else {
            throw new Error('Returned arrays have different lengths')
        }
        
    })
    
})
