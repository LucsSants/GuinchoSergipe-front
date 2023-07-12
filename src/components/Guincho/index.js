import React from 'react'
import './index.css'

function Guincho({data,...rest}) {
  return (
    <div className='wrapper'>
        <h2>{data.nome}</h2>
        <div className='rowTwo'>
         <p>Atende esses tipos de Veículos:</p>{data.user_TiposVeiculo.map( tipo=> <ul className='lista' key={tipo.tipoVeiculo.id}><li>{tipo.tipoVeiculo.tipoNome}</li></ul>)}
        </div>
          
    </div>
  )
}
 export default Guincho


