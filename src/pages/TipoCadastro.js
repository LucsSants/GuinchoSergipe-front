import React, { useState } from 'react';
import './auth.css'


export default function TipoCadastro(){
    return(
        <>
        <div className='container'>
            <div className='auth-container'>
            <h3 className='title'>Cadastro</h3>
            <button className='form-button' type="button">Para Você</button>
            <button className='form-button' type="button" >Para seu Guincho</button>  
            </div>

        </div>
        </>
    )
}