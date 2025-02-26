import { useState } from 'react';

// componente
import NavMenu from '../components/NavMenu/NavMenu';
import LogoMessenger from '../components/Logo/LogoMessenger';
import Contacts, { generateContacts } from '../components/Contacts/Contacts';

// imagens
import cachorro from "../assets/img/cachorro.png"
import oneMSN from "../assets/img/one-msn.png"

// react-icons
import { AiFillMessage, AiFillStar } from 'react-icons/ai'


const Chat = () => {

  const [activeTab, setActiveTab] = useState(0); // Controla a aba ativa
  const [isOpenOnline, setIsOpenOnline] = useState(false); // Controla a visibilidade do menu online
  const [isOpenOffline, setIsOpenOffline] = useState(false); // Controla a visibilidade do menu offline

  // Gera a lista de contatos para contar os que estão online e offline
  const contacts = generateContacts();
  const onlineContactsCount = contacts.filter(contact => contact.status === "Online").length;
  const offlineContactsCount = contacts.filter(contact => contact.status === "Offline").length;

  const handleTabClick = (index) => {
    setActiveTab(index); // Altera a aba ativa
  };

  return (
    <>
      <NavMenu />
      <main className='bg-gradient-to-t from-[#CED9ED] via-[#bfd5f7] to-[#CED9ED] min-h-screen'>

        {/* section foto, nome e status do usuario */}
        <section className='flex flex-col mt-0 border-2 border-light-blue px-5 pb-3 rounded-2xl shadow-dark-blue shadow-2xl'>
          <LogoMessenger />
          <div className='flex flex-row items-center'>
            <img src={cachorro} alt="Imagem de perfil" className='w-30 h-30 rounded-2xl' />
            <div className='ml-5'>
              <span className='md:text-2xl font-bold'>•°o.O +*¨^¨*+ Flávio +*¨^¨*+ O.o°•</span>
              <select name="status" className='ml-2 text-sm text-gray-500 cursor-pointer'>
                <option value="online">(Online)</option>
                <option value="offline">(Offline)</option>
                <option value="ocupado">(Ocupado)</option>
                <option value="ausente">(Ausente)</option>
              </select>
              <div className='flex flex-col text-gray-500 mt-3'>
                <input type="text" name="message-personal" placeholder='< Digite sua mensagem pessoal >' className='focus:outline-none' />
                <div className='flex flex-row items-center '>
                  <AiFillMessage className='mt-3 md:mt-5 font-bold m-1' /><span className='text-sm'>(20)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section dos contatos */}
        <section className='bg-light-white mt-2 px-5 pb-3 min-h-screen'>
          {/* section de abas (contatos), favoritos) */}
          <section>
            <div className="flex -ml-3 ">
              {/* Navegação de abas na vertical */}
              <div className="w-20 mt-1">
                <button
                  className={`tab-button py-2 px-4 text-sm cursor-pointer z-10   ${activeTab === 0 ? 'bg-light-gray border-light-blue border-l border-t border-b rounded-bl-lg rounded-tl-lg border-r-0' : 'text-gray-600'}  w-full`}
                  onClick={() => handleTabClick(0)}
                >
                  <img src={oneMSN} alt="Contatos" />
                </button>
                <button
                  className={`tab-button py-2 px-4 text-sm cursor-pointer  ${activeTab === 1 ? 'bg-light-gray border-light-blue border-l border-t border-b rounded-bl-lg rounded-tl-lg' : 'text-gray-600'}  w-full text-left`}
                  onClick={() => handleTabClick(1)}
                >
                  <AiFillStar className='text-5xl text-yellow-500' />
                </button>
                <button
                  className={`tab-button py-2 px-4 text-sm cursor-pointer  ${activeTab === 2 ? 'bg-light-gray border-light-blue border-l border-t border-b rounded-bl-lg rounded-tl-lg' : 'text-gray-600'}  w-full text-left`}
                  onClick={() => handleTabClick(2)}
                >
                  Aba 3
                </button>
              </div>

              {/* Conteúdo das abas à direita */}
              <div className="tab-content w-full mt-1 border-light-blue border rounded-tr-lg rounded-br-lg  p-2 bg-white">
                <div className={`tab-pane ${activeTab === 0 ? 'block ' : 'hidden'}`}>
                  <div className='cursor-pointer' onClick={() => setIsOpenOnline(!isOpenOnline)}>
                    <h2 className="text-green-600 font-semibold text-lg mb-2">
                      <span className='border-1 mr-2 px-2'>
                        {isOpenOnline ? '-' : '+'}
                      </span>Online ({onlineContactsCount})</h2>
                  </div>
                  <div>
                    {isOpenOnline && (
                      <Contacts status={"Online"} />
                    )}
                  </div>

                  <div className='cursor-pointer' onClick={() => setIsOpenOffline(!isOpenOffline)}>
                    <h2 className="text-gray-500 font-semibold text-lg mb-2">
                      <span className='border-1 mr-2 px-2'>
                        {isOpenOffline ? '-' : '+'}
                      </span>Offline ({offlineContactsCount})</h2>
                  </div>
                  <div>
                    {isOpenOffline && (
                      <Contacts status={"Offline"} />
                    )}
                  </div>
                </div>
                <div className={`tab-pane ${activeTab === 1 ? 'block' : 'hidden'}`}>
                  <p>Conteúdo da Aba 2</p>
                </div>
                <div className={`tab-pane ${activeTab === 2 ? 'block' : 'hidden'}`}>
                  <p>Conteúdo da Aba 3</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main >
    </>
  )
}

export default Chat