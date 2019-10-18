---
title: 'NASA Hackathon "Surface-to-Air Mission" Simulation and Prediction Model'
disqus: hackmd
---

NASA Hackathon "Surface-to-Air Mission" Simulation and Prediction Model
===

## Table of Contents

[TOC]

## Assumptions

* People's voting are a Guassian distribution with `mean=golden`


## General Flow

Simulation parameters (N<sub>*l*</sub>, N<sub>L</sub>, N<sub>H</sub>, R<sub>ob</sub>, N<sub>P</sub> , R<sub>g</sub>, sd)
Prediction parameters (T<sub>a</sub>)
1. Generate golden station data.
2. Based on golden data, generate voting data.
3. Based on voting data and partial golden data, create a probabilistic model.
4. Use the model to predict the rest of golden data.
5. Check the accuracy.

## Parameter Setting

### Simulation parameters
* N<sub>*l*</sub> - `Number of labels, i.e. 0,1,...Nl-1`
* N<sub>L</sub> - `Number of Locations`
* N<sub>H</sub> - `Nuber of Hours`
  (Hence, the dimension of golden station data is `L x H`)
* R<sub>ob</sub> - `Ratio of golden data to be observed`
* N<sub>P</sub> - `Number of People`
* N<sub>vl</sub> - `Number of voted locations in 1 hour for every person`
* R<sub>g</sub> - `Ratio of votings which are Guassian * distribution with mean=golden`
  (Other votings are dicrete uniform[0, N<sub>*l*</sub>-1] distribution)
* sd - `Distribution, i.e. uniform(0, sd), of the standard deviation of Gaussian`
  
### Prediction parameters
* T<sub>a</sub> - `Threshhold of acceptable variance`

## Future Work
* Consider "shift-mean" cases
* Use prediction data as feedback(psuedo label) to tune the model
* Consider physical relations between locations
* Consider imbalance in golden data cases

---