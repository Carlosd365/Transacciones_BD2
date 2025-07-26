import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main">
        <h1>Persona</h1>
        <p>Todavia no esta :j</p>
        <div className="formulario">
          <input type="text" />
          <input type="text" />
        </div>
        <div className="button">
          <button className="accion">Transacción</button>
          <button className="accion">Guardar Datos</button>
          <button className="accion">Commit</button>
          <button className="accion">RollBack</button>
        </div>
      </div>
    </div>
  );
}
export default App;
