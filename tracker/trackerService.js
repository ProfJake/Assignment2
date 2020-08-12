/*trackerService.js

Provides Activity Tracker Functionality utilizing Strategy Design Pattern.
Note that this file uses pre-ES6/prototyping syntax for defining a class.
 While ES6 is a bit more firendly to people coming from Java and C++ and
 other Class-based OO languages, this syntax is still valid and you *will*
see it in the wild. And it should not scare you when you do.  

Activities:  Walk/Run
Input:  Exercise type
        Distance (miles)
        Weight (lbs)
        Time (hours)
Output: Calories Burned

 Formula Sources:

 https://lovandy.com/wellness/physical/calories-burned-by-walking.html AND
 https://lovandy.com/wellness/physical/calories-burned-running.html
*/

//requires weight in lbs
//Time in hours
//distance in miles
//Constructor for the tracker Class.  
var tracker = function(exercise, weight, distance, time) {
    try{
	if (exercise == "walking"){
	    this.exercise = new walking();
	} else if (exercise == "running") {
	    this.exercise = new running();
	} else {
	    throw { message: "Unknown exercise!"};
	}
	this.weight = Number(weight);
	this.distance = Number(distance);
	this.time = Number(time);
    } catch (err){
	throw err;
    }
};


//This calorie calculations for  walking and running are
//implemented as Function Objects.  These can be assigned
//to this.exercise at runtime.
var walking = function(){
    this.calculate = function (weight, distance){
	return 0.3 * weight * distance;
    }
};
//requires weight in lbs, and distance in miles
var running  = function(){
    this.calculate = function (weight, distance){
    return 0.63 * weight * distance;
    }
};
//LAB ACTIVITY: I'd like you to improve the trackerService object by adding
//some functionality to the prototype

//This is the Class Prototype.  It is the "old" way of defining a JavaScript
//Class.  It essentially provides functionality to all instances of tracker()
//Note how this is defined like a JSON object (Parameter Name:  value). All JS
//objects at their core, are basically JSON (obviously)
tracker.prototype={    

    calculate: function() {
	return this.exercise.calculate(this.weight, this.distance);
    },
    
    //speed is whatever units the user wants to use
    calcSpeed: function(){
	return this.distance/this.time;
    }

};

module.exports = tracker;
