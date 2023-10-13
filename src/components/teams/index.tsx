import {API_KEY} from '../../config'

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import './styles.scss'
import { Dribbble } from "lucide-react";

import { TeamsProps, TeamsType } from "../../types/team";

const Teams = ({ selectedCompetition }: TeamsProps) => {

  const [teams, setTeams] = useState<TeamsType[]>([]);

  useEffect(() => {
  
    if (selectedCompetition) {
      axios.get(`https://api.football-data.org/v4/competitions/${selectedCompetition}/teams`, {
        headers: {
          'X-Auth-Token': `${API_KEY}`,
        },
      })
        .then((response) => {
          const teamData = response.data.teams.map((item: TeamsType) => ({
            name: item.name,
            id: item.id,
          }));
          setTeams(teamData);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        });
    }
  }, [selectedCompetition]);

  return (
    <div className="teams-container">
      <ul>
        {teams.length === 0 ? (
          <li>Não há times para esse campeonato</li>
        ) : (
          teams.map((team) => (
            <li key={team.id}>{team.name}</li>
          ))
        )}
      </ul>

      <Link to={`/match/${selectedCompetition}`}> 
        <button>Ver partidas <Dribbble /></button>
      </Link>
    </div>
  );
}

export default Teams;