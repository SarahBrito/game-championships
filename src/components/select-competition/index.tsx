import { useState, useEffect } from 'react';
import axios from 'axios';

import { ChampionshipType } from '../../types/championship';

interface SelectCompetitionsProps {
  selectedCompetition: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCompetitions: React.FC<SelectCompetitionsProps> = ({ selectedCompetition,  onChange}) => {

  const [competitions, setCompetitions] = useState<ChampionshipType[]>([]);

  useEffect(() => {

    axios.get('https://api.football-data.org/v4/competitions/', {
      headers: {
        'X-Auth-Token': '877483580c33490eb7d65f8c0cb96c8d',
      },
    })
      .then((response) => {

        const data = response.data.competitions.map((item: ChampionshipType) => ({
          name: item.name,
          id: item.id,
          code: item.code
        }));
        setCompetitions(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <select
      value={selectedCompetition}
      onChange={onChange}
    >
      <option value="">Selecione um campeonato</option>
      {competitions && competitions.map((competition) => (
        <option key={competition.id} value={competition.code}>
          {competition.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCompetitions;
