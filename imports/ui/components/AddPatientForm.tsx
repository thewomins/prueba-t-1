import React, { useEffect, useState } from "react";
import { validateRut, formatRut, cleanRut } from "rutlib";
import { useForm, Controller } from "react-hook-form";
import { Input } from "./input";
import { getComunas, getRegiones } from "/imports/api/localization";
import { Select } from "./select";
import { PatientsCollection } from "../../api/patient/patientCollection";
import Dialog from "./dialog";
import { Meteor } from "meteor/meteor";

type TPatient = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  region: string;
  comuna: string;
  codigoPostal: string;
};

const initialPatient: TPatient = {
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  rut: "",
  region: "",
  comuna: "",
  codigoPostal: "",
};

Meteor.subscribe("insertPatient");

export const AddPatientForm = () => {
  const {
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TPatient>({
    defaultValues: initialPatient,
  });

  const [comunas, setComunas] = useState<string[]>([]);
  const [dialogError, setDialogError] = useState(false);
  const [dialogSuccess, setDialogSuccess] = useState(false);

  //Watch for changes on region selector to get comunas
  useEffect(() => {
    setComunas(getComunas(getValues().region));
  }, [watch("region")]);

  //Format inputs and add patient to the database
  const onSubmit = (patient: TPatient) => {
    if (PatientsCollection.findOne({ rut: cleanRut(patient.rut) })) {
      setDialogError(true);
      return;
    }
    PatientsCollection.insert({
      ...patient,
      rut: cleanRut(patient.rut),
      codigoPostal: parseInt(patient.codigoPostal),
    });
    reset(initialPatient);
    setDialogSuccess(true);
  };

  return (
    <div
      className="container mx-auto px-4 py-4 my-4 gap-2 border border-gray-400 rounded-md"
      style={{ maxWidth: 500 }}>
      <p className="text-2xl font-bold text-center">Ingresar paciente</p>
      <form
        className="flex flex-col gap-2 py-2"
        onSubmit={handleSubmit(onSubmit)}>
        {/* NOMBRES */}
        <Controller
          name="nombres"
          control={control}
          rules={{
            required: "Campo requerido",
            minLength: { value: 2, message: "Debe tener mas de 2 caracteres" },
            maxLength: {
              value: 80,
              message: "Debe tener menos de 80 caracteres",
            },
          }}
          render={({ field: { name, value, onBlur, onChange } }) => (
            <Input
              label="Nombres"
              name={name}
              onBlur={onBlur}
              type="text"
              value={value}
              placeholder="Pedro Antonio"
              error={Boolean(errors?.nombres)}
              errorMsg={errors?.nombres?.message}
              onChange={onChange}
            />
          )}
        />
        {/* APELLIDO PATERNO */}
        <Controller
          name="apellidoPaterno"
          control={control}
          rules={{
            required: "Campo requerido",
            minLength: { value: 2, message: "Debe tener mas de 2 caracteres" },
            maxLength: {
              value: 80,
              message: "Debe tener menos de 80 caracteres",
            },
          }}
          render={({ field: { name, value, onBlur, onChange } }) => (
            <Input
              label="Apellido paterno"
              name={name}
              onBlur={onBlur}
              type="text"
              value={value}
              placeholder="González"
              error={Boolean(errors?.apellidoPaterno)}
              errorMsg={errors?.apellidoPaterno?.message}
              onChange={onChange}
            />
          )}
        />
        {/* APELLIDO MATERNO */}
        <Controller
          name="apellidoMaterno"
          control={control}
          rules={{
            required: "Campo requerido",
            minLength: { value: 2, message: "Debe tener mas de 2 caracteres" },
            maxLength: {
              value: 80,
              message: "Debe tener menos de 80 caracteres",
            },
          }}
          render={({ field: { name, value, onBlur, onChange } }) => (
            <Input
              label="Apellido materno"
              name={name}
              onBlur={onBlur}
              type="text"
              value={value}
              placeholder="Muñoz"
              error={Boolean(errors?.apellidoMaterno)}
              errorMsg={errors?.apellidoMaterno?.message}
              onChange={onChange}
            />
          )}
        />
        {/* RUT */}
        <Controller
          name="rut"
          control={control}
          rules={{
            required: "Campo requerido",
            minLength: { value: 3, message: "Debe tener mas de 2 digitos" },
            maxLength: { value: 20, message: "Debe tener menos de 20 digitos" },
            //ChangeHandler
            validate: (value) =>
              validateRut(value) || "Rut ingresado no valido",
          }}
          render={({ field: { name, value, onBlur, onChange } }) => (
            <Input
              label="Rut"
              name={name}
              onBlur={onBlur}
              type="text"
              placeholder="11.111.111-1"
              value={value === "-" ? "" : value}
              error={Boolean(errors?.rut)}
              errorMsg={errors?.rut?.message}
              onChange={(event: { target: { value: string } }) => {
                onChange(formatRut(event.target.value));
              }}
            />
          )}
        />
        {/* REGION */}
        <Controller
          name="region"
          control={control}
          rules={{
            required: "Campo requerido",
            validate: (value) => {
              if (value === "Seleccione una region") {
                return "Seleccione una region";
              }
            },
          }}
          render={({ field: { name, value, onBlur, onChange } }) => (
            <Select
              label="Region"
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              value={value}
              options={getRegiones()}
              placeholder="Seleccione una region"
              error={Boolean(errors?.region)}
              errorMsg={errors?.region?.message}
            />
          )}
        />
        {/* COMUNA */}
        <Controller
          name="comuna"
          control={control}
          rules={{
            required: "Campo requerido",
            validate: (value) => {
              if (getValues().region === "Seleccione una region") {
                return "Seleccione una region antes";
              }
              if (value === "Seleccione una comuna") {
                return "Seleccione una comuna";
              }
            },
          }}
          render={({ field: { name, value, onBlur, onChange } }) => (
            <Select
              label="Comuna"
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              value={value}
              options={comunas}
              placeholder="Seleccione una comuna"
              error={Boolean(errors?.comuna)}
              errorMsg={errors?.comuna?.message}
            />
          )}
        />
        {/* CODIGO POSTAL */}
        <Controller
          name="codigoPostal"
          control={control}
          rules={{
            required: "Campo requerido",
            minLength: { value: 2, message: "Debe tener mas de 2 digitos" },
            maxLength: {
              value: 20,
              message: "Debe tener menos de 20 digitos",
            },
          }}
          render={({ field: { name, value, onBlur, onChange } }) => (
            <Input
              label="Código postal"
              name={name}
              onBlur={onBlur}
              type="number"
              value={value}
              placeholder="360000"
              error={Boolean(errors?.codigoPostal)}
              errorMsg={errors?.codigoPostal?.message}
              onChange={onChange}
            />
          )}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 mx-4 rounded-md"
          type="submit">
          Ingresar
        </button>
        <Dialog
          title="Agregado"
          description="Paciente agregado correctamente"
          showDialog={dialogSuccess}
          setShowDialog={setDialogSuccess}
          type="Success"
          primaryActionText="Aceptar"
          primaryAction={() => {
            setDialogSuccess(false);
          }}
        />
        <Dialog
          title="Ya existe"
          description="El rut ingresado ya registrado"
          showDialog={dialogError}
          setShowDialog={setDialogError}
          type="Warning"
          primaryActionText="Aceptar"
          primaryAction={() => {
            setDialogError(false);
          }}
        />
      </form>
    </div>
  );
};
