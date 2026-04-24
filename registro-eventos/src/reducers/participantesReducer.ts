import { Participante } from "../Models/Participante";
export type Action=
| {type:"GET_PARTICIPANTES"; payload:Participante[]}
| {type:"AGREGAR";payload:Participante}
| {type:"EDITAR";payload:Participante}
| {type:"ELIMINAR";payload:number}
| {type:"RESET";}

export const participantesReducer=(state:Participante[], action:Action):Participante[]=>{
switch (action.type){
    case "GET_PARTICIPANTES":
        return action.payload
    case "AGREGAR":
        return [...state,action.payload]
    case "EDITAR":
        return state.map(p=>p.id===action.payload.id ? action.payload : p)
    case "ELIMINAR":
       return state.filter(p=>p.id!==action.payload)
    case "RESET":
        return []
    default:
        return state

}
}