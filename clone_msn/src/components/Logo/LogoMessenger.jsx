import logoMSN from "../../assets/img/logo_msn_escrito.png"

const LogoMessenger = () => {
  return (
    <>
      <section className='flex items-center space-x-2'>
        <img src={logoMSN}
          alt="MSN Messenger" className='w-20 h-20 ml-5' />
        <span className='font-bold text-dark-blue text-lg mt-2'>Messenger</span>
      </section>
    </>
  )
}

export default LogoMessenger