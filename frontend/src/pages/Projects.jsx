import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Users, Calendar, Code, Search, Filter, AlertCircle, CheckCircle } from 'lucide-react'

const Projects = ({ user, token }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')

  const [newProject, setNewProject] = useState({
    titulo: '',
    descricao: '',
    linguagemTecnologia: '',
    tamanhoEquipe: '',
    prazoEntrega: ''
  })

  useEffect(() => {
    fetchProjects()

    // Verificar se deve abrir o dialog de criação
    if (searchParams.get('action') === 'create') {
      setShowCreateDialog(true)
    }
  }, [searchParams])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')

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

  const handleCreateProject = async (e) => {
    e.preventDefault()
    setCreateLoading(true)
    setCreateError('')

    if (!user) {
      setCreateError('Você precisa estar logado para criar um projeto')
      setCreateLoading(false)
      return
    }

    try {
      const projectData = {
        ...newProject,
        linguagemTecnologia: newProject.linguagemTecnologia.split(',').map(tech => tech.trim()),
        tamanhoEquipe: parseInt(newProject.tamanhoEquipe),
        prazoEntrega: newProject.prazoEntrega || null
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      })

      const data = await response.json()

      if (response.ok) {
        setShowCreateDialog(false)
        setNewProject({
          titulo: '',
          descricao: '',
          linguagemTecnologia: '',
          tamanhoEquipe: '',
          prazoEntrega: ''
        })
        fetchProjects() // Recarregar lista
      } else {
        setCreateError(data.error || 'Erro ao criar projeto')
      }
    } catch (err) {
      setCreateError('Erro de conexão')
    } finally {
      setCreateLoading(false)
    }
  }

  const handleJoinProject = async (projectId) => {
    if (!user) {
      alert('Você precisa estar logado para participar de um projeto')
      return
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        fetchProjects() // Recarregar lista
        alert('Você entrou no projeto com sucesso!')
      } else {
        alert(data.error || 'Erro ao entrar no projeto')
      }
    } catch (err) {
      alert('Erro de conexão')
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.descricao.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const canJoinProject = (project) => {
    if (!user) return false
    if (project.status !== 'Em aberto') return false
    if (project.participantes.length >= project.tamanhoEquipe) return false
    if (project.participantes.some(p => p.idUsuario === user.idUsuario)) return false
    return true
  }

  const isUserInProject = (project) => {
    return user && project.participantes.some(p => p.idUsuario === user.idUsuario)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando projetos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projetos</h1>
          <p className="text-gray-600">Explore e participe de projetos colaborativos</p>
        </div>

        {user && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Criar Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Projeto</DialogTitle>
                <DialogDescription>
                  Preencha as informações do seu projeto para encontrar colaboradores
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateProject} className="space-y-4">
                {createError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{createError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="titulo">Título do Projeto</Label>
                  <Input
                    id="titulo"
                    value={newProject.titulo}
                    onChange={(e) => setNewProject({...newProject, titulo: e.target.value})}
                    placeholder="Ex: Sistema de Gestão Escolar"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={newProject.descricao}
                    onChange={(e) => setNewProject({...newProject, descricao: e.target.value})}
                    placeholder="Descreva o projeto, objetivos e requisitos..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linguagemTecnologia">Tecnologias</Label>
                    <Input
                      id="linguagemTecnologia"
                      value={newProject.linguagemTecnologia}
                      onChange={(e) => setNewProject({...newProject, linguagemTecnologia: e.target.value})}
                      placeholder="React, Node.js, PostgreSQL"
                      required
                    />
                    <p className="text-xs text-gray-500">Separe as tecnologias por vírgula</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tamanhoEquipe">Tamanho da Equipe</Label>
                    <Input
                      id="tamanhoEquipe"
                      type="number"
                      min="1"
                      max="20"
                      value={newProject.tamanhoEquipe}
                      onChange={(e) => setNewProject({...newProject, tamanhoEquipe: e.target.value})}
                      placeholder="5"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prazoEntrega">Prazo de Entrega (Opcional)</Label>
                  <Input
                    id="prazoEntrega"
                    type="date"
                    value={newProject.prazoEntrega}
                    onChange={(e) => setNewProject({...newProject, prazoEntrega: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createLoading}>
                    {createLoading ? 'Criando...' : 'Criar Projeto'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="Em aberto">Em aberto</SelectItem>
            <SelectItem value="Em andamento">Em andamento</SelectItem>
            <SelectItem value="Finalizado">Finalizado</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-gray-500">
              <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Nenhum projeto encontrado com os filtros aplicados'
                  : 'Nenhum projeto disponível no momento'
                }
              </p>
              {user && (
                <Button onClick={() => setShowCreateDialog(true)}>
                  Criar Primeiro Projeto
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.idProjeto} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{project.titulo}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {project.descricao.length > 150
                    ? `${project.descricao.substring(0, 150)}...`
                    : project.descricao
                  }
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {project.linguagemTecnologia.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.linguagemTecnologia.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.linguagemTecnologia.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.participantes.length}/{project.tamanhoEquipe}</span>
                    </div>
                    {project.prazoEntrega && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(project.prazoEntrega).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    {isUserInProject(project) ? (
                      <Button variant="outline" className="w-full" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Você participa
                      </Button>
                    ) : canJoinProject(project) ? (
                      <Button
                        onClick={() => handleJoinProject(project.idProjeto)}
                        className="w-full"
                      >
                        Participar
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        {project.status !== 'Em aberto' ? 'Projeto fechado' : 'Equipe completa'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects