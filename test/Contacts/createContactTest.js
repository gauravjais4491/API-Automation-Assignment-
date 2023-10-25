const expect = require('chai').expect;
const { App_Url, getTokenWithAuthorization, logoutUser } = require('../test.utils');
const axios = require('axios')
const createContactData = require('../../data/Contacts/createContacts.json')

var getLoginToken = undefined;
beforeEach(async () => {
    getLoginToken = await getTokenWithAuthorization()
})
describe('Create User Test Cases', () => {
    it('should create user contacts with all details', async () => {
        try {
            const response = await axios.post(App_Url + "contacts", createContactData.ValidContact, getLoginToken)
            expect(response.status).to.be.equal(201)
            expect(response.data).to.be.an('object')

        } catch (error) {
            if (error.response) {
                console.log(error.response.status)
                expect(error.response.status).not.to.be.equal(201)
            }
            else {
                throw error;
            }
        }
    });

    it('should create user contacts with invalid birthdayDate', async () => {
        try {
            let response = await axios.post(App_Url + "contacts", createContactData.ContactWithInvalidBirthdayDate, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.data.message).to.equal('Contact validation failed: birthdate: Birthdate is invalid')
                expect(error.response.status).not.to.be.equal(201)
            }
            else {
                throw error;
            }
        }
    });

    it('should create user contacts with phone number less than or equal to 5 digit', async () => {
        try {
            const response = await axios.post(App_Url + "contacts", createContactData.PhoneNumberIsLessThanOrEqualsToFiveDigit, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.data.message).to.be.equal('Contact validation failed: phone: Phone number is invalid')
                expect(error.response.status).not.to.be.equal(201)
            }
            else {
                throw error;
            }
        }
    });

    it('should create user contacts with phone number more than five digit and less than or equals to twelve', async () => {
        try {
            const response = await axios.post(App_Url + "contacts", createContactData.PhoneNumberIsMoreThanFiveDigitButLessThanOrEqualsToTwelevDigit, getLoginToken)
            expect(response.status).to.be.equal(201)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
            }
            else {
                throw error;
            }
        }
    });

    it('should create user contacts with phone number more than twelve digit and less than or equals to equals to fifteen', async () => {
        try {
            const response = await axios.post(App_Url + "contacts", createContactData.PhoneNumberIsMoreThanTwelveDigitButLessThanOrEqualsToFifteenDigit, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.data.message).to.be.equal('Contact validation failed: phone: Phone number is invalid')
                expect(error.response.status).not.to.be.equal(201)
            }
            else {
                throw error;
            }
        }
    });

    it('should create user contacts with phone number more than fiftteen digit', async () => {
        try {
            const response = await axios.post(App_Url + "contacts", createContactData.PhoneNumberIsMoreThanFifteenDigit, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.data.message).to.include('is longer than the maximum allowed length (15).')
                expect(error.response.status).not.to.be.equal(201)
            }
            else {
                throw error;
            }
        }
    });


    it('should create user contact without firstname and last name', async () => {
        try {
            const response = await axios.post(App_Url + "contacts", createContactData.ContactsWithoutFirstNameAndLastName, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.data.message).to.be.equal("Contact validation failed: lastName: Path `lastName` is required., firstName: Path `firstName` is required.")
                expect(error.response.status).not.to.be.equal(201)
            }
            else {
                throw error;
            }
        }
    });
})

// afterEach(async () => {
//     await logoutUser(getLoginToken)
// })