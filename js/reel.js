function Reel() {
    this.show = function(){
        textAlign(CENTER, CENTER);
        fill(255);
        stroke(1);
        for(var i = 0; i < numOfSymbols; i++){
            fill(255);
        rect(this.pos.x, (this.pos.y + ( i * this.boxsize)), this.boxsize, this.boxsize);
        fill(000);
        strokeWeight(2);
        text(this.reelSymbols[i],this.pos.x + 3, (this.pos.y + ( i *  + this.boxsize)) + 3, this.boxsize, this.boxsize);   
    }

    }

    this.startSpinning = function(delay){
            this.passSymbols = 10;
            this.reelSpeed = 30 * speedMulti;
    
            this.rearrangePoint = (this.pos.y -(40 * 7));;
            this.isBeforeRearrangePoint = true;
    
            var startPoint = -(40 * floor(random(1, 33))); // first num inclusive, second NOT
            startPoint = startPoint - 19;
    
            this.startSpinatPos = startPoint;
            this.stopAtpos = (this.startSpinatPos -(40 * this.passSymbols));
            this.slowDownPoint = this.stopAtpos + (40 * 7);
            this.startTime = millis();
            this.startDelay = delay;
    }

    this.update = function(){
        var time = -(this.startTime - millis());
        if(time > this.startDelay && time < (this.startDelay + 1000)){
            this.isSpinning = true;
        }

        if(slotSpinning){
            if(this.isSpinning){
            this.pos.y = this.pos.y - this.reelSpeed;
                if(this.isBeforeRearrangePoint){
                    if(this.pos.y < this.rearrangePoint){
                        this.isBeforeRearrangePoint = false;
                        this.pos.y = this.startSpinatPos;
                    }
                }else if(!this.isBeforeRearrangePoint){
                    var distanceToStop = -(this.stopAtpos - this.pos.y);

                    for (let index = 0; index < slowDownDistances.length; index++) {
                        if(distanceToStop < slowDownDistances[index]){
                            if(this.reelSpeed > 1){
                            this.reelSpeed = reelSpeedOnDistances[index];
                            }
                            
                        }
                        
                    }


                    if(this.pos.y < this.stopAtpos){
                        this.pos.y = this.stopAtpos;
                        this.isSpinning = false;
                        this.calculateWin = true;
                        
                    }
                }
            }
        }
    }

    // MAX POS Y = -1579
    // MIN POS y = -19
    // -19 , -59, -99, -139

    this.create = function(xpos, reelSymbs){
        this.pos = createVector(xpos, -19);
        this.boxsize = 40;
        this.isSpinning = false;
        this.reelSpeed = 10 * speedMulti;
        this.calculateWin = false;


        this.reelSymbols = reelSymbs;
        console.log("REEL SYMBOLS : ", this.reelSymbols);

    }

    this.setCalculateWin = function(val){
        this.calculateWin = val;
    }

    this.getCalculateWin = function(){
        return(this.calculateWin);
    }

    this.getWinSymbols = function(){
        var block = -(this.stopAtpos + 19);
        block = block / 40;
        block = block + 3;

        var fiveSymbols = [];
        for (let index = 0; index < 5; index++) {
            fiveSymbols.push(this.reelSymbols[block + index]);
            
        }

        return fiveSymbols;
    }
}