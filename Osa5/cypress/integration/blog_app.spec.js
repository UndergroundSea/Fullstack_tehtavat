/// <reference types="cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Chuck Norris',
      username: 'Chuck',
      password: 'joke'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Chuck')
      cy.get('#password').type('joke')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('Chuck Norris logged in')
      cy.contains('create new')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Chuck')
      cy.get('#password').type('random')
      cy.get('#login-button').click()
      cy.contains('Log in to application')
      cy.contains('username')
      cy.contains('password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Chuck')
      cy.get('#password').type('joke')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress42')
      cy.get('#url').type('https://www.test-page.com')
      cy.contains('create blog').click()
      cy.contains('a blog created by cypress')
    })
  })

  describe('Deleting a blog', function() {

    it('deleting own blog', function() {
      cy.get('#username').type('Chuck')
      cy.get('#password').type('joke')
      cy.get('#login-button').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('a second blog created by cypress')
      cy.get('#author').type('Cypress42')
      cy.get('#url').type('https://www.test-page.com')
      cy.contains('create blog').click()
      cy.contains('a second blog created by cypress')
    })
  })
})