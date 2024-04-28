import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService'
import { Link } from 'react-router-dom'

export const ListClientesComponent = () => {

    const [clientes,setClientes] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        listarClientes()
    },[])

    const listarClientes = () => {
        ClienteService.getAllClientes().then(response => {
            setClientes(response.data);
            console.log(response.data);
        }).catch(error => {console.log(error)})
    }

    const deleteCliente = (clienteId) => {
        ClienteService.deleteCliente(clienteId).then((response) => {
            listarClientes();
        }).catch(error => {
            console.log(error)
        })
    }

    // Función de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
    }

    //Metodo de filtrado
    let results = []

    if(!search){
        results = clientes
    }
    else{
        results = clientes.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }


  return (
    <div className='container'>
        &nbsp;&nbsp;
        <h2 className='text-center'>Lista de clientes</h2>
        &nbsp;&nbsp;&nbsp;
        <input value = {search} onChange = {searcher} type='text' placeholder='Search' className='form-control'></input>
        &nbsp;
        <table class="table">
            <thead class="thead-light">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Email</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    results.map(
                        cliente =>
                        <tr key={ cliente.id} >
                            <td>{ cliente.id }</td>
                            <td>{ cliente.nombre }</td>
                            <td>{ cliente.apellido }</td>
                            <td>{ cliente.email }</td>
                            <td>
                                <Link style={{marginTop: "8px"}} to="/add-cliente" className='btn btn-primary mb-2'>Agregar cliente</Link>
                                <Link style={{marginLeft: "10px"}} className='btn btn-info' to={ `/edit-cliente/${cliente.id}` }>Actualizar</Link>
                                <button style={{marginLeft: "10px"}} className='btn btn-danger' onClick={() => deleteCliente(cliente.id)}>Eliminar</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListClientesComponent;