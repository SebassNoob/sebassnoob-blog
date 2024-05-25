import { META_CHECKS } from './constants';

describe('meta check', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  Object.entries(META_CHECKS).forEach(([check, selector]) => {
    it(check, () => {
      cy.get(selector).should('exist');
    });
  });
});
