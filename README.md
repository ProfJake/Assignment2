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


1) First make a new local folder named Exercise
2) inside the Exercise folder create Exercise.js
3)  Inside the file:
    a) Copy the definitions for function objects walking and running into
    Exercise.js
    
    b) create a constructor that accepts a single parameter. Inside that
    constructor, create an instance of walking or running, depending on
    whether the parameter is "walking" or "running".  Make an else branch
    for throwing an error, if it is something else.
    This is basically a copy of  the if/else Statement in trackerService.js

    c) create an Object prototype for this module.  the prototype is simple,
    it should be a calculate function that accepts