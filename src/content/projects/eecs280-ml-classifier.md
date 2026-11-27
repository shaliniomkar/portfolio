---
title: Piazza Post Classifier
summary: A machine learning program that reads class forum posts and predicts what topic each one is about.
stack: [C++, Machine learning, Sets & maps]
art: robot
tint: purple
date: 2026-11-15
course: EECS 280
term: Fall 2026
order: 4
---

A text classifier that learns from past posts on the EECS 280 Piazza forum and predicts the topic of new ones, for example spotting that a post is about the Euchre project.

## How it works

- Each post is treated as a "bag of words": only which words appear matters, not their order.
- Training counts how often each word appears with each topic.
- A simplified Multi-Variate Bernoulli Naive Bayes classifier uses those counts to pick the most likely topic for a new post.

## Concepts

Container ADTs like sets and maps, natural language processing basics, and designing a larger application.
