import { Meteor } from "meteor/meteor";
import {
  PatientsCollection,
  IPatient,
} from "../imports/api/patient/patientCollection";

async function insertPatient(patient: IPatient) {
  await PatientsCollection.insert(patient);
}

if (Meteor.isServer) {
  Meteor.publish("patients", function () {
    return PatientsCollection.find();
  });
  Meteor.publish("addPatient", function (patient) {
    return PatientsCollection.insert(patient);
  });
}
Meteor.startup(async () => {
  if (PatientsCollection.find().count() === 0) {
    console.log("empty");
  }
});
