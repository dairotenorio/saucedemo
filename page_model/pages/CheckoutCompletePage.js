import { Selector, t } from 'testcafe'

class CheckoutCompletePage {

    constructor(){
        this.orderCompleteHeader = Selector('.complete-header')
    }

}

export default new CheckoutCompletePage()