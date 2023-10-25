const chai = require('chai');
const expect = chai.expect
const { App_Url, token } = require('../test.utils');
const should = chai.should();
const axios = require('axios')
const { before } = require('mocha');
const { response } = require('express');
const data = require('../../data/Users/loginCredentials.json')
describe("Login Test Cases", () => {
    it('should login with valid credentials', async () => {
        try {
            const response = await axios.post(App_Url + "users/login",data.ValidCredentials)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
            } else {
                throw error;
            }
        }
    });

    it('should login with invalid credentials', async () => {
        try {
            const response = await axios.post(App_Url + "users/login",data.inValidCredentials)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
            } else {
                throw error;
            }
        }
    })
})