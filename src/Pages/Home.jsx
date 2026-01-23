import { useNavigate } from "react-router-dom";
import { generateRoomId } from "../utils/roomId";

export default function Home() {
  const navigate = useNavigate();

  const createRoom = () => {
    const id = generateRoomId();
    navigate(`/room/${id}`);
  };

  return (
    <div style={{ borderWidth: 1}} id="generador">
      <h1>Chat efímero</h1>
      <p>Crea una sala y comparte el enlace</p>
      <button onClick={createRoom}>Crear sala</button>
    </div>
  );
}
