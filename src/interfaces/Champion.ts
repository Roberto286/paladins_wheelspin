export interface Champion {
  id: number;
  img_path: string;
  name: string;
  role_id: number;
  dominant_color: string;
  role: 'damage' | 'flank' | 'support' | 'frontline';
}

export type ChampionsList = Champion[] | [];
