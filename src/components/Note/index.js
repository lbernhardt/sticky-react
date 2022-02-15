import React, { Component, useState } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


function Note(props) {

    const [note, setNote] = useState(props.note);

    function handleChange(value){
        setNote(value);
    }

    return (
        <EditTextarea placeholder="Note" value={note} onChange={handleChange}/>
    );
}

export default Note;