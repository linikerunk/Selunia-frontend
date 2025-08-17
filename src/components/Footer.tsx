export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand font-display text-lg">Selúnia • Beleza que ilumina</div>
        <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email" className="sr-only">Receba novidades</label>
          <input id="email" type="email" placeholder="Seu e-mail" className="input" />
          <button className="btn">Assinar</button>
        </form>
        <nav className="footer-nav">
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
          <a href="#politicas">Políticas</a>
        </nav>
        <div className="footer-copy">© {new Date().getFullYear()} Selúnia. Feito com amor.</div>
      </div>
    </footer>
  )
}


