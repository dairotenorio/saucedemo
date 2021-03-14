// This class will contain everything transversal to all pages
class BasePage {

    // Returns a number between 1 and max, both inclusive
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

}

export default new BasePage()