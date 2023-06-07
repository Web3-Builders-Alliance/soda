import Head from "next/head";
import { useEffect, useState } from "react";

interface Bubble {
  x: number;
  y: number;
  timestamp: number;
}

export default function Egg() {
  const [bubbles, setBubbles] = useState<Array<Bubble>>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (bubbles.some((bubble) => bubble.y < 0)) {
        console.log("close");
      }
      setBubbles((bubbles) => {
        const newBubble = {
          x: Math.random() * 100,
          y: 100,
          timestamp: Date.now(),
        };
        return Math.random() * 2 > 1.5
          ? [
              ...bubbles.map((bubble) => {
                return {
                  ...bubble,
                  y:
                    bubble.y -
                    (count < 30
                      ? Math.random() * 2
                      : (Math.random() * count) / 3),
                };
              }),
              newBubble,
            ]
          : [
              ...bubbles.map((bubble) => {
                return {
                  ...bubble,
                  y:
                    bubble.y -
                    (count < 30
                      ? Math.random() * 2
                      : (Math.random() * count) / 10),
                };
              }),
            ];
      });
    }, 300);
    return () => clearInterval(id);
  });

  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate your project from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-neutral-900 flex min-h-screen min-w-screen overflow-hidden max-h-screen max-w-screen p-5">
        <div className="min-w-full min-h-full relative">
          <h1
            className="absolute transform -translate-x-1/2 -translate-y-1/2 duration-1000 text-green-500 text-5xl"
            style={{
              top: `2%`,
              left: `90%`,
            }}
          >
            {count}
          </h1>
          {bubbles?.map((bubble) => {
            console.log(bubble);
            return (
              <div
                key={bubble.timestamp}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                style={{
                  top: `${bubble.y}%`,
                  left: `${bubble.x}%`,
                }}
                onClick={() => {
                  setBubbles(
                    bubbles.filter((b) => {
                      return b.timestamp !== bubble.timestamp;
                    })
                  );
                  setCount(count + 1);
                }}
              >
                <div className="w-5 h-5 p-5 rounded-full bg-[#9ff] border border-blue-300"></div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
