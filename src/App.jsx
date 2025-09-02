function App() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🍷 Wine Study App</h1>
      <p>ようこそ！ワイン学習アプリへ。</p>
      <button
        style={{
          background: "#8B0000",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => alert("ワイン学習を始めましょう！")}
      >
        学習スタート
      </button>
    </div>
  );
}

export default App;
