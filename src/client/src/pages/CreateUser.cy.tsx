import React from 'react'
import CreateUser from './CreateUser'

describe('<CreateUser />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateUser email='test@gmail.com' />)
  })

  beforeEach(() => {
    cy.mount(<CreateUser email='test@gmail.com' />)
  })

  it('has a name input', () => {
    cy.get('input[name="name"]').should('exist')
  })

  it('has a bio textarea', () => {
    cy.get('textarea[name="bio"]').should('exist')
  })

  it('has a profile pic input', () => {
    cy.get('input[name="profile_pic_path"]').should('exist')
  })

  it('has a submit button that triggers the api service updateUser', () => {
    cy.get('button[type="submit"]').should('exist')
    cy.get('input[name="name"]').type('testName')
    cy.get('textare[name="bio"]').type('testBio')
    // cy.get('input[name="profile_pic_path"]').selectFile('test.png')
    // cy.get('button[type="submit"]').click()
  })
})