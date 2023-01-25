import React from 'react'
import SideBarButton from '../components/SideBarButton.component'
import { AiFillHome } from 'react-icons/ai';


describe('Renders both text and icon', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SideBarButton icon={<AiFillHome />} text='zob' />)
  })

  beforeEach(() => {
    cy.mount(<SideBarButton icon={<AiFillHome />} text='zob' />)
  })

  it('renders text', () => {
    cy.get('span').contains('zob')
  })

  it('renders icon', () => {
    cy.get('svg')
  })

})

describe('buttons should be clickable', () => {
  beforeEach(() => {
    cy.mount(<SideBarButton icon={<AiFillHome />} text='zob' />)
  })

  it('clicks the button', () => {
    cy.get('button').click()
  })

})