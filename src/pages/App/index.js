import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Sticky from '../../components/Sticky';
import './App.css';
import Config from '../../config.json';
import MyHeader from '../../components/Header'
import { Container, Header, Content, TagGroup, Tag} from 'rsuite';
import 'rsuite/dist/styles/rsuite-dark.css';
import { Button } from 'rsuite';

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
                  <Tag color="red">Red</Tag>
                  <Tag color="orange">Orange</Tag>
                  <Tag color="yellow">Yellow</Tag>
                  <Tag color="green">Green</Tag>
                  <Tag color="cyan">Cyan</Tag>
                  <Tag color="blue">Blue</Tag>
                  <Tag color="violet">Violet</Tag>
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
