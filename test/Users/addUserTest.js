const expect = require('chai').expect;
const chai = require('chai');
const { App_Url, token } = require('../test.utils');
const should = chai.should();
const axios = require('axios')
const { before } = require('mocha');
const { response } = require('express');
const data = require('../../data/Users/addUser.json')


describe('Add User Test Cases', () => {

    it('should add user with valid details', async () => {
        try {
            const response = await axios.post(App_Url + "users", data.AllUserDetails)
            expect(response.status).to.be.equal(201)
            expect(response.data).to.be.an('object')
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
            } else {
                throw error
            }
        }
    });

    it('should add user details without first name', async () => {
        try {
            const response = await axios.post(App_Url + "users", data.UserDetailsWithoutFirstName)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.be.equal('User validation failed: firstName: Path `firstName` is required.')
            } else {
                throw error
            }
        }
    });

    it('should add user details without last name', async () => {
        try {
            const response = await axios.post(App_Url + "users", data.UserDetailsWithoutLastName)
            expect(response.status).to.be.equal(201)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.be.equal('User validation failed: lastName: Path `lastName` is required.')
            } else {
                throw error;
            }
        }
    });

    it('should add user details without email', async () => {
        try {
            const response = await axios.post(App_Url + "users", data.UserDetailsWithoutEmail)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.be.equal('Email address is already in use')
            } else {
                throw error;
            }
        }
    });

    it('should add user details with invalid email', async () => {
        try {
            const response = await axios.post(App_Url + "users", data.EmailWithInvalidValue)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.be.equal('User validation failed: email: Email is invalid')
            } else {
                throw error;
            }
        }
    });

    it('should add user details without password', async () => {
        try {
            const response = await axios.post(App_Url + "users", data.UserDetailsWithoutPassword)
        } catch (error) {
            if (error.response) {
                expect(error.response.status).not.to.be.equal(201)
                expect(error.response.data.message).to.be.equal('User validation failed: password: Path `password` is required.')
            } else {
                throw error;
            }
        }
    });

    it('should add user with password length is less than 7', async () => {
        try {
            const response = await axios.post(App_Url + "users", data.PasswordLengthIsLessThanSeven)
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