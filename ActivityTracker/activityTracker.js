var tracker = require("tracker");
//Note the units
//Weight is in pounds
//distance is in miles
//time is in minutes (note that tracker wants hours so you have a minor conversion to do)

var activities = [ {activity: "walking", weight: 150, distance: 3, time: 45}, { activity: "running", weight: 200 , distance: 4, time: 40}, {activity: "running", weight: 175, distance: 5, time: 45}, {activity: "running", weight: 140, distance: 10, time: 240}, {activity: "walking", weight: 165, distance: 2, time: 20}, {activity: "walking", weight: 250, distance: 4, time: 75}, {activity: "running", weight: 215, distance: 3, time: 28}, {activity: "walking", weight: 220, distance: 5, time: 60}];


for ( var act  in activities ) {
   
    timeHR = activities[act].time/60.0;
    weight = activities[act].weight;
    distance = activities[act].distance;
    num=Number(act)+1;
    console.log("Activity: " + num);
    console.log(activities[act].activity);
    console.log("Weight: " + weight +" lbs");
    console.log("Speed: " + distance/timeHR + "miles per hour");
    
    if (activities[act].activity== "walking"){
	caloriesBurned = tracker.calcWalkCal(weight, distance);
	console.log("Calories Burned: "+ caloriesBurned );
    }else{
	caloriesBurned = tracker.calcRunCal(weight, distance);
	console.log("Calories Burned: "+ caloriesBurned );
    }

    console.log("***************************");
}
