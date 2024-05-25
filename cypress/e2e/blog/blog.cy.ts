import { TEST_SLUG, SMALL_SCREEN_WIDTH } from './constants';
describe('blog page', () => {
  it('should redirect to 404 page if slug is undefined', () => {
    cy.visit('/blog/');
    // get the body of the page and check if it contains the text '404'
    cy.get('body').contains('404');
  });

  it('should redirect to 404 page if slug is not found', () => {
    cy.visit('/blog/nonexistent-post');
    cy.url().should('include', '/404');
  });

  it('should go back to home page when escape key is pressed', () => {
    cy.visit(`/blog/${TEST_SLUG}`);
    cy.get('[data-testid="blog-content"]').should('exist'); // ensure the page has loaded
    cy.get('body').focus().type('{esc}'); // force focus and press escape
    cy.url().should('not.include', '/blog/');
  });

  it('should be responsive', () => {
    cy.visit(`/blog/${TEST_SLUG}`);
  
    cy.viewport(SMALL_SCREEN_WIDTH - 1, 568);
    // should be fullscreen on small screens
    cy.window().then((win) => {
      const isFullScreen = win.matchMedia(`(min-width: ${SMALL_SCREEN_WIDTH}px)`).matches;
      expect(isFullScreen).to.be.false;
    });
  
    // reset the viewport
    cy.viewport(SMALL_SCREEN_WIDTH + 1, 568);
    // should not be fullscreen on larger screens, there should be a media query
    cy.window().then((win) => {
      const isFullScreen = win.matchMedia(`(min-width: ${SMALL_SCREEN_WIDTH}px)`).matches;
      expect(isFullScreen).to.be.true;
    });
  });
});
