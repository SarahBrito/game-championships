import React from 'react';
import './styles.scss'
import {  ParticipantPredictionsListProps } from '../../types/participant';


const ParticipantPredictionsList: React.FC<ParticipantPredictionsListProps> = ({ participants, }) => {
  return (
    <div className="predictions">
      <h2>Palpites dos <span>Participantes</span></h2>
      <div>
      {participants.length > 0 && (
        
        <table className='table-predictions'>
          <thead>
            <tr>
            <th>Usuário</th>
              <th>Campeonato</th>
              <th>Partida</th>
              <th>Palpite</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index}>
                <td>{participant.name}</td>
                <td>{participant.competition}</td>
                <td>{participant.match}</td>
                <td>{participant.prediction}</td>
                <td>{participant.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
     
    )}
      </div>
    </div>
  );
};

export default ParticipantPredictionsList;
