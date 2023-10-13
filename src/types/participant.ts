
export interface Participant {
  id: string;
  competition: string;
  match: string;
  prediction: string;
  name: string;
  score: number
}

export interface ParticipantPredictionsListProps {
  participants: Participant[];
}

export interface ParticipantPrediction {
  competition: string;
  match: string;
  prediction: string;
  name: string
  id: string
  score: number
}