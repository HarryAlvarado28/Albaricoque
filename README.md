# 🧭 Proyecto Albaricoque

**Albaricoque** es un sistema interactivo que integra hardware y software para controlar un actuador físico (solenoide o motor) mediante una interfaz web desarrollada con Angular, comunicándose con una API REST hecha con Flask que corre sobre una Raspberry Pi o PC.

Este proyecto busca experimentar con la interacción física desde una interfaz web, integrando electrónica con desarrollo web y backend.

---

## ⚙️ Tecnologías utilizadas

### Frontend
- Angular (con estilos SCSS)
- Comunicación con API REST por medio de HTTP

### Backend
- Flask (Python)
- API REST que recibe comandos (ej. `{"cmd":"R"}` o `{"cmd":"L"}`) y responde con el estado del sistema o ángulo actual

### Hardware
- Arduino conectado vía puerto serial (ej. COM3)
- Solenoide o motor paso a paso
- Botones físicos con resistencias pull-up
- LCD opcional para visualización local

---

## 🔁 Funcionamiento General

1. El usuario interactúa con botones en una interfaz web para enviar comandos a la API.
2. La API escrita en Flask interpreta estos comandos y se comunica con el Arduino.
3. El Arduino activa el actuador (motor o solenoide), mide desplazamientos o ángulos y los mantiene en memoria.
4. El sistema responde con información como: “Ángulo actual: 15°”.
5. La aplicación puede ejecutarse localmente, y se puede configurar para estar disponible en la red local.

---

## 🧪 Funciones en desarrollo y pruebas realizadas

- ✅ Comunicación funcional entre Angular ↔️ Flask API
- ✅ Comunicación funcional entre Flask ↔️ Arduino por puerto COM
- ✅ Activación de motor o solenoide mediante comandos `L` (izquierda) y `R` (derecha)
- ✅ Implementación de botones físicos con pull-up en Arduino
- ⚙️ En desarrollo: Visualización en display LCD, conteo de pasos y conversión a grados
- ⚙️ En pruebas: Envío rápido de múltiples comandos desde frontend sin perder respuesta

---

## 🌐 Acceso desde red local

Para que otros usuarios puedan conectarse a la app Angular desde la red local:

```bash
ng serve --host 0.0.0.0 --disable-host-check
```

Asegúrate de que tu firewall permita el acceso al puerto (por defecto 4200).

---

## 🔌 Ejecución de Flask en red

Ejecutar el servidor Flask en modo accesible por red local:

```bash
flask run --host=0.0.0.0 --port=5000 --debug
```

---

## 📦 Próximas mejoras

- Autenticación básica para controlar acceso
- Integración con base de datos ligera (ej. SQLite) para guardar historial de comandos
- Panel de visualización de métricas y estados en tiempo real
- Control por teclado además de botones físicos
