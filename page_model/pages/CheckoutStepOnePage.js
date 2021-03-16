import { Selector, t } from 'testcafe'

class CheckoutStepOnePage {

    constructor(){
        this.firstNameField = Selector('#first-name')
        this.lastNameField = Selector('#last-name')
        this.postalCodeField = Selector('#postal-code')
        this.continueButton = Selector('.btn_primary.cart_button')
        this.errorCheckOutStepOne = Selector('h3[data-test="error"]')
    }

    async submitCheckoutFormStepOne(firstName, lastName, postalCode){
        await t
            .typeText(this.firstNameField, firstName)
            .typeText(this.lastNameField, lastName)
            .typeText(this.postalCodeField, postalCode)
            .click(this.continueButton)
    }
}

export default new CheckoutStepOnePage()