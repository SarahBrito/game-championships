import { useState, useEffect } from 'react';
import axios from 'axios';
import { MatchData, SelectedMatchProps } from '../../types/match';
import { format } from 'date-fns';

import './styles.scss'

const SelectedMatch: React.FC<SelectedMatchProps> = ({ selectedTeam, onChange, competitionId }) => {
  const [matches, setMatches] = useState<MatchData[] | null>(null);

  useEffect(() => {

    const fetchMatches = async () => {
      try {
        const response = await axios.get(`https://api.football-data.org/v4/competitions/${competitionId}/matches`, {
          headers: {
            'X-Auth-Token': '877483580c33490eb7d65f8c0cb96c8d',
          },
        });

        const matchesData: MatchData[] = response.data.matches;

        const scheduledMatches = matchesData.filter((match) => match.status === 'SCHEDULED');

        setMatches(scheduledMatches);

      } catch (error) {
        console.error('Erro ao buscar informações das partidas:', error);
      }
    };

    fetchMatches();
  }, [competitionId]);

  return (
    <select
      className='custom-select'
      value={selectedTeam}
      onChange={onChange}
    >
      <option value="">Selecione uma partida</option>
      {matches && matches.map((match) => (
        <option key={match.id} value={[match.homeTeam.shortName, match.awayTeam.shortName, match.score.winner]}>
          {match.homeTeam.shortName} vs {match.awayTeam.shortName} | {format(new Date(match.utcDate), 'dd/MM/yyyy HH:mm')}
        </option>
      ))}
    </select>

  );
};

export default SelectedMatch;
