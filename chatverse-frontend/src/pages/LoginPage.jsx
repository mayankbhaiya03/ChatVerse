import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout.jsx'
import { AuthField } from '../components/auth/AuthField.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Loader } from '../components/ui/Loader.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { login as loginApi } from '../api/auth.js'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginApi(form)
      await login(result.token, form.username)
      navigate('/chat')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title={<>Good to see<br />you again.</>}
    >
      <form className="flex flex-col gap-[19px]" onSubmit={submit}>
        <AuthField
          label="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="your username"
          autoComplete="username"
          required
        />
        <AuthField
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="flex items-center gap-[7px] -mt-[5px] text-error text-xs">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? (
            <><Loader />Signing in...</>
          ) : (
            <>Sign in <ArrowRight size={17} /></>
          )}
        </Button>
      </form>

      <p className="text-muted-light text-[13px] text-center my-[22px]">
        New to ChatVerse?{' '}
        <Link to="/register" className="text-brand font-bold no-underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
