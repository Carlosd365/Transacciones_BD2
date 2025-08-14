import '../styles/contenedorData.css'

export default function ContenedorData ({nivelAislamiento}){
    // Info obtenida del select 
    const datos = [
        {id: 1, nombres: 'Daniela', apellidos: 'Matul'},
        {id: 1, nombres: 'Daniela', apellidos: 'Matul'},
        {id: 1, nombres: 'Daniela', apellidos: 'Matul'}
    ]

    return(
        <div className="contenido">
            <table className="table">
                <thead>
                    <tr className='header'>
                        <th>ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) =>
                    <tr>
                        <td>{dato.id}</td>
                        <td>{dato.nombres}</td>
                        <td>{dato.apellidos}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            {nivelAislamiento?.trim() && (
            <div className="p">
                <p className='nivelAislamiento'>
                Nivel de Aislamiento de Transacción: {nivelAislamiento}
                </p>
            </div>)}
        </div>
    );
};