let app;
let keys = {}; // stores the key press
let player;
let reloadBtn;
let characterList = [];
let outer;
let inner;
var width = 800;
var height = 450;
var scoreVariable = 0;
var charScaleX = 0.03;
var charScaleY = 0.03;
let playerScore = 0;

window.onload = function() {
    app = new PIXI.Application({
        width: width,
        height: height,
        backgroundColor: 0x95DAEE,
        resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);

    // Create room
    //   create the environment, which is a series of large polygons that represent a room
    createEnvironment();

    // Create 20 random shapes scattered around the environment
    for( var i = 0; i < 30; i++) {
        createShape();
    }

    // Create 5 random characters and place it
    //   create a new character sprite object
    //   have an array of various sprites that we can randomly select from for the sprite
    //   randomly place sprite within map boundaries
    //   have a flag that makes the sprite object turn transparent after the player goes over it
    //   (if they are certain size)

    local_x = getRandomInt(70, width - 80);
    local_y = getRandomInt(110, height - 70);
    createCharacter(local_x, local_y);

    local_x = getRandomInt(70, width - 80);
    local_y = getRandomInt(100, height - 70);
    createCharacter(local_x, local_y);

    local_x = getRandomInt(70, width - 80);
    local_y = getRandomInt(100, height - 70);
    createCharacter(local_x, local_y);

    local_x = getRandomInt(70, width - 80);
    local_y = getRandomInt(100, height - 70);
    createCharacter(local_x, local_y);

    local_x = getRandomInt(70, width - 80);
    local_y = getRandomInt(100, height - 70);
    createCharacter(local_x, local_y);

    // Create reload button
    displayReloadBtn();
    reloadBtn.interactive = true;
    reloadBtn.buttonMode = true;
    reloadBtn.on('pointerdown', reloadBtnClick)

    // Create a player
    createPlayer();

    // Set title
    var title = new PIXI.Text("Tony World!", {
        //align: "center", fontFamily: "Courier New"
        fontFamily: 'Arial',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#fecd0f', '#054f42'], // gradient
        stroke: '#ffffff',
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 3,
        wordWrap: true,
        wordWrapWidth: 500,
        lineJoin: 'round',
    });

    title.anchor.set(0.5);
    title.x = width / 2 + 5;
    title.y = 30;
    app.stage.addChild(title);

    // After it checks if the objects are colliding, if the area of the object is smaller than the player,
    // the object will disappear/become transparent, and then the player's width & height will increase by .01 scale
    app.ticker.add(collisionCheck);

    // Keyboard event handlers
    window.addEventListener("keydown", keysDown); // key pressed
    window.addEventListener("keyup", keysUp); // key not pressed
    app.ticker.add(gameLoop);

    // Check score
    app.ticker.add(displayScore);

    // Rotate the player
    app.ticker.add(() => { player.rotation += 0.05 })

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
    player.y = height / 2 + 25;
    player.scale.set(charScaleX, charScaleY);
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
}

function createShape() {
    var shape = new PIXI.Graphics();
    shape.beginFill(getRandomColor()); // fills polygon with 8 random colors
    shape.drawPolygon(
        getRandomInt(-15, 0),
        getRandomInt(-15, 0),
        getRandomInt(-15, 0),
        getRandomInt(0, 15),
        getRandomInt(0, 15),
        getRandomInt(0, 15),
        getRandomInt(0, 15),
        getRandomInt(-15, 0),
        getRandomInt(-15, 15),
        getRandomInt(-15, 15)
    );

    shape.x = getRandomInt(70, width - 80); // random position x of object
    shape.y = getRandomInt(100, height - 70); // random position y of object
    shape.endFill();

    app.stage.addChild(shape);
    characterList.push(shape); // adds to the characterList to be able to index the object
}

function createEnvironment() {
    outer = new PIXI.Graphics();
    inner = new PIXI.Graphics();
    outer.beginFill(0x544d3b);
    inner.beginFill(0xd48257);
    outer.drawPolygon(50, 70, 50, 430, 750, 430, 750, 70);
    inner.drawPolygon(60, 80, 60, 420, 740, 420, 740, 80);
    outer.endFill();
    inner.endFill();
    app.stage.addChild(outer);
    app.stage.addChild(inner);
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
        if (playerBox.x + playerBox.width > characterBox.x
            && playerBox.x < characterBox.x + characterBox.width
            && playerBox.y + playerBox.height > characterBox.y
            && playerBox.y < characterBox.y + characterBox.height) {
            app.stage.removeChild(character);
            characterList.splice(i, 1);
            scoreVariable += 1; //add one to global score variable
            player.width += 2;
            player.height += 2;
        }
    }
}

function displayScore() {
    app.stage.removeChild(playerScore);
    let text = "Score: " + scoreVariable
    playerScore = new PIXI.Text(text, {
        align: "center",
        fontFamily: "Courier New",
        fontSize: 16,
    })

    playerScore.x = 660;
    playerScore.y = 45;
    app.stage.addChild(playerScore);

    if (scoreVariable === 35) {
        location.reload();
        alert("Success! You can play it again!");
    }
}

function displayReloadBtn() {
    reloadBtn = new PIXI.Sprite.from('reload.png');
    reloadBtn.anchor.set(0.5);
    reloadBtn.x = 70;
    reloadBtn.y = 55;
    reloadBtn.scale.set(0.007, 0.007);
    app.stage.addChild(reloadBtn);
}

function reloadBtnClick() {
    console.log('clicked')
    location.reload();
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

function gameLoop() {
    // UP (W or ↑)
    if (keys['87'] || keys['38']) {
        player.y -= 3;
    }
    // LEFT (A or ←)
    if (keys['65'] || keys['37']) {
        player.x -= 3;
    }
    // DOWN (S or ↓)
    if (keys['83'] || keys['40']) {
        player.y += 3;
    }
    // RIGHT (D or →)
    if (keys['68'] || keys['39']) {
        player.x += 3;
    }
}