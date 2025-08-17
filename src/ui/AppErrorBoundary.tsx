import React from 'react'

type Props = { children: React.ReactNode }

type State = { hasError: boolean; error?: Error }

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Futuro: enviar para observabilidade (Sentry, etc.)
    console.error('AppErrorBoundary', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto text-center">
            <div className="text-4xl mb-2">🌙</div>
            <h1 className="font-display text-2xl m-0 mb-2">Algo inesperado aconteceu</h1>
            <p className="text-ink-600 m-0 mb-4">Nossa equipe já foi avisada. Tente recarregar a página.</p>
            <button className="btn" onClick={this.handleRetry}>Recarregar</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}


