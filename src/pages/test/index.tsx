export default function TestPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: 16,
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: "bold" }}>
        Toastの動作確認テスト画面
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <button
          type="button"
          style={{
            color: "white",
            background: "#00801A",
            padding: 16,
            borderRadius: 1000,
          }}
        >
          成功トーストを表示するボタン
        </button>
        <button
          type="button"
          style={{
            color: "white",
            background: "#DA3B36",
            padding: 16,
            borderRadius: 1000,
          }}
        >
          失敗トーストを表示するボタン
        </button>
      </div>
    </div>
  );
}
