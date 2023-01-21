import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Header from './Header.component';

describe
('my function or component', () => {
  it('Should render Header component', () => {
    render(<Header currentUser={{
      _v : 0,
      _id: '123',
      isNew: false,
      name: 'test',
      email: 'test@gmail.com',
      username: '123',
      profile_pic_path: 'https://i.imgur.com/0y0y0y0.jpg',
      bio: 'test',
      tracks: []
    }} /> , { wrapper: Router });
  });

  beforeEach(() => {
    render(<Header
      currentUser={{
        _v : 0,
        _id: '123',
        isNew: false,
        name: 'test',
        email: 'test@gmail.com',
        username: '123',
        profile_pic_path: 'https://i.imgur.com/0y0y0y0.jpg',
        bio: 'test',
        tracks: []
      }} /> , { wrapper: Router });
  });

  it('Should render an input field when the user clicks on the search icon', () => {
    cy.get('#search').click();
    cy.get('input').should('be.visible');
  })

  it('Should render the user profile picture when the user clicks on the user icon', () => {
    cy.get('#link-to-profile').should('be.visible');
  })

});