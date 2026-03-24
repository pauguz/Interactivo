import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebase";
import Titular from "../Components/Titular";
import MessageBox from "../components/MessageBox";
import Escritorio from "../Components/Escritorio";
import Bubble from "../Components/Bubble";

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

  const [myDraft, setMyDraft] = useState("");
  const [otherMessage, setOtherMessage] = useState("");
  const [myMessage, setMyMessage] = useState("");
  const [last, setLast] = useState('');


  // Escuchar cambios ajenos
  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}/${otherRole}`); //entra a esa direccion de la bd
    const unsuscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOtherMessage(data);
      }

    });
    return ()=>unsuscribe();
  }, [roomId, otherRole]);

    // Escuchar cambios propios
    useEffect(() => {
      const roomRef = ref(db, `rooms/${roomId}/${role}`); //entra a esa direccion de la bd
      const unsuscribe = onValue(roomRef, (snapshot) => {
        const data = snapshot.val();

        if (data ) {
          setMyMessage(data);
        }
      });
      return ()=>unsuscribe();
    }, [roomId, otherRole]);

  // Enviar mensaje (sobrescribe)
  const sendMessage = () => {
    set(ref(db, `rooms/${roomId}/${role}`), myDraft);
    setMyDraft("");
  };

  return (
    <div style={{ borderWidth: 1, borderColor: 'black', height: '100vh'}}>
      
      <Titular  titulo={roomId} />
      <p>Tu rol: {role}</p>

      <div>
        <strong>Tu mensaje:</strong>
        <Bubble text={myMessage}/>
      </div>
      <div>
        <strong>Mensaje del otro usuario:</strong>
        <Bubble text={otherMessage}/>
      </div>
      <div style={{height:"40%", border:"black"}}>
        A
      </div>
      <center>
      <div style={{display: 'flex', width: '50%'}}>
        <Escritorio
          value={myDraft}
          onChange={setMyDraft}
          onSend={sendMessage}
        />
      </div>
      </center>
    </div>
  );
}
