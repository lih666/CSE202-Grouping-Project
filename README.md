# CSE202-Grouping-Project

This project is meant to find a group matching algorithm that assigns a class of students into groups according to their preference. Based on the utility function we designed, we use a Heuristic method to make sure the total utility score calculated from resulted grouping is optimal. And there exist a k-coloring algorithm that is an non-polynomial time algorithm that guarantee to generate a perfect stable grouping but it is relatively unrealistic considering the human error. 
## Getting Started
```
git clone https://github.com/lih666/CSE202-Grouping-Project
```
### Installing
* [Node.js](https://nodejs.org/en/) - Download Node
* `npm install graph-data-structure` -library

## File Description

* `course4Group.json` Reference Data
* `course4Pref.json` Student Preference List
* `course4PrefFilteredd.json` Filtered Input Data
* `filter.js` Filter Script
* `prefUtil.js` Utility Function
* `preference.js` Prederence Generator Script

## Running
```
node filter.js    //The json file is filetered already so you don't have to run this.
node preference.js
```

## Authors
Lihao He, Zhiyue Yang, Linqi Pan, Shiyi Wang
