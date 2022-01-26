describe('Movie Detail', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/movies', { fixture: 'movies.json' }).as(
      'getMovies',
    );
    cy.intercept('GET', '**/api/movie/*', { fixture: 'movie-detail.json' });
    cy.intercept('GET', '**/3/movie/', { fixture: 'movie-detail-api.json' });
    cy.intercept('GET', '**/3/movie/**/credits/', {
      fixture: 'movie-credits-api.json',
    });
    cy.intercept('PUT', '**/api/edit-movie/*', {
      fixture: 'edit-movie-response.json',
    }).as('putMovie');
    cy.intercept('DELETE', '**/api/delete-movie/*', {
      fixture: 'delete-movie-response.json',
    }).as('deleteMovie');
  });

  it('should be accessible', () => {
    cy.visit('/');
    cy.wait('@getMovies');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('should display correct movie info', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.findByAltText(/hereditary/i).click();
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/detail/61659f3b02f54c3f9ab188f1`,
    );
    cy.findByAltText(/hereditary/i).should('exist');
    cy.findByText(/hereditary/i).should('exist');
    cy.findByTestId('release-date').should('have.text', '2018');
    cy.findByTestId('rating').should('have.text', '8/10');
    cy.findByTestId('date-watched').should('have.text', 'Watched: 2021-02-10');
    cy.findByTestId('review').should('have.text', 'A disturbing movie');
    cy.findByTestId('liked').should('have.text', 'Liked');
    cy.findByTestId('director').should('have.text', 'Ari Aster');
    cy.findByTestId('edit-movie-btn').should('exist');
    cy.findByTestId('delete-movie-btn').should('exist');
    cy.checkA11y();
  });

  it('should be able to edit movie post', () => {
    cy.visit('/detail/61659f3b02f54c3f9ab188f1');
    cy.injectAxe();
    cy.findByAltText(/hereditary/i).click();
    cy.findByTestId('edit-movie-btn').click();
    cy.findByTestId('modal').should('exist');
    cy.checkA11y();
    cy.findByLabelText(/date watched/i)
      .clear()
      .type('2022-01-26');
    cy.findByLabelText(/review/i)
      .clear()
      .type('A disturbing, unsettling and creepy movie');
    cy.findByLabelText(/rating/i)
      .clear()
      .type(9);
    cy.findByLabelText(/like/i).type(0);
    cy.findByText(/update/i).click();

    cy.wait('@putMovie');
    cy.get('@putMovie').then(xhr => {
      cy.findByTestId('modal').should('not.exist');
      cy.findByTestId('update-success').should('exist');
    });
  });

  it('should be able to delete movie post', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.findByAltText(/hereditary/i).click();
    cy.findByTestId('delete-movie-btn').click();
    cy.findByTestId('modal').should('exist');
    cy.checkA11y();
    // Check NO button
    cy.findByTestId('delete-no').click();
    cy.findByTestId('modal').should('not.exist');
    cy.findByText(/hereditary/i).should('exist');
    // Check YES
    cy.findByTestId('delete-movie-btn').click();
    cy.findByTestId('delete-yes').click();
    cy.wait('@deleteMovie');
    cy.get('@deleteMovie').then(xhr => {
      cy.findByTestId('modal').should('not.exist');
      // TODO: Show delete success message
    });
  });
});
