import Chile from "./comunas-regiones.json";

/**
 * Get list of Regions.
 * @return {array<string>} List of Regions in Chile.
 */
export const getRegiones = () => {
  const regiones: string[] = [];
  Chile.regiones.map((region) => {
    regiones.push(region.region);
  });
  return regiones;
};

/**
 * Search a region to get his list of comunas.
 * @param {string} region  Region name
 * @return {array<string>} List of comunas in that region.
 */
export const getComunas = (region: string) => {
  const regionSearched = Chile.regiones.find((reg) => reg.region === region);
  return regionSearched ? regionSearched.comunas : [];
};
