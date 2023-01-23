import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Header from './Header.component';
import { newdummyUser } from '../../cypress/fixtures/dummyUser';

describe
('my function or component', () => {
  it('Should render Header component', () => {
    render(<Header currentUser={newdummyUser} /> , { wrapper: Router });
  });

  beforeEach(() => {
    render(<Header
      currentUser={newdummyUser} /> , { wrapper: Router });
  });

  it('Should render an input field when the user clicks on the search icon', () => {
    cy.get('#search').click();
    cy.get('input').should('be.visible');
  })

  it('Should render the user profile pic', () => {
    cy.get('#user-profile-pic').should('have.attr', 'src').and('include', 'https://www.cloudinary.com')
  })

  it('Should redirects to the profile page when the user clicks on the user icon', () => {
    cy.get('#link-to-profile').should('be.visible');
  })
  
  // TO DO WHEN 

  it('Should do nothing when the menu icon is pressed ... For now', () => {
    cy.get('#hamburger-menu').click();
    cy.wait(500);
    // ADD HERE WHAT IT SHOULD DO
  })

});