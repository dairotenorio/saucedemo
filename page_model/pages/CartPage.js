import { Selector, t } from 'testcafe'
import InventoryPage from '../pages/InventoryPage'
import BasePage from '../pages/BasePage'

class CartPage {

    constructor(){
        this.cartIcon = Selector('.shopping_cart_link')
        this.cartCounter = Selector('.fa-layers-counter')
        this.cartList = Selector('.cart_list')
        this.cartItemName = function(index){
            return Selector(`.cart_item:nth-child(${index}) .inventory_item_name`)}
        this.checkoutButton = Selector('.btn_action.checkout_button')
    }

    async navigateToShoppingCart(){
        await t.click(this.cartIcon)
    }

    async addRandomItemToCart(quantity){
        var inventoryListSize = await InventoryPage.inventoryList.childElementCount
        var listSelectedItemNames = [] // will contain the names of the selected items
        if (quantity > 0 && quantity <= inventoryListSize) {
            var listRandomIndexes = [] // will contain the randon items to select
            switch (quantity) {
                case inventoryListSize:
                    // All items are selected one by one
                    var items = 1
                    while (items <= quantity) {
                        listRandomIndexes.push(items)
                        items++
                    }
                    // Starts from 1 because index is used in nth-child which starts from 1
                    for (let index = 1; index <= listRandomIndexes.length; index++) {
                        var inventoryItemName = await InventoryPage.inventoryItemName(index).textContent
                        listSelectedItemNames.push(inventoryItemName)
                        await t.click(InventoryPage.inventoryItem(index))
                    }
                    break
                case 1:
                    // A random index is generated to select random items each time the test runs
                    var index =  BasePage.getRandomInt(inventoryListSize)
                    var inventoryItemName = await InventoryPage.inventoryItemName(index).textContent
                    listSelectedItemNames.push(inventoryItemName)
                    await t.click(InventoryPage.inventoryItem(index))
                    break
                default:
                    // Generates random indexes to select random items each time the test runs
                    var items = 1
                    while (items <= quantity) {
                        var randomInt =  BasePage.getRandomInt(inventoryListSize)
                        while (listRandomIndexes.includes(randomInt)) {
                            randomInt =  BasePage.getRandomInt(inventoryListSize)
                        }
                        listRandomIndexes.push(randomInt)
                        items++
                    }
                    // Adding random items based on the random indexes
                    for (let index = 0; index < listRandomIndexes.length; index++) {
                        var inventoryItemName = await InventoryPage
                            .inventoryItemName(listRandomIndexes[index]).textContent
                        listSelectedItemNames.push(inventoryItemName)
                        await t.click(InventoryPage.inventoryItem(listRandomIndexes[index]))
                    }
                    break
            }
            return listSelectedItemNames

        } else {
            throw new Error('Number of items to add is incorrect')
        }

    }

    async cartSelectedItems(){
        try {
            var countSelectedItems = await this.cartCounter.textContent
            return parseInt(countSelectedItems)
        } catch (error) {
            throw new Error('No selected items')
        }
    }

    async countItemsInCart(){
        var countItemsInCart = await this.cartList.childElementCount
        return parseInt(countItemsInCart) - 2 // Cart list has two additional items: quantity and description
    }

    async itemNamesInCart(){
        var itemsNameInCart = []
        var countItemsInCart = await this.cartList.childElementCount
        if (countItemsInCart < 3) {
            throw new Error('There are no items in cart')
        } else {
            for (let index = 3; index <= countItemsInCart; index++) {
                var itemName = await this.cartItemName(index).textContent
                itemsNameInCart.push(itemName)
            }
        }
        return itemsNameInCart
    }

    async navigateToCheckout(){
        await t.click(this.checkoutButton)
    }

}

export default new CartPage()