import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('calendario');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Completar informe', dueDate: '2024-07-22', priority: 'alta', completed: false },
    { id: 2, title: 'Reunión de equipo', dueDate: '2024-07-23', priority: 'media', completed: false },
    { id: 3, title: 'Revisar propuesta', dueDate: '2024-07-25', priority: 'baja', completed: false },
  ]);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', priority: 'media' });
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '', section: 'Notes' });

  const addTask = () => {
    if (newTask.title && newTask.dueDate) {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ title: '', dueDate: '', priority: 'media' });
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const CalendarioSimple = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
      return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    let firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const renderCalendar = () => {
      const days = [];
      const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

      dayNames.forEach(day => {
        days.push(
          <div key={`header-${day}`} style={{ width: '14%', textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </div>
        );
      });

      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} style={{ width: '14%', height: '80px' }}></div>);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateString = date.toISOString().split('T')[0];
        const tasksForDay = tasks.filter(task => task.dueDate === dateString);
        days.push(
          <div 
            key={day} 
            style={{ 
              width: '14%', 
              height: '80px', 
              border: '1px solid #ccc', 
              padding: '5px',
              backgroundColor: selectedDate === dateString ? '#e6e6e6' : 'white',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedDate(dateString)}
          >
            <div>{day}</div>
            {tasksForDay.length > 0 && <div style={{ fontSize: '10px', color: 'blue' }}>{tasksForDay.length} tareas</div>}
          </div>
        );
      }
      return days;
    };
  
    return (
      <div>
        <h2>Calendario - {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {renderCalendar()}
        </div>
        {selectedDate && (
          <div style={{ marginTop: '20px' }}>
            <h3>Tareas para {selectedDate}:</h3>
            {tasks.filter(task => task.dueDate === selectedDate).map(task => (
              <div key={task.id} style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title} - Prioridad: {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const MorningRoutine = () => {
    const routineLinks = [
      { name: 'Finances 💰', url: 'https://docs.google.com/spreadsheets/d/1Jkcrc0Z11Ag8ui4e8JYbogOAi5k2HWYHYqGDlT8z1b4/edit?gid=257649877#gid=257649877' },
      { name: 'Projects 📆', url: 'https://docs.google.com/spreadsheets/d/1dM-cXL_4KN2wJEDtk2OhsymhtPd5szqT/edit?gid=122955100#gid=122955100' },
      { name: 'Gmail', url: 'https://mail.google.com/mail/u/0/#inbox' },
      { name: 'DW TAG 🌐', url: 'https://mail.google.com/mail/u/0/#label/Daily+Watson' },
      { name: 'AI TAG 🤖', url: 'https://mail.google.com/mail/u/0/#label/AI+mtehodology' },
      { name: 'Raindrop 🗃', url: 'https://app.raindrop.io/my/0' },
      { name: 'Whatsapp 🟢', url: 'https://web.whatsapp.com/' },
    ];

    return (
      <div>
        <h2>Morning Routine</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {routineLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 15px',
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
                textDecoration: 'none',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '120px',
                height: '40px',
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    );
  };

  const NotasSemanales = () => {
    const sections = ['Notes', 'Idea', 'FAQs', 'Learnings', 'Art'];

    const addNote = () => {
      if (currentNote.title && currentNote.content) {
        if (currentNote.id) {
          setNotes(notes.map(note => 
            note.id === currentNote.id ? { ...currentNote } : note
          ));
        } else {
          setNotes([...notes, { ...currentNote, id: Date.now() }]);
        }
        setCurrentNote({ id: null, title: '', content: '', section: 'Notes' });
      }
    };

    const editNote = (note) => {
      setCurrentNote(note);
    };

    const deleteNote = (id) => {
      setNotes(notes.filter(note => note.id !== id));
    };

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', marginRight: '20px' }}>
          <h2>Crear/Editar Nota</h2>
          <input
            type="text"
            placeholder="Título de la nota"
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <select
            value={currentNote.section}
            onChange={(e) => setCurrentNote({ ...currentNote, section: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          >
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
          <textarea
            placeholder="Contenido de la nota"
            value={currentNote.content}
            onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
            style={{ width: '100%', height: '150px', marginBottom: '10px', padding: '5px' }}
          />
          <button onClick={addNote} style={{ width: '100%', padding: '10px' }}>
            {currentNote.id ? 'Actualizar Nota' : 'Añadir Nota'}
          </button>
        </div>
        <div style={{ width: '70%' }}>
          <h2>Notas Semanales</h2>
          {sections.map(section => (
            <div key={section}>
              <h3>{section}</h3>
              {notes.filter(note => note.section === section).map(note => (
                <div key={note.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                  <button onClick={() => editNote(note)} style={{ marginRight: '10px' }}>Editar</button>
                  <button onClick={() => deleteNote(note.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Mi Dashboard Personal</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('calendario')} style={{ marginRight: '10px' }}>Calendario</button>
        <button onClick={() => setActiveTab('morningRoutine')} style={{ marginRight: '10px' }}>Morning Routine</button>
        <button onClick={() => setActiveTab('tareas')} style={{ marginRight: '10px' }}>Lista de Tareas</button>
        <button onClick={() => setActiveTab('notas')} style={{ marginRight: '10px' }}>Notas Semanales</button>
        <button onClick={() => setActiveTab('extra')}>Pestaña 5</button>
      </div>
      
      {activeTab === 'calendario' && <CalendarioSimple />}
      {activeTab === 'morningRoutine' && <MorningRoutine />}
      {activeTab === 'tareas' && (
        <div>
          <h2>Lista de Tareas</h2>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Nueva tarea"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={{ marginRight: '10px' }}
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              style={{ marginRight: '10px' }}
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              style={{ marginRight: '10px' }}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
            <button onClick={addTask}>Añadir Tarea</button>
          </div>
          <div>
            {tasks.map(task => (
              <div key={task.id} style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title} - {task.dueDate} - Prioridad: {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'notas' && <NotasSemanales />}
      {activeTab === 'extra' && <div><h2>Pestaña 5</h2><p>Contenido adicional...</p></div>}
    </div>
  );
};

export default Dashboard;
