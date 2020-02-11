import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Client from './Client'

const Clients = () => {
    const [clients, setClients] = useState([])
    // use effect es similar a componentdidmount y willmount
    const consultaAPI = async () => {
        const clients = await clienteAxios.get('/clients')
        // console.log(clients)
        // colocar el result en el state
        setClients(clients.data)
    }

    useEffect(() => {
        consultaAPI();
    }, [clients]);

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clients.map(client => (
                    <Client 
                        key={client._id}
                        client={client}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Clients;