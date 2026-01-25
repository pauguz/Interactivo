import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebase";
import Titular from "../Components/Titular";
import MessageBox from "../components/MessageBox";
import Escritorio from "../Components/Escritorio";

function getRole(roomId) {
  const key = `role-${roomId}`;
  let role = sessionStorage.getItem(key);

  if (!role) {
    role = Math.random() < 0.5 ? "A" : "B";
    sessionStorage.setItem(key, role);
  }

  return role;
}

export default function Room() {
  const { roomId } = useParams();
  const role = getRole(roomId);
  const otherRole = role === "A" ? "B" : "A";

  const [myMessage, setMyMessage] = useState("");
  const [otherMessage, setOtherMessage] = useState("");

  // Escuchar cambios
  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}`);

    return onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data[otherRole]) {
        setOtherMessage(data[otherRole]);
      }
    });
  }, [roomId, otherRole]);

  // Enviar mensaje (sobrescribe)
  const sendMessage = () => {
    set(ref(db, `rooms/${roomId}/${role}`), myMessage);
    setMyMessage("");
  };

  return (
    <div style={{ borderWidth: 1, borderColor: 'black', height: '100vh'}}>
      
      <Titular  titulo={roomId} />
      <p>Tu rol: {role}</p>

      <div>
        <strong>Mensaje del otro usuario:</strong>
        <p>{otherMessage || "—"}</p>
      </div>
      <div style={{height:"50%", border:"black"}}>
        A
      </div>
      <center>
      <div style={{display: 'flex', width: '50%'}}>
        <Escritorio
          value={myMessage}
          onChange={setMyMessage}
          onSend={sendMessage}
        />
      </div>
      </center>
    </div>
  );
}
