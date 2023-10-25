const axios = require('axios')
const chai = require('chai');
const expect = chai.expect

const App_Url = "https://thinking-tester-contact-list.herokuapp.com/"

const contactData = require('../data/Contacts/createContacts.json')

const userCredentials = require('../data/Users/loginCredentials.json')

const data = require('../data/Users/addUser.json')



const userLogin = async () => {
    const response = await axios.post(App_Url + "users/login", userCredentials.ValidCredentials)
    expect(response.status).to.be.equal(200)
    return response.data.token
}
const getToken = async () => {
    const token = await userLogin()
    return token
}
const getTokenWithAuthorization = async () => {
    const token = await getToken();
    return { headers: { Authorization: `Bearer ${token}` } };
}

const logoutUser = async (token) => {
    const response = await axios.post(App_Url + "users/logout", token)
    expect(response.status).to.be.equal(200)
}

const createContact = async (token) => {
    const response = await axios.post(App_Url + "contacts", contactData.ValidContact, token)
    expect(response.status).to.be.equal(201)
    return response.data._id
}
const addUser = async () => {
    const response = await axios.post(App_Url + "users", data.AllUserDetails)
    expect(response.status).to.be.equal(201)
    expect(response.data).to.be.an('object')
}

module.exports = {
    App_Url, createContact, getTokenWithAuthorization, userLogin, logoutUser, addUser
}