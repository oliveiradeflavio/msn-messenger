import PropTypes from 'prop-types'
import { useState } from 'react'

import oneMSN from "../../assets/img/one-msn.png"

// react-icons
import { AiFillMessage } from 'react-icons/ai'

const WindowChat = ({ id, name, onClose, positionWindow }) => {

  const [hovered, setHovered] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Para controlar o estado de arrastar
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Posição da janela
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Posição inicial quando o arrasto começa
  const [maximized, setMaximized] = useState(false); // Para controlar o estado de maximizar
  const [windowSize, setWindowSize] = useState({
    position: { x: 0, y: 0 },
    size: { width: 600, height: 600 }
  }); // Tamanho da janela

  // Função para iniciar o arrasto
  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Definir a posição inicial do mouse em relação à janela
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Função para mover a janela enquanto o mouse está pressionado
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  // Função para parar o movimento quando o mouse é solto
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Função de fechamento da janela
  const handleCloseWindow = () => {
    onClose();
  };

  const handleMaximizeWindow = () => {
    // Irá maximizar a janela, no caso fullscreen a janela
    // Se já estiver maximizada, irá voltar ao tamanho original
    setMaximized((prev) => {
      if (!prev) {
        // Salvar a posição e o tamanho da janela antes de maximizar
        setWindowSize({
          position,
          size: {
            width: "auto",
            height: "auto"
          }
        });
        setPosition({ x: 0, y: 0 });
      } else {
        // Restaurar a posição e o tamanho da janela
        setPosition(windowSize.position);
      }
      return !prev;
    });
  }

  // verificar se esta no mobile
  const isMobile = window.innerWidth <= 768;

  return (
    // Uma janela (modal) com o nome do contato selecionado é exibida
    <section
      className="fixed w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove} // Evento global para mover a janela
      onMouseUp={handleMouseUp} // Parar o movimento quando o mouse for solto
      onMouseLeave={handleMouseUp} // Também parar se o mouse sair da tela
      style={{
        pointerEvents: 'none', //Permito que clique passem por cima da janela para poder clicar nos contatos
        top: positionWindow.top,
        left: isMobile ? "0" : positionWindow.left,
        position: 'absolute',
      }}
    >
      <div
        className="bg-gradient-to-t from-[#CED9ED] via-[#bfd5f7] to-[#CED9ED] rounded-lg shadow-lg w-150 h-150 border-1 border-gray-400"
        style={{
          position: 'absolute', // Definir a posição absoluta para que o movimento funcione
          transform: `translate(${position.x}px, ${position.y}px)`, // Usar translate para mover a janela
          cursor: isDragging ? 'move' : 'default', // Alterar o cursor quando o arraste estiver ativo
          pointerEvents: 'auto', // Permitir eventos de mouse na janela
          minWidth: !isMobile ? '600px' : '400px',
          minHeight: !isMobile ? '600px' : '400px',
          width: maximized ? '100dvw' : 'unset',
          height: maximized ? '100dvh' : 'unset',
          top: maximized ? 0 : 'unset',
          left: maximized ? 0 : 'unset',
        }}
      >
        {/* Cabeçalho da janela */}
        <div
          className='flex flex-row bg-gradient-to-r from-[#4C649A] via-[#A7C0E8] to-[#A7C0E8] pr-2 text-white w-full items-center rounded-t-lg'
          onMouseDown={handleMouseDown} // Iniciar o arrasto quando o mouse clicar no cabeçalho
        >
          <img src={oneMSN} alt="MSN Messenger" className='h-8 w-8 ml-5' />
          <span className="ml-2"><AiFillMessage className='font-bold -ml-1' /></span>
          <h1 className="text-xl font-bold ml-2">{name}</h1>

          {/* Botões de minimizar, maximizar e fechar */}
          <div className="flex flex-row ml-auto">
            <button
              className="bg-green-500 hover:bg-green-600 text-black py-2 px-2 w-5 h-5 flex justify-center items-center rounded-full mr-1 cursor-pointer"
              onMouseEnter={() => setHovered("green")}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === "green" ? "↗" : ""}
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-2 w-5 h-5 flex justify-center items-center rounded-full mr-1 cursor-pointer"
              onMouseEnter={() => setHovered("yellow")}
              onMouseLeave={() => setHovered(null)}
              onClick={handleMaximizeWindow}
            >
              {hovered === "yellow" ? "-" : ""}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-black py-2 px-2 w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
              onMouseEnter={() => setHovered("red")}
              onMouseLeave={() => setHovered(null)}
              onClick={handleCloseWindow}
            >
              {hovered === "red" ? "x" : ""}
            </button>
          </div>
        </div>

        {/* Corpo da janela */}
      </div>
    </section >
  )
}

WindowChat.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  positionWindow: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }).isRequired
}

export default WindowChat
