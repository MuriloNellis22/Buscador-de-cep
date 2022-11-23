import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import "./componentes/styles.css";
//Testando

function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})

   async function handleSearch() {
      if (input === '') {
        alert("Por favor preencha algum cep.")
        return;

      } try{
          const response = await api.get(`${input}/json`);
          setCep(response.data)
          setInput('')
      } catch{
          setCep('Ops! Cep não encontrado.')
      }
    }

    return (
        <div className="container">
           <h1 className="title">Buscador de Cep</h1>

           <div className="containerInput">
               <input
               typeof="text"
               placeholder="Insira aqui o seu Cep"
               value={input} 
               onChange={e => setInput(e.target.value)} />
               <button className="buttonSearch" onClick={handleSearch}>
                 <FiSearch size={25} color="#ffff" />
               </button>
           </div>

           {Object.keys(cep).length > 0 && (
            <main className="main">
             <h2>{cep.cep}</h2>

                <span>{cep.logradouro}</span>
                <span>{cep?.complemento}</span>
                <span>{cep.bairro}</span>
                <span>{cep.localidade} - {cep.uf}</span>

            </main>
            )}
        </div>
        );
}

export default App;