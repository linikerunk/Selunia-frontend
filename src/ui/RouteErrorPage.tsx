import { Link, isRouteErrorResponse, useLocation, useRouteError } from 'react-router-dom'

export function RouteErrorPage() {
  const error = useRouteError()
  const location = useLocation()

  let title = 'Ops, algo saiu do roteiro'
  let message = 'Tente novamente ou volte para a página inicial.'
  let details: string | undefined
  let status: number | undefined

  if (isRouteErrorResponse(error)) {
    status = error.status
    if (status === 404) {
      title = 'Página não encontrada'
      message = 'O link pode ter mudado ou nunca existiu.'
    } else if (status === 500) {
      title = 'Erro interno'
      message = 'Estamos trabalhando para corrigir. Tente novamente em instantes.'
    }
    details = error.statusText
  } else if (error instanceof Error) {
    details = error.message
  }

  const isDev = import.meta.env.DEV

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto text-center">
        <div className="text-4xl mb-2">🌸</div>
        <h1 className="font-display text-2xl m-0 mb-2">{title}</h1>
        <p className="text-ink-600 m-0 mb-4">{message}</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>Tentar novamente</button>
          <Link to="/" className="btn">Ir para Home</Link>
        </div>
        <div className="text-sm text-ink-600 mt-4">URL: {location.pathname}</div>
        {isDev && details && (
          <pre className="text-left text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 mt-4 overflow-auto">
            {status ? `[${status}] ` : ''}{details}
          </pre>
        )}
      </div>
    </div>
  )
}


