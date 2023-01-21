describe('login and create user lead to profile page', () => {
  it('connects', () => {
    cy.visit('http://localhost:3000/')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('registers and logs in', () => {
    cy.contains('button', 'Register').click()
    cy.get('#username').type('dummyUser')
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Register').click()

    cy.contains('button', 'Login')
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Login').click()

    cy.get('#name').type('dummyName')
    cy.get('#bio').type('I am a dummy user and I am very good at testing')
    cy.get('label#upload-button').selectFile('./cypress/fixtures/Profile.png')

    // To uncomment when Home page is done
    // cy.contains('button', 'ADD INFO').click()

  })

})