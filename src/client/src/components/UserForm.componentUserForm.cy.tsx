import React from 'react'
import UserForm from './UserForm.component'

describe('<UserForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserForm />)
  })
})