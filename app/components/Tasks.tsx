"use client"
import { ITask } from '@/types/tasks'
import React, { FormEventHandler, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import Modal from "./Modal"
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';
import { v4 as uuidv4 } from "uuid"

interface TaskProps {
  task: ITask;
}

const Tasks: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
  const [openModalDelete,setOpenModalDelete]= useState<boolean>(false)
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit
    });
    setTaskToEdit("")
    setOpenModalEdit(false)
    router.refresh()
  };
  const handleDelete= async(id:string)=>{
     await deleteTodo(id)
     setOpenModalDelete(false)
    router.refresh()

  }
  return (
    <tr key={task.id}>
      <td>{task.text}</td>
      <td className='flex gap-8'>
        <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={20} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input type="text"
                value={taskToEdit}
                onChange={e => setTaskToEdit(e.target.value)}
                placeholder='Type here'
                className='input input-bordered  w-full'
              />
              <button type='submit' className='btn'>
                Submit
              </button>

            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={()=>setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={20} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className='text-lg'>Are you sure delete this word ?</h3>
          <div className='modal-action'>
            <button className='btn' onClick={()=>handleDelete(task.id)}>Yes</button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Tasks
