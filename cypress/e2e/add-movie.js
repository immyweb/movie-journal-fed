describe('add a movie', () => {
  it('search for movie and add to list', () => {
    cy.intercept('POST', '**/movies/', {
      fixture: 'movies.json',
    }).as('postMovie');

    cy.visit('/');
    cy.findByLabelText(/title/i).type('Foxfire');
    cy.findByText(/find/i).click();
    cy.findByTestId(18555).click();
    cy.findByTestId('modal').should('exist');
    cy.findByLabelText(/date watched/i).type('2021-05-03');
    cy.findByLabelText(/review/i).type('Decent nineties coming of age drama');
    cy.findByLabelText(/rating/i).type(7);
    cy.findByLabelText(/like/i).type(1);
    cy.findByText(/submit/i).click();

    cy.wait('@postMovie');
    cy.get('@postMovie').then(xhr => {
      // console.log(xhr);
      cy.findByTestId('post-success').should(
        'have.text',
        'Thank you for your submission',
      );
      cy.findByTestId('modal-close-btn').click();
      cy.findByTestId('modal').should('not.exist');
    });
  });

  it('shows "no results" message when unable to find movie', () => {
    cy.visit('/');
    cy.findByLabelText(/title/i).type('as4g5s2fdasa');
    cy.findByText(/find/i).click();
    cy.findByTestId('no-results').should(
      'have.text',
      'No results found. Please try again.',
    );
  });

  it('hide dropdown when user clears search field', () => {
    cy.visit('/');
    cy.findByLabelText(/title/i).type('foxfire');
    cy.findByText(/find/i).click();
    cy.findByTestId('search-results').should('exist');
    cy.findByLabelText(/title/i).clear();
    cy.findByTestId('search-results').should('not.exist');
  });
});
