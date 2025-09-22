import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Code, LogOut, User } from 'lucide-react'

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">UniProjects</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link to="/projects">
                  <Button variant="ghost">Projetos</Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{user.nomeCompleto}</span>
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-1">
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button>Cadastrar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="block">
                    <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                  </Link>
                  <Link to="/projects" className="block">
                    <Button variant="ghost" className="w-full justify-start">Projetos</Button>
                  </Link>
                  <Link to="/profile" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      {user.nomeCompleto}
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full justify-start">Entrar</Button>
                  </Link>
                  <Link to="/register" className="block">
                    <Button className="w-full justify-start">Cadastrar</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
