/*trackerService.js

Provides basic Activity Tracker Functionality
Activities:  Walk/Run
Input:  Distance (miles)
        Weight (lbs)
        Time (hours)
Output: Calories Burned

 Formula Sources:

 https://lovandy.com/wellness/physical/calories-burned-by-walking.html AND
 https://lovandy.com/wellness/physical/calories-burned-running.html
*/

//requires weight in lbs

var tracker = function Activity(exercise, weight, distance, time){
    this.exercise = exercise;
    this.weight = weight;
    this.distance = distance;
    this.time = time;
}

Activity.prototype = {
    setExercise: function(exercise) {
	this.exercise = exercise;
    },

    calculate: function(weight, distance) {
	return this.exercise.calculate(weight, distance);
    },
    
    //speed is whatever units the user wants to use
    calcSpeed: function(distance, time){
    return distance/time;
    }
}

var walking = function(weight, distance){
    this.calculate = function (weight, distance){
	return 0.3 * weight * distance;
    }
};
//requires weight in lbs, and distance in miles
var running  = function( weight, distance){
    this.calculate = function calcRunCal(weight, distance){
    return 0.63 * weight * distance;
    }
};

module.exports = tracker;
