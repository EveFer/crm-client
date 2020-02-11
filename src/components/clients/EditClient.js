import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import clientAxios from '../../config/axios'

const EditClient = (props) => {
    // obtener el id
    const { id } = props.match.params
    console.log(id)
    const[client, setClient] = useState({
        name: '', 
        last_name: '',
        company: '', 
        email: '', 
        phone: ''
    });

    // query a la API
    const consultarAPI = async () => {
        const client = await clientAxios.get(`/clients/${id}`);
        setClient(client.data)
    }

    // useEffect, cuando el componente carga
    useEffect(()=> {
        consultarAPI();
    }, [])


    const handleChange = e => {
        // almacenar lo que el usuario escribe en el state
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    // envia una peticion por axions para actualizar el client
    const handleSubmit = e => {
        e.preventDefault();
        // enviar peticion por exios
        clientAxios.put(`/clients/${client._id}`, client)
        .then(res => {
            console.log(res)
            Swal.fire(
                'Correcto',
                'Se actualizo el cliente correctamente',
                'success'
            )
            // redireccionar
            props.history.push('/')
        })
    }

    // validar formulario
    const validarCliente = () => {
        // Destructuring
        const {name, last_name, email, company, phone} = client;
        //  revisar que las propiedades del state tengan contenido

        let valido = !name.length || !last_name.length || !email.length || !company.length || !phone.length;

        // return true o false
        return valido
    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="name" 
                        onChange={handleChange}
                        value={client.name}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="last_name"
                        onChange={handleChange}
                        value={client.last_name}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="company" 
                        onChange={handleChange}
                        value={client.company}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={handleChange}
                        value={client.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="text" 
                        placeholder="Teléfono Cliente" 
                        name="phone"
                        onChange={handleChange}
                        value={client.phone}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Guardar cambios"
                            disabled={validarCliente()}
                        />
                </div>

            </form>
        </Fragment>
    );
};

export default withRouter(EditClient);