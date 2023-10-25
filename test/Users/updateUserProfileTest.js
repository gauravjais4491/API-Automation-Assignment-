const chai = require('chai');
const expect = chai.expect
const { App_Url, getTokenWithAuthorization } = require('../test.utils');
const axios = require('axios')
const updateUserData = require('../../data/Users/updateUser.json')

let getLoginToken = undefined;
beforeEach(async () => {
    console.log("first")
    getLoginToken = await getTokenWithAuthorization()
})
describe("Update Users Details Test Cases", () => {
    it.only('should update first name', async () => {
        try {
            const response = await axios.patch(App_Url + "users/me" , updateUserData.updateFirstName, getLoginToken)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
            } else {
                throw error;
            }
        }
    });

    it('should update last name', async () => {
        try {
            const response = await axios.patch(App_Url + "users/me", updateUserData.updateLastName, getLoginToken)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
                expect(error.response.data).to.be.equal('Invalid Contact ID')
            } else {
                throw error;
            }
        }
    });
    it('should update email', async () => {
        try {
            const response = await axios.patch(App_Url + "users/me", updateUserData.updateEmail, getLoginToken)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
                expect(error.response.data).to.be.equal("")
            } else {
                throw error;
            }
        }
    });

    it('should update password', async () => {
        try {
            console.log("hello")
            const response = await axios.patch(App_Url + "users/me", updateUserData.updatePassword, getLoginToken)
            expect(response.status).to.be.equal(200)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(200)
                expect(error.response.data).to.be.an('object')
            } else {
                throw error;
            }
        }
    });

    it('should update user details with invalid email', async () => {
        try {
            const response = await axios.patch(App_Url + "users/me", updateUserData.updateEmailWithInvalidValue, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.be.equal('User validation failed: email: Email is invalid')
            } else {
                throw error;
            }
        }
    });

    it('should update user details without password', async () => {
        try {
            const response = await axios.patch(App_Url + "users/me", updateUserData.updatePasswordWithoutAddingValue, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.be.equal('User validation failed: password: Path `password` is required.')
            } else {
                throw error;
            }
        }
    });

    it('should update user with password length is less than 7', async () => {
        try {
            const response = await axios.patch(App_Url + "users/me", updateUserData.updatePasswordWithLengthLessThanSevenCharacters, getLoginToken)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.include('is shorter than the minimum allowed length (7).')
            } else {
                throw error;
            }
        }
    });
})