---
title: RISC-V Emulator & Visual Debugger
summary: A from-scratch RV32I emulator that runs real compiled RISC-V programs, with a live visual debugger.
stack: [Python, RISC-V, Tkinter, Capstone, ELF]
art: cpu
tint: purple
date: 2026-06-01
repo: https://github.com/shaliniomkar/risc-v_emulator
order: 2
---

A full RISC-V (RV32I) emulator and visual debugger, built from scratch in Python.

## The emulator

- Implements the complete RV32I base integer instruction set: R, I, S, B, U and J-type instructions.
- Accurate 32-bit execution, little-endian memory and correct sign extension.
- An ELF loader parses real compiled RISC-V programs and loads them into emulated memory.

## The debugger

Built with Tkinter, it shows:

- a live register viewer,
- a disassembly panel (powered by Capstone) that highlights the current instruction as it runs,
- a hex memory inspector with address navigation.

You can step one instruction at a time, run, reset or halt.
