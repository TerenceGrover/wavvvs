describe('login and create user leads to Home page', () => {
  it('connects', () => {
    cy.visit('http://localhost:3000/')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('registers and logs in.', () => {
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

    cy.contains('button', 'ADD INFO').click()
    cy.wait(1000)

  })


  // WAIT FOR FUCKING ALESSIO TO FIX THE LOGIN FUNCTIONALITY TO RECEIVE THE
  // CORRECT RESPONSE FROM THE BACKEND FOR THE ISNEWUSER PROPERTY
  // it('user is redirected correctly to the home page and the profile picture should render correctly on the header' , () => {
  //   cy.contains('button', 'Login').click()
  //   cy.get('#email').type('dummyUser@gmail.com')
  //   cy.get('#password').type('dummyUser')
  //   cy.contains('button', 'Login').click()

  //   cy.contains('img').should('have.attr', 'src', '../fixtures/Profile.png').should('be.visible');
  
  // })

})