---
title: Embedded Temperature Monitor
summary: An interrupt-driven Arduino system that tracks room temperature and raises alerts when it crosses a threshold.
stack: [C++, Arduino Uno, PlatformIO, UART]
art: thermometer
tint: coral
date: 2026-08-01
repo: https://github.com/shaliniomkar/temp_monitor
order: 1
---

An environmental monitor on an Arduino Uno that watches ambient temperature, alerts when it crosses a threshold, and logs every reading for later analysis.

## How it works

- A two-state state machine drives the system's behavior.
- Input arrives through a hardware interrupt, with software debouncing so one press counts once.
- Several jobs run on different intervals at the same time, using non-blocking `millis()` timing instead of `delay()`.
- Timestamped readings go out over UART as CSV, ready to analyze on a computer.

## The tricky part

The first version used an analog thermistor, but the sensor was heating itself and throwing off the readings. I switched to a digital DS18B20 sensor. Its read was blocking the rest of the program, which let the temperature overshoot the threshold before an alert fired. I split the read into an asynchronous two-phase pattern (start a conversion, come back for the result later), which fixed the overshoot.
