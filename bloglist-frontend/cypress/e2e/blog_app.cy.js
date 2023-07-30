/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'osku',
      name: 'Oskari Aalto',
      password: 'salainen'
    }
    cy.request('POST','http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  it('can login', function() {
    cy.get('#username').type('osku')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Oskari Aalto logged in')
  })

  it('error if wrong password', function() {
    cy.get('#username').type('osku')
    cy.get('#password').type('sala')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'osku', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Wonderfull')
      cy.get('#author').type('Mato')
      cy.get('#url').type('hei.fi')

      cy.get('#create-button').click()
      cy.get('#blog')
    })

    describe('and some blogs exists', function() {
      beforeEach(function (){
        cy.createBlog({ title:'First blog', author: 'first', url: 'moi' })
        cy.createBlog({ title:'Second blog', author: 'second', url: 'moi' })
        cy.createBlog({ title:'Third blog', author: 'third', url: 'moi' })
      })

      it('like button works', function () {
        cy.contains('Second blog').parent()
          .find('#show-button').as('jee')
          .get('@jee').click()

        cy.contains('Second blog').parent().find('#like-button').as('like')
        cy.get('@like').click()
        cy.contains('likes 1')
      })

      it('remove button works', function() {
        cy.contains('Second blog').parent()
          .find('#show-button').as('jee')
          .get('@jee').click()

        cy.contains('Second blog').parent().find('#remove-button').as('remove')
        cy.get('@remove').click()
        cy.should('not.contain','Second blog')
      })

      it('blogs are in the right order', async function() {
        cy.contains('Second blog').parent().find('#like-button').as('second')
        await cy.get('@second').dblclick({ force: true }).dblclick({ force: true })
        cy.contains('Third blog').parent().find('#like-button').as('third')
        await cy.get('@third').dblclick({ force: true })

        cy.get('.blog').eq(0).should('contain', 'Second blog')
        cy.get('.blog').eq(1).should('contain', 'Third blog')
      })
    })
  })
})