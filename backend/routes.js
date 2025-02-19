const express = require("express");
const db = require('./db');
const router = express.Router();

//#region Empleados
router.get("/employees", async (req, res) => {
  try {
    const [employees] = await db.query('SELECT employees.*, areas.area FROM employees, areas WHERE employees.areaId = areas.id');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});

router.get("/employees/:idNo", async (req, res) => {
  try {
    const [employees] = await db.query('SELECT e.*, areas.area FROM employees e, areas WHERE e.idNo = ? AND e.areaId = areas.id LIMIT 1', [req.params.idNo]);
    if (employees.length == 0)
      return res.status(404).json({ error: 'Empleado no encontrado.' });

    res.json(employees[0]);
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
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
    res.status(201).json({ rowId: result.insertId, employee: newEmp });
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});

router.delete("/employees/:idNo", async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM employees WHERE idNo = ?', [req.params.idNo]);
    if (result.affectedRows == 0)
      return res.status(404).json({ error: 'Empleado no encontrado.' });

    res.json({ msg: 'Empleado eliminado.' });
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});

router.put("/employees/:idNo", async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM employees WHERE idNo = ? LIMIT 1', [req.params.idNo]);
    if (employees.length == 0)
      return res.status(404).json({ error: 'Empleado no encontrado.' });

    const emp = employees[0];
    emp.fullName = req.body.fullName ?? emp.fullName;
    emp.birthDate = req.body.birthDate ?? emp.birthDate;
    emp.isDev = req.body.isDev ?? emp.isDev;
    emp.description = req.body.description ?? emp.description;
    emp.areaId = req.body.areaId ? parseInt(req.body.areaId) : emp.areaId;

    await db.query('UPDATE employees SET fullName=?, birthDate=?, isDev=?, description=?, areaId=? WHERE idNo = ?',
      [emp.fullName, emp.birthDate, emp.isDev, emp.description, emp.areaId, emp.idNo]);

    res.json({ msg: 'Empleado modificado.', employee: emp });
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});
//#endregion

//#region Áreas
router.get("/areas", async (req, res) => {
  try {
    const [areas] = await db.query('SELECT * FROM areas');
    res.json(areas);
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});

router.get("/areas/:id", async (req, res) => {
  try {
    const [areas] = await db.query('SELECT * FROM areas WHERE id = ? LIMIT 1', [req.params.id]);
    if (areas.length == 0)
      return res.status(404).json({ error: 'Área no encontrada.' });

    res.json(areas[0]);
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});

router.post("/areas", async (req, res) => {
  let newArea = { id: 0, area: req.body.area };

  try {
    const [result] = await db.query('INSERT INTO areas(area) VALUES (?)', [newArea.area]);
    newArea.id = result.insertId;
    res.status(201).json({ rowId: result.insertId, area: { newArea } });
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});

router.delete("/areas/:id", async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM areas WHERE id = ?', [req.params.id]);
    if (result.affectedRows == 0)
      return res.status(404).json({ error: 'Área no encontrada.' });

    res.json({ msg: 'Área eliminada.' });
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});

router.put("/areas/:id", async (req, res) => {
  if (req.body.area == null)
    return res.status(400).json({ error: 'Debe ingresar un área para modificar.' });

  const area = { id: parseInt(req.body.id), area: req.body.area };

  try {
    await db.query('UPDATE areas SET area=? WHERE id = ?', [area.area, area.id]);

    res.json({ msg: 'Área modificada.', area: area });
  } catch (err) {
    res.status(500).json({ error: 'Falló el query.', descr: err });
  }
});
//#endregion

module.exports = router;
