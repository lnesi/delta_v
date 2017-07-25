var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this, Game.globalWidth, Game.globalHeight, Phaser.CANVAS) || this;
        _this.state.add('Boot', Boot, false);
        _this.state.add('PlayState', PlayState, false);
        _this.state.start("Boot");
        return _this;
    }
    return Game;
}(Phaser.Game));
Game.globalWidth = window.innerWidth;
Game.globalHeight = window.innerHeight;
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(ship, textureID, soundID, offset, group) {
        if (offset === void 0) { offset = null; }
        if (group === void 0) { group = null; }
        var _this = _super.call(this, ship.state.game, ship.state.game.plugins) || this;
        if (offset) {
            _this.emiterOffset = offset;
        }
        else {
            _this.emiterOffset = new Phaser.Point(0, 0);
        }
        _this.ship = ship;
        if (group) {
            _this.createBullets(20, textureID, 0, group);
        }
        else {
            _this.createBullets(20, textureID);
        }
        //  The bullet will be automatically killed when it leaves the world bounds
        _this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        _this.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        _this.bulletSpeed = 500;
        //this.bullets = new Phaser.Group(this.state.game,ship.state.weaponsLayer,'bulletGroup',false,true,Phaser.Physics.ARCADE);
        _this.sfx = new Phaser.Sound(ship.state.game, soundID, 0.5);
        _this.trackSprite(ship.shipBody, _this.emiterOffset.x, _this.emiterOffset.y);
        return _this;
    }
    Weapon.prototype.fireWeapon = function () {
        this.sfx.play();
        return this.fire();
    };
    Weapon.prototype.update = function () {
        console.log("update weapon");
    };
    return Weapon;
}(Phaser.Weapon));
///<reference path="objects/Weapon"/>
var HeroGunLevel1 = (function (_super) {
    __extends(HeroGunLevel1, _super);
    function HeroGunLevel1(ship) {
        return _super.call(this, ship, 'hero_fire_bullet', 'sfx_laser1', new Phaser.Point(0, -ship.shipBody.height / 2)) || this;
    }
    return HeroGunLevel1;
}(Weapon));
var SpaceShip = (function (_super) {
    __extends(SpaceShip, _super);
    function SpaceShip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toDestroy = false;
        _this.deltaTime = 0;
        return _this;
    }
    SpaceShip.prototype.getX = function () {
        return this.shipBody.body.center.x;
    };
    SpaceShip.prototype.getY = function () {
        return this.shipBody.body.center.y;
    };
    SpaceShip.prototype.setX = function (x) {
        this.shipBody.x = x;
    };
    SpaceShip.prototype.setY = function (y) {
        this.shipBody.y = y;
    };
    SpaceShip.prototype.update = function () {
        if (this.toDestroy)
            this.destroy(true);
    };
    return SpaceShip;
}(Phaser.Group));
///<reference path="objects/SpaceShip"/>
var HeroShip = (function (_super) {
    __extends(HeroShip, _super);
    function HeroShip(state) {
        var _this = _super.call(this, state.game) || this;
        _this.life = 100;
        _this.friction = 500;
        _this.maxAcceleration = 500;
        _this.maxSpeed = 200;
        _this.currentMovement = "stand";
        _this.weightEnergy = 10;
        _this.direction = new Phaser.Point(0, 0);
        _this.acceleration = new Phaser.Point(0, 0);
        _this.state = state;
        _this.shipBody = new Phaser.Sprite(state.game, 0, 0, "hero_ship_0");
        _this.shipBody.animations.add('stand', Phaser.Animation.generateFrameNames('hero_stand_', 0, 5, '.png', 4), 24, true);
        _this.shipBody.animations.add('left', Phaser.Animation.generateFrameNames('hero_left_', 0, 5, '.png', 4), 24, false);
        _this.shipBody.animations.add('right', Phaser.Animation.generateFrameNames('hero_right_', 0, 5, '.png', 4), 24, false);
        _this.shipBody.animations.add('up', Phaser.Animation.generateFrameNames('hero_up_', 0, 5, '.png', 4), 24, false);
        _this.shipBody.animations.add('down', Phaser.Animation.generateFrameNames('hero_down_', 0, 5, '.png', 4), 24, false);
        _this.shipBody.animations.add('fire_stand', Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4), 24, false);
        _this.shipBody.animations.add('fire_up', Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4), 24, false);
        _this.shipBody.animations.add('fire_down', Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4), 24, false);
        _this.shipBody.animations.add('fire_left', Phaser.Animation.generateFrameNames('hero_fire_left_', 0, 2, '.png', 4), 24, false);
        _this.shipBody.animations.add('fire_right', Phaser.Animation.generateFrameNames('hero_fire_right_', 0, 2, '.png', 4), 24, false);
        _this.shipBody.animations.getAnimation("fire_stand").onComplete.add(_this.gunFire.bind(_this));
        _this.shipBody.animations.getAnimation("fire_up").onComplete.add(_this.gunFire.bind(_this));
        _this.shipBody.animations.getAnimation("fire_down").onComplete.add(_this.gunFire.bind(_this));
        _this.shipBody.animations.getAnimation("fire_left").onComplete.add(_this.gunFire.bind(_this));
        _this.shipBody.animations.getAnimation("fire_right").onComplete.add(_this.gunFire.bind(_this));
        _this.shipBody.animations.play('stand');
        _this.shipBody.anchor.setTo(0.5, 0.5);
        _this.add(_this.shipBody);
        _this.state.physics.enable(_this.shipBody, Phaser.Physics.ARCADE, true);
        _this.shipBody.body.collideWorldBounds = true;
        _this.shipBody.body.syncBounds = true;
        _this.shipBody.body.setCircle(_this.shipBody.height / 2.8, 0, 0);
        _this.weapon = new HeroGunLevel1(_this);
        _this.moveControls = new PadControls(state.game);
        _this.fireControl = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        _this.deltaTime = _this.state.game.time.now;
        return _this;
    }
    HeroShip.prototype.animate = function (name) {
        if (this.shipBody.animations.currentAnim.name != name && this.shipBody.animations.currentAnim.name.indexOf("fire") === -1)
            return this.shipBody.animations.play(name);
    };
    HeroShip.prototype.getSpeed = function () {
        return Math.sqrt(Math.pow(this.shipBody.body.velocity.x, 2) + Math.pow(this.shipBody.body.velocity.x, 2));
    };
    HeroShip.prototype.getCurrentDirection = function () {
        var x = 0;
        var y = 0;
        if (Math.abs(this.shipBody.body.velocity.x) > 0)
            x = (this.shipBody.body.velocity.x / Math.abs(this.shipBody.body.velocity.x));
        if (Math.abs(this.shipBody.body.velocity.y) > 0)
            y = (this.shipBody.body.velocity.y / Math.abs(this.shipBody.body.velocity.y));
        return new Phaser.Point(x, y);
    };
    HeroShip.prototype.update = function () {
        this.shipBody.body.acceleration.y = 0;
        this.moveControls.update();
        if (this.moveControls.get().x != 0) {
            this.acceleration.x = this.maxAcceleration * this.moveControls.get().x;
        }
        else {
            this.acceleration.x = this.getCurrentDirection().x * -1 * this.friction;
        }
        if (Math.abs(this.shipBody.body.velocity.x) > this.maxSpeed && (this.getCurrentDirection().x == this.moveControls.get().x)) {
            this.acceleration.x = 0;
        }
        if (Math.abs(this.shipBody.body.velocity.x) <= this.weightEnergy && this.moveControls.get().x == 0) {
            this.acceleration.x = 0;
            this.shipBody.body.velocity.x = 0;
        }
        if (this.moveControls.get().y != 0) {
            this.acceleration.y = this.maxAcceleration * this.moveControls.get().y;
        }
        else {
            this.acceleration.y = this.getCurrentDirection().y * -1 * this.friction;
        }
        if (Math.abs(this.shipBody.body.velocity.y) > this.maxSpeed && (this.getCurrentDirection().y == this.moveControls.get().y)) {
            this.acceleration.y = 0;
        }
        if (Math.abs(this.shipBody.body.velocity.y) <= this.weightEnergy && this.moveControls.get().y == 0) {
            this.acceleration.y = 0;
            this.shipBody.body.velocity.y = 0;
        }
        if (this.fireControl.isDown) {
            this.fire();
        }
        this.animate(this.moveControls.getDescription());
        this.shipBody.body.acceleration.x = this.acceleration.x;
        this.shipBody.body.acceleration.y = this.acceleration.y;
    };
    HeroShip.prototype.hitHandler = function (shipBody, bullet) {
        console.log("Collidion hero");
        bullet.kill();
    };
    HeroShip.prototype.gunFire = function () {
        this.weapon.fireWeapon();
        var cAnimation = this.shipBody.animations.getAnimation(this.moveControls.getDescription());
        cAnimation.play();
        cAnimation.stop(null, false);
        cAnimation.frame = cAnimation.frameTotal - 1;
    };
    HeroShip.prototype.fire = function () {
        if (this.state.game.time.now > this.deltaTime) {
            this.animate('fire_' + this.moveControls.getDescription());
            this.deltaTime = this.state.game.time.now + this.weapon.fireRate;
        }
    };
    return HeroShip;
}(SpaceShip));
var SpaceBackground = (function (_super) {
    __extends(SpaceBackground, _super);
    function SpaceBackground(state) {
        var _this = _super.call(this, state.game, 0, 0, Game.globalWidth, Game.globalHeight, 'BackgroundDarkPurple') || this;
        state.backgroundLayer.addChild(_this);
        return _this;
    }
    SpaceBackground.prototype.update = function () {
        this.tilePosition.y += 2;
    };
    return SpaceBackground;
}(Phaser.TileSprite));
///<reference path="../objects/SpaceShip"/>
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(state, index, sprite_id, maxSpeed, accelaration, fireTime) {
        if (maxSpeed === void 0) { maxSpeed = 100; }
        if (accelaration === void 0) { accelaration = 50; }
        if (fireTime === void 0) { fireTime = 1000; }
        var _this = _super.call(this, state.game) || this;
        _this.life = 1;
        _this.on = false;
        _this.target = new Phaser.Point(0, 0);
        _this.state = state;
        _this.index = index;
        _this.fireTime = fireTime;
        _this.maxSpeed = maxSpeed;
        _this.accelaration = accelaration;
        _this.shipBody = new Phaser.Sprite(state.game, 0, 0, sprite_id);
        state.physics.enable(_this.shipBody, Phaser.Physics.ARCADE);
        _this.shipBody.anchor.setTo(0.5, 0.5);
        //this.shipBody.body.syncBounds=true;
        _this.shipBody.body.setCircle(_this.shipBody.height / 2.5, 0, 0);
        _this.addChild(_this.shipBody);
        _this.shipBody.body.bounce.x = 0.5;
        _this.shipBody.body.bounce.y = 0.5;
        return _this;
        //this.shipBody.body.collideWorldBounds=true;
    }
    Enemy.prototype.init = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.setX(x);
        this.setY(y);
        this.on = true;
    };
    Enemy.prototype.getSpeed = function () {
        return Math.sqrt(Math.pow(this.shipBody.body.velocity.x, 2) + Math.pow(this.shipBody.body.velocity.x, 2));
    };
    Enemy.prototype.update = function () {
        if (this.on) {
            var aHero = this.state.hero.getX() - this.getX();
            var bHero = this.state.hero.getY() - this.getY();
            var a = this.target.x - this.getX();
            var b = this.target.y - this.getY();
            var dx = this.accelaration * Math.sin(Math.atan2(a, b));
            var dy = this.accelaration * Math.cos(Math.atan2(a, b));
            this.shipBody.body.velocity.y = dy / 2;
            this.shipBody.body.velocity.x = dx / 2;
            this.shipBody.body.rotation = Math.atan2(aHero, bHero) * (-180 / Math.PI);
            if (this.life > 0)
                this.game.physics.arcade.overlap(this.shipBody, this.state.hero.weapon.bullets, this.hitHandler, null, this);
            this.game.physics.arcade.overlap(this.state.hero.shipBody, this.weapon.bullets, this.weaponHitHandler, null, this);
            if (this.state.game.time.now > this.deltaTime)
                this.fire();
        }
        _super.prototype.update.call(this);
    };
    Enemy.prototype.fire = function () {
        this.deltaTime = this.state.game.time.now + this.fireTime;
        this.weapon.fireAtSprite(this.state.hero.shipBody);
        //this.weapon.sfx.play();
    };
    Enemy.prototype.weaponHitHandler = function (heroBody, bullet) {
        console.log("HIT HERO");
        bullet.kill();
    };
    Enemy.prototype.hitHandler = function (enemy, bullet) {
        //this.life=0;
        bullet.kill();
        var explosion = new Phaser.Sprite(this.state.game, this.getX(), this.getY(), 'explosion');
        explosion.anchor.setTo(0.5, 0.5);
        explosion.animations.add('explosion');
        explosion.animations.getAnimation('explosion').play(30, false, true);
        this.state.enemyLayer.add(explosion);
        this.shipBody.kill();
        this.toDestroy = true;
        console.log("COLLISION bullet");
    };
    return Enemy;
}(SpaceShip));
var EnemyKamikaze = (function (_super) {
    __extends(EnemyKamikaze, _super);
    function EnemyKamikaze() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyKamikaze.prototype.update = function () {
        this.target = new Phaser.Point(this.state.hero.getX(), this.state.hero.getY());
        _super.prototype.update.call(this);
    };
    return EnemyKamikaze;
}(Enemy));
///<reference path="EnemyKamikaze"/>
var Enemy01 = (function (_super) {
    __extends(Enemy01, _super);
    function Enemy01(state, index, xTarget, yTarget) {
        if (xTarget === void 0) { xTarget = 0; }
        if (yTarget === void 0) { yTarget = 0; }
        var _this = _super.call(this, state, index, "enemy_01", 1, 200) || this;
        _this.fireTime = 1000;
        _this.weapon = new Weapon(_this, 'enemy_fire_bullet', 'sfx_laser1', new Phaser.Point(0, 0), state.weaponsLayer);
        return _this;
    }
    return Enemy01;
}(EnemyKamikaze));
var Enemy02 = (function (_super) {
    __extends(Enemy02, _super);
    function Enemy02(state, index, xTarget, yTarget) {
        if (xTarget === void 0) { xTarget = 0; }
        if (yTarget === void 0) { yTarget = 0; }
        var _this = _super.call(this, state, index, "enemy_02", 100, 200) || this;
        _this.target = new Phaser.Point(xTarget, yTarget);
        _this.weapon = new Weapon(_this, 'enemy_fire_bullet', 'sfx_laser1', new Phaser.Point(0, 0), state.weaponsLayer);
        return _this;
    }
    return Enemy02;
}(Enemy));
var LoadableState = (function (_super) {
    __extends(LoadableState, _super);
    function LoadableState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ready = false;
        return _this;
    }
    LoadableState.prototype.init = function () {
        console.log("UBUT Main");
        this.preloaderLayer = new Phaser.Group(this.game);
        this.preloadBackground = new Phaser.TileSprite(this.game, 0, 0, Game.globalWidth, Game.globalHeight, 'preload_back');
        this.preloadBar = new Phaser.Sprite(this.game, (Game.globalWidth / 2) - 150, (Game.globalHeight / 2) - 12, 'preload_bar');
    };
    LoadableState.prototype.preload = function () {
        this.preloaderLayer.add(this.preloadBackground);
        this.preloaderLayer.add(this.preloadBar);
        this.load.setPreloadSprite(this.preloadBar);
    };
    return LoadableState;
}(Phaser.State));
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Boot.prototype.init = function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL
    };
    Boot.prototype.preload = function () {
        console.log("Boot: Preload");
        this.load.image('preload_back', 'assets/img/darkPurple.png');
        this.load.image('preload_bar', 'assets/img/preload_bar.png');
        // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        // 
    };
    Boot.prototype.create = function () {
        console.log("Boot: Created");
        this.game.state.start("PlayState");
    };
    Boot.prototype.update = function () {
    };
    return Boot;
}(Phaser.State));
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('BackgroundDarkPurple', 'assets/img/darkPurple.png');
        this.load.atlasXML('mainsprite', 'assets/sprites/sheet.png', 'assets/sprites/sheet.xml');
        this.load.spritesheet('explosion', 'assets/img/explosion.png', 64, 64);
        this.load.atlasJSONArray('hero_ship_0', 'assets/sprites/hero_ship_0.png', 'assets/sprites/hero_ship_0.json');
        this.load.atlasJSONArray('enemy_01', 'assets/sprites/enemy_01.png', 'assets/sprites/enemy_01.json');
        this.load.atlasJSONArray('enemy_02', 'assets/sprites/enemy_02.png', 'assets/sprites/enemy_02.json');
        this.load.image('enemy_fire_bullet', 'assets/img/enemy_fire_bullet.png');
        this.load.image('hero_fire_bullet', 'assets/img/hero_fire_bullet.png');
        this.load.audio('sfx_laser1', "assets/audio/sfx_laser1.ogg");
    };
    PlayState.prototype.create = function () {
        this.backgroundLayer = new Phaser.Group(this.game);
        this.weaponsLayer = new Phaser.Group(this.game);
        this.enemyLayer = new Phaser.Group(this.game);
        this.heroLayer = new Phaser.Group(this.game);
        this.foregroundLayer = new Phaser.Group(this.game);
        var background = new SpaceBackground(this);
        this.bodys = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.bodys.x = 0;
        this.bodys.y = 0;
        this.bodys.width = Game.globalWidth;
        this.bodys.height = Game.globalHeight;
        console.log(this.bodys);
        this.hero = new HeroShip(this);
        this.hero.x = Game.globalWidth / 2;
        this.hero.y = Game.globalHeight / 2;
        this.heroLayer.add(this.hero);
        this.enemy1 = new Enemy02(this, 0, 5000, 5000);
        this.enemyLayer.addChild(this.enemy1);
        this.enemy1.init(100, 100);
        //this.bodys.add(this.enemy1.shipBody);
        this.enemy2 = new Enemy01(this, 1);
        this.enemyLayer.addChild(this.enemy2);
        this.enemy2.init(500, 0);
        //this.bodys.add(this.enemy2.shipBody);
        // for(var i:number=0;i<10;i++){
        // 	var e=new Enemy01(this);
        // 	this.enemyLayer.addChild(e);
        // 	e.x=(Math.random()*Game.globalWidth*2)-Game.globalWidth;
        // 	e.y=-50-(Math.random()*500);
        // 	e.init();
        // }
    };
    PlayState.prototype.setupControls = function () {
    };
    PlayState.prototype.update = function () {
        //this.game.physics.arcade.collide(this.bodys);
    };
    PlayState.prototype.collisionHandler = function () {
        console.log("COLLISION");
    };
    PlayState.prototype.render = function () {
        //this.game.debug.body(this.hero.shipBody);
        //this.game.debug.body(this.enemy1.shipBody);
        //this.game.debug.body(this.enemy2.shipBody);
        //this.game.debug.bodyInfo(this.hero.shipBody,10,10);
    };
    return PlayState;
}(LoadableState));
var KeyInput = (function () {
    function KeyInput() {
    }
    return KeyInput;
}());
var PadControls = (function () {
    function PadControls(game) {
        this.direction = new Phaser.Point(0, 0);
        this.keys = game.input.keyboard.createCursorKeys();
    }
    PadControls.prototype.getDescription = function () {
        return this.currentDesctiption;
    };
    PadControls.prototype.get = function () {
        return this.direction;
    };
    PadControls.prototype.update = function () {
        if (this.keys.left.isDown) {
            this.currentDesctiption = "left";
            this.direction.x = -1;
            //this.shipBody.body.acceleration.x=-this.acceleration;
        }
        else if (this.keys.right.isDown) {
            this.currentDesctiption = "right";
            this.direction.x = 1;
            //this.shipBody.body.acceleration.x=this.acceleration;
        }
        else {
            this.direction.x = 0;
        }
        if (this.keys.up.isDown) {
            this.currentDesctiption = "up";
            this.direction.y = -1;
            //this.shipBody.body.acceleration.y=-this.acceleration;
        }
        else if (this.keys.down.isDown) {
            this.currentDesctiption = "down";
            this.direction.y = 1;
            //this.shipBody.body.acceleration.y=this.acceleration;
        }
        else {
            this.direction.y = 0;
        }
        if (this.direction.x == 0 && this.direction.y == 0) {
            this.currentDesctiption = "stand";
        }
    };
    return PadControls;
}());
//# sourceMappingURL=main.js.map