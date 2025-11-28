/// <reference types="cypress" />

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');

    // Set fake tokens
    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'fakeAccessToken');
      win.localStorage.setItem('refreshToken', 'fakeRefreshToken');
    });

    cy.visit('/');
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem('accessToken');
      win.localStorage.removeItem('refreshToken');
    });
  });

  it('should load ingredients', () => {
    cy.wait('@getIngredients');
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('should add bun to constructor', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="bun"]').first().find('button').click();
    cy.get('[data-cy="constructor-bun-top"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', 'Краторная булка N-200i');
  });

  it('should add main ingredient to constructor', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="main"]').first().find('button').click();
    cy.get('[data-cy="constructor-ingredients"]').should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('should add sauce to constructor', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="sauce"]').first().find('button').click();
    cy.get('[data-cy="constructor-ingredients"]').should('contain', 'Соус Spicy-X');
  });

  it('should open and close ingredient modal', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="bun"]').first().find('img').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');

    // Close by clicking cross
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should close modal by clicking overlay', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="bun"]').first().find('img').click();
    cy.get('[data-cy="modal"]').should('be.visible');

    // Close by clicking overlay
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should create order successfully', () => {
    cy.wait('@getIngredients');

    // Add bun
    cy.get('[data-cy="bun"]').first().find('button').click();

    // Add main ingredient
    cy.get('[data-cy="main"]').first().find('button').click();

    // Click order button
    cy.get('[data-cy="order-button"]').click();

    // Check order modal appears
    cy.wait('@createOrder');
    cy.get('[data-cy="order-modal"]').should('be.visible');
    cy.get('[data-cy="order-modal"]').should('contain', '12345');

    // Close order modal
    cy.get('[data-cy="order-modal-close"]').click();
    cy.get('[data-cy="order-modal"]').should('not.exist');

    // Check constructor is cleared
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]').should('be.empty');
  });
});
