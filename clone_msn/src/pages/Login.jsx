import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//imagens

import oneMSN from "../assets/img/one-msn.png"
import twoMSN from "../assets/img/two_msn.png"
import loadingMSN from "../assets/img/loading.png"

// componente
import NavMenu from '../components/NavMenu/NavMenu';
import LogoMessenger from '../components/Logo/LogoMessenger';

// react-icons
import { AiFillDownSquare } from 'react-icons/ai'

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('teste@teste.com.br');
  const [senha, setSenha] = useState('123123');
  const [status, setStatus] = useState('online');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    let data = {
      email,
      senha,
    }
    for (let key in data) {
      if (data[key] === '') {
        alert('Preencha todos os campos');
        return;
      }
    }
    // incluir o status no objeto data
    data.status = status;

    // só para teste
    if (data.email != "teste@teste.com.br" && data.senha != "123123") {
      alert("Credenciais inválidas");
      return;
    } else {
      // simular um async para mostrar o efeito de loading e após 3 segundos redirecionar para a página de chat
      setTimeout(() => {
        setIsLoading(false);
        navigate('/chat', { state: data });
      }, 3000);
    }
  }

  return (
    <>

      {/* componente o header e menus */}
      <NavMenu />

      <main className='bg-gradient-to-t from-[#CED9ED] via-[#bfd5f7] to-[#CED9ED] min-h-screen'>
        <LogoMessenger />

        {/* section de login */}
        <section className='flex flex-col items-center justify-center md:mt-0 mt-10 '>
          <div className='border-1 border-dark-blue rounded-lg p-5 bg-light-gray w-50 h-50'>
            <img
              src={`${isLoading ? loadingMSN : oneMSN}`}
              alt="MSN"
              className={`${isLoading ? 'animate-spinY' : ''} transform-gpu `}
              style={{ transformStyle: 'preserve-3d' }} />
          </div>
        </section>
        {/* inputs de email e senha */}
        <section>
          <form className='flex flex-col w-50 items-center justify-center mx-auto' onSubmit={handleSubmit}>
            <div className='mt-2 text-dark-blue'>
              <div className='mb-3'>
                <label htmlFor="">Email:</label>
                <div className='flex '>
                  <input type="email" name="email" value={email} required className='border-2 border-light-blue bg-white rounded-lg p-2 focus:outline-none  focus:ring-dark-blue focus:border-dark-blue transition duration-200'
                    onChange={(e) => setEmail(e.target.value)} />
                  <AiFillDownSquare className='font-extrabold text-3xl text-white hover:bg-dark-blue cursor-pointer' />
                </div>
              </div>
              <label htmlFor="senha">Senha:</label>
              <input type="password" name="senha" value={senha} required className='border-2 border-light-blue bg-white rounded-lg p-2 w-67 focus:outline-none  focus:ring-dark-blue focus:border-dark-blue transition duration-200'
                onChange={(e) => setSenha(e.target.value)} />

              <div className='flex flex-row mt-3 p-2'>
                <span className='mr-2'>Status:</span>
                <select name="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="ausente">Ausente</option>
                </select>
              </div>

              <div className='flex justify-center items-center mt-3'>
                <button className='font-bold rounded px-4 py-3 w-full bg-white shadow-2xl shadow-light-gray border-1 border-light-blue hover:bg-light-blue hover:text-white cursor-pointer transition duration-200'>Entrar</button>
              </div>
            </div>
          </form>
        </section>
      </main>

      <footer className='bg-gradient-to-t from-[#CED9ED] via-[#bfd5f7] to-[#CED9ED]'>
        {/* coluna 1 */}
        <section className="grid grid-cols-2 items-center justify-center text-center mx-auto">
          <div className="col-span-1 flex flex-col justify-center">
            <a href='#' className="text-dark-blue hover:underline">Esqueceu sua senha?</a>
            <a href='#' className="text-dark-blue hover:underline">Status do serviço</a>
            <div className='hidden md:block mt-10 text-dark-blue text-sm'>
              <p>
                Desenvolvido com React + Vite + Tailwindcss
              </p>
              <span className="text-dark-blue">2025 - Flávio Oliveira</span>
            </div>
          </div>
          {/* coluna 2 */}
          <div className="col-span-1 flex justify-center relative">
            <img src={twoMSN} alt="MSN" className='opacity-5' />
            <a href="#" className="absolute  md:ml-0 -ml-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            border-1 border-dark-blue bg-light-gray text-dark-blue px-2 py-1 rounded-lg hover:bg-dark-blue hover:text-white transition duration-200">
              Criar uma nova conta
            </a>
          </div>
        </section>
      </footer>

    </>
  )
}

export default Login