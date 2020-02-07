import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import clientAxios from '../../config/axios'

const NewClient = ({history}) => {

    const[client, setClient] = useState({
        name: '', 
        last_name: '',
        company: '', 
        email: '', 
        phone: ''
    });

    const handleChange = e => {
        // almacenar lo que el usuario escribe en el state
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }
    // añade en la Rest API un cliente nuevo
    const handlerSubmit = e => {
        e.preventDefault()
        // enviar peticion
        clientAxios.post('/clients', client)
            .then(res => {
                console.log(res)
                Swal.fire(
                    'Se agrego el cliente',
                    res.data.message,
                    'success'
                )
                // redireccionar
                history.push('/')
            })
            .catch(error => {
                // console.log(error.response.status);
                if (error.response.data.code === 11000){
                    Swal.fire(
                        'Ocurrio un error',
                        'El correo ya existe',
                        'error'
                    )
                }
            });

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
            <h2>Nuevo Cliente</h2>
            <form
                onSubmit={handlerSubmit}
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
                            value="Agregar Cliente"
                            disabled={validarCliente()}
                        />
                </div>

            </form>
        </Fragment>
    );
};

// HOC, es un funcion que toma un componenete y retorna un nuevo componente
export default withRouter(NewClient);