import React from "react";
import { AddPatientForm } from "../components/AddPatientForm";
import { ListPatients } from "../components/ListPatient";

export const App = () => (
  <div className="flex flex-col gap-4">
    <AddPatientForm />
    <ListPatients />
  </div>
);
