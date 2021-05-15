import React, {useState} from 'react';
import Sticky from './components/Sticky';
import './App.css'

function App() {

  
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [arrStickies, setArrStickies] = useState([]); 

  const sticky = {
    title : title,
    note : note
  };

  function handleClick() {
    
    const newArrStickies = [...arrStickies, sticky];
    setArrStickies(newArrStickies);

    console.log(arrStickies);

  }

  function handleChange(e) {
    const {value, name} = e.target;
    if(name === 'title'){
      setTitle(value);
    }
    if(name === 'note'){
      setNote(value);
    }
  }

  function handleEditNote(data){
    setNote(data);
  }

  function handleEditTitle(data){
    setTitle(data);
  }

  return (
    <div className="App">
      <div>
        <label>Título</label>
        <input type="text" name="title" onChange={handleChange}/> 
      </div>
      <div>
        <label>Nota</label>
        <textarea type="textbox" name="note" onChange={handleChange}/> 
      </div>
      <input type="button" onClick={handleClick} value="+" />
      
      <div>
        <ul>
        {arrStickies.map( sticky => 
          <li key={Math.random()}>
            <Sticky 
                title={sticky.title} 
                note={sticky.note}
                editNoteCallback={handleEditNote}
                editTitleCallback={handleEditTitle}
            />
          </li>
        )}
        </ul>
      </div>
    </div>
  );
}

export default App;
