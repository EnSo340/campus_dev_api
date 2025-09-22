import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Code, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    emailUniversitario: '',
    senha: '',
    confirmarSenha: '',
    aceitarTermos: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const validateForm = () => {
    if (!formData.nomeCompleto.trim()) {
      setError('Nome completo é obrigatório')
      return false
    }

    if (!formData.emailUniversitario.trim()) {
      setError('Email universitário é obrigatório')
      return false
    }

    // Validar email universitário
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu\.br|edu)$/
    if (!emailPattern.test(formData.emailUniversitario)) {
      setError('Email deve ser de uma universidade (.edu.br ou .edu)')
      return false
    }

    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres')
      return false
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('Senhas não coincidem')
      return false
    }

    if (!formData.aceitarTermos) {
      setError('Você deve aceitar os termos de uso e política de privacidade')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeCompleto: formData.nomeCompleto,
          emailUniversitario: formData.emailUniversitario,
          senha: formData.senha
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(data.error || 'Erro ao criar conta')
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Conta criada com sucesso!
                </h2>
                <p className="text-gray-600 mb-4">
                  Você será redirecionado para a página de login em alguns segundos.
                </p>
                <Link to="/login">
                  <Button>Ir para Login</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
            Crie sua conta
          </h2>
          <p className="mt-2 text-gray-600">
            Ou{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              entre na sua conta existente
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>
              Use seu email universitário para criar uma conta gratuita
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
                <Label htmlFor="nomeCompleto">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="nomeCompleto"
                    name="nomeCompleto"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="Seu nome completo"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                  />
                </div>
              </div>

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
                <p className="text-xs text-gray-500">
                  Apenas emails universitários (.edu.br ou .edu) são aceitos
                </p>
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
                    placeholder="Mínimo 6 caracteres"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    required
                    className="pl-10"
                    placeholder="Confirme sua senha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aceitarTermos"
                  name="aceitarTermos"
                  checked={formData.aceitarTermos}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, aceitarTermos: checked })
                  }
                />
                <Label htmlFor="aceitarTermos" className="text-sm">
                  Aceito os{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    termos de uso
                  </a>{' '}
                  e{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    política de privacidade
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Ao criar uma conta, você concorda com nossa coleta mínima de dados
            conforme a LGPD e pode editar ou excluir sua conta a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register