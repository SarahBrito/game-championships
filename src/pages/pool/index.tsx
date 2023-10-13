import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss'
import SelectCompetitions from '../../components/select-competition';
import SelectedMatch from '../../components/select-match';
import ParticipantPredictionsList from '../../components/ predictions-list';
import NavBar from '../../components/navbar';

import { ParticipantPrediction } from '../../types/participant';

const storedValue = localStorage.getItem('participants');
const fromLocalStorage = storedValue ? JSON.parse(storedValue): null

const Pool = () => {

  const [participants, setParticipants] = useState<ParticipantPrediction[]>(fromLocalStorage || []);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [team, setTeam] = useState<string[]>([]);
  const [prediction, setPrediction] = useState('');
 
  const [participantName, setParticipantName] = useState('');

  useEffect(()=>{
    localStorage.setItem("participants", JSON.stringify(participants))
  },[participants])

  useEffect(() => {
    const teamParts = selectedTeam.split(/,/);
    setTeam(teamParts)
  }, [selectedTeam]);

  const handleSelectCompetition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompetition(e.target.value);
  };

  const handleSelectMatch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);
  };

  const handleSelectPrediction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrediction(e.target.value);
  };

  const handleAddPrediction = () => {
    if (selectedCompetition && selectedTeam && prediction && participantName) {
      const result =  team[2] === "HOME_TEAM" ? team[0]: team[2] === "AWAY_TEAM" ? team[1]: '';

      const previsão = prediction === result;

      const participantPrediction: ParticipantPrediction = {
        competition: selectedCompetition,
        match: `${team[0]} vs ${team[1]}`,
        prediction: prediction,
        name: participantName,
        id: uuidv4(),
        score: previsão ? 1 : 0, 
      };

      setParticipants([...participants, participantPrediction]);
      setSelectedCompetition('');
      setSelectedTeam('');
      setPrediction('');
      setParticipantName('');
    }
  };
  return (
    <>
      <NavBar />
      <div className='pool-container'>

        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Competição</th>
              <th>Partida</th>
              <th>Palpite</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='user-name'>
                <input
                  type="text" placeholder='Nome do participante'
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                />
              </td>
              <td className='competition'>
                <SelectCompetitions
                  selectedCompetition={selectedCompetition}
                  onChange={handleSelectCompetition}
                />

              </td>
              <td className='teams'>
                <SelectedMatch
                  selectedTeam={selectedTeam}
                  onChange={handleSelectMatch}
                  competitionId={selectedCompetition}
                />
              </td>
              <td className='guess'>
                <select onChange={handleSelectPrediction}>
                  <option value="">Selecione um time</option>
                  <option value={team[0]}>{team[0]}</option>
                  <option value={team[1]}>{team[1]}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleAddPrediction}>Adicionar palpite</button>
      
        <div className="predictions">
          <ParticipantPredictionsList participants={participants} />
        </div>
      </div>
    </>
  );
}

export default Pool;