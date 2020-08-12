var tracker = require("tracker");
//Note the units
//Weight is in pounds
//distance is in miles
//time is in minutes (note that tracker wants hours so you have a minor conversion to do)

var activities = [ {activity: "walking", weight: 150, distance: 3, time: 45}, { activity: "running", weight: 200 , distance: 4, time: 40}, {activity: "running", weight: 175, distance: 5, time: 45}, {activity: "running", weight: 140, distance: 10, time: 240}, {activity: "walking", weight: 165, distance: 2, time: 20}, {activity: "walking", weight: 250, distance: 4, time: 75}, {activity: "running", weight: 215, distance: 3, time: 28}, {activity: "walking", weight: 220, distance: 5, time: 60}, {activity: "swimming", weight: 160, distance: 5, time: 60}];


for ( var act  in activities ) {

    try{
	exercise = activities[act].activity;
	timeHR = activities[act].time/60.0;
	weight = activities[act].weight;
	distance = activities[act].distance;
	var current= new tracker(exercise, weight, distance, timeHR);
	num=Number(act)+1;
	console.log("Activity: " + num);
	console.log(exercise);
	console.log("Weight: " + weight +" lbs");
	console.log("Speed: " + current.calcSpeed() + "miles per hour");
	caloriesBurned = current.calculate();
	console.log("Calories Burned: "+ caloriesBurned );
    } catch (err){
	console.log(err.message);
    }
    console.log("***************************");
}
