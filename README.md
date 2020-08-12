LAB ACTIVITY 2

Today we looked at how to prototype and export modules/classes in Node,
focusing on using Pre-ES6 syntax.  This activity will ask you to practice this.

The improvements made to the trackerService are good.  But the problem is we
are not strictly following good OO design here.  The Strategy pattern
implemented is actually dependent on some data we are recieving during
construction.  It is a "State dependent" strategy. Further, we have to make
sure that our current module  "knows" a lot about that state. For every
exercise (formula) that we add, we have to use a new constructor for
that function Object and we need a new if statement to see what kind of
function Object we should create.

It would be better for us to *encapsulate* that state and strategy dependent
behavior in its own module. That way we can simplify the code in trackerService
to just make a regular constructor call. So that's what you are going to do!

DIRECTIONS:

1) First make a new local folder named Exercise

2) inside the Exercise folder create Exercise.js

3)  Inside the file:
    a) Copy the definitions for function objects walking and running into
    Exercise.js
    
    b) create a constructor that accepts a single parameter. This Exercise
    Object should have a "type" and "exercise" member data.  Inside the
    constructor, create an instance of walking or running, depending on
    whether the parameter is "walking" or "running", and assign it to
    exercise. Assign the string value to type.  Make an else branch
    for throwing an error, if it is something other "walking" or "running".
   
    This is basically a copy of  the if/else Statement in trackerService.js
    with a few modifications.

    Note the hierarchical structure of the thrown error.  You can add different
    log statements in each catch to help determine sources of errors when
    debugging.

    c) create an Object prototype for this module.  the prototype is simple,
    it should have a calculate function that accepts "weight" and "distance"
    parameters and returns the value of running the specific exercise's
    calculate function.
4)  Now you must make this into an NPM module.  Inside Exercise folder, run:

npm pack

5) Move into the tracker folder and run:

npm install "Path-to-your-Exercise-Folder" (something like ../Exercise)

6) Inside the trackerService file:

   a) At the top, import the Exercise folder:
   var Exercise = require("Exercise");
   //if you don't npm install it, then you need to include the path to Exercise

   b) In the constructor, get rid of the redundant if/else construct (it should
   already be inside Exercise).  Instead, just set this.exercise to a new
   instance of Exercise(type).  
   	    this.exercise = new Exercise(exercise);
   This should automatically assign the exercise and calculate method.

   You should leave the try catch statement alone.
   
   c) you can remove the local definitions for walking and running.

   d) save and exit
7) Inside the tracker directory, run:
npm pack

then LOOK at the package.json file (cat package.json) and look at how npm
has updated the "dependencies" member for us.  You can go in and change the
version number to 0.1.3 if you'd like

8) Lastly, go into the ActivityTracker folder and run:
npm install "Path_to_your_tracker_folder"

check to make sure it all works by running:
node activityTracker.js


