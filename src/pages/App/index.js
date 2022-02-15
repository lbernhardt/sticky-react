import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Sticky from '../../components/Sticky';
import './App.css';
import Config from '../../config.json';
import MyHeader from '../../components/Header'
import { Container, Header, Content, TagGroup, Tag} from 'rsuite';
import 'rsuite/dist/styles/rsuite-dark.css';
import { Button } from 'rsuite';
import Login from '../Login'
import * as AuthenticationService from '../../services/authenticationService'

function App() {

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [colorClass, setColorClass] = useState("");
  const [arrStickies, setArrStickies] = useState([]); 

  useEffect(() => {
    fetchStickies()
  }, []);

  const sticky = {
    id : Math.random(),
    title : title,
    note : note,
    user : AuthenticationService.getCurrentUser(),
    colorClass: colorClass
  };

  function fetchStickies() {
    fetch(Config.apiGetAll + "/" + AuthenticationService.getCurrentUser())
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
      body: JSON.stringify(sticky),
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

  function handleColorClass(data){
    const colorClass = data.target.parentNode.classList[1];
    console.log(colorClass);
    setColorClass(colorClass);
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
    <div>
      <Container>
        <MyHeader />
        <Container style={{ padding: 12 }}>
          <Header>
            <h2>Stickies  </h2>
          </Header>
            <Content>
              <section className="Maker">
                <div>
                  <input value={title} className="InputMaker" placeholder="Title" type="text" name="title" onChange={handleChange}/> 
                </div>
                <div>
                  <textarea value={note} className="InputMaker" placeholder="Note" type="textbox" name="note" onChange={handleChange}/> 
                </div>
                
                <TagGroup>
                  <Tag onClick={handleColorClass} color="red">Red</Tag>
                  <Tag onClick={handleColorClass} color="orange">Orange</Tag>
                  <Tag onClick={handleColorClass} color="yellow">Yellow</Tag>
                  <Tag onClick={handleColorClass} color="green">Green</Tag>
                  <Tag onClick={handleColorClass} color="cyan">Cyan</Tag>
                  <Tag onClick={handleColorClass} color="blue">Blue</Tag>
                  <Tag onClick={handleColorClass} color="violet">Violet</Tag>
                </TagGroup>
                <Button appearance="primary" onClick={handleClick} value="+" />
              </section>
              <section>
                <ul>
                {arrStickies.map( sticky => 
                  <li key={sticky.id}>
                    <Sticky
                        id={sticky.id}
                        title={sticky.title} 
                        note={sticky.note}
                        colorClass={sticky.colorClass}
                        editNoteCallback={handleEditNote}
                        editTitleCallback={handleEditTitle}
                        removeStickyCallback={handleClickRemove}
                    />
                  </li>
                )}
                </ul>
              </section>
            </Content>
          </Container>
        </Container>
    </div>
  );
}

export default App;
