import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout.jsx'
import { AuthField } from '../components/auth/AuthField.jsx'
import { Button } from '../components/ui/Button.jsx'
import { register } from '../api/auth.js'

export function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
      })
      setSuccess('Account created. Redirecting to sign in...')
      setTimeout(() => navigate('/'), 900)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Start something good"
      title={<>Your team,<br />in sync.</>}
    >
      <form className="flex flex-col gap-[19px]" onSubmit={submit}>
        <AuthField
          label="Username"
          value={form.username}
          onChange={update('username')}
          placeholder="choose a username"
          required
        />
        <AuthField
          label="Email address"
          type="email"
          value={form.email}
          onChange={update('email')}
          placeholder="you@company.com"
          required
        />

        <div className="grid grid-cols-2 gap-3.5 max-md:grid-cols-1 max-md:gap-[19px]">
          <AuthField
            label="Password"
            type="password"
            value={form.password}
            onChange={update('password')}
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
          <AuthField
            label="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
            placeholder="Repeat password"
            required
          />
        </div>

        {error && (
          <p className="flex items-center gap-[7px] -mt-[5px] text-error text-xs">
            {error}
          </p>
        )}
        {success && (
          <p className="flex items-center gap-[7px] -mt-[5px] text-success text-xs">
            <Check size={15} />{success}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : (
            <>Create account <ArrowRight size={17} /></>
          )}
        </Button>
      </form>

      <p className="text-muted-light text-[13px] text-center my-[22px]">
        Already have an account?{' '}
        <Link to="/" className="text-brand font-bold no-underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
