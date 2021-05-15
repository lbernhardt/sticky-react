import React, { Component, useState } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


function Title(props) {

    const[title, setTitle] = useState(props.title);

    function handleChange(value){
        setTitle(value);
    }

    return (
        <h3><EditText value={title} onChange={handleChange} /></h3>
    );
}

export default Title;