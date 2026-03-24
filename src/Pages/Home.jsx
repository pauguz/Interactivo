import { useNavigate } from "react-router-dom";
import { generateRoomId } from "../utils/roomId";
import Titular from "../Components/Titular";
import './styles/Home.css'

export default function Home() {
  const navigate = useNavigate();

  const createRoom = () => {
    const id = generateRoomId();
    navigate(`/room/${id}`);
  };

  return (
    <div>
      <Titular titulo={'Inicio'}/>
      <div id="generador">
        <h1>Chat efímero</h1>
        <p>Crea una sala y comparte el enlace</p>
        <div><button onClick={createRoom}>Crear sala</button></div> 
      </div>
    </div>
  );
}
