const express = require('express');
const { matematicas } = require('../datos/cursos.js').infoCursos;
const routerMatematicas = express.Router();

routerMatematicas.use(express.json());


routerMatematicas.get('/', (req, res) => {
  res.json(matematicas);
});


routerMatematicas.get('/:tema', (req, res) => {
  const tema = req.params.tema;
  const resultados = matematicas.filter(curso => curso.tema === tema);

  if (resultados.length === 0) {
    return res.status(404).json({ message: `No se encontraron cursos de ${tema}` });
  }
  res.json(resultados);
});


routerMatematicas.post('/', (req, res) => {
  const nuevoCurso = req.body;

  if (!nuevoCurso.id || !nuevoCurso.titulo || !nuevoCurso.tema || !nuevoCurso.nivel) {
    return res.status(400).json({ message: 'Faltan campos obligatorios para crear el curso.' });
  }

  matematicas.push(nuevoCurso);

  res.status(201).json({ message: 'Curso de matemáticas creado con éxito', curso: nuevoCurso });
});


routerMatematicas.put('/:id', (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = matematicas.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    matematicas[indice] = cursoActualizado;
    res.json({ message: `Curso de matemáticas con ID ${id} actualizado con éxito`, curso: cursoActualizado });
  } else {
    res.status(404).json({ message: `Curso de matemáticas con ID ${id} no encontrado` });
  }
});


routerMatematicas.patch('/:id', (req, res) => {
  const infoNueva = req.body;
  const id = req.params.id;
  const indice = matematicas.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = matematicas[indice];
    Object.assign(cursoAModificar, infoNueva);
    res.json({ message: `Curso de matemáticas con ID ${id} modificado parcialmente`, curso: cursoAModificar });
  } else {
    res.status(404).json({ message: `Curso de matemáticas con ID ${id} no encontrado` });
  }
});


routerMatematicas.delete('/:id', (req, res) => {
  const id = req.params.id;
  const indice = matematicas.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    matematicas.splice(indice, 1);
    res.json({ message: `Curso de matemáticas con ID ${id} eliminado con éxito` });
  } else {
    res.status(404).json({ message: `Curso de matemáticas con ID ${id} no encontrado` });
  }
});

module.exports = routerMatematicas;
