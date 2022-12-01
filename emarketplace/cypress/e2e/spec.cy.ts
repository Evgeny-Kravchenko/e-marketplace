const login = (): void => {
  cy.url().should('include', '/login');
  cy.get('[name=email]').type('Danya@mail.ru').should('have.value', 'Danya@mail.ru');
  cy.get('[name=password]').type('BlBl1111').should('have.value', 'BlBl1111');
  cy.get('button[type=submit]').click();
};

describe('Login', () => {
  it('successfully', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();

    login();
    cy.reload();
  });

  it('after users tries to place an order and they are not logged in they go to login and then redirected to shipping page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').eq(1).contains('Add to cart').click();
    cy.contains('Checkout').click();
    login();
    cy.contains('Shipping Address');
  });
});

describe('user inputs delivery info and ');
