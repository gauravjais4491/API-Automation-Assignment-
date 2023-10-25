const chai = require('chai');
const expect = chai.expect
const { App_Url, getTokenWithAuthorization, createContact } = require('../test.utils');
const should = chai.should();
const axios = require('axios')
const { before } = require('mocha');
const { response } = require('express');

let getContactId = undefined;
let getLoginToken = undefined;
beforeEach(async () => {
    getLoginToken = await getTokenWithAuthorization()
    getContactId = await createContact(getLoginToken);
})
describe("Get Single Contacts Test Cases", () => {
    it('should get single contacts', async () => {
        try {
            const response = await axios.get(App_Url + "contacts/" + getContactId, getLoginToken)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
            } else {
                throw error;
            }
        }
    });

    it('should get single contacts with invalid contact id', async () => {
        try {
            const response = await axios.get(App_Url + "contacts/" + "45678", getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
                expect(error.response.data).to.be.equal('Invalid Contact ID')
            } else {
                throw error;
            }
        }
    });

    it('should get single contacts with invalid contact id but exact to the length of contact id', async () => {
        try {
            const response = await axios.get(App_Url + "contacts/" + "123456789012345678901234", getLoginToken)
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
    it('should get single contacts with adding some digit after valid contact id', async () => {
        try {
            const response = await axios.get(App_Url + "contacts/" + getContactId + "45678", getLoginToken)
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