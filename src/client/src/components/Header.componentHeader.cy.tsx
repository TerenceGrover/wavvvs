import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Header from './Header.component';

describe
('my function or component', () => {
  it('Should render Header component', () => {
    render(<Header /> , { wrapper: Router });
  });

  beforeEach(() => {
    render(<Header /> , { wrapper: Router });
  });

  it('Should render an input field when the user clicks on the search icon', () => {
    cy.get('#search').click();
    cy.get('input').should('be.visible');
  })

  it('Should render the user profile picture when the user clicks on the user icon', () => {
    cy.get('#link-to-profile').should('be.visible');
  })

});