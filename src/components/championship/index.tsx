import {API_KEY} from '../../config'

import { useState, useEffect } from "react";
import axios from "axios";

import './style.scss'
import Teams from "../teams";
import NavBar from "../navbar";

import { ChampionshipType } from "../../types/championship";

const Championship = () => {

  const [championships, setChampionships] = useState<ChampionshipType[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  
 

  const handleCompetitionClick = (competitionId: string) => {
    setSelectedCompetition(competitionId);
  };

  useEffect(() => {

  

    axios.get('https://api.football-data.org/v4/competitions/', {
      headers: {
        'X-Auth-Token': `${API_KEY}`,
      },
    })
      .then((response) => {
      
        const data = response.data.competitions.map((item: ChampionshipType) => ({
          name: item.name,
          id: item.id,
          code: item.code
        }));
        setChampionships(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="championship">

        <div className="championship-items">
          {championships.map((championship) => (
            <div key={championship.id} className="championship-name">
              <button 
                onClick={() => handleCompetitionClick(championship.code)}>
                  {championship.name}
              </button>
            </div>
          ))}
        </div>
          {selectedCompetition ?
            <Teams selectedCompetition={selectedCompetition} />
            : <p>Selecione um <span>campeonato</span> para ver os times participantes</p>
          }
        
      </div>
    </>
  );
}

export default Championship;