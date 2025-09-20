// src/features/mapquiz/hooks.js
import { useEffect, useMemo, useState } from "react";

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useShuffledDeck(names) {
  const [deck, setDeck] = useState([]);
  useEffect(() => setDeck(shuffle(names)), [names]);
  const reshuffle = () => setDeck(shuffle(names));
  return { deck, reshuffle, setDeck };
}

export function useQuizState(allNames) {
  const [answered, setAnswered] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState("");
  const [lastWrong, setLastWrong] = useState(null);

  const solvedCount = useMemo(
    () => allNames.filter((r) => answered[r]).length,
    [answered, allNames]
  );
  const percent = Math.round((solvedCount / allNames.length) * 100);
  const accuracy = attempts ? Math.round((solvedCount / attempts) * 100) : 0;
  const errorKeyFor = (name) =>
    lastWrong && lastWrong.region === name ? lastWrong.ts : 0;

  const resetState = () => {
    setAnswered({});
    setAttempts(0);
    setResult("");
    setLastWrong(null);
  };

  return {
    answered,
    setAnswered,
    attempts,
    setAttempts,
    result,
    setResult,
    lastWrong,
    setLastWrong,
    solvedCount,
    percent,
    accuracy,
    errorKeyFor,
    resetState,
  };
}
