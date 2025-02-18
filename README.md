# 📌 Challenge de ingreso

## 📖 Descripción

Este proyecto contiene el ejercicio de ingreso/entrevista para el puesto de desarrollador web en la DGGSM.

## 🚀 Niveles

El proyecto se separa en 5 niveles:

| Hecho | Nivel             | Descripción                                 |
| :---: | ----------------- | ------------------------------------------- |
|  ✅   | Repositorio       | Creación de repositorio                     |
|  ✅   | Backend           | Desarrollo de servidor para API REST        |
|       | Base de datos     | Elección y creación de BDD, DER y consultas |
|       | Frontend          | Desarrollo de página web                    |
|       | Testeo automático | Desarrollo de pruebas                       |

## 🌌 API Endpoints

#### GET | /employees

Trae una lista de todos los empleados.

#### GET | /employees/_{idNo}_

Trae a los empleados cuya propiedad `idNo` coincidan con el del parámetro de ruta.

#### POST | /employees

Agrega un empleado a la lista.

Cuerpo de la petición:

```
{
  fullName: "Nombre Apellido",
  idNo: 12345678,
  birthDate: "YYYY/M/D",
  isDev: true/false,
  description: "Breve descripción.",
  area: "Área de trabajo",
}
```

#### PUT | /employees/_{idNo}_

Modifica a los empleados cuya propiedad `idNo` coincida con el del parámetro de ruta.

El cuerpo de la petición puede contener cualquiera de estas propiedades:

- **fullName**: "Nombre Apellido"
- **idNo**: 12345678
- **birthDate**: "YYYY/M/D"
- **isDev**: true/false
- **description**: "Breve descripción."
- **area**: "Área de trabajo"

#### DELETE | /employees/_{idNo}_

Elimina a los empleados cuya propiedad `idNo` coincida con el del parámetro de ruta.

## 🎨 DER

-- Pendiente

## 👨‍💻 Cómo ejecutar

-- Pendiente

## 📦 Paquetes

- `Express.js` - Framework para la API
