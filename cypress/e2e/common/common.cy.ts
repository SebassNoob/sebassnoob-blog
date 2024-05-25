describe('check page layout common elements', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('/');
  });

  it('should have a header', () => {
    cy.get('header').should('exist');
  });

  it('should have a footer', () => {
    cy.get('footer').should('exist');
  });
});

describe('theme toggle', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('/');
  });

  // should have a theme toggle button
  it('should have a theme toggle button', () => {
    cy.get('[data-testid="theme-toggle"]').should('exist');
  });

  it('toggles dark theme when clicked', () => {
    cy.get('[data-testid="theme-toggle"]')
      .click()
      .then(($btn) => {
        cy.get('html').should('have.class', 'dark');
        expect($btn.find('img').attr('alt')).to.equal('light mode');
      });
  });

  it('toggles to light theme when clicked again', () => {
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('[data-testid="theme-toggle"]')
      .click()
      .then(($btn) => {
        cy.get('html').should('not.have.class', 'dark');
        expect($btn.find('img').attr('alt')).to.equal('dark mode');
      });
  });

  it('local storage should persist theme', () => {
    cy.get('[data-testid="theme-toggle"]')
      .click()
      .then(() => {
        cy.reload();
        const theme = localStorage.getItem('theme');
        expect(theme).to.equal('dark');
      });
  });
});
