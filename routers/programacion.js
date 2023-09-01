const express = require("express");
const { programacion } = require("../datos/cursos.js").infoCursos;
const routerProgramacion = express.Router();

routerProgramacion.use(express.json());


routerProgramacion.get("/", (req, res) => {
  res.json(programacion);
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).json({ message: `No se encontraron cursos de ${lenguaje}.` });
  }

  if (req.query.ordenar === "vistas") {
    return res.json(resultados.sort((a, b) => b.vistas - a.vistas));
  }

  res.json(resultados);
});


routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultados.length === 0) {
    return res.status(404).json({ message: `No se encontraron cursos de ${lenguaje} de nivel ${nivel}.` });
  }

  res.json(resultados);
});


routerProgramacion.post("/", (req, res) => {
  const nuevoCurso = req.body;

  if (!nuevoCurso.id || !nuevoCurso.titulo || !nuevoCurso.lenguaje || !nuevoCurso.vistas || !nuevoCurso.nivel) {
    return res.status(400).json({ message: "Faltan campos obligatorios para crear el curso." });
  }

  programacion.push(nuevoCurso);

  res.status(201).json({ message: "Curso creado con éxito", curso: nuevoCurso });
});


routerProgramacion.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
    res.json({ message: `Curso con ID ${id} actualizado con éxito`, curso: cursoActualizado });
  } else {
    res.status(404).json({ message: `Curso con ID ${id} no encontrado` });
  }
});


routerProgramacion.patch('/:id', (req, res) => {
  const infoNueva = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoNueva);
    res.json({ message: `Curso con ID ${id} modificado parcialmente`, curso: cursoAModificar });
  } else {
    res.status(404).json({ message: `Curso con ID ${id} no encontrado` });
  }
});


routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1);
    res.json({ message: `Curso con ID ${id} eliminado con éxito` });
  } else {
    res.status(404).json({ message: `Curso con ID ${id} no encontrado` });
  }
});

module.exports = routerProgramacion;
