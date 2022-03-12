class Sprite{
    
    constructor(pImg,pX,pY){
        this.img=pImg;

        this.x=pX;
        this.y=pY;

        this.timerFrame=0;

        this.currentFrame=0;
        this.currentFrameInAnimation=0;

        this.currentAnimation=null;
        this.lstAnimations=[];

        this.tileSize={x:0,y:0};
        this.scale={x:1,y:1};

        this.bIsTilesheet=false;
    }

    setTilesheet(pWFrame,pHFrame){
        this.tileSize.x=pWFrame;
        this.tileSize.y=pHFrame;

        this.bIsTilesheet=true;
    }

    setScale(pX,pY){
        this.scale.x=pX;
        this.scale.y=pY;
    }

    addAnimation(pName,pLstFrames,pSpeed,pbLoop=true){

        let animation={
            name:pName,
            lstFrames:pLstFrames,
            speed:pSpeed,
            bLoop:pbLoop,
            bIsFinish:false
        };

        this.lstAnimations.push(animation);
    }

    startAnimation(pName){
        
        if(this.currentAnimation!=null){
            if(this.currentAnimation.name==pName){
                return;
            }
        }

        this.lstAnimations.forEach(anim=>{

            if(anim.name==pName){
                this.currentAnimation=anim;
                this.currentFrameInAnimation=0;
                this.currentFrame=this.currentAnimation.lstFrames[this.currentFrameInAnimation];

                this.currentAnimation.bIsFinish=false;
            }
        });
    }

    update(dt){
        
        if(this.currentAnimation!=null){
            this.timerFrame+=dt;

            if(this.timerFrame>=this.currentAnimation.speed){
                this.timerFrame=0;
                this.currentFrameInAnimation++;

                if(this.currentFrameInAnimation>this.currentAnimation.lstFrames.length-1){

                    if(this.currentAnimation.bLoop){
                        this.currentFrameInAnimation=0;
                    }else{
                        this.currentFrameInAnimation=this.currentAnimation.lstFrames.length-1;
                        this.currentAnimation.bIsFinish=true;
                    }
                }

                this.currentFrame=this.currentAnimation.lstFrames[this.currentFrameInAnimation];
            }
        }
    }

    draw(pCtx){
        
        if(!this.bIsTilesheet){
            pCtx.drawImage(this.img,this.x,this.y,this.img.width*this.scale.x,this.img.height*this.scale.y);
        }else{
            let nbCol=Math.floor(this.img.width/this.tileSize.x);

            let l=Math.floor(this.currentFrame/nbCol);
            let c=Math.floor(this.currentFrame-(l*nbCol));

            let x=c*this.tileSize.x;
            let y=l*this.tileSize.y;

            pCtx.drawImage(this.img,x,y,this.tileSize.x,this.tileSize.y,this.x,this.y,this.tileSize.x*this.scale.x,this.tileSize.y*this.scale.y);
        }
    }

}