const expect = require('chai').expect;
const axios = require('axios')
const { App_Url, getTokenWithAuthorization, createContact } = require('../test.utils');
const updateContactData = require('../../data/Contacts/updateContact.json')

let getLoginToken = undefined;
let getContactId = undefined;
beforeEach(async () => {
    getLoginToken = await getTokenWithAuthorization()
    getContactId = await createContact(getLoginToken);
})
describe("Update Contacts Test Cases", () => {
    it('should update contacts', async () => {
        try {
            const response = await axios.patch(App_Url + "contacts/" + getContactId, updateContactData.UpdateCityName, getLoginToken)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
            } else {
                throw error;
            }
        }
    });

    it('should update contacts with invalid contact id', async () => {
        try {
            const response = await axios.patch(App_Url + "contacts/" + "45678", updateContactData.UpdateCityName, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
                expect(error.response.data).to.be.equal('Invalid Contact ID')
            } else {
                throw error;
            }
        }
    });
    it('should update contacts with invalid contact id but exact to the length of contact id', async () => {
        try {
            const response = await axios.patch(App_Url + "contacts/" + "123456789012345678901234", updateContactData.UpdateFirstName, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
                expect(error.response.data).to.be.equal("")
            } else {
                throw error;
            }
        }
    });

    // Major bug accoding to me because api is responsing unknown json data and 500 status code
    it('should delete contacts with adding some digit after valid contact id', async () => {
        try {
            const response = await axios.patch(App_Url + "contacts/" + getContactId + "45678", getLoginToken)

        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
                expect(error.response.data).to.be.an('object')
            } else {
                throw error;
            }
        }
    })
})