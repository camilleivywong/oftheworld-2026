let cells = [];
let words;
let count = 0;

let str = `My father was wrong about what was necessary to combat the antiblackness of the state.
It is hard to form a formidable analysis against the state when you are traumatized and won't acknowledge it.
Learning to be a father from losing a father who himself never had the chance to lose his own father before he was lost.
That is a riddle of fathers. A history riddled with fathers.`;


class Cell {

  constructor(x,y,w,h,word){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.word = word;
  }

  contains(px,py){
    return px > this.x && px < this.x + this.w &&
           py > this.y && py < this.y + this.h;
  }

  draw(){

    let hovered = this.contains(mouseX,mouseY);

    if(hovered){
      cursor('pointer');
    }

    stroke(150, 149, 163);
    strokeWeight(2);
    fill(0);
    rect(this.x,this.y,this.w,this.h);

    push();

    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(this.x,this.y,this.w,this.h);
    drawingContext.clip();

    noStroke();

    if(hovered && this.w > 80 && this.h > 80){

      fill(150, 149, 163);

      let hoverSize = min(this.w,this.h) / 6;
      textSize(hoverSize);

      textWrap(WORD);

      text("(of the world)",
           this.x + 6,
           this.y + 6,
           this.w - 12,
           this.h - 12);

    } else {

      fill(150, 149, 163);

      let size = min(this.w,this.h) / 3.5;
      textSize(size);

      textWrap(WORD);

      text(this.word,
           this.x + 6,
           this.y + 6,
           this.w - 12,
           this.h - 12);

    }

    drawingContext.restore();

    pop();
  }

}


function setup(){

  createCanvas(windowWidth,windowHeight);

  textFont("serif");

  words = str.split(" ");

  cells.push(
    new Cell(0,0,width,height,words[count++])
  );

}


function draw(){

  background(0);

  cursor('default');

  for(let c of cells){
    c.draw();
  }

}


function mousePressed(){

  for(let i=cells.length-1;i>=0;i--){

    let c = cells[i];

    if(c.contains(mouseX,mouseY)){

      cells.splice(i,1);

      if(c.w > c.h){

        let w2 = c.w / 2;

        cells.push(
          new Cell(c.x,c.y,w2,c.h,c.word)
        );

        cells.push(
          new Cell(
            c.x + w2,
            c.y,
            w2,
            c.h,
            words[count++] || "..."
          )
        );

      } else {

        let h2 = c.h / 2;

        cells.push(
          new Cell(c.x,c.y,c.w,h2,c.word)
        );

        cells.push(
          new Cell(
            c.x,
            c.y + h2,
            c.w,
            h2,
            words[count++] || "..."
          )
        );

      }

      break;

    }

  }

}


function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
