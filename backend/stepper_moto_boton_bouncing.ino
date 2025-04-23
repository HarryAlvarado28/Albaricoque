const int stepPin = 3;
const int dirPin = 4;
const int buttonRight = 5;
const int buttonLeft = 6;
const int enablePin = 7; // NUEVO: pin para habilitar/deshabilitar el driver

unsigned long lastDebounceTimeRight = 0;
unsigned long lastDebounceTimeLeft = 0;
const unsigned long debounceDelay = 50;

bool buttonRightPressed = false;
bool buttonLeftPressed = false;

void setup() {
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  pinMode(buttonRight, INPUT_PULLUP);
  pinMode(buttonLeft, INPUT_PULLUP);
  pinMode(enablePin, OUTPUT); // Configuramos el pin ENABLE
  digitalWrite(enablePin, HIGH); // Deshabilita el driver al inicio (motor libre)
}

void loop() {
  if (digitalRead(buttonRight) == LOW && !buttonRightPressed && (millis() - lastDebounceTimeRight > debounceDelay)) {
    buttonRightPressed = true;
    lastDebounceTimeRight = millis();
    digitalWrite(dirPin, HIGH); // Derecha
    moveStepper(2); // ≈ 15°
  }

  if (digitalRead(buttonRight) == HIGH && buttonRightPressed) {
    buttonRightPressed = false;
    lastDebounceTimeRight = millis();
  }

  if (digitalRead(buttonLeft) == LOW && !buttonLeftPressed && (millis() - lastDebounceTimeLeft > debounceDelay)) {
    buttonLeftPressed = true;
    lastDebounceTimeLeft = millis();
    digitalWrite(dirPin, LOW); // Izquierda
    moveStepper(2);
  }

  if (digitalRead(buttonLeft) == HIGH && buttonLeftPressed) {
    buttonLeftPressed = false;
    lastDebounceTimeLeft = millis();
  }
}

void moveStepper(int steps) {
  digitalWrite(enablePin, LOW); // Habilita el driver
  delay(2); // pequeña pausa para asegurar activación

  for (int x = 0; x < steps; x++) {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(800);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(800);
  }

  delay(50); // permite completar el movimiento
  digitalWrite(enablePin, HIGH); // Deshabilita el driver (motor queda libre y frío)
}
