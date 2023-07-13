import Game from '@/components/Game';
import { colors } from '@/consts/colors';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Home() {
  const { data } = await supabase.from('questions').select();
  const defaultColors = colors[0];

  return (
    data && (
      <Game
        data={data.sort(() => 0.5 - Math.random())}
        defaultColors={defaultColors}
      />
    )
  );
}
