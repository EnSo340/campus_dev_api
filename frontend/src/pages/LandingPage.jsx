import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Code, Trophy, Star, CheckCircle, Search, Briefcase, GraduationCap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl">
                <Code className="w-12 h-12" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Conecte-se com
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Projetos Reais</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              A plataforma que conecta estudantes universitários a projetos colaborativos reais.
              Desenvolva suas habilidades, construa seu portfólio e ganhe experiência prática.
            </p>

            {/* Main Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {/* Student Card - ativo */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl w-fit mx-auto mb-6">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sou aluno e quero trabalhar</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Encontre projetos interessantes, colabore com outros estudantes e ganhe experiência prática em desenvolvimento.
                  </p>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group-hover:shadow-lg"
                  >
                    Começar Agora
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Client Card - futuramente */}
              <div className="group relative bg-gray-50 rounded-3xl p-8 shadow-lg border-2 border-gray-200 opacity-75">
                <div className="relative">
                  <div className="bg-gray-400 text-white p-4 rounded-2xl w-fit mx-auto mb-6">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">Preciso de um projeto</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    Publique seus projetos e encontre estudantes talentosos para desenvolvê-los. Em breve!
                  </p>
                  <div className="inline-flex items-center justify-center w-full bg-gray-300 text-gray-500 px-8 py-4 rounded-xl font-semibold cursor-not-allowed">
                    Em Breve
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Próxima versão
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">Estudantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
                <div className="text-gray-600">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-gray-600">Universidades</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
                <div className="text-gray-600">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o UniProjects?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma oferece tudo que você precisa para desenvolver suas habilidades e construir um portfólio impressionante.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl w-fit mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Projetos Reais</h3>
              <p className="text-gray-600 leading-relaxed">
                Trabalhe em projetos que simulam o ambiente profissional e ganhe experiência prática valiosa.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl w-fit mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Colaboração</h3>
              <p className="text-gray-600 leading-relaxed">
                Colabore com outros estudantes, aprenda em equipe e desenvolva habilidades de trabalho colaborativo.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-xl w-fit mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Portfólio</h3>
              <p className="text-gray-600 leading-relaxed">
                Construa um portfólio impressionante com projetos reais que demonstram suas habilidades técnicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Benefícios Exclusivos para Estudantes
              </h2>
              <div className="space-y-6">
                {[
                  'Acesso gratuito para estudantes universitários',
                  'Projetos reais de empresas e organizações',
                  'Networking com outros desenvolvedores',
                  'Portfólio de projetos para o mercado de trabalho',
                  'Mentoria de desenvolvedores experientes',
                  'Certificados de participação em projetos'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1 rounded-full mt-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl w-fit mx-auto mb-6">
                  <Star className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Comece Sua Jornada</h3>
                <p className="text-gray-600 mb-8">
                  Junte-se a centenas de estudantes que já estão desenvolvendo suas carreiras através de projetos colaborativos.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Criar Conta Gratuita
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona?</h2>
            <p className="text-xl text-gray-600">Apenas 3 passos simples para começar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cadastre-se</h3>
              <p className="text-gray-600">Use seu email universitário para criar sua conta gratuita e completar seu perfil.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Encontre Projetos</h3>
              <p className="text-gray-600">Explore projetos que combinam com suas habilidades e interesses técnicos.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Colabore</h3>
              <p className="text-gray-600">Trabalhe em equipe e desenvolva soluções incríveis para problemas reais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Junte-se à comunidade de estudantes que estão transformando suas carreiras através de projetos colaborativos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <Search className="mr-2 w-5 h-5" />
              Ver Projetos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
