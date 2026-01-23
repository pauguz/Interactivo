export default function MessageBox({ value, onChange, onSend }) {
    return (
      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe un mensaje corto"
        />
        <button onClick={onSend} disabled={!value}>
          Enviar
        </button>
      </div>
    );
  }
  