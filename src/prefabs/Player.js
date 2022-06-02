class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
    
        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this);

        //private params
        this.size = 0.4;
        this.consumed = 0;

        this.animPlayed = false;

        var particles = this.scene.add.particles('damage');
        this.emitter = particles.createEmitter( {
            angle: {min: 240, max: 300},
            scale: { min: 0.1, max: 0.3 },
            speed:200,
            quantity: 4,
            lifespan: 500   
        });
        this.emitter.setScale(0.1);
        this.emitter.stop();
        this.emitter.setSpeed(200);

    }
    update() {
        //left right movement
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.flipX = true;
            this.play('walkStart');
            this.on('animationcomplete', function (sprite)
                {
                if (sprite.key === 'walkStart')
                {
                    this.play('walkDuring');
                }
                }, 
            this);
        }
        else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.flipX = false;
            this.play('walkStart');
            this.on('animationcomplete', function (sprite)
                {
                if (sprite.key === 'walkStart')
                {
                    this.play('walkDuring'); 
                }
                }, 
            this);
        }
        if(keyLEFT.isDown) {
            this.body.setVelocityX(-300);
        }
        else if(keyRIGHT.isDown) {
            this.body.setVelocityX(300);
            //this.anims.play('walkRight');
        }
        else {
            this.body.setVelocityX(0);
            this.anims.stop('walkDuring');
            this.anims.play('walkStart');
            
            
        }

        //up down movement
        if(keyUP.isDown) {
            this.body.setVelocityY(-300);
        }
        else if(keyDOWN.isDown) {
            this.body.setVelocityY(300);
        }
        else {
            this.body.setVelocityY(0);
        }

        //debug change size
        if(keySPACE.isDown) {
            if(this.size > 0.1){
                this.size -= 0.01
            }
        }
        if(keyC.isDown) {
                this.size += 0.01
        }
        this.setScale(this.size);
    }

    hit() {
        this.emitter.setPosition(this.x, this.y);
        this.emitter.emitParticle(4);
        this.emitter.emitParticle(5);
        this.emitter.emitParticle(4);
        //this.emitter.emitParticle(10);
    }
  }