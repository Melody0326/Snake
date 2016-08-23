(function(){
//草场对象
var ground = {
	dom: document.getElementById('ground'),
	createFood: function(){
		return new Food();
	}
}

//蛇对象
var snake = {
	body: [],
	speed: 300,
	direction: 'right',
	move: function(){
		this.head = this.body[0];
		this.nextPos;
		if(this.direction == 'left'){
			this.nextPos = {
				left: this.head.offsetLeft - 20,
				top: this.head.offsetTop
			};
		}else if(this.direction == 'top'){
			this.nextPos = {
				left: this.head.offsetLeft,
				top: this.head.offsetTop - 20
			};
		}else if(this.direction == 'right'){
			this.nextPos = {
				left: this.head.offsetLeft + 20,
				top: this.head.offsetTop
			};
		}else if(this.direction == 'down'){
			this.nextPos = {
				left: this.head.offsetLeft,
				top: this.head.offsetTop + 20
			};
		}
		if(this.nextPos.left == ground.food.pos.left && this.nextPos.top == ground.food.pos.top){
			this.eat();
		}else{
			for(var i=0; i<this.body.length; i++){
				var nowPos = {
					left: this.body[i].offsetLeft,
					top: this.body[i].offsetTop
				};
				this.body[i].style.left = this.nextPos.left + 'px';
				this.body[i].style.top = this.nextPos.top + 'px';
				this.nextPos = nowPos;
			}
		}
		for(var i=4; i<this.body.length; i++){
			if(this.body[i].offsetLeft == this.head.offsetLeft && this.body[i].offsetTop == this.head.offsetTop){
				this.die();
			}
		}
	},
	eat: function(){
		ground.food.dom.className = 'block snake-block';
		ground.food.dom.style.left = this.head.offsetLeft + 'px';
		ground.food.dom.style.top = this.head.offsetTop + 'px';
		this.head.style.left = this.nextPos.left + 'px';
		this.head.style.top = this.nextPos.top + 'px';
		this.body.splice(1, 0, ground.food.dom);
		ground.food = ground.createFood();
	},
	die: function(){
		alert('Game Over!');
		clearInterval(game.timer);
	}
};
//食物类
function Food(){
	do{
		var bFlag = true;//一个标识位, true代表找到合适的食物坐标
		this.pos = {
			left: parseInt(Math.random() * 50) * 20,//0-980
			top: parseInt(Math.random() * 25) * 20
		};
		for(var i=0; i<snake.body.length; i++){
			if(snake.body[i].offsetLeft == this.pos.left && snake.body[i].offsetTop == this.pos.top){
				bFlag = false;
			}
		}
	}while(!bFlag);
	this.dom = document.createElement('div');
	this.dom.className = 'block food-block';
	this.dom.style.left = this.pos.left + 'px';
	this.dom.style.top = this.pos.top + 'px';
	ground.dom.appendChild(this.dom);
}
//游戏对象	
var game = {
	timer: null,
	init: function(){//游戏初始化
		for(var i=0; i<3; i++){
			var oDiv = document.createElement('div');
			oDiv.className = 'block snake-block';
			oDiv.style.left = (3-i) * 20 + 'px';
			ground.dom.appendChild(oDiv);
			snake.body.push(oDiv);
		}
		ground.food = ground.createFood();
		document.onkeydown = function(e){
			e = e || window.event;
			var keyCode = e.which || e.keyCode;
			if(keyCode == 37){//left
				if(snake.direction != 'right'){
					snake.direction = 'left';
				}
			}else if(keyCode == 38){//top
				if(snake.direction != 'down'){
					snake.direction = 'top';
				}
			}else if(keyCode == 39){//right
				if(snake.direction != 'left'){
					snake.direction = 'right';
				}
			}else if(keyCode == 40){//down
				if(snake.direction != 'top'){
					snake.direction = 'down';
				}
			}
			snake.move();
		};
		var oBtnStart = document.getElementById('btn-start');
		oBtnStart.onclick = function(){
			game.start();
		};
		var oBtnPause = document.getElementById('btn-pause');
		oBtnPause.onclick = function(){
			game.pause();
		};
	},
	start: function(){
		game.timer = setInterval(function(){
			snake.move();
		}, snake.speed);
	},
	pause: function(){//定时器清掉
		clearInterval(game.timer);
	}
};
game.init();
})();