
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { MatchData } from '../../types/match';


import './styles.scss'
import NavBar from '../../components/navbar';

function ChampionshipMatches() {
  const { id } = useParams()
  const [matches, setMatches] = useState<MatchData[] | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');


  useEffect(() => {

    const fetchMatches = async () => {
      try {
        const response = await axios.get(`https://api.football-data.org/v4/competitions/${id}/matches`, {
          headers: {
            'X-Auth-Token': `${import.meta.env.VITE_API_TOKEN}`,
          },
        });

        const matchesData: MatchData[] = response.data.matches;

        const filteredMatches = matchesData.filter((match) => {
          if (filterStatus === 'ALL') {
            return true; 
          } else if (filterStatus === 'FINISHED') {
            return match.status === 'FINISHED'; 
          } else if (filterStatus === 'SCHEDULED') {
            return match.status === 'SCHEDULED'; 
          }
          return true;
        });

       setMatches(filteredMatches);

      } catch (error) {
        console.error('Erro ao buscar informações das partidas:', error);
      }
    };

    fetchMatches();
  }, [id, filterStatus]);

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  if (!matches) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <NavBar />
      <div className='matchs-container'>

        <div className="matchs-filter">
          <button
            className={filterStatus === 'ALL'? 'selected': ''}
            onClick={() => handleFilterChange('ALL')}
            >Mostrar Todos
          </button>
          <button
            className={filterStatus === 'FINISHED'? 'selected': ''} 
            onClick={() => handleFilterChange('FINISHED')}
            >Finalizadas
          </button>
          <button 
            className={filterStatus === 'SCHEDULED'? 'selected': ''} 
            onClick={() => handleFilterChange('SCHEDULED')}
            >Agendadas
          </button>
        </div>

        <div className="matchs-items">
          {matches.map((match) => (

            <div className='matchs-card' key={match.id}>

              <img src={match.competition.emblem} alt="" />

              <div className='info-homeTeam'>

                <p className='name-team'>
                  <img src={match.homeTeam.crest} alt="" className='img-team' />
                  {match.homeTeam.shortName}
                </p>
                <p className='score-team'>{match.score.fullTime.home}</p>
              </div>

              <div className='info-awayTeam'>
                <p className='name-team'>
                  {match.awayTeam.shortName}
                  <img src={match.awayTeam.crest} alt="" className='img-team' />
                </p>
                <p className='score-team'>{match.score.fullTime.away}</p>
              </div>
              
              <div className='match-date'>
                {format(new Date(match.utcDate), 'dd/MM/yyyy HH:mm')}
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default ChampionshipMatches;
