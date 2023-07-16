import Game from '@/components/Game';
import { colors } from '@/consts/colors';
import { supabase } from '@/lib/supabase';
import { shuffle } from '@/utils/shuffle';

export const revalidate = 0;

export default async function Home() {
  const { data } = await supabase.from('questions').select();
  const shuffledColors = shuffle(colors);

  return data && <Game data={shuffle(data)} colors={shuffledColors} />;
}
