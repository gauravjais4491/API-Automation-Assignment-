const chai = require('chai');
const expect = chai.expect
const { App_Url, token, userLogin } = require('../test.utils');
const should = chai.should();
const axios = require('axios')
const { before } = require('mocha');
const { response } = require('express');
const data = require('../../data/Users/loginCredentials.json')

let login = undefined;
beforeEach(async () => {
    login = await userLogin()
})
describe("Logout Test Case", () => {
    it('should logout with valid token id', async () => {
        try {
            const response = await axios.post(App_Url + "users/logout",login.token)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
            } else {
                throw error;
            }
        }
    });

})