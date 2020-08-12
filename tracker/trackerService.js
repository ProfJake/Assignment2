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
	    this.exercise = new walking(); //exercise is a new instance of
	                                  //of the function objects below
	} else if (exercise == "running") {
	    this.exercise = new running();
	} else {
	    //throwing errors is as simply as throwing an object literal
	    //with a message property.
	    throw { message: "Unknown exercise!"}; //if the exercise is unknown
	}

	//Note that, like constructors in Java/C++, nothing is being returned
	//from the constructor.  But we have to use keyword this to indicate
	//that we are createing an object here.
	this.weight = Number(weight);
	this.distance = Number(distance);
	this.time = Number(time);

	//catch any error thrown in object creation and re-throw it to
	//calling module.
    } catch (err){
	console.log("Error recieved during object creation");
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
//LAB ACTIVITY: I'd like you to improve the modularity of this code and get
//used to pre-ES6 syntax.  Create a file for defining an "Exercise" called
//Exercise.js.  Create a prototype for an Exercise, using the calculate
//function as defined above.  Export both running and 

//This is the Class Prototype.  It is the "old" way of defining a JavaScript
//Class.  It essentially provides functionality to all instances of tracker()
//Note how this is defined like a JSON object (Parameter Name:  value). All JS
//objects at their core, are basically JSON (obviously)
tracker.prototype={    


    //runs the exercise specific calculation on internal variables
    calculate: function() {
	return this.exercise.calculate(this.weight, this.distance);
    },
    
    //speed is consistently calculated for all exercise times (distance/time)
    calcSpeed: function(){
	return this.distance/this.time;
    }

};

//Export statements expose data we want to be "importable". In this case
//I want to export the tracker class (including its prototypes).  I don't
//want to export the function objects because they are for internal use only.
//They are assigned at creation.  They are analogous to inner classes.

//Note that for improved modularity, I could have also defined the
//exercise formulas in a separate file and exported them.  Then imported them
//into this file.  I may choose that route in future iterations of the program.
module.exports = tracker;
