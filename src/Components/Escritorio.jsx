export default function Escritorio({ proporcion=90, value, onChange, onSend  }) {  //proporcion= porcentaje de textarea,
    return (
      <div    style={{ 
        width:"100%", 
        display: "flex", 
        height: "10%",
      }} >
        <textarea 
        style={{ marginTop: 20, display: "block",  
          borderRadius: 10, 
          width:`${proporcion}%`,
          resize: "none"

        }} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="textarea" 
        placeholder="Prueba"
        maxLength={140}

        >
        </textarea>
        <div style={{flexGrow: 1, display: "flex",marginTop: 20, justifyContent: "center"  }}>
          <button 
          style={{width: "80%", borderRadius: 20}}
          onClick={onSend} disabled={!value}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
  