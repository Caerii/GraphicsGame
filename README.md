# Computer Graphics Project 1 - Tony World
### Alif Jakir, Serin Yoon, Jennifer Reyes

This is a game for our CS452 Computer Graphics class.
You are the president of the school and you need to absorb everything in the school.

- Game Controls

The player can move the character up, down, left, and right by pressing the arrow keys or WSAD keys.
The player can check the score on the top right side of the screen.
The player can restart the game by pressing the refresh button on the top left side of the screen.

- How we made the code

We first determined how to create a PIXI environment, with a player character sprite.
We added the background color next. Then we added keyboard and arrow key control of the player with our event handlers.
There was then the construction of several functions that defined random vertices and geometries of small 2d objects
and distributed them across the clip space. We also created some static sprite circles that got distributed as well.
We created a function that made it so that when the player character is near the boundaries of the objects,
it will remove the object, increase the size of the player, and add one to the score.
We created a collision function that used boolean expressions to see if the objects collided.
The win condition was made such that when all the objects are eaten by the player and get 35 points in total, the player wins.
There is also two large rectangles in the background in order to create the background environment.
The score is shown on the top right side of the screen, and it updates through a global variable.
The refresh button is shown on the top left side of the screen, and when the button is clicked, the player can restart the game.

- How to run the code

1. Install IntelliJ
2. Open IntelliJ and open the project folder
3. Open tonyworld.html
4. Click the browser icon chrome is recommended)

You can also check this in the demo video