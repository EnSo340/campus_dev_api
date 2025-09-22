import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code, Mail, Lock, AlertCircle } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    emailUniversitario: '',
    senha: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.usuario))

        // Chamar callback de login
        onLogin(data.usuario, data.access_token)

        // Redirecionar para dashboard
        navigate('/dashboard')
      } else {
        setError(data.error || 'Erro ao fazer login')
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <Code className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">UniProjects</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-gray-600">
            Ou{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              crie uma conta gratuita
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Use seu email universitário para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="emailUniversitario">Email Universitário</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="emailUniversitario"
                    name="emailUniversitario"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="seu.email@universidade.edu.br"
                    value={formData.emailUniversitario}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    className="pl-10"
                    placeholder="Sua senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Esqueceu sua senha?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Recuperar senha
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login