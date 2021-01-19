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

1) First, create a new file inside the tracker folder named **Exercise.js**
*We are going to make a module that contains two files: trackerService.js and
Exercise.js.  This will help you understand how npm works*

2)  Open the new file in your VS Code Editor and then:  
    *a) Copy the definitions for the exercise objects from trackerService.js
    (lines 60-70, inclusive) into Exercise.js*
    
    *b) create an Exercise class definition with a  constructor that accepts a
    single parameter (see simpleObjects.js for an example).  This parameter
    will be a String.*
    **Note** this is separate from the exercise objects placed in this file  
    
    *c)  The Exercise class  will have 2 instance properties. One will be named
    **activity** and will reference one of the exercise function objects.*
    **For Example:**
      
	this.activity = new walking();  
  
    *The other will be named **type** and will hold the name of the activity.
    Inside the constructor, check the string parameter's value.  If it is
    "walking" create an instance of walking exercise object and assign it to
    the activity instance property, if it is "running" create and assign an
    instance of the running exercise object, else throw an error.  Finally,
    create an instance  property named **type** (if you haven't already done so
    ) and set its value to be the value of the parameter.*

    *Up to this point, you are  basically just moving the logic from
    tracker constructor to the Exercise constructor*

    *d) Add a  function named **calculate** to the Exercise class.
    The function accepts "weight" and "distance" parameters.  It will pass
    these values to the object's activity's calculate function and returns
    the value.*

    This would be called by writing something like  

    	 this.activity.calculate(weight, distance);

    e) save the file

**3) Inside the trackerService file:**

   *a) At the top, import the Exercise definition:*
  
    var Exercise = require("./Exercise.js");
  
   *b) In the tracker constructor, get rid of the redundant if/else branches
   (We just moved these into Exercise).  Replace them with a call to create a
   new instance of Exercise(type).*  
  
    this.exercise = new Exercise(exercise);

This should automatically assign the exercise and calculate method.

   You should leave the try catch statement alone.
   
   *c) you can remove the local definitions for walking and running exercise
   objects if you haven't already*

   ***d) save the file!***
   
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