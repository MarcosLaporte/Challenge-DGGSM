const express = require("express");
const db = require('./db');
const router = express.Router();

//#region Empleados
router.get("/employees", async (req, res) => {
  try {
    const [employees] = await db.query('SELECT employees.*, areas.area FROM employees, areas WHERE employees.areaId = areas.id');
    res.json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/employees/:idNo", async (req, res) => {
  try {
    const [employees] = await db.query('SELECT e.*, areas.area FROM employees e, areas WHERE e.idNo = ? AND e.areaId = areas.id LIMIT 1', [req.params.idNo]);
    if (employees.length == 0)
      return res.status(404).json({ error: 'Empleado no encontrado.' });

    res.json(employees[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/employees", async (req, res) => {
  const newEmp = {
    fullName: req.body.fullName,
    idNo: parseInt(req.body.idNo),
    birthDate: req.body.birthDate,
    isDev: req.body.isDev,
    description: req.body.description,
    areaId: parseInt(req.body.areaId)
  };

  try {
    const [result] = await db.query('INSERT INTO employees VALUES (?, ?, ?, ?, ?, ?)',
      [newEmp.fullName, newEmp.idNo, newEmp.birthDate, newEmp.isDev, newEmp.description, newEmp.areaId]);
    res.status(201).json({ insertId: result.insertId });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/employees/:idNo", async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM employees WHERE idNo = ?', [req.params.idNo]);
    if (result.affectedRows == 0)
      return res.status(404).json({ error: 'Empleado no encontrado.' });

    res.json({ affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/employees/:idNo", async (req, res) => {
  const propKeys = ["fullName", "birthDate", "isDev", "description", "areaId"]
    .filter((k) => req.body[k] !== undefined);

  if (propKeys.length === 0)
    return res.status(400).json({ error: 'Debe ingresar al menos un dato para modificar.' });

  const setValuesStr = propKeys
    .map((k) => `${k}=?`)
    .join(", ");

  const propValues = propKeys
    .map((k) => req.body[k]);

  try {
    const [result] = await db.query(`UPDATE employees SET ${setValuesStr} WHERE idNo = ?`,
      [...propValues, parseInt(req.params.idNo)]);

    res.json({ affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json(error);
  }
});
//#endregion

//#region Áreas
router.get("/areas", async (req, res) => {
  try {
    const [areas] = await db.query('SELECT * FROM areas');
    res.json(areas);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/areas/:id", async (req, res) => {
  try {
    const [areas] = await db.query('SELECT * FROM areas WHERE id = ? LIMIT 1', [req.params.id]);
    if (areas.length == 0)
      return res.status(404).json({ error: 'Área no encontrada.' });

    res.json(areas[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/areas", async (req, res) => {
  try {
    const [result] = await db.query('INSERT INTO areas(area) VALUES (?)', [req.body.area]);
    res.status(201).json({ insertId: result.insertId });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/areas/:id", async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM areas WHERE id = ?', [req.params.id]);
    if (result.affectedRows == 0)
      return res.status(404).json({ error: 'Área no encontrada.' });

    res.json({ affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/areas/:id", async (req, res) => {
  if (req.body.area == null)
    return res.status(400).json({ error: 'Debe ingresar un área para modificar.' });

  const area = { id: parseInt(req.params.id), area: req.body.area };

  try {
    const [result] = await db.query('UPDATE areas SET area=? WHERE id = ?', [area.area, area.id]);

    res.json({ affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json(error);
  }
});
//#endregion

module.exports = router;
