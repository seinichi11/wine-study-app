const KEY = "wine-study-progress:v1";

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? { correct: 0, total: 0 };
  } catch {
    return { correct: 0, total: 0 };
  }
}

export function saveProgress(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function resetProgress() {
  localStorage.setItem(KEY, JSON.stringify({ correct: 0, total: 0 }));
}
