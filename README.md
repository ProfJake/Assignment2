**LAB ACTIVITY 2**

Today we looked at how to define and export objects in NodeJS.  We covered
basic syntax for both ES5- and ES6+ code.  While we covered ES5 (and I have
provided a version of this assignment in ES5), you will most likely want to
use ES6-style syntax.  It is the modern standard and is best practice for
writing any future projects.  If you missed the lecture for whatever reason,
go back and get the notes from a fellow student or watch the lecture video
(if there is one available).

This lab activity will introduce to a common Javascript design pattern, while
also giving you practice in writing an Object Definition, and creating an NPM
module (both main concepts of this week).

*If you prefer to do this assignment in ES5 syntax, you can checkout the
master branch via **git**.  From your terminal run*

       git checkout master


Otherwise, go ahead and take a look at the **trackerService.js** file inside
the **tracker** directory.  There have been some changes that should be
reviewed.

Primarily, the trackerService was turned into an Object Definition (in this
case using class notation) and much of the logic that was done in the driver/
index.js in the previous lab was moved into the Object Definition.  This object
represents a "tracker" or record of some activity (walking or running).  

You'll also notice that the functions for calculating the calories burned while
walking or running have been turned into function objects. This makes it easy
to make references to them inside of the tracker definition.  You'll notice
that the constructor sets the "exercise" property reference to one of them,
depending on what string is passed in.  We'll call these the **exercise objects**

This exposes a specific concept.  Consider the trackerService object.  The only
thing that differentiates a walking trackerService and a running
trackerService is that the number of calories burned by each is calculated
with a different formula.

This means that the trackerService object has some behavior (calculating
calories burned) that is dependent upon data that it will not receive until
it is created at execution time.  This idea is called **Dependency Injection**.
When the object is created we "inject" it with some data (in this case, a
string value representing the type of exercise) and it determines what
function object it will need for calculations.  This concept will pop up again
and again in javascript so we need to practice it now.

The improvements made to the trackerService are good.  But the problem is we
are not strictly following good design here.  For every new exercise (formula)
that we want to add, we first have to create a new exercise function object,
then we need a new if statement to determine if a matching string has  been
entered, and finally create the appropriate instance and assign it.   None of
this has anything to do with recording the activity data.

It would be better for us to *encapsulate* all of this exercise stuff into its
own Exercise class. That way we can simplify the code in trackerService
to just make a constructor call to Exercise. Plus, if we ever wanted to, we
could easily re-use the Exercise class. So that's what you are going to do!

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

8) Go into the ActivityTracker folder and run:

    npm install "Path_to_your_tracker_folder"

check to make sure it all works by running:

    node activityTracker.js

As long as it works then you're basically done.  If it doesn't work, you may
have to review these steps to make sure you've done everything here.

By modularizing the Exercises, we've made it much easier to reuse them (DRY),
made it easy to add more (extension) of them (open/closed), separated the
functionality of the tracker from the functionality of the calculation (SRP),
and we abstracted/encapsulated the things that can change.  We can add as many
"Exercises" to the program as we'd like, without ever having to change the
trackerService file. Now Exercises can be "plugged in" elsewhere, if we need
them.

9) Now adding more types of activities is relatively easy. Currently the driver
does not recognize "swimming". All we need is an else if branch in the
exercise constructor, and a new Function Object for the appropriate calculation
to fix this.

Add a function Object named "swimming" the following formula:

    calories burned = (6 * Weight in KG * 3.5) / 200;

However, there is a slight problem. This formula only provides CALORIES BURNED
PER MINUTE not total calories, unlike the other two formulae.
To get the data we want, we need the time.

Since we also need all exercise function signatures to match, that means you
need all of them to accept three parameters (weight, distance, time).
In scenarios like this, it's ok to accept parameters that you will ignore.

So walking and running now need a time parameter at the end of their signatures
No need to change their calculations.  And swimming should have matching
signature. In the swimming calculation, you can ignore distance parameter and
return total calories using time and the given formula.

We can add other types of exercise similarly, though we won't always
need to add a new parameter; the formula for swimming just happened to need
something more.


NOTE: the formula requires weight in kg but the array of Object literals in
activityTracker.js provides weight in pounds.  1 kg = 2.2 pounds, for the
purposes of this exercise.

Don't forget to update your package.json files