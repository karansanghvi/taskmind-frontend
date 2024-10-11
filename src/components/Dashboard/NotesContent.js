import React, { useState, useEffect } from 'react';
import '../../assets/styles/styles.css';
import { FileText as NotesIcon, Pencil } from 'lucide-react'; 
import NotesModal from './NotesModal';
import { AiFillDelete } from "react-icons/ai";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [notesTitle, setNotesTitle] = useState("");
  const [notesDescription, setNotesDescription] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/notes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setNotes(data);
    } else {
      console.error('Failed to fetch notes:', response.statusText);
    }
  }

  // load notes when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // add new note
  const addNotes = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/notes', { // Corrected URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: notesTitle, description: notesDescription }), // Corrected body
    });

    if (response.ok) {
      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNotesTitle("");
      setNotesDescription("");
      setModalOpen(false);
    } else {
      console.error('Failed to add note:', response.statusText);
    }
  };

  // edit a note
  const editNote = async () => {
    const token = localStorage.getItem('token');
    const noteId = editingNote._id;

    const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: notesTitle,
        description: notesDescription
      }),
    });

    if (response.ok) {
      const updatedNote = await response.json();
      setNotes((prevNotes) => prevNotes.map(note => note._id === updatedNote._id ? updatedNote : note));
      setNotesTitle("");
      setNotesDescription("");
      setEditingNote(null);
      setModalOpen(false);
    } else {
      console.error('Failed to update note: ', response.statusText);
    }
  };

  // delete a note
  const deleteNote = async (index) => {
    const noteId = notes[index]._id;
    await fetch(`http://localhost:5000/api/notes/${noteId}`, { 
      method: 'DELETE',
    });

    const updatedNotes = notes.filter((note, idx) => idx !== index);
    setNotes(updatedNotes);
  };

  // open modal for editing note
  const handleEditClick = (note) => {
    setEditingNote(note);
    setNotesTitle(note.title);
    setNotesDescription(note.description);
    setModalOpen(true);
  };

  return (
    <>
      <div className='dashboard-section'>
        <h1 className='title flex items-center'>
          <NotesIcon size={40} className="mr-2" />
          Notes
        </h1>
        <hr className='mt-4 mb-4' />
        <div className='add-task-container'>
          <button onClick={() => setModalOpen(true)} className='add-new-task-btn'>Create Note</button>
        </div>

        {
          modalOpen && (
            <NotesModal>
              <h1 className='add-task-title'>{editingNote ? 'Edit Note' : 'Add Note'}</h1>
              <p className='enter-title'>Enter Title:</p>
              <input
                type="text"
                value={notesTitle}
                onChange={(e) => setNotesTitle(e.target.value)}
                placeholder="Title"
                className='add-textBox'
              />
              <br/> <br/>
              <p className='enter-title'>Enter Description:</p>
              <input
                type="text"
                value={notesDescription}
                onChange={(e) => setNotesDescription(e.target.value)}
                placeholder='Description'
                className="add-textBox"
              />
              <br/> <br/>
              <div className='btn-container'>
                <button onClick={() => setModalOpen(false)} className='cancel-task-button'>Cancel</button>
                <button onClick={editingNote ? editNote : addNotes} className='add-task-button'>
                  {editingNote ? 'Update Note' : 'Add Note'}
                </button>
              </div>
            </NotesModal>
          )
        }

        <ul>
          {notes.map((note, index) => (
            <li key={note._id}>
              <div className='bg-indigo-100 p-4 task-container flex items-center justify-between'>
                <div className='flex items-center'>
                  <span>
                    <h2>{note.title}</h2>
                    <p>{note.description}</p>
                  </span>
                </div>
                <div className='flex space-x-4'> 
                  <Pencil
                    onClick={() => handleEditClick(note)}
                    className='task-edit-btn cursor-pointer'
                  />
                  <AiFillDelete
                    onClick={() => deleteNote(index)}
                    className='task-delete-btn cursor-pointer'
                  />
                </div>
              </div>
              <br/>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Notes;