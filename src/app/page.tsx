import Game from '@/components/Game';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Home() {
  const { data } = await supabase.from('questions').select();

  return data && <Game data={data.sort(() => 0.5 - Math.random())} />;
}
