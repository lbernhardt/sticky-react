import React from 'react'
import Title from '../Title';
import Note from '../Note';

function Sticky(props){
  return (
    <section className="Sticky">
        <Title title={props.title}/>
        <Note note={props.note}/>
    </section>
  );
}

export default Sticky;