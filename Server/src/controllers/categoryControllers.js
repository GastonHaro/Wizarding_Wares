const { arrojarError, validateString } = require("../utils/utils");
const {Category} = require("../models/relationship/relationship");


// *** PEDIR TODAS LAS CATEGORIAS ***
const getAllCategories = async () => {
  // Primero validamos si tenemos datos en Categorie
  const exists = await Category.findAll();

  // Si no encuentra nada, nos devuelve un mensaje
  if(exists.length == 0){
    arrojarError("No Tienes Categorias En Base De Datos");
  }

  // Caso Contrario Las Traemos Todas
  return exists;
};


// ***************************************************************************************


// *** CREAR UNA CATEGORIA ***
const crearCategoria = async (name) => {
  // Si no pasan un dato, se arroja un error
  if(!name) {
    arrojarError("Parametro necesario Inexistente");
  }

  // validamos si el dato ingresado es un string de solo letras y espacios
  const isValidate = validateString(name);

  // En caso de que contenga otro tipo caracteres arrojara un error
  if(!isValidate) {
    arrojarError("Nombre de categoria solo debe contener letras y espacios");
  }
  
  // Comprobamos si ya tenemos la categoria guardada en nuestra base de datos
  const isRepeat = await Category.findAll({
    where: {
      name : name
    }
  });

  // Si encuentra la categoria en base de datos, arrojamos un error
  if(isRepeat.length > 0 ){
    arrojarError("Categoria Ya Existe");
  }

  // Caso Contrario La Creamos
  const newCategorie = await Category.create({name});
  // return newCategorie;
  return `Category ${name}. Created Successfully`;
};


// ***************************************************************************************

// *** MODIFICAR UNA CATEGORIA ***
const updateACategory = async (name, modify) => {

  // Primero verificamos si tenemos o no categorias
  const exists = await Category.findAll();

  // En el caso de no tener categorias en DB, lanzamos un error
  if(!exists.length){
    arrojarError("No Tienes Categorias Para Modificar");
  }

  // Verificamos si nos pasan argumento o no
  (!name || !modify) && arrojarError("Parametros Necesarios Incompletos");

  // Validamos si los argumentos ingresados son de tipo String
  const validName = validateString(name);
  const validModify = validateString(modify);

  // Si los argumentos no cumplen la condicion de solo Letras Y Espacios. Lanzamos un error
  if(!validName || !validModify){
    arrojarError("Parametros; Deben De Ser Solo Letras Del ABC y Espacios");
  }

  // Buscamos la categoria que queremos modificar
  const categorie = await Category.findOne({
    where: {
      name: name
    }
  });

  // Si no existe la categoria lanzamos un error
  if(categorie == null){
    arrojarError(`Category ${name}; No Existe En Tu DB`);
  }

  // Caso contrario modificamos el nombre de nuestra categoria
  const newNameCategory = await Category.update({name: modify},{
    where: {
      name: name
    }
  });

  // return newNameCategory;
  return `Modification Made Successfully`;
};


// ***************************************************************************************

// *** ELIMINAR UNA CATEGORIA ***
const deleteACategory = async (name) => {

  // Primero verificamos si tenemos o no categorias
  const exists = await Category.findAll();

  // En el caso de no tener categorias en DB, lanzamos un error
  !exists.length && arrojarError("No Tienes Categorias En DB. Para Eliminar");

  // Verificamos si nos pasan argumentos o no
  (!name) && arrojarError("Parametro Necesario Inexistente");

  // Validamos si el argumento ingresado es de tipo String
  const validName = validateString(name);

  // Si los argumentos no cumplen la condicion de solo Letras Y Espacios. Lanzamos un error
  (!validName) && arrojarError("Parametro; Debe De Ser Solo Letras Del ABC y Espacios");

  // Buscamos la categoria que queremos eliminar
  const deleteCategory = await Category.findAll({
    where: {
      name: name
    }
  });

  // Si no existe la categoria lanzamos un error
  if(!deleteCategory.length){
    arrojarError(`Category ${name}; No Existe En Tu DB`);
  }

  // Caso contrario nos disponemos a eliminar la categoria
  await Category.update({isActive: !deleteCategory[0].isActive},{
    where:{
      name: name
    }
  });

  return `Category ${name}. Successfully Deleted`; 
};


module.exports = {
  crearCategoria,
  getAllCategories,
  updateACategory,
  deleteACategory,
};