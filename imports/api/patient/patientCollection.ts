import { Mongo } from "meteor/mongo";

export interface IPatient {
  _id?: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  region: string;
  comuna: string;
  codigoPostal: number;
}

export const PatientsCollection = new Mongo.Collection<IPatient>("patients");
