import React from 'react'
import CreateUser from './CreateUser'

describe('<CreateUser />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateUser email='alessio@gmail.com' />)
  })
})