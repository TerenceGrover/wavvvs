describe('template spec', () => {
  it('connects', () => {
    cy.visit('http://localhost:3000/')
  })

})

beforeEach(() => {
  cy.visit('http://localhost:3000/')
})

describe('Should have the basic functionalities in case all goes well for registration and login', () => {

  it('redirects to login on complete and correct input of the fields', () => {
    cy.contains('button', 'Register').click()
    cy.get('#username').type('dummyUser')
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Register').click()
    cy.get('#username').should('have.class', 'hidden')
  })

  it('redirects to newUser when login correctly', () => {
    cy.contains('button', 'login').click()
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'login').click()
  })

})

describe.only('Should refuse wrong inputs in any fiels', () => {

  it('should refuse wrong username', () => {
    cy.contains('button', 'Register').click()
    cy.get('#username').type('x')
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Register').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Username must be at least 3 characters long and contain only letters and numbers')
    })
  })

  it('should refuse wrong email', () => {
    cy.contains('button', 'Register').click()
    cy.get('#username').type('dummyUser')
    cy.get('#email').type('dummyUser')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Register').click()
    //check if the error message is displayed as a navigator alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email must contain @ and contain only letters and numbers')
    })
  })

  it('should refuse wrong password', () => {
    cy.contains('button', 'Register').click()
    cy.get('#username').type('dummyUser')
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dum')
    cy.contains('button', 'Register').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password must be at least 8 characters long and contain only letters and numbers')
    })
  })
})