import React from 'react';
import './Button.css';
export default function Button(props){
    return(
        <button type="submit" className={`${props.status ? "active_button" :"btn btn-primary button small"}`} onClick={props.onClick}>{props.btnName}</button>
    )
}