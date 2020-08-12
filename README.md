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
to just make a regular constructor call.