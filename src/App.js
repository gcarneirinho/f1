import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

// Resgatar dados de pilotos de F1
// http://ergast.com/mrd/


function App() {

  const [driver, setDriver] = useState({Drivers: []});
  const [ano, setAno] = useState("2010");


  const pegaDados = () => {
    const pilotos = async () => {
      const result = await axios(`http://ergast.com/api/f1/${ano}/drivers.json`);

      
      setAno(result.data.MRData.DriverTable.season);
      setDriver(result.data.MRData.DriverTable);
    }

    pilotos();
  }

  const mudarAno = () => {
    var anoNovo = document.getElementById("field_ano").value;
    anoNovo.length && setAno(anoNovo);
    
  }

  useEffect(pegaDados, [ano]);

  return (
    <div className="App">
      <input id="field_ano" name="mudaAno" type="text" placeholder="Digite um ano" />
      <button onClick={mudarAno}>Aplicar</button>
      <h4>Ano: {ano}</h4>
      <h2>Pilotos:</h2>
      <ul>
        {driver.Drivers.map(item => {
          return(
            <li key={item.driverId}>{item.driverId}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
