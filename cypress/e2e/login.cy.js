describe('Login Flow Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should login successfully with valid credentials', () => {
    // 1. Isi form email dan password
    cy.get('input[type="email"]').type('test5557@example.com')
    cy.get('input[type="password"]').type('test12345')

    // 2. Klik tombol login
    cy.get('button[type="submit"]').click()

    // 3. Verifikasi bahwa pengguna diarahkan ke halaman threads
    cy.url().should('include', '/threads')

    // 4. Verifikasi tampilan konten utama pada halaman threads
    cy.contains('Threads').should('exist')

    // 5. Verifikasi Navbar muncul
    cy.contains('💬 Forum App').should('exist')
    cy.contains('Leaderboard').should('exist')
    cy.contains('Logout').should('exist')
  })

  it('should show error message for invalid credentials', () => {
    // 1. Isi form dengan email/password yang salah
    cy.get('input[type="email"]').type('wrong@email.com')
    cy.get('input[type="password"]').type('wrongpass')

    // 2. Klik tombol login
    cy.get('button[type="submit"]').click()

    // 3. Verifikasi pesan error tampil
    cy.contains('email or password is wrongg').should('exist')
  })
})
