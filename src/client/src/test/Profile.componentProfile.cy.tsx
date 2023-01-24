import React from 'react';
import Profile from '../components/Profile.component';
import { newdummyUser } from '../../cypress/fixtures/dummyUser';
import { CurrentUserContext } from './TestContext';

describe('<Profile />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <CurrentUserContext.Provider
        value={{
          currentUser: newdummyUser,
          setCurrentUser: () => {},
        }}
      >
        <Profile playOrPauseTrackByID={() => {}} />
      </CurrentUserContext.Provider>
    );
  });

  beforeEach(() => {
    cy.mount(
      <CurrentUserContext.Provider
        value={{
          currentUser: newdummyUser,
          setCurrentUser: () => {},
        }}
      >
        <Profile playOrPauseTrackByID={() => {}} />
      </CurrentUserContext.Provider>
    );
  });

  it('renders the user profile pic', () => {
    cy.get('img').should('have.attr', 'src', 'https://i.imgur.com/1Q9ZQ9r.jpg');
  });

  it('renders the username', () => {
    cy.get('#username').should('have.text', '@dummyUser');
  });

  it("renders the user's name", () => {
    cy.get('h1').should('have.text', 'John Doe');
  });

  it('renders the user bio', () => {
    cy.get('#bio').should('have.text', 'I am a dummy user');
  });

  it('renders the user tracks', () => {
    // TODO : add tracks to Profile component
  });
});
