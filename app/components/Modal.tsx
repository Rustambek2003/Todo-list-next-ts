import React from 'react'

interface ModalProps {
    modalOpen:boolean,
    setModalOpen:(open:boolean)=> boolean | void
    children :React.ReactNode
}

const Modal:React.FC<ModalProps> = ({modalOpen,setModalOpen,children}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open":""}`}>
    <div className="modal-box">
        <label htmlFor="my_modal_6" onClick={()=>setModalOpen(false)} className="btn">Close!</label>
      <div className="modal-action">
      </div>
     {children}
      
    </div>
  </div>
  
  )
}

export default Modal
