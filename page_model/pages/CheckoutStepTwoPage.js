import { Selector, t } from 'testcafe'

class CheckoutStepTwoPage {

    constructor(){
        this.overviewList = Selector('.cart_list')
        this.overviewItemName = function(index){
            return Selector(`.cart_item:nth-child(${index}) .inventory_item_name`)}
        this.finishButton = Selector('.btn_action.cart_button')
    }

    async itemNamesInOverview(){
        var itemsNameInOverview = []

        var countItemsInOverview = await this.overviewList.childElementCount

        if (countItemsInOverview < 3) {
            throw new Error('There are no items in overview')
        } else {
            for (let index = 3; index <= countItemsInOverview; index++) {
                var itemName = await this.overviewItemName(index).textContent
                itemsNameInOverview.push(itemName)
            }
        }
        return itemsNameInOverview
    }

    async completePurchase(){
        await t
            .click(this.finishButton)
    }

}

export default new CheckoutStepTwoPage()