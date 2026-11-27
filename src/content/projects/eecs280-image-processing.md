---
title: Seam-Carving Image Resizer
summary: Content-aware image resizing that shrinks a picture by removing the least important seams of pixels.
stack: [C++, Pointers, Structs, Unit testing]
art: image
tint: mint
date: 2026-10-01
course: EECS 280
term: Fall 2026
order: 2
---

An image resizer that uses seam carving, so the important parts of a picture keep their shape while the background gets squeezed.

## How it works

- Each pixel gets an "energy" score based on how much it differs from its neighbors.
- The program finds the "seam" (a connected path of pixels from top to bottom) with the lowest total energy, and removes it.
- Repeating that shrinks the image one column at a time. Rotating the image lets it shrink the height too.
- Images are stored in Matrix and Image abstract data types built from C-style structs.

## Concepts

Pointers, structs, strings, streams and file I/O, abstract data types, testing and debugging.
