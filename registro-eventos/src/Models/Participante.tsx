export type TModalidad = "Presencial" | "Virtual" | "Hibrido";
export type TNivel = "Principiante" | "Intermedio" | "Avanzado";
export class Participante{
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: TModalidad;
  tecnologias: string[];
  nivel: TNivel;
  aceptaTerminos: boolean;
  
  constructor(
    nombre: string,
    email: string,
    edad: number,
    pais: string,
    modalidad: TModalidad,
    tecnologias: string[],
    nivel: TNivel,
    aceptaTerminos: boolean
  ){
    this.id = Date.now(); 
    this.nombre = nombre;
    this.email = email;
    this.edad = edad;
    this.pais = pais;
    this.modalidad = modalidad;
    this.tecnologias = tecnologias;
    this.nivel = nivel;
    this.aceptaTerminos = aceptaTerminos;
  }
}