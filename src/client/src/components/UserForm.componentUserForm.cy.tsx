import React from 'react'
import UserForm from './UserForm.component'

describe('<UserForm />', () => {

  // Create a setstate function to pass to the component that has a dispatch function
  //
  const setIsAuth = () => {
    return {
      dispatch: () => {}
    }
  }

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserForm setIsAuth={setIsAuth} setIsNewUser={setIsAuth} />)
  })

  beforeEach(() => {
    cy.mount(<UserForm setIsAuth={setIsAuth} setIsNewUser={setIsAuth} />)
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

})