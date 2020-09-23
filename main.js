'use strict';

{   
    class Panel{
        constructor(game){
            this.game = game;
            this.el = document.createElement("li");
            this.el.addEventListener('click', ()=>{
                this.getPanelEvent();
            })
        }
        
        getEl(){
            return this.el;
        }
        
        active(num){
            this.el.classList.add("start");
            this.el.textContent = num;
        }
        
        getPanelEvent(){
            if(this.game.getCurrentNum() === parseInt(this.el.textContent, 10)){
                this.el.classList.remove("start");
                this.el.classList.add("pressed");
                this.game.addCurrentNum();
                
                if(this.game.getCurrentNum() === this.game.getLevel() ** 2){
                    clearTimeout(this.game.getTimeoutId());
                    this.game.getResult();
                }
            }
        }
        
    }
    
    class Board{
        constructor(game){
            this.game = game;
            this.panel = document.getElementById('panel');
            this.panels = [];
            
            for(let i = 0; i < this.game.getLevel() ** 2; i++){
                this.panels.push(new Panel(this.game));
            }
            
            this.panels.forEach(panel =>{
                this.panel.appendChild(panel.getEl());
            })
        }
        
        activate(){
            this.number = [];
            for(let i = 0; i < this.game.getLevel() ** 2; i++){
                this.number.push(i);
            }
            
            this.panels.forEach(panel =>{
                panel.active(this.number.splice(Math.floor(Math.random() * this.number.length),1));
            })
        }  
        
    }
    
    class Game{
        constructor(level){
            this.level = level;
            this.board = new Board(this);
            this.timer = document.getElementById("timer");
            const btn = document.getElementById("btn");
            this.startTime = undefined;
            this.timeoutId = undefined;
            this.currentNum = undefined;
            this.result = document.getElementById("result");
            const container = document.getElementById("container");

            const WIDTH = 50;
            const PADDING = 10;
            container.style.width = WIDTH * this.level + PADDING * 2 + "px";
            
            btn.addEventListener("click", ()=>{
                this.board.activate();
                this.setTimer();
                this.start();
            })
        }
        
        start(){
            this.currentNum = 0;
        }
        
        startTimer(){
            this.timer.textContent = ((Date.now() - this.startTime)/1000).toFixed(2);
            this.timeoutId = setTimeout(()=>{
                this.startTimer();
            } ,10)
        }
        
        setTimer(){
            this.startTime = Date.now();
            this.startTimer();
        }
        
        getCurrentNum(){
            return this.currentNum;
        }
        
        addCurrentNum(){
            return this.currentNum++;
        }
        
        getTimeoutId(){
            return this.timeoutId;
        }
        
        getResult(){
            const score = document.getElementById("score");

            score.textContent = this.timer.textContent;
            this.result.classList.remove("hidden");
        }

        getLevel(){
            return this.level;
        }
    }
    
    const game = new Game(5);
    
}