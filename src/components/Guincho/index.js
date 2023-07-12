import React from 'react'
import './index.css'

function Guincho({data,...rest}) {
  return (
    <div className='wrapper'>
        <h2>{data.nome}</h2>
        <div className='rowTwo'>
          
         <p>Atende esses tipos de Veículos:</p>{data.user_TiposVeiculo.map( tipo=> <p key={tipo.tipoVeiculo.id}>{tipo.tipoVeiculo.tipoNome}</p>)}
        </div>
          
    </div>
  )
}
 export default Guincho


