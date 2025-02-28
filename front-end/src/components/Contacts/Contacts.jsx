import PropTypes from "prop-types";
import { useState } from "react";

// components
import WindowChat from "../WindowChat/WindowChat";

// Exportação nomeada da função generateContacts
export const generateContacts = () => {
  const onlineNames = [
    "Xx_Angela_xX", "MegaMaster92", "ZéDaUnha", "Super_Gato", "Kauã_Storm",
    "Mestre_13", "Lulu_dark", "Hacker404", "BelezaTotal", "GuerreiroDoFuturo",
    "Punky_Queen", "SkaterManiac", "Gothico_666", "ThunderBoy_15", "Twilight_Star",
    "DarkKnight_X", "ElGato_92", "Iron_Lady", "Xx_Corinthians_xX", "FreakyJoker",
    "Night_Rider", "Vampira_21", "Fury_Storm", "UltraX_X", "Space_Boy", "Holly_Girl",
    "Power_Boy", "Princess_98", "CrazySoul", "DragonQueen"
  ];

  const offlineNames = [
    "MestreSombrio", "Xx_Vampirinha_xX", "Night_Fury", "KingOfTheNight", "LordBane",
    "Fallen_Angel", "Luluzinha_89", "Spooky_Spider", "Monster_King", "HotBoy_22",
    "DarkKnight_X", "Princess_Dark", "Boy_Xtreme", "Goth_Boy", "SweetDreams22",
    "HeartBreaker_98", "Digital_Wolf", "LoversRevenge", "Sweet_Girl_93", "PrinceDemon",
    "Electric_Girl", "DarkLord_666", "IceQueen_X", "FuryKnight", "Metal_Guy_27",
    "Mystic_Soul", "Speed_Demon", "SuperNovaBoy", "Rain_Queen", "Black_Knight",
    "Shinigami_77"
  ];

  const onlineContacts = onlineNames.map((name, index) => ({
    id: index + 1,
    name,
    status: "Online"
  }));

  const offlineContacts = offlineNames.map((name, index) => ({
    id: onlineNames.length + index + 1,
    name,
    status: "Offline"
  }));

  return [...onlineContacts, ...offlineContacts];
};


const Contacts = ({ status }) => {

  // estado para armazenar o contato selecionado e enviar depois para o componente WindowChat
  const [openChats, setOpenChats] = useState([]);//array para armazenar as janelas abertas

  // Função para abrir a janela de chat
  const handleWindowChat = (id, name) => {
    setOpenChats((prev) => {
      // Se o contato já tem uma janela aberta, não faz nada
      if (prev.find((chat) => chat.id === id)) {
        return prev;
      }

      // Define a posição da nova janela
      const newPosition = {
        top: 50 + prev.length * 20, // Deslocamento progressivo
        left: 100 + (prev.length % 2) * 200, // Alterna entre 100 e 300
      };

      return [...prev, { id, name, position: newPosition }];
    });
  };


  // Função para fechar a janela de chat 
  const handleCloseWindow = (id) => {
    // remover apenas a janela que está sendo fechada
    setOpenChats((prev) => prev.filter((chat) => chat.id !== id));
  };

  const contacts = generateContacts();
  const contactsStatus = contacts.map((contact) => {
    if (contact.status === status) {
      return (
        <li key={contact.id} className="text-gray-600 cursor-pointer" onClick={() => handleWindowChat(contact.id, contact.name)}>
          {contact.name}
        </li>
      );
    }
  });

  return (
    <div>
      {contacts
        ? (
          <>
            <ul className="list-none list-inside">
              {contactsStatus}
            </ul>

            {/* Renderiza múltiplas janelas abertas */}
            {openChats.map((chat) => (
              <WindowChat
                key={chat.id}
                id={chat.id}
                name={chat.name}
                onClose={() => handleCloseWindow(chat.id)}
                positionWindow={chat.position}
              />
            ))}
          </>
        )
        : (
          <p>Nenhum contato online</p>
        )
      }
    </div>
  )
}

Contacts.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Contacts;