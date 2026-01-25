import Escritorio from "../Components/Escritorio";
import Titular from "../Components/Titular";
import MessageBox from "../Components/MessageBox";

export default function Tests(){
    return (<center>
                <Titular titulo={"PRUEBAS"}/>
                <div style={{width: "100%"}}>
                <MessageBox/>
                <Escritorio/>
                </div>
            </center>)
}