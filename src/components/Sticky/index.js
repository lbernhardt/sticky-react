import React from 'react'
import Title from '../Title';
import Note from '../Note';

function Sticky(props){

    return (
        <section className="Sticky">
            <Title title={props.title} callback={props.editNoteCallback}/>
            <Note note={props.note} callback={props.editNoteCallback}/>
        </section>
    );
}

export default Sticky;