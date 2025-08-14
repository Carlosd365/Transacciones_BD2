import '../styles/form.css'
import { useState } from 'react';

import Toolbar from './toolbar';
import Entradas from './entradas';
export default function Form ({onNivelAislamiento, nivelAislamiento,  onUsuarios}){
  const [comando, setComando] = useState(null);

    return (
        <div className="form">
          <Toolbar onNivelAislamiento={onNivelAislamiento} onCambiarComando={setComando}/>
          <Entradas comando={comando} onUsuarios={onUsuarios}/>
        </div>
    );
};