import React from 'react'
import './index.css'

function Veiculo({data,...rest}) {
  return (
    <div className='wrapper'>
        <h2>{data.modelo}</h2>
        <div className='rowTwo'>
          <p>Marca: {data.marca}</p>
          <p>Placa: {data.Placa}</p>
          <p>Ano: {data.ano}</p>
        </div>
        <div className='rowTwo'>
          <p>Cor: {data.cor}</p>
          <p>Tipo: {data.tipoVeiculo.tipoNome}</p>
          
        </div>
          
    </div>
  )
}
 export default Veiculo


