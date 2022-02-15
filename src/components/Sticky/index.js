import React from 'react'
import Title from '../Title';
import Note from '../Note';
import {Panel} from 'rsuite'

function Sticky(props){
    
    return (

        <Panel className={props.colorClass} shaded bordered bodyFill style={{ display: 'inline-block', width: 240, margin: 5}}>
            <Title title={props.title} callback={props.editNoteCallback}/>
            <Note note={props.note} callback={props.editNoteCallback}/>
            <input type="button" value="Remove" itemID={props.id} onClick={props.removeStickyCallback}/>
        </Panel>
    );      
}

export default Sticky;