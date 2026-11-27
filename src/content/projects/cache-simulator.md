---
title: CPU Cache Simulator
summary: A Python simulator that models CPU cache behavior and compares replacement policies across workloads.
stack: [Python, Pandas, Plotly]
art: cache
tint: mint
date: 2026-06-01
repo: https://github.com/shaliniomkar/cache_simulator
order: 4
---

A cache simulator for exploring how CPU caches behave under different workloads.

## How it works

- Processes memory access traces and simulates hits and misses.
- Implements FIFO and LRU replacement policies using dictionaries and queue-based data structures.
- Produces interactive Pandas and Plotly charts comparing hit rates and performance.

## What it explores

Cache locality, eviction strategies, and the performance tradeoffs between them.
