describe('movie detail', () => {
  it('clicking on a movie in homepage shows movie detail', () => {
    cy.visit('/');
    cy.findByAltText(/hereditary/i).click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/detail/493922`);
    cy.findByAltText(/hereditary/i).should('exist');
    cy.findByText(/hereditary/i).should('exist');
    cy.findByTestId('release-date').should('have.text', '2018');
    cy.findByTestId('rating').should('have.text', '7/10');
    cy.findByTestId('date-watched').should('have.text', 'Watched: 2021-02-10');
    cy.findByTestId('review').should('have.text', 'A disturbing movie');
    cy.findByTestId('liked').should('have.text', 'Liked');
    cy.findByTestId('director').should('have.text', 'Ari Aster');
    cy.visit('/');
    cy.findByAltText(/wonder woman/i).click();
    cy.findByTestId('liked').should('have.text', '');
  });
});
