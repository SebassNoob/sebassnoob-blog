import { CARDS_PER_PAGE } from './constants';
describe('blog cards', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('/');
  });

  it('should have blog cards', () => {
    cy.get('[data-testid="blog-card"]').should('exist');
  });

  it('should have the correct number of blog cards', () => {
    cy.get('[data-testid="blog-card"]').should(
      'have.length.lte',
      CARDS_PER_PAGE
    );
  });

  it('should navigate to blog post when clicked', () => {
    cy.get('[data-testid="blog-card"]')
      .first()
      .find('a')
      .click()
      .then(() => {
        cy.url().then((url) => {
          expect(url).to.match(/\/blog\/|\/404/);
        });
      });
  });

  it('should have a date', () => {
    // should exist and not say "undefined" or "null" or "Invalid Date"
    cy.get('[data-testid="card-date"]')
      .should('exist')
      .and('not.contain', 'undefined')
      .and('not.contain', 'null')
      .and('not.contain', 'Invalid Date');
  });
});

describe('pagination', () => {
  before(function () {
    cy.visit('/')
      .get('[data-testid="blog-card"]')
      .then((cards) => {
        if (cards.length < CARDS_PER_PAGE) {
          this.skip();
        }
      });
  });
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('/');
  });

  it('should have a next button', () => {
    cy.get('[data-testid="next-button"]').should('exist');
  });

  it('should navigate to the next page when clicked', () => {
    cy.get('[data-testid="next-button"]').click();
    cy.url().should('include', '/page/2');
  });

  it('should have a previous button if not on first page', () => {
    cy.get('[data-testid="next-button"]').click();
    cy.get('[data-testid="previous-button"]').should('exist');
  });

  it('should navigate to the previous page when clicked', () => {
    cy.get('[data-testid="next-button"]').click();
    cy.get('[data-testid="previous-button"]').click();
    cy.url().should('include', '/page/1');
  });
});
