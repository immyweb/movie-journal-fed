describe('Add a movie', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/add-movie', {
      fixture: 'movie-search-api.json',
    }).as('postMovie');
    cy.intercept('GET', '**/api/movies', { fixture: 'movies.json' }).as(
      'getMovies',
    );
    cy.intercept('GET', '**/3/search/', { fixture: 'movie-search-api.json' });
  });

  it('should be accessible', () => {
    cy.visit('/');
    cy.wait('@getMovies');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('search for movie and add to list', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.findByLabelText(/title/i).type('Tenet');
    cy.findByText(/find/i).click();
    cy.checkA11y();
    cy.findByTestId(577922).click();
    cy.findByTestId('modal').should('exist');
    cy.checkA11y();
    cy.findByLabelText(/date watched/i).type('2022-01-26');
    cy.findByLabelText(/review/i).type(
      'Good movie but need subtitles to understand the dialog.',
    );
    cy.findByLabelText(/rating/i).type(7);
    cy.findByLabelText(/like/i).type(1);
    cy.findByText(/submit/i).click();

    cy.wait('@postMovie');
    cy.get('@postMovie').then(xhr => {
      cy.findByTestId('modal').should('not.exist');
    });
  });

  it('shows "no results" message when unable to find movie', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.findByLabelText(/title/i).type('as4g5s2fdasa');
    cy.findByText(/find/i).click();
    cy.findByTestId('no-results').should(
      'have.text',
      'No results found. Please try again.',
    );
    cy.checkA11y();
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
