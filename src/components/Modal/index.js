import React, { useEffect, useState } from 'react'
import './index.css'
import Input from '../Input'
import api from '../../api'
import { toast } from 'react-hot-toast'
import { customHistory } from '../../HistoryRouter'

function Modal({open, onClose}) {
  
  const [modelo, setModelo] = useState("")
    const [marca, setMarca] =  useState("")
    const [placa, setPlaca] =  useState("")
    const [cor, setCor] =  useState("")
    const[ano, setAno] = useState("")
    const [tipos, setTipos] = useState([])
    const [selectedTipo, setSelectedTipo] = useState({value:'DEFAULT'})

    const [loading,setLoading] = useState(false)
    function closeModal(){
      setMarca("")
      setModelo("")
      setAno("")
      setCor("")
      setPlaca("")
      setSelectedTipo({value:'DEFAULT'})
      onClose()
    }

    async function handleCreate() {
      const id = JSON.parse(await localStorage.getItem('userId'));
      if(!modelo.trim() || !marca.trim() || !placa.trim() || !cor.trim() || !ano.trim()) {
        return alert("preencha todos os campos")
      }
      if (selectedTipo.value === 'DEFAULT') {
        return alert("Escolha o tipo de veiculo")
      } else if (ano < 0) {
        return alert("Ano não pode ser Negativo")
      }
      await api.post('/veiculo', {
        "Modelo":modelo,
        "Marca": marca,
        "Placa": placa,
        "Cor":cor,
        "Ano": ano,
        "UserId":id,
        "TipoVeiculoId": selectedTipo.id
      }).then((res=> {
        alert("Cadastrado")
        closeModal()
      })).catch(err =>{
        console.log(err)
        closeModal()
      })
      console.log(modelo,marca, selectedTipo, cor, placa,ano, id)
    }

    useEffect(() => {
      (async () => {
        setLoading(true)
        await api.get("/tipoveiculo")
          .then( res=> {
          setTipos(res.data)
          setLoading(false)
        }).catch( err => {
          toast.error("Sessão expirada!")
          console.log(err)
          setLoading(false)
        })
      })();

    },[])

    function handleTipoChange(event) {
      setSelectedTipo(JSON.parse(event.target.value))
    }

  if (!open) {return null}
  return (
    <div onClick={closeModal} className='overlay'>
      {loading ? (<h1>Loading...</h1>)
      :  
      <div onClick={(e)=> {
        e.stopPropagation()
      }} className='modalContainer'>
      <h2>Cadastrar novo Veículo</h2>

      <Input
          label="Modelo"
          placeholder='Modelo'  
          value={modelo}
          onChange={(e)=> {setModelo(e.target.value)}}
          />
  
        <Input
          label="Marca"
          placeholder='Marca'
          value={marca}
          onChange={(e)=> {setMarca(e.target.value)}}
          />
          <Input
          label="Placa"
          placeholder='Placa'  
          value={placa}
          onChange={(e)=> {setPlaca(e.target.value)}}
          />
        <div>

        <div className='select-wrap'>
        <label>Categoria:</label>
          <select className='select' value={selectedTipo.value} onChange={handleTipoChange}>
          <option value="DEFAULT" disabled hidden>Selecione...</option>
            {tipos.map((cat) => (
              <option key={cat.id} value={JSON.stringify(cat)}>{cat.tipoNome}</option>
              ))}
          </select>
      </div>
    </div>
          <Input
          label="Cor"
          placeholder='Cor' 
          value={cor}
          onChange={(e)=> {setCor(e.target.value)}}
          />
          <Input
          label="Ano"
          type="number"
          min="0"
          placeholder='Ano' 
          value={ano}
          onChange={(e)=> {setAno(e.target.value)}}
          />
          <div className='buttonsWrapper'>
            <button className='form-button' type="button" onClick={handleCreate}>Cadastrar Veículo</button>
            <button className='form-button cancel' type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </div>
        }
    </div>
    
  )
}
 export default Modal


