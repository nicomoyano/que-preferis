'use client';

import React, { useEffect, useState } from 'react';
import { Database } from '@/types/Database';
import emojiRegex from 'emoji-regex';
import CountUp from 'react-countup';
import { supabase } from '@/lib/supabase';
import { colors } from '@/consts/colors';

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
    }, 5000);
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
          transition: 'background 0.5s',
        }}
      >
        <button
          className="w-full h-full flex flex-col p-8 lg:flex-row gap-3 items-center justify-end relative text-lg font-semibold group text-center lg:text-right"
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
                transitionDuration: `${percent1 / 30}s`,
                transitionTimingFunction: 'ease-out',
              }}
            ></div>
          </div>
          {total > 0 && (
            <span className="absolute mt-64" style={{ color: color2 }}>
              <CountUp
                end={percent1}
                suffix="%"
                duration={percent1 / 30}
                easingFn={(t, b, c, d) => c * (1 - (1 - t / d) ** 3) + b}
              />
            </span>
          )}
        </button>
        <header className="absolute left-4 top-4">
          <h1 className="font-semibold">qué preferís?</h1>
        </header>
      </div>

      <div
        className="w-full h-1/2 lg:w-1/2 lg:h-full flex flex-col lg:flex-row gap-3 items-center justify-start"
        style={{
          background: color2,
          color: color1,
          transition: 'background 0.5s',
        }}
      >
        <button
          className="w-full h-full flex flex-col p-8 lg:flex-row gap-3 items-center justify-start relative text-lg font-semibold group text-center lg:text-left"
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
                transitionDuration: `${percent2 / 30}s`,
                transitionTimingFunction: 'ease-out',
              }}
            ></div>
          </div>
          {total > 0 && (
            <span className="absolute mt-64" style={{ color: color1 }}>
              <CountUp
                end={percent2}
                suffix="%"
                duration={percent2 / 30}
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
