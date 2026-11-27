---
title: Euchre Card Game
summary: A simulation of the card game Euchre, with an AI player and a human player built through inheritance.
stack: [C++, OOP, Inheritance, Polymorphism]
art: cards
tint: coral
date: 2026-10-20
course: EECS 280
term: Fall 2026
order: 3
---

A program that plays full games of Euchre, a card game popular in Michigan.

## How it works

- Card and Pack are abstract data types for the cards and the deck.
- Players derive from an abstract Player base class. A Simple Player is the AI, following a fixed strategy for making trump and playing cards. A Human Player reads choices from the keyboard.
- The game code works with any kind of player through virtual functions, so AI and human players can sit at the same table.

## Concepts

Abstract data types in C++, derived classes, inheritance and polymorphism.
