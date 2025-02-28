import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

//imagens
import logoHeader from '../../assets/img/logo-msn.png'

const NavMenu = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleLogOff = () => {
    navigate('/');
  }

  //Verificação de página, se for a de login, o menu vai ter alguns disabilitados
  const pages = {
    '/': '/',
    '/chat': '/chat',
  }
  const location = useLocation();
  const currentPage = location.pathname;


  return (

    <header>
      <div className="flex flex-row bg-gradient-to-r from-[#4C649A] via-[#A7C0E8] to-[#A7C0E8] text-white w-full p-2 items-center">
        <img src={logoHeader} alt="MSN Messenger" className='h-8 w-8 ml-5' />
        <span className="ml-2">MSN Messenger</span>
        {/* botões de minimizar, maximizar e fechar */}
        <div className="flex flex-row ml-auto">
          <button className="bg-green-500 hover:bg-green-600 text-black py-2 px-2 w-3 h-3 flex justify-center items-center rounded-full mr-1 cursor-pointer"
            onMouseEnter={() => setHovered("green")}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === "green" ? "↗" : ""}
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black  py-2 px-2 w-3 h-3 flex justify-center items-center rounded-full mr-1 cursor-pointer"
            onMouseEnter={() => setHovered("yellow")}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === "yellow" ? "-" : ""}
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-black py-2 px-2 w-3 h-3 flex justify-center items-center rounded-full cursor-pointer"
            onMouseEnter={() => setHovered("red")}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === "red" ? "x" : ""}
          </button>
        </div>
      </div>


      {/* os menus */}
      <div className='flex flex-row bg-gray-200 w-full p-2 items-center '>
        <ul className='md:ml-5 mx-auto  flex flex-row'>
          <li className='hover:bg-light-blue rounded relative group'>
            <Link to="#" className='p-2'>Arquivo</Link>
            {/* Dropdown */}
            {pages[currentPage] === '/' && (
              <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white border border-gray-300 shadow-md w-50">
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Criar uma nova conta</Link></li>
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Status serviço</Link></li>
              </ul>
            )}
            {pages[currentPage] === '/chat' && (
              <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white border border-gray-300 shadow-md w-30">
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Novo</Link></li>
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Abrir</Link></li>
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Salvar</Link></li>
              </ul>
            )}
          </li>
          <li className='hover:bg-light-blue rounded relative group'>

            {/* Dropdown */}
            {pages[currentPage] != '/' && (
              <>
                <Link to="#" className='p-2'>Contatos</Link>
                <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white border border-gray-300 shadow-md w-55">
                  <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Adicionar Novo Contato</Link></li>
                  <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Bloquear Contato</Link></li>
                </ul>
              </>
            )}

          </li>
          <li className='hover:bg-light-blue rounded relative group'>
            <Link to="#" className='p-2'>Ações</Link>
            {/* Dropdown */}
            {pages[currentPage] === '/' && (
              <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white border border-gray-300 shadow-md w-50">
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Esqueceu sua senha?</Link></li>
              </ul>

            )}
            {pages[currentPage] === '/chat' && (
              <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white border border-gray-300 shadow-md w-40">
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Chamar Atenção</Link></li>
                <li><Link to="#" className="block px-4 py-2 hover:bg-blue-200">Iniciar Conversa</Link></li>
              </ul>
            )}
          </li>
          {/* ainda vou pensar o que vou por nesse menu */}
          {/* <li className='hover:bg-light-blue rounded'>
            <Link to="#" className='p-2'>Ferramentas</Link>
          </li> */}
          {pages[currentPage] != '/' && (
            <li className='hover:bg-light-blue rounded'>
              <span to="#" onClick={handleLogOff} className='p-2 cursor-pointer'>Sair</span>
            </li>
          )}
        </ul>
      </div >
    </header >

  )
}

export default NavMenu