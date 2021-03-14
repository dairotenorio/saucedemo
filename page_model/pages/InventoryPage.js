import { Selector, t } from 'testcafe'

class InventoryPage {

    constructor(){
        this.menuButton = Selector('#react-burger-menu-btn')
        this.logoutButton = Selector('#logout_sidebar_link')
        this.inventoryList = Selector('.inventory_list')
        this.inventoryItemName = function(index){
            return Selector(`.inventory_item:nth-child(${index}) .inventory_item_name`)}
        this.inventoryItem = function(index){
            return Selector(`.inventory_item:nth-child(${index}) .pricebar .btn_primary`)}
        
    }

    async logout(){
        await t
            .click(this.menuButton)
            .click(this.logoutButton)
    }

}

export default new InventoryPage()