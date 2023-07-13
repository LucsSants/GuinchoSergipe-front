import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import Input from '../Input'
import api from '../../api'
import { toast } from 'react-hot-toast'
import { Context } from '../../context/AuthContext'
import { customHistory } from '../../HistoryRouter'

function ModalGuincho({open, onClose, guinchoId,lat,long}) {
  
  const [descricao, setDescricao] = useState("")
    const [tipos, setTipos] = useState([])
    const [selectedTipo, setSelectedTipo] = useState({value:'DEFAULT'})
    const [veiculos, setVeiculos] = useState([])
    const {reloadIt} = useContext(Context)

    const [loading,setLoading] = useState(false)
    function closeModal(){
      setDescricao("")
      setSelectedTipo({value:'DEFAULT'})
      onClose()
    }

    async function handleCreate() {
      const id = JSON.parse(await localStorage.getItem('userId'));
      if(!descricao.trim()) {
        return alert("Prenenhca a descrição")
      }
      if (selectedTipo.value === 'DEFAULT') {
        return alert("Escolha o tipo de veiculo")
      }
      await api.post('/solicitacao', {
        "UserClienteId": id,
        "UserGuinchoId": guinchoId,
        "VeiculoId": selectedTipo,
        "Descricao": descricao,
        "Lat": String(lat),
        "Long": String(long)
      }).then(res => {
        alert("Cadastrado")
        closeModal()
        customHistory.push('/pedidos')
      }).catch(err=> {
        console.log(err)
        closeModal()
      })
      
      console.log(selectedTipo, id, guinchoId,lat,long )
    }

  
    useEffect( ()=>{
      (async () => {
        setLoading(true)
        const id = JSON.parse(await localStorage.getItem('userId'))
        await api.get(`/veiculo/user/${id}`).then( res=> {
          setVeiculos(res.data)
        }).catch( err => {
          toast.error("Sessão expirada!")
          console.log(err)
        })
      })();
      setLoading(false)
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
      <h2>Chamar Guincho</h2>

      <Input
          label="Descrição"
          placeholder='Descrição'  
          value={descricao}
          onChange={(e)=> {setDescricao(e.target.value)}}
          />
        <div>

        <div className='select-wrap'>
        <label>{guinchoId}</label>
          <select className='select' value={selectedTipo.value} onChange={handleTipoChange}>
          <option value="DEFAULT" disabled hidden>Selecione...</option>
            {veiculos.map((vei) => (
              <option key={vei.id} value={JSON.stringify(vei.id)}>{vei.modelo}, Placa:{vei.placa}</option>
              ))}
          </select>
      </div>
    </div>
          <div className='buttonsWrapper'>
            <button className='form-button' type="button" onClick={handleCreate}>Charmar Guincho</button>
            <button className='form-button cancel' type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </div>
        }
    </div>
    
  )
}
 export default ModalGuincho


