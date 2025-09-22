import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { User, Mail, BookOpen, Code, Plus, X, Save, Trash2, AlertCircle, CheckCircle } from 'lucide-react'

const Profile = ({ user, token }) => {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    nomeCompleto: user?.nomeCompleto || '',
    curso: user?.curso || '',
    semestre: user?.semestre || '',
    skills: user?.skills || []
  })
  const [newSkill, setNewSkill] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData({
        nomeCompleto: user.nomeCompleto || '',
        curso: user.curso || '',
        semestre: user.semestre || '',
        skills: user.skills || []
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: name === 'semestre' ? (value ? parseInt(value) : '') : value
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Perfil atualizado com sucesso!')

        // Atualizar dados do usuário no localStorage
        const updatedUser = { ...user, ...profileData }
        localStorage.setItem('user', JSON.stringify(updatedUser))

        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.error || 'Erro ao atualizar perfil')
      }
    } catch (err) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    setError('')

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        // Limpar dados do localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        // Redirecionar para página inicial
        navigate('/')
        alert('Conta excluída com sucesso!')
      } else {
        setError(data.error || 'Erro ao excluir conta')
      }
    } catch (err) {
      setError('Erro de conexão')
    } finally {
      setDeleteLoading(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informações Pessoais</span>
              </CardTitle>
              <CardDescription>
                Atualize suas informações de perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nomeCompleto">Nome Completo</Label>
                  <Input
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={profileData.nomeCompleto}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailUniversitario">Email Universitário</Label>
                  <Input
                    id="emailUniversitario"
                    value={user?.emailUniversitario || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    O email não pode ser alterado
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="curso">Curso</Label>
                    <Input
                      id="curso"
                      name="curso"
                      value={profileData.curso}
                      onChange={handleInputChange}
                      placeholder="Ex: Ciência da Computação"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semestre">Semestre</Label>
                    <Input
                      id="semestre"
                      name="semestre"
                      type="number"
                      min="1"
                      max="20"
                      value={profileData.semestre}
                      onChange={handleInputChange}
                      placeholder="Ex: 5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Habilidades</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Ex: React, Python, Node.js"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    />
                    <Button type="button" onClick={handleAddSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {profileData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Alterações
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Resumo do Perfil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{user?.nomeCompleto}</p>
                  <p className="text-sm text-gray-500">Nome</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium break-all text-sm">{user?.emailUniversitario}</p>
                  <p className="text-sm text-gray-500">Email</p>
                </div>
              </div>

              {profileData.curso && (
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{profileData.curso}</p>
                    <p className="text-sm text-gray-500">Curso</p>
                  </div>
                </div>
              )}

              {profileData.semestre && (
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">{profileData.semestre}º Semestre</p>
                    <p className="text-sm text-gray-500">Período</p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <p className="text-sm text-gray-500 mb-2">Membro desde</p>
                <p className="font-medium">
                  {new Date(user?.dataCadastro).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          {profileData.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Habilidades</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Zona de Perigo</span>
              </CardTitle>
              <CardDescription>
                Ações irreversíveis relacionadas à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir Conta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Exclusão da Conta</DialogTitle>
                    <DialogDescription>
                      Esta ação é irreversível. Todos os seus dados, projetos criados e
                      participações serão permanentemente removidos.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? 'Excluindo...' : 'Confirmar Exclusão'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile