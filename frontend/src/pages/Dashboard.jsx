import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const Dashboard = ({ user, token }) => {
  const [projects, setProjects] = useState({ projetosCriados: [], projetosParticipando: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserProjects()
  }, [])

  const fetchUserProjects = async () => {
    try {
      const response = await fetch('/api/users/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        setError('Erro ao carregar projetos')
      }
    } catch (err) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em aberto':
        return 'bg-green-100 text-green-800'
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800'
      case 'Finalizado':
        return 'bg-gray-100 text-gray-800'
      case 'Cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Em aberto':
        return <Clock className="h-4 w-4" />
      case 'Em andamento':
        return <Users className="h-4 w-4" />
      case 'Finalizado':
        return <CheckCircle className="h-4 w-4" />
      case 'Cancelado':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo, {user.nomeCompleto}!
        </h1>
        <p className="text-gray-600">
          Gerencie seus projetos e colabore com outros estudantes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Criados</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.estatisticas?.totalCriados || 0}</div>
            <p className="text-xs text-muted-foreground">
              Projetos que você criou
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participando</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.estatisticas?.totalParticipando || 0}</div>
            <p className="text-xs text-muted-foreground">
              Projetos que você participa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.estatisticas?.totalProjetos || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de projetos envolvidos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/projects?action=create">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Criar Projeto</span>
            </Button>
          </Link>
          <Link to="/projects">
            <Button variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Explorar Projetos</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline">Editar Perfil</Button>
          </Link>
        </div>
      </div>

      {/* Projects Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projetos Criados */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Meus Projetos ({projects.projetosCriados?.length || 0})
          </h2>
          {!projects.projetosCriados || projects.projetosCriados.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="mb-4">Você ainda não criou nenhum projeto</p>
                  <Link to="/projects?action=create">
                    <Button>Criar Primeiro Projeto</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {projects.projetosCriados.slice(0, 3).map((projeto) => (
                <Card key={projeto.idProjeto} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{projeto.titulo}</CardTitle>
                        <CardDescription className="mt-1">
                          {projeto.descricao.substring(0, 100)}...
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(projeto.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(projeto.status)}
                          <span>{projeto.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{projeto.participantes.length}/{projeto.tamanhoEquipe} membros</span>
                      <span>{new Date(projeto.dataCriacao).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.projetosCriados.length > 3 && (
                <Link to="/projects?filter=created">
                  <Button variant="outline" className="w-full">
                    Ver todos os projetos criados
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Projetos Participando */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Participando ({projects.projetosParticipando?.length || 0})
          </h2>
          {!projects.projetosParticipando || projects.projetosParticipando.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="mb-4">Você ainda não participa de nenhum projeto</p>
                  <Link to="/projects">
                    <Button>Explorar Projetos</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {projects.projetosParticipando.slice(0, 3).map((projeto) => (
                <Card key={projeto.idProjeto} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{projeto.titulo}</CardTitle>
                        <CardDescription className="mt-1">
                          {projeto.descricao.substring(0, 100)}...
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(projeto.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(projeto.status)}
                          <span>{projeto.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{projeto.participantes.length}/{projeto.tamanhoEquipe} membros</span>
                      <span>{new Date(projeto.dataCriacao).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.projetosParticipando.length > 3 && (
                <Link to="/projects?filter=participating">
                  <Button variant="outline" className="w-full">
                    Ver todos os projetos participando
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-8">
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Dashboard