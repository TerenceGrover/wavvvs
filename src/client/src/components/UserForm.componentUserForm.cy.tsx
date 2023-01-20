import React from 'react'
import UserForm from './UserForm.component'

describe('<UserForm />', () => {

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserForm />)
  })

  beforeEach(() => {
    cy.mount(<UserForm />)
  })

  it('Clicking each buttons hide the others', () => {

    // Check that Go Back is hidden
    cy.get('button').contains('Go back').should('have.class', 'hidden')
    cy.get('form').should('have.class', 'hidden')
    // Check clicking assigns the correct value to the clicked state
    cy.get('button').contains('Login').click()
    //check that the register button has the className hidden and the form doesn't have the className hidden
    cy.get('button').contains('Register').should('have.class', 'hidden')
    cy.get('form').should('not.have.class', 'hidden')
    // repeat for the other button
    cy.get('button').contains('Go back').click()
    cy.get('form').should('have.class', 'hidden')
    //check that the login button has the className hidden
    cy.get('button').contains('Register').click()
    cy.get('button').contains('Login').should('have.class', 'hidden')
    cy.get('form').should('not.have.class', 'hidden')

  })

  //Test that inputting text into the form changes the state
  it('Inputting text into the form changes the state', () => {
    cy.get('button').contains('Login').click()
    cy.get('#username').type('testuser')
    cy.get('#username').should('have.value', 'testuser')
    cy.get('#password').type('testpassword')
    cy.get('#password').should('have.value', 'testpassword')
    cy.get('button').contains('Login').click()
    // Get the console.log from the handleSubmit function
    cy.window().its('console').invoke('log', 'test')
  })

})