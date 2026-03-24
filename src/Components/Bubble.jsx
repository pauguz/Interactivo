export default function Bubble({ text }) {
    const displayText = text?.slice(0, 140) || "";
  
    return (
      <div className="bubble">
        {displayText || "—"}
      </div>
    );
  }