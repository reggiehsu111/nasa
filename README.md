# PAir
NASA Hackathon project by team M1631

## INSTALLATION
- `pip install flask flask-cors azure-cosmos`
- `cd data_visualization; npm i`

## RUN THE PROJECT
- Backend
`cd ..; cd backend; python download.py`

## MOTIVATION

AQI(Air Quality Index) is a measure of air pollution. Currently, each country has their own way of calculating AQI. We observed an important usage of the AQI data is to serve as an indication of the air quality to the general public. Hence, aside from building a platform where satellite and ground-based data are aggregated and kept, we also desire to emphasize on the density of the data available rather than the exact precision of the index.

## WHAT WE BUILT?

Our team built an Air quality information platform (App) by integrating satellite data, ground-based datasets and citizen measurements. We integrate our App with an online dating platform as an incentive to encourage citizen participation. 

## OUR SOLUTION
- Since each satellite provides different kinds of data, we provide an API to enable uploads of {key, value} pairs as data fields to store in our database.
- For each satellite, we maintain a deep learning model given their data fields. Outputs of the models are levels between 1level of air quality at the specific location. The weights of their models are updated every time the satellites predict at locations where there are ground-based stations or areas with sufficient citizen measurements.
- Perceived data are data provided by citizen measurements. Citizens are allowed to upload their measurements of the 6-level AQI at their locations to augment ground-based data. Measurements are levels between 1 to 6 (from good to bad air quality), and a prediction of the real AQI in the region is a weighted average of the measurements in nearby locations.
- Citizen measurements are stored and compared to grade a person’s accuracy of measuring the air quality. A person is likely to upload inaccurate data without supervision and incentives. We hence propose a statistical model that calculates the grade of a person’s accuracy based on the variance and bias of his historical measurements. 
- People with higher accuracy will have a higher exposure on the dating platform, which serves as an incentive to encourage more accurate measurements.

## DEEP DOWN SOLUTION

### Custom Deep Learning Models for Satellites
- For each satellite, we train a customized deep learning model to learn the relationship between satellite data and real ground-based AQI values given their fields of features. 

### Weighted Maximum Likelihood Estimation
- For each location, we calculate the perceived AQI based on weighted maximum likelihood algorithm. For a given set of citizen votes, we first consider the probability distribution of real AQI level given the votes, i.e. 6 distributions, Prob(real AQI level | vote AQI level=1) ~ Prob(real AQI level | vote AQI level=6) for every user. When given a location without real data, we weighted-sum up the distribution corresponding to the person’s voting history and his/her current vote as a final score. The “weight” is negative correlated with the variance.  

## Weighted Maximum Likelihood Estimation

### Assumptions

* People's voting are a Guassian distribution with `mean=golden`


### General Flow

Simulation parameters (N<sub>*l*</sub>, N<sub>L</sub>, N<sub>H</sub>, R<sub>ob</sub>, N<sub>P</sub> , R<sub>g</sub>, sd)
Prediction parameters (T<sub>a</sub>)
1. Generate golden station data.
2. Based on golden data, generate voting data.
3. Based on voting data and partial golden data, create a probabilistic model.
4. Use the model to predict the rest of golden data.
5. Check the accuracy.

### Parameter Setting

#### Simulation parameters
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
  
#### Prediction parameters
* T<sub>a</sub> - `Threshhold of acceptable variance`

### Future Work
* Consider "shift-mean" cases
* Use prediction data as feedback(psuedo label) to tune the model
* Consider physical relations between locations
* Consider imbalance in golden data cases

## SOFTWARE TOOLS
Python, JavaScript, Azure

## ENVISION
We envision a platform where satellite and ground-based data can be integrated globally at ease, while global citizens are motivated to provide their measurements.


---
