describe('sanity check', () => {
  it('ping server', () => {
    cy.request('/').should((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('check if anything renders', () => {
    cy.visit('/');
    cy.get('body').should('exist');
  });
});
