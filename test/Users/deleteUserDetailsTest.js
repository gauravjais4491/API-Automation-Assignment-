const chai = require('chai');
const expect = chai.expect
const { App_Url, getTokenWithAuthorization, addUser } = require('../test.utils');
const axios = require('axios');
const { el } = require('@faker-js/faker');
const { get } = require('../../router/contact');


let getLoginToken = undefined;
beforeEach(async () => {
    getLoginToken = await getTokenWithAuthorization()
})
describe('Delete User Test', () => {
    it('should delete user with valid token', async () => {
        try {
            const response = await axios.delete(App_Url +"users/me", getLoginToken)
            expect(response.status).to.be.ok
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal('200')
            } else {
                throw error;
            }
        }
        // To balance Parallel Execution
        // i can't put this on afterEach because of the second it block
        await addUser()
    })

    it('should delete user with invalid token', async () => {
        try {
            const response = await axios.delete(App_Url +"users/me", "12345")
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal('200')
                expect(error.response.data.error).to.be.equal('Please authenticate.')
            } else {
                throw error;
            }
        }
    })
})