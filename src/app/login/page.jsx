import { AuthButtonServer } from '../components/auth-buttton-server'

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen mx-auto bg-neutral-950">
      <div className="flex flex-col w-full max-w-lg p-4 text-center text-white rounded-lg gap-y-10 bg-neutral-900">
        <h2 className="mb-4 text-4xl font-semibold tracking-tight">
          Bienvenido a *MNTodo
        </h2>
        <p className="text-sm text-muted-foreground">
            Iniciar sesión en tu cuenta
        </p>
        <AuthButtonServer/>
        </div>
    </section>
  )
}