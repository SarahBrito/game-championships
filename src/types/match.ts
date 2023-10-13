
export interface MatchData {
  id: number;
  homeTeam: {
    shortName: string;
    coach: string;
    formation: string;
    crest: string
  };
  awayTeam: {
    shortName: string;
    coach: string;
    formation: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number;
      away: number;
    };
    winner: string
  };
  competition: {
    emblem: string;
    name: string
  };
  status: string;
  utcDate: string;
}


export interface SelectedMatchProps {
  selectedTeam: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  competitionId: string
}