let app;
let keys = {}; // stores the key press
let player;
let characterList = [];
var width = 800;
var height = 450;
var scoreVariable = 0;
var charScaleX = 0.05;
var charScaleY = 0.05;
let playerScore = 0;

window.onload = function() {
    app = new PIXI.Application({
        width: width,
        height: height,
        backgroundColor: 0x66FDFF,
        resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);

    // Creates "rooms"
    createEnvironment();

    // Create 20 random shapes scattered around the environment
    for( var i = 0; i < 30; i++) {
        createShape();
    }

    // Create 4 random characters
    local_x = getRandomInt(0,width);
    local_y = getRandomInt(0,height);
    createCharacter(local_x, local_y);

    local_x = getRandomInt(0,width);
    local_y = getRandomInt(0,height);
    createCharacter(local_x, local_y);

    local_x = getRandomInt(0,width);
    local_y = getRandomInt(0,height);
    createCharacter(local_x, local_y);

    local_x = getRandomInt(0,width);
    local_y = getRandomInt(0,height);
    createCharacter(local_x, local_y);

    // Create player
    createPlayer();

    // Set title
    var title = new PIXI.Text("Tony World", {align: "center"});
    title.anchor.set(0.5);
    title.x = width / 2;
    title.y = 30;
    app.stage.addChild(title);

    // after it checks if the objects are colliding, if the area of the object is smaller than the player
    // the object will disappear/become transparent, and then the player width+height will increase by .01 scale

    // keyboard event handlers
    window.addEventListener("keydown", keysDown); // key pressed
    window.addEventListener("keyup", keysUp); // key not pressed

    app.ticker.add(gameLoop);
    app.ticker.add(collisionCheck);
    app.ticker.add(displayScore);
    app.ticker.add(checkScore);

    console.log(scoreVariable);
    //displayScore();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPlayer() {
    player = new PIXI.Sprite.from('Tony.png');
    player.anchor.set(0.5);
    player.x = width / 2;
    player.y = height / 2;
    player.scale.set(0.05, 0.05);
    app.stage.addChild(player);
}

function createCharacter(x, y) {
    let character;
    character = new PIXI.Sprite.from('Tony.png');
    character.anchor.set(0.5);
    character.x = x;
    character.y = y;
    character.scale.set(charScaleX, charScaleY);
    app.stage.addChild(character);
    characterList.push(character);
    //haracterBoolList.push(1);
    // create a new player sprite object
    // have an array of various sprites that we can randomly select from for the sprite
    // randomly place sprite within map boundaries
    // have a flag that makes the sprite object turn transparent after the player goes over it (if they are certain size)
}

function createShape() {
    var g = new PIXI.Graphics();
    g.beginFill(getRandomColor()); //fills polygon with 8 random colors
    g.drawPolygon(
        getRandomInt(-15,0),
        getRandomInt(-15,0),
        getRandomInt(-15,0),
        getRandomInt(0,15),
        getRandomInt(0,15),
        getRandomInt(0,15),
        getRandomInt(0,15),
        getRandomInt(-15,0),
        getRandomInt(-15,15),
        getRandomInt(-15,15)
    );
    //g.anchor.set(0.5); //sets center of object
    g.x = getRandomInt(0, width - 100); //random position x of object
    g.y = getRandomInt(0, height - 100); //random position y of object
    g.endFill();

    app.stage.addChild(g);
    characterList.push(g); //adds to the characterList to be able to index the object
    //characterBoolList.push(0); //smaller objects get a 0 value in
}

function createEnvironment() {
    //This will create the environment, which is a series of large polygons that represent a room
    var g = new PIXI.Graphics();
    var g2 = new PIXI.Graphics();
    g.beginFill(0x544d3b);
    g2.beginFill(0xd48257);
    g.drawPolygon(
        50, 50, 50, 330, 300, 330, 300, 50
    );
    g2.drawPolygon(
        60, 60, 60, 320, 290, 320, 290, 60
    );

    g.endFill();
    g2.endFill();

    app.stage.addChild(g);
    app.stage.addChild(g2);
}

function getRandomColor() {
    var randomColors = [0x6beb34, 0x34ebba, 0x34abeb, 0x8568ba, 0xd43b71, 0x6864e8, 0x12e31d, 0xdee35d];
    var randInt = getRandomInt(0,7);
    return randomColors[randInt];
}

function collisionCheck() {
    let playerBox = player.getBounds();
    let character;
    let characterBox;

    for (var i = 0; i < characterList.length; i++) {
        character = characterList[i];
        characterBox = character.getBounds();
        if (playerBox.x + playerBox.width > characterBox.x && playerBox.x < characterBox.x + characterBox.width && playerBox.y + playerBox.height > characterBox.y && playerBox.y < characterBox.y + characterBox.height) {
            console.log('collided with', character);
            app.stage.removeChild(character);
            characterList.splice(i, 1);
            scoreVariable += 1; //add one to global score variable
            console.log(scoreVariable)
            player.width += 2;
            player.height += 2;
        }
    }
}

function displayScore() {
    app.stage.removeChild(playerScore);
    let text = "Score: " + scoreVariable
    playerScore = new PIXI.Text(text, {
        fontFamily: 'Roboto',
        fill: [0x4b0082],
        fontSize: 20,
    })
    playerScore.x = 700;
    playerScore.y = 50;
    app.stage.addChild(playerScore);
}

function checkScore() {
    if (scoreVariable === 35) {
        confirm("SUCCESS! Do you want to play it again?");
    }
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

// TODO : space (if tony eats something, he can use booster using space key) - 32

function gameLoop() {
    // UP (W or ↑)
    if (keys['87'] || keys['38']) {
        player.y -= 5;
    }
    // LEFT (A or ←)
    if (keys['65'] || keys['37']) {
        player.x -= 5;
    }
    // DOWN (S or ↓)
    if (keys['83'] || keys['40']) {
        player.y += 5;
    }
    // RIGHT (D or →)
    if (keys['68'] || keys['39']) {
        player.x += 5;
    }
}