import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

const Note = ({
  heading,
  text,
  id,
  deleteFun,
  date,
  setNoteView,
  setCurrentHeading,
  setCurrentText,
  setCurrentId
}) => {
  return (
    <div onClick={() => {
      setCurrentText(text)
      setCurrentHeading(heading)
      setCurrentId(id)
      setNoteView(true)
    }} className='w-[15rem] h-auto rounded-lg self-start bg-white p-3 cursor-pointer shadow-lg'>

      <h2 className='text-xl font-semibold w-full line-clamp-2 overflow-hidden text-ellipsis mb-1'>
        {heading}
      </h2>
      <p className='text-sm h-auto max-h-[10rem] overflow-hidden text-ellipsis'>
        {text}
      </p>
      <div className='flex w-full p-2 gap-2 justify-between items-end'>
        <p className='text-sm'>{date}</p>
        <button 
        onClick={(e) => {
          e.stopPropagation()
          deleteFun(id)
        }}
         className='p-2 rounded-2xl bg-red-500 text-white'>
          <AiOutlineDelete/>
        </button>
      </div>

    </div>
  )
}

export default Note