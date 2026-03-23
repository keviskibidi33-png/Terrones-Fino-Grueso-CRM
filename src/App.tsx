import { useEffect, useState, type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionGuard } from './components/SessionGuard'
import ModuloForm from './pages/ModuloForm'

const CRM_LOGIN_URL = import.meta.env.VITE_CRM_LOGIN_URL || 'http://localhost:3000/login'

function AccessGate({ children }: { children: ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const tokenFromUrl = params.get('token')

        if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl)
        }

        const token = tokenFromUrl || localStorage.getItem('token')
        const isEmbedded = window.parent !== window
        const authorized = Boolean(tokenFromUrl || (isEmbedded && token))
        setIsAuthorized(authorized)
    }, [])

    if (isAuthorized === null) return null

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-sm text-center">
                        <div className="mb-8">
                            <img src="/geofal.svg" alt="Geofal" className="h-14 mx-auto" style={{ filter: 'grayscale(100%) contrast(1.2)' }} />
                        </div>
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
                            <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h1 className="mb-3 text-xl font-bold uppercase tracking-wide text-black">Acceso Denegado</h1>
                        <p className="mb-8 text-xs leading-relaxed text-neutral-500">
                            Todos los intentos de acceso son registrados y auditados.
                            <br />
                            Se requiere autenticacion valida desde el CRM.
                        </p>
                        <button
                            className="w-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800 active:bg-neutral-900"
                            onClick={() => window.location.assign(CRM_LOGIN_URL)}
                        >
                            Ir al CRM
                        </button>
                    </div>
                </div>
                <div className="py-4 text-center text-[11px] text-neutral-500">
                    <div className="mb-1">Términos · Licencias · Privacidad</div>
                    <div>© {new Date().getFullYear()} Geofal S.A.S — Sistema auditado</div>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default function App() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <AccessGate>
                <SessionGuard />
                <ModuloForm />
            </AccessGate>
            <Toaster position="top-right" />
        </div>
    )
}
