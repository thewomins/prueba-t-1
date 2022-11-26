import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { formatRut } from "rutlib/lib";
import {
  PatientsCollection,
  IPatient,
} from "../../api/patient/patientCollection";
import Dialog from "./dialog";

export const ListPatients = () => {
  const [dialog, setDialog] = useState(false);
  const [idPatientSelected, setIdPatientSelected] = useState<string>("");

  const patients: IPatient[] = useTracker(() => {
    return PatientsCollection.find().fetch();
  });

  const deletePatient = (id: string) => {
    PatientsCollection.remove(id);
  };

  return (
    <div className="container flex flex-col mx-auto px-4 py-4 my-4 gap-4 border border-gray-400 rounded-md">
      <p className="text-2xl font-bold text-center">Lista de pacientes</p>
      <div>
        <table className="min-w-full text-center">
          <tbody>
            <tr className="border-b bg-slate-200">
              <th className="px-2 py-2">Rut</th>
              <th className="px-2 py-2">Nombres</th>
              <th className="px-2 py-2">Apellido paterno</th>
              <th className="px-2 py-2">Apellido materno</th>
              <th className="px-2 py-2">Region</th>
              <th className="px-2 py-2">Comuna</th>
              <th className="px-2 py-2">Código postal</th>
              <th className="px-2 py-2">Acciones</th>
            </tr>
            {patients.map((patient) => (
              <tr className="border-b" key={patient._id}>
                <td className="text-sm text-gray-900 font-medium py-2 whitespace-nowrap">
                  {formatRut(patient.rut)}
                </td>
                <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                  {patient.nombres}
                </td>
                <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                  {patient.apellidoPaterno}
                </td>
                <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                  {patient.apellidoMaterno}
                </td>
                <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                  {patient.region}
                </td>
                <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                  {patient.comuna}
                </td>
                <td className="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                  {patient.codigoPostal}
                </td>
                <td
                  className="flex h-full py-2 justify-center cursor-pointer"
                  onClick={() => {
                    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    setIdPatientSelected(patient._id!);
                    setDialog(true);
                  }}>
                  <img
                    className="h-8 rounded-md aspect-square self-center p-1"
                    src="https://img.icons8.com/material-rounded/24/FA5252/delete-forever.png"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog
          title="Borrar paciente"
          description="¿Desea eliminar el paciente para siempre?"
          showDialog={dialog}
          setShowDialog={setDialog}
          type="Error"
          primaryActionText="Eliminar"
          primaryAction={() => {
            deletePatient(idPatientSelected);
            setDialog(false);
          }}
          secondaryActionText="Cancelar"
          secondaryAction={() => {
            setDialog(false);
          }}
        />
      </div>
    </div>
  );
};
