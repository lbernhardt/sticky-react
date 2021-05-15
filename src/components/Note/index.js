import React, { Component, useState } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


function Note(props) {

    const [note, setNote] = useState(props.note);

    function handeChange(value){
        setNote(value);
    }

    return (
        <EditTextarea value={note} onChange={handeChange} />
    );
}

export default Note;