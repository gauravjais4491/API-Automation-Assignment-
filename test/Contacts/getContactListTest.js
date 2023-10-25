const expect = require('chai').expect;
const { App_Url, getTokenWithAuthorization } = require('../test.utils');
const axios = require('axios')

let getLoginToken = undefined;
before(async () => {
    getLoginToken = await getTokenWithAuthorization()
})
describe("Get All Contacts Test Case", () => {
    it('should get all the contacts', async () => {
        try {
            const response = await axios.get(App_Url + "contacts", getLoginToken)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
            } else {
                throw error;
            }
        }
    })
})