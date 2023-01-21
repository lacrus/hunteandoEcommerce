export default function validacionStock(arrayDeTalles) {
  let errores = {};
  let tallesColores = [];
  for (let i = 0; i < arrayDeTalles.length; i++) {
    if (
      !arrayDeTalles[i].size.trim().length ||
      !arrayDeTalles[i].color.trim().length ||
      parseInt(arrayDeTalles[i].quantity) <= 0
    ) {
      errores[`${i}`] = "*Talle y color requeridos, cantidad mínima 1";
      //   continue;
    } else {
      if (
        tallesColores.filter(
          (e) =>
            e.size === arrayDeTalles[i].size?.trim().toLowerCase() &&
            e.color === arrayDeTalles[i].color?.trim().toLowerCase()
        ).length
      ) {
        errores[`${i}`] = "*Talle y color repetidos";
      } else {
        tallesColores.push({
          size: arrayDeTalles[i].size.trim().toLowerCase(),
          color: arrayDeTalles[i].color.trim().toLowerCase(),
        });
      }
    }
  }
  return errores;
}

// talles.filter((i) => i.talle === "XS").length
