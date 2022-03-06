# GraphicsGame
Alif Jakir, Serin Yoon, Jennifer Reyes

---

The Game: TONY WORLD

A game for our CS452 Graphics Class. You are the president of the school and you need to absorb everyone and everything.


How we made the code:

We first determined how to create a PIXI environment, with a player character sprite.
We added the background color next. Then we added keyboard and arrow key control of the player sprite with our event handlers.
There was then the construction of several functions that defined random vertices and geometries of small 2d objects and distributed them across the clipspace.
We also created some static sprite circles that got distributed as well.
We created a function  that made it so that when the player character was near the boundaries of the objects,
it will make the object transparent, increase the size of the player, and add one to the score. We created a collision function that used
boolean expressions to see if the objects collided.
The win condition was made such that when all the objects are eaten by the player, they win.
There is also two large rectangles in the background in order to create some variety to the background environment.
The score is shown on the top right side of the screen, and it updates through a global variable.

