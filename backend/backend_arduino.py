from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import threading
import time
from queue import Queue

# Configuración
PUERTO = 'COM3'
BAUDIOS = 9600
TIEMPO_ENTRE_COMANDOS = 0.3  # segundos de espera entre envíos

app = Flask(__name__)
CORS(app)

# Cola de comandos
comandos = Queue()

# Inicializar puerto serial UNA SOLA VEZ
try:
    arduino = serial.Serial(PUERTO, BAUDIOS, timeout=1)
    time.sleep(2)
    print(f"✅ Arduino conectado en {PUERTO}")
except Exception as e:
    print(f"❌ No se pudo conectar con Arduino: {e}")
    arduino = None

# Hilo para procesar comandos desde la cola
def procesar_comandos():
    while True:
        if not comandos.empty() and arduino:
            cmd = comandos.get()
            try:
                arduino.write(cmd.encode())
                time.sleep(0.1)
                respuesta = ""
                while arduino.in_waiting:
                    respuesta += arduino.readline().decode().strip() + "\n"
                if respuesta:
                    print("🔁 Respuesta del Arduino:", respuesta.strip())
            except Exception as e:
                print(f"⚠️ Error al enviar comando: {e}")
            finally:
                time.sleep(TIEMPO_ENTRE_COMANDOS)

# Lanzar el hilo en segundo plano
hilo = threading.Thread(target=procesar_comandos, daemon=True)
hilo.start()

@app.route('/')
def inicio():
    return jsonify({"mensaje": "API Arduino con cola activa"})

@app.route('/comando', methods=['POST'])
def enviar():
    data = request.get_json()
    cmd = data.get('cmd', '').upper()

    if cmd not in ['R', 'L']:
        return jsonify({"error": "Comando inválido. Usa 'R' o 'L'."}), 400

    comandos.put(cmd)
    return jsonify({"mensaje": f"Comando '{cmd}' encolado"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
