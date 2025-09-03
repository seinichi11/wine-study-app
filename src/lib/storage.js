// クイズ
const QUIZ_KEY = "wine-study-progress:v1";
export function loadProgress() {
  try {
    return (
      JSON.parse(localStorage.getItem(QUIZ_KEY)) ?? { correct: 0, total: 0 }
    );
  } catch {
    return { correct: 0, total: 0 };
  }
}
export function saveProgress(next) {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(next));
}
export function resetProgress() {
  localStorage.setItem(QUIZ_KEY, JSON.stringify({ correct: 0, total: 0 }));
}

// 暗記カード
const CARD_KEY = "wine-study-cards-known:v1";
export function loadKnownCardIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(CARD_KEY)) ?? []);
  } catch {
    return new Set();
  }
}
export function saveKnownCardIds(set) {
  localStorage.setItem(CARD_KEY, JSON.stringify([...set]));
}
export function resetKnownCardIds() {
  localStorage.setItem(CARD_KEY, JSON.stringify([]));
}
