const express = require("express");
const router = express.Router();

let employees = [
  {
    fullName: "Beatriz López",
    idNo: 25614551,
    birthDate: "1976/5/15",
    isDev: false,
    description: "Especialista en recursos humanos.",
    area: "RRHH",
  },
  {
    fullName: "Rolando Fernández",
    idNo: 24178141,
    birthDate: "1974/8/20",
    isDev: false,
    description: "Gerente de logística con más de 20 años de experiencia.",
    area: "Logística",
  },
  {
    fullName: "Diana Méndez",
    idNo: 44226347,
    birthDate: "2006/2/10",
    isDev: true,
    description: "Desarrolladora junior en frontend.",
    area: "Desarrollo Web",
  },
  {
    fullName: "Ailén Gómez",
    idNo: 28007301,
    birthDate: "1980/10/5",
    isDev: true,
    description: "Ingeniera de software especializada en backend.",
    area: "Desarrollo Backend",
  },
  {
    fullName: "Bruno Herrera",
    idNo: 41935663,
    birthDate: "2003/7/25",
    isDev: false,
    description: "Analista financiero en formación.",
    area: "Finanzas",
  },
  {
    fullName: "Katrina Ríos",
    idNo: 22428779,
    birthDate: "1972/3/30",
    isDev: true,
    description: "Arquitecta de software con amplia trayectoria.",
    area: "Arquitectura de Software",
  },
  {
    fullName: "Tomás Pérez",
    idNo: 33709320,
    birthDate: "1990/6/12",
    isDev: false,
    description: "Encargado de atención al cliente.",
    area: "Atención al Cliente",
  },
  {
    fullName: "Marilén Suárez",
    idNo: 41872423,
    birthDate: "2003/5/18",
    isDev: true,
    description: "Desarrolladora de aplicaciones móviles.",
    area: "Desarrollo Móvil",
  },
];

router.get("", (req, res) => {
  res.json(employees);
});

router.get("/:idNo", (req, res) => {
  res.json(employees.find(emp => emp.idNo == req.params.idNo));
});

router.post("", (req, res) => {
  const newEmp = {
    fullName: req.body.fullName,
    idNo: parseInt(req.body.idNo),
    birthDate: req.body.birthDate,
    isDev: req.body.isDev,
    description: req.body.description,
    area: req.body.area
  };

  employees.push(newEmp);
  res.status(201).json(newEmp);
});

router.delete("/:idNo", (req, res) => {
  employees = employees.filter(emp => emp.idNo != req.params.idNo);
  res.json({ message: 'Empleado eliminado!' });
});

router.put("/:idNo", (req, res) => {
  const employee = employees.find(emp => emp.idNo == req.params.idNo);
  if (!employee) return res.status(404).json({ error: 'Empleado no encontrado.' });

  employee.fullName = req.body.fullName ?? employee.fullName;
  employee.idNo = parseInt(req.body.idNo) ?? employee.idNo;
  employee.birthDate = req.body.birthDate ?? employee.birthDate;
  employee.isDev = req.body.isDev ?? employee.isDev;
  employee.description = req.body.description ?? employee.description;
  employee.area = req.body.area ?? employee.area;

  res.json(employee);
});

module.exports = router;
