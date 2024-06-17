import MangixApi from "../api/api";
import { supabase } from "../supabase/supabase";

(async () => {
	await getRegisterTime(“ENTRADA”, “Sem obs”);
})();

export async function getRegisterTime(tipo,obs){
    const {data,status, statusText} = await MangixApi.post("/pontos", {
        tipo,
        obs,
    })
    
    console.log(data);
    if (status !== 201) throw new Error(statusText); 
    
    return data;
}   