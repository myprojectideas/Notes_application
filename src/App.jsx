import { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch, AiFillEdit } from 'react-icons/ai'
import { CiStickyNote } from 'react-icons/ci'
import './App.css'
import { BiArrowBack } from 'react-icons/bi'
import Note from './components/Note'


let data = JSON.parse(localStorage.getItem('notesData'))

function App() {

  // inputs
  const [input, setInput] = useState('')
  const [editHeading, setEditHeading] = useState('')
  const [editText, setEditText] = useState('')

  //current values
  const [currentText, setCurrentText] = useState('')
  const [currentHeading, setCurrentHeading] = useState('')
  const [currentId, setCurrentId] = useState('')

  //toogle states
  const [addScreen, setAddScreen] = useState(false)
  const [noteView, setNoteView] = useState(false)
  const [edit, setEdit] = useState(false)

  //data
  const [notes, setNotes] = useState(data ? data : [])

  const title = useRef(null)
  const text = useRef(null)


  const addNote = () => {
    if (!title.current.value || !text.current.value) {
      alert('Fill all the fields please')
      return
    }
    let newObj;
    if (title.current.value && text.current.value) {
      newObj = {
        id: Math.floor(Math.random() * 100000),
        title: title.current.value,
        text: text.current.value,
        date: new Date().toDateString()
      }
      setNotes(prev => [newObj, ...prev])
      title.current.value = ''
      text.current.value = ''
      setAddScreen(false)
    } else {
      return
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(curr => curr.id !== id))
  }

  useEffect(() => {
    setEditHeading(currentHeading)
    setEditText(currentText)
  }, [currentText])

  useEffect(() => {
    localStorage.setItem('notesData', JSON.stringify(notes))
  }, [notes])

  return (
    <div className='w-full h-screen bg-yellow-200 flex flex-col relative items-center'>
      {
        noteView && <div className='fixed w-full h-screen backdrop-blur-lg z-[100] flex justify-center items-center'>
          <div className='w-[30rem] h-auto bg-white p-4 rounded shadow-2xl'>
            <button onClick={() => {
              setNoteView(false)
            }} className='px-2 py-1 border border-r-gray-300 mb-4'>
              <BiArrowBack />
            </button>
            {
              edit ? <input value={editHeading} onChange={e => setEditHeading(e.target.value)} autoFocus className='text-2xl w-full mb-2 focus:outline-none border border-gray-300 rounded-lg p-2' type="text" /> :
                <h3 className='text-2xl w-full mb-2 p-2'>{currentHeading}</h3>
            }
            <div className='w-full max-h-[22rem] overflow-auto'>
              {
                edit ? <textarea value={editText} onChange={e => setEditText(e.target.value)} className='w-full text-md resize-none h-[15rem] border border-gray-300 rounded-lg p-2 focus:outline-none' />
                  :
                  <p className='w-full text-md h-[15rem] p-2'>{currentText}</p>
              }
            </div>
            <div className='w-full mt-4'>
              <button onClick={() => {
                if (edit) {
                  let updatedNotes = notes.map(curr => {
                    if (currentId === curr.id) {
                      return {
                        id: currentId,
                        title: editHeading,
                        text: editText,
                        date: new Date().toDateString()
                      }
                    } else {
                      return curr
                    }
                  })
                  setNotes(updatedNotes)
                  setNoteView(false)
                } else{
                  setEdit(true)
                }
              }} className='px-2 py-1 border border-gray-300 rounded text-lg'>
                {
                  edit ? 'Confirm' : <AiFillEdit />
                }
              </button>
            </div>
          </div>
        </div>
      }
      {
        addScreen &&
        <div className='fixed  z-[80] w-full backdrop-blur-lg h-full flex justify-center items-center'>
          <div className='bg-white w-[18rem] h-[80%] rounded-xl p-4 relative'>
            <button onClick={() => setAddScreen(false)} title='cancel' className='absolute top-4 right-4'>
              <BiArrowBack />
            </button>
            <div className='w-full h-full flex flex-col'>
              <h3 className='text-xl'>Add Note</h3>
              <input className='focus:outline-none border border-gray-300 mt-8 rounded-xl p-3' ref={title} type="text" placeholder='Title...' />
              <textarea className='resize-none h-[70%] focus:outline-none border border-gray-300 mt-8 rounded-xl p-3' ref={text} placeholder='Text...' />
              <button title='add a note' onClick={addNote} className='w-full p-3 mt-2 rounded-lg bg-green-500 text-white'>Submit</button>
            </div>
          </div>
        </div>
      }
      <button title='add a note' onClick={() => setAddScreen(true)} className='fixed left-16 bottom-16 z-[69] text-xl p-4 rounded-[10rem] bg-green-500 text-white flex justify-center items-center shadow-xl'>
        <AiOutlinePlus />
      </button>
      <nav className='w-full px-8 py-4 flex items-center'>
        <h1 className='text-2xl font-semibold flex items-center gap-2'>
          <CiStickyNote />
          Notes App
        </h1>
        <div className='flex-1 flex justify-center'>
          <div className='w-auto flex gap-1 items-center text-xl rounded-2xl  bg-white overflow-hidden px-3'>
            <AiOutlineSearch />
            <input value={input} onChange={e => setInput(e.target.value)} className='p-3 focus:outline-none text-normal lg:w-[15rem] w-[10rem]' type="text" placeholder='Search...' />
          </div>
        </div>
      </nav>
      <main className='overflow-auto w-full p-8 flex lg:justify-start justify-center lg:flex-col flex-row flex-wrap gap-6'>
        {
          notes?.filter(curr => curr.title.toLowerCase().includes(input.toLowerCase())).map(curr => {
            return (
              <Note
                key={curr.id}
                deleteFun={deleteNote}
                date={curr.date}
                heading={curr.title}
                text={curr.text}
                id={curr.id}
                setCurrentId={setCurrentId}
                setCurrentHeading={setCurrentHeading}
                setCurrentText={setCurrentText}
                setNoteView={setNoteView}
              />
            )
          })
        }
      </main>
    </div>
  )
}

export default App
