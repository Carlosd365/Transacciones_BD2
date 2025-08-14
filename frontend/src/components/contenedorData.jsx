import '../styles/contenedorData.css'

export default function ContenedorData ({nivelAislamiento, usuarios}){
    // Info obtenida del select 
    const datos = usuarios;

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
                        <td>{dato.nombre}</td>
                        <td>{dato.apellido}</td>
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