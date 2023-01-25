import React from 'react'
import SideBar from '../components/SideBar.component'

describe('<SideBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SideBar />)
  })
})