import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Sticky from '../../components/Sticky';
import './App.css';
import Config from '../../config.json';

function App() {

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [arrStickies, setArrStickies] = useState([]); 

  useEffect(() => {
    fetchStickies()
  }, []);

  const sticky = {
    id : Math.random(),
    title : title,
    note : note
  };

  function fetchStickies() {
    fetch(Config.apiGetAll)
        .then(res => res.json())
        .then((data) => {          
          const arrStickies = data.stickies;
          setArrStickies(arrStickies);
        })
        .catch(console.log)
  }

  function saveSticky(sticky) {

    fetch(Config.apiPost, {
      method: 'POST',
      body: JSON.stringify(sticky ),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {          
        const newArrStickies = [...arrStickies, data.sticky];
        setArrStickies(newArrStickies);
      })
      .catch(console.log)
  }

  function handleClick() {
    
    saveSticky(sticky);

    setTitle("");
    setNote("");
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

  function handleClickRemove(e){
    
    const {value} = e.target.attributes.itemID;
    const newArrStickies = arrStickies.filter(x => x.id != value);
    setArrStickies(newArrStickies);
  }   

  return (
    <div className="App">
      <nav>
        <Link to="/example">Example page</Link>
      </nav>
      <section className="Maker">
        <div>
          <input value={title} className="InputMaker" placeholder="Title" type="text" name="title" onChange={handleChange}/> 
        </div>
        <div>
          <textarea value={note} className="InputMaker" placeholder="Note" type="textbox" name="note" onChange={handleChange}/> 
        </div>
        <input type="button" onClick={handleClick} value="+" />
      </section>
      <section>
        <ul>
        {arrStickies.map( sticky => 
          <li key={sticky.id}>
            <Sticky
                id={sticky.id}
                title={sticky.title} 
                note={sticky.note}
                editNoteCallback={handleEditNote}
                editTitleCallback={handleEditTitle}
                removeStickyCallback={handleClickRemove}
            />
          </li>
        )}
        </ul>
      </section>
    </div>
  );
}

export default App;
