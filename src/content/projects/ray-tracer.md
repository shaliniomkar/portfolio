---
title: Multithreaded Ray Tracer
summary: A physically-based ray tracer in C++, sped up by rendering across every CPU core at once.
stack: [C++, std::thread, CMake]
art: raytrace
tint: yellow
date: 2026-06-01
repo: https://github.com/shaliniomkar/ray_tracer
order: 3
---

A physically-based ray tracer built from scratch following *Ray Tracing in One Weekend*, then extended with my own multithreading system.

## Making it parallel

- The image's rows are split across all available CPU cores using the C++ standard thread library.
- Each thread has its own random number generator, so threads never fight over shared state (no data races).
- Every pixel is computed independently, so all threads write into one shared framebuffer without locks.
