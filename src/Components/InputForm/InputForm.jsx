import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './InputForm.css'
export default function InputForm({ type, id, placeholder, value, onChange }) {
    
    return (
        <>
                    <div className="mb-2">
                        <label htmlFor={id} className="form-label"></label>
                        <input
                            type={type}
                            id={id}
                            name={id}
                            placeholder={placeholder}
                            value={value}
                            onChange={(e)=>onChange(e)}
                            className="input-field">
                                
                        </input>
                    </div>
        </>
    )
}