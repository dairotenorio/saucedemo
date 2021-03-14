import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    VALID_USER: {
        //USERNAME: process.env.USERNAME, // For Mac works well but is disabled because Windows takes the user from the system
        //PASSWORD: process.env.PASSWORD // For Mac works well but is disabled because Windows takes the password from the system
        USERNAME: 'standard_user',
        PASSWORD: 'secret_sauce'
    },
    INVALID_USER: {
        USERNAME: 'invalid_user',
        PASSWORD: 'invalid_password'
    }
}

export const USERINFO = {
    VALID_INFORMATION: {
        FIRSTNAME: 'First Name',
        LASTNAME: 'Last Name',
        POSTALCODE: '0005666'
    },

    MISSING_MAIL_INFORMATION: {
        FIRSTNAME: 'First Name',
        LASTNAME: 'Last Name',
        POSTALCODE: ''
    }
}