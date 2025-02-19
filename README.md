# 📌 Challenge de ingreso

## 📖 Descripción

Este proyecto contiene el ejercicio de ingreso/entrevista para el puesto de desarrollador web en la DGGSM.

## 🚀 Niveles

El proyecto se separa en 5 niveles:

| Hecho | Nivel             | Descripción                                 |
| :---: | ----------------- | ------------------------------------------- |
|  ✅   | Repositorio       | Creación de repositorio                     |
|  ✅   | Backend           | Desarrollo de servidor para API REST        |
|  ✅   | Base de datos     | Elección y creación de BDD, DER y consultas |
|       | Frontend          | Desarrollo de página web                    |
|       | Testeo automático | Desarrollo de pruebas                       |

## 🌌 API Endpoints

#### GET | /employees

Trae una lista de todos los empleados.

#### GET | /employees/_:idNo_

Trae al empleado cuya propiedad `idNo` coincida con el del parámetro de ruta.

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
  area: 101,
}
```

#### PUT | /employees/_:idNo_

Modifica al empleado cuya propiedad `idNo` coincida con el del parámetro de ruta.

El cuerpo de la petición puede contener cualquiera de estas propiedades:

- **fullName**: "Nombre Apellido"
- **idNo**: 12345678
- **birthDate**: "YYYY/M/D"
- **isDev**: true/false
- **description**: "Breve descripción."
- **areaId**: 101

#### DELETE | /employees/_:idNo_

Elimina al empleado cuya propiedad `idNo` coincida con el del parámetro de ruta.

---

#### GET | /areas

Trae una lista de todas las áreas de trabajo.

#### GET | /areas/_:id_

Trae el área de trabajo cuya propiedad `id` coincida con la del parámetro de ruta.

#### POST | /areas

Agrega un empleado a la lista.

Cuerpo de la petición:

```
{
  area: "Área de trabajo",
}
```

#### PUT | /areas/_:id_

Modifica el área cuya propiedad `id` coincida con el del parámetro de ruta.

El cuerpo de la petición debe contener la propiedad **area**: "Descripción del área".

#### DELETE | /areas/_:id_

Elimina el área de trabajo cuya propiedad `id` coincida con la del parámetro de ruta.

## 💾 Base de Datos

#### Elección

Opté por usar la base de datos MariaDB, debido a que ya he trabajado con ella y es la que forma parte de la interfaz phpMyAdmin y servidor XAMPP.

#### DER

![1739912560161](image/README/1739912560161.jpg)

#### 🔍 Consultas básicas

**Obtener todas las áreas**

```
SELECT * FROM AREAS;
```

Devuelve la lista de áreas registradas.

---

**Obtener todos los empleados**

```
SELECT * FROM EMPLOYEES;
```

Devuelve la lista de empleados con todos sus datos.

---

**Obtener empleados de un área específica**

```
SELECT * FROM EMPLOYEES WHERE areaId = 101;
```

Filtra empleados por área.

---

**Buscar empleados por nombre**

```
SELECT * FROM EMPLOYEES WHERE fullName LIKE '%Texto%';
```

Encuentra empleados cuyo nombre contenga cierto texto.

#### 🔄 Consultas de inserción

**Agregar un área**

```
INSERT INTO AREAS (area) VALUES ('Nombre del Área');
```

Registra una nueva área.

---

**Agregar un empleado**

```
INSERT INTO EMPLOYEES (fullName, idNo, birthDate, isDev, description, areaId)
VALUES ('Juan Pérez', 123456789, '1990-05-20', TRUE, 'Desarrollador Senior', 101);
```

Agrega un nuevo empleado.

#### 📝 Consultas de actualización

**Actualizar datos de un empleado**

```
UPDATE EMPLOYEES
SET fullName = 'Nuevo Nombre', description = 'Nueva descripción'
WHERE idNo = 123456789;
```

Modifica información de un empleado.

---

**Actualizar el área de un empleado**

```
UPDATE EMPLOYEES SET areaId = 2 WHERE idNo = 123456789;
```

Cambia a un empleado de área.

#### ❌ Consultas de eliminación

**Eliminar un empleado**

```
DELETE FROM EMPLOYEES WHERE idNo = 123456789;
```

Borra un empleado de la base de datos.

---

**Eliminar un área (si no tiene empleados asignados)**

```
DELETE FROM AREAS WHERE id = 105;
```

Borra un área de la base de datos.

## 👨‍💻 Cómo ejecutar

-- Pendiente

## 📦 Paquetes

- `Express.js` - Framework para la API
- `mysql2` - Cliente mySQL para Node
- `dotenv` - Módulo para cargar variables de entorno
- `cors` - Connect/Express middleware
- `sweetalert2` - Librería para mensajes pop-up
