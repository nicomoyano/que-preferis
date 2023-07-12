'use client';

import React, { useEffect, useState } from 'react';
import { Database } from '@/types/Database';
import emojiRegex from 'emoji-regex';
import CountUp from 'react-countup';
import { supabase } from '@/lib/supabase';

const colors = [
  ['#FFFFFF', '#000000'],
  ['#00539C', '#EEA47F'],
  ['#2F3C7E', '#FBEAEB'],
  ['#101820', '#FEE715'],
  ['#CCF381', '#4831D4'],
  ['#F96167', '#F9E795'],
  ['#E2D1F9', '#317773'],
  ['#990011', '#FCF6F5'],
  ['#8AAAE5', '#FFFFFF'],
  ['#FF69B4', '#00FFFF'],
  ['#FCEDDA', '#EE4E34'],
  ['#ADD8E6', '#00008B'],
  ['#EC449B', '#99F443'],
  ['#8A307F', '#79A7D3'],
  ['#CC313D', '#F7C5CC'],
  ['#2C5F2D', '#97BC62'],
  ['#2BAE66', '#FCF6F5'],
  ['#FFE77A', '#2C5F2D'],
  ['#234E70', '#FBF8BE'],
  ['#F4B41A', '#143D59'],
  ['#FFE042', '#E71989'],
  ['#FFA781', '#5B0E2D'],
  ['#00E1DB', '#5E001F'],
  ['#030E4F', '#F49F1C'],
  ['#A9DCE3', '#7689DE'],
  ['#EFC8B1', '#514644'],
  ['#5E057E', '#C299D0'],
  ['#FFB8B1', '#993441'],
  ['#BDFFF6', '#E23C52'],
  ['#008970', '#99EEDF'],
  ['#ED335F', '#761137'],
  ['#3D4C41', '#999999'],
  ['#64395F', '#6CACA0'],
  ['#241F1C', '#937047'],
  ['#1D5C96', '#7DB0DE'],
].sort(() => 0.5 - Math.random());

type Props = {
  data: Database['public']['Tables']['questions']['Row'][];
};

export default function Game({ data }: Props) {
  const [index, setIndex] = React.useState(0);
  const question = data[index];

  const regex = emojiRegex();

  const [color1, color2] = colors[index % colors.length];

  const [hovering1, setHovering1] = useState(false);
  const [hovering2, setHovering2] = useState(false);

  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClick = async (side: '1' | '2') => {
    await supabase
      .from('questions')
      .update({
        [`votes${side}`]: question[`votes${side}`]! + 1,
        ['total']: question['total']! + 1,
      })
      .eq('id', question.id);

    const { data, error } = await supabase
      .from('questions')
      .select('votes1, votes2, total')
      .eq('id', question.id);

    if (error) {
      console.error(error);
      return;
    }

    const { votes1, votes2, total } = data![0];

    setPercent1((votes1! / total!) * 100);
    setPercent2((votes2! / total!) * 100);
    setTotal(total!);

    setTimeout(() => {
      setIndex(index + 1);
    }, 7000);
  };

  useEffect(() => {
    setPercent1(0);
    setPercent2(0);
    setTotal(0);
  }, [index]);

  return (
    <main className="flex flex-col lg:flex-row h-screen">
      <div
        className="w-full h-1/2 lg:w-1/2 lg:h-full flex flex-col lg:flex-row gap-3 items-center justify-end"
        style={{
          background: color1,
          color: color2,
        }}
      >
        <header className="absolute left-4 top-4">
          <h1 className="font-semibold">qué preferís?</h1>
        </header>
        <button
          className="w-full h-full flex flex-col p-8 lg:flex-row gap-3 items-center justify-end relative text-lg font-semibold group"
          onClick={async () => {
            await handleClick('1');
          }}
          style={{ color: color2 }}
          onMouseEnter={() => setHovering1(true)}
          onMouseLeave={() => setHovering1(false)}
        >
          <p className="text-4xl">{question.option1?.match(regex)}</p>
          <p className="inline-block relative">
            <span>{question.option1?.split(regex)[0]}</span>
            <div
              className={
                `hover-underline-animation-left` +
                (hovering1 ? ' hover-underline-animation-left-hover' : '')
              }
              style={{ background: color2 }}
            ></div>
          </p>

          <div className="w-full h-10 absolute mt-32 right-0 flex items-center justify-end">
            <div
              className="h-10 flex items-center justify-end"
              style={{
                background: color2,
                color: color1,
                width: `${percent1}%`,
                transition: 'width',
                transitionDuration: `${percent1 / 20}s`,
                transitionTimingFunction: 'ease-out',
              }}
            ></div>
          </div>
          {total > 0 && (
            <span className="absolute mt-64" style={{ color: color2 }}>
              <CountUp
                end={percent1}
                suffix="%"
                duration={percent1 / 20}
                easingFn={(t, b, c, d) => c * (1 - (1 - t / d) ** 3) + b}
              />
            </span>
          )}
        </button>
      </div>

      <div
        className="w-full h-1/2 lg:w-1/2 lg:h-full flex flex-col lg:flex-row gap-3 items-center justify-start"
        style={{
          background: color2,
          color: color1,
        }}
      >
        <button
          className="w-full h-full flex flex-col p-8 lg:flex-row gap-3 items-center justify-start relative text-lg font-semibold group"
          onClick={async () => {
            await handleClick('2');
          }}
          style={{ color: color1 }}
          onMouseEnter={() => setHovering2(true)}
          onMouseLeave={() => setHovering2(false)}
        >
          <p className="inline-block relative">
            <span>{question.option2?.split(regex)[0]}</span>
            <div
              className={
                `hover-underline-animation-right` +
                (hovering2 ? ' hover-underline-animation-right-hover' : '')
              }
              style={{ background: color1 }}
            ></div>
          </p>
          <p className="text-4xl">{question.option2?.match(regex)}</p>

          <div className="w-full h-10 absolute mt-32 left-0 flex items-center justify-start">
            <div
              className="h-10 flex items-center justify-start"
              style={{
                background: color1,
                color: color2,
                width: `${percent2}%`,
                transition: 'width',
                transitionDuration: `${percent2 / 20}s`,
                transitionTimingFunction: 'ease-out',
              }}
            ></div>
          </div>
          {total > 0 && (
            <span className="absolute mt-64" style={{ color: color1 }}>
              <CountUp
                end={percent2}
                suffix="%"
                duration={percent2 / 20}
                easingFn={(t, b, c, d) => c * (1 - (1 - t / d) ** 3) + b}
              />
            </span>
          )}
        </button>
        <footer className="font-logo absolute right-4 bottom-4">
          NICO MOYANO
        </footer>
      </div>
    </main>
  );
}
