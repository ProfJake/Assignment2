/*trackerService.js

Provides Activity Tracker Functionality utilizing Strategy Design Pattern.
Note that this file uses ES6 syntax for defining a class.
Activities:  Walk/Run
Input:  Exercise type
        Distance (miles)
        Weight (lbs)
        Time (minutes)
Output: Calories Burned

 Formula Sources:

 https://lovandy.com/wellness/physical/calories-burned-by-walking.html AND
 https://lovandy.com/wellness/physical/calories-burned-running.html
*/


class tracker{
    constructor(exercise, weight, distance, time) {
	try{
	    if (exercise.toString().toLowerCase() == "walking"){
		this.exercise = new walking(); //exercise is a new instance of
	        //of the function objects below
	    } else if (exercise.toString.toLowerCase() == "running") {
		this.exercise = new running();
	    } else {
		//throwing errors is as simply as throwing an object literal
		//with a message property.
		throw { message: "Unknown exercise!"}; //if the exercise is unknown
	    }

 //Note that, like constructors in Java/C++, nothing is being returned
 //from the constructor. We have to use keyword this to differentiate
//between a property of the object that is being created and a value passed in
	    this.weight = Number(weight);
	    this.distance = Number(distance);
	    this.time = Number(time);
	    
	    //catch any error thrown in object creation and re-throw it to
	    //calling module.
	} catch (err){
	    console.log("Error recieved during object creation");
	    throw err;
	}
    }

    calculate(){
	return this.exercise.calculate(this.weight, this.distance);
    }

    calcSpeed(){
	return this.distance/(this.time/60); //returns in miles per hour
    }
}

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


//Export statements expose data we want to be "importable". In this case
//I want to export the tracker class (including its prototypes).  I don't
//want to export the function objects (walking and running) from here because
//they are for internal use only.  

module.exports = tracker;

//Your Lab assignment will be to further modularize this code and move most
//of the exercise specific stuff into an Exercise module.
