let app;
let keys = {}; // stores the key press
let player;

window.onload = function() {
    app = new PIXI.Application({
        width: 800,
        height: 450,
        backgroundColor: 0x66FDFF,
        resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);

    // player object
    player = new PIXI.Sprite.from('Tony.png');
    player.anchor.set(0.5);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    player.scale.set(0.05, 0.05); // tony width & height
    app.stage.addChild(player);

    // keyboard event handlers
    window.addEventListener("keydown", keysDown); // key pressed
    window.addEventListener("keyup", keysUp); // key not pressed

    app.ticker.add(gameLoop);
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