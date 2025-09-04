"use client";
import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import Controls from "./Controls";

// Dados das cartas
const cardData = [
  {
    id: 1,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://cdn-icons-png.flaticon.com/128/5968/5968350.png",
    virado: false,
  },
  {
    id: 2,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    virado: false,
  },
  {
    id: 3,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    virado: false,
  },
  {
    id: 4,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    virado: false,
  },
  {
    id: 5,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://cdn-icons-png.flaticon.com/512/15466/15466047.png",
    virado: false,
  },
  {
    id: 6,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://cdn-icons-png.flaticon.com/512/1051/1051277.png",
    virado: false,
  },
  {
    id: 7,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg",
    virado: false,
  },
  {
    id: 8,
    url1: "https://img.freepik.com/vetores-premium/icone-de-marca-de-pergunta-de-vetor-3d-roxo-personalizavel-para-educacao-negocios-e-midia_462839-15543.jpg",
    url: "https://cdn-icons-png.flaticon.com/512/5968/5968332.png",
    virado: false,
  },
];

const initialCards = [...cardData, ...cardData];

export default function CardGame() {
  const [cart, setCart] = useState(initialCards);
  const [primeira, setPrimeira] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);

 
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

 
  useEffect(() => {
    if (cart.every(c => c.virado)) {
      alert("Parabéns! Você virou todas as cartas!");
      setIsRunning(false);
    }
  }, [cart]);

  const virarCard = (index: number) => {
    if (cart[index].virado) return;

    const novoCartao = [...cart];
    novoCartao[index] = { ...novoCartao[index], virado: true };
    setCart(novoCartao);

    if (primeira === null) {
      setPrimeira(index);
    } else {
      const saoIguais = cart[index].id === cart[primeira].id;
      if (saoIguais) setScore(prev => prev + 10);
      else {
        setTimeout(() => {
          setCart(prev =>
            prev.map((c, i) =>
              i === index || i === primeira ? { ...c, virado: false } : c
            )
          );
        }, 700);
      }
      setPrimeira(null);
    }
  };

  const sortear = () => {
    const resetAndShuffle = [...initialCards]
      .map(c => ({ ...c, virado: false }))
      .sort(() => Math.random() - 0.5);
    setCart(resetAndShuffle);
    setScore(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      <Controls
        minutes={minutes}
        seconds={remainingSeconds}
        score={score}
        onReset={sortear}
        onStart={() => setIsRunning(true)}
      />

      <div className="grid grid-cols-4 grid-rows-4 gap-5 px-5 py-5">
        {cart.map((cartas, index) => (
          <CardItem
            key={index}
            srcFront={cartas.url1}
            srcBack={cartas.url}
            virado={cartas.virado}
            onClick={() => virarCard(index)}
          />
        ))}
      </div>
    </div>
  );
}
