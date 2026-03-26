let cells = [];
let words;
let count = 0;

let str = `My father was wrong about what was necessary to combat the antiblackness of the state. It is hard to form a formiddable analysis against the state when you are traumatized and won't acknowledge it. Learning to be a father from losing a father who himself never had the chance to lose his own father before he was lost. That is a riddle of fathers. A history riddled with fathers. A history field in negatives. Maintaining the centers of their lives, were of course, women. My grandmother has been much more steady sifiting (living) the tidal weight of time, of history. There is no word you will hear me say more often than the word history.It does not have us in its clutches but it does have us. A large part of it is made of brutalization, a large part of it is an abusive interpretation of time, a blatant denial of the fact that we are all connected, and of the range of our limited agencies afainst its being reread to violent ends. We do not choose to go back to it. We see it though don't face [preposition] it. As its constituents, ultimately it answers to us. It is also our fiber, our cell, and our cells. Cell in the Medieval Latin sense of 'small.monastery, subordinate monastery' in that history is a network, is provincial, and reflects the smallness of our experience, and also (creates) the bigness of our interiors, as reflected in space that faith carves for whatever one might pray to, for, the direct relationship between want and belief that through articulation (accumulation) we might reach that want. Time is an incomplete bridge, is a column between two sides of a chasm, is between on all sides a certain emptiness of experience, empty as glass can be empty of light, empty as in inherent with something not transparent or opaque but reflective. I appreciate that in the scientific sense cells are abundant and collective. Captivity too is abundant. We are tracked more than we are seen, are falsely accused of being/as being harmful to one another, are being cordoned off, taken. Rather than 'end' the poem I would like to use acknowledgements to 'open' it. Not to open as in I opened the box of cereal but open as in open towards, to orient it, importantly, to the future (which is a different sense of the past). The past can be the future because the past is constituted by our relation to it. The past is capable of change. The previous stanzas are indebted to the work of Kevin Quashie, his book The Sovereignty of the Interior, and to the ongoing work of the LAPD Spying coaliation, who point out, interrogate, and act against the use of surveillance technologies that expand, or have the potential to expand, police powers. We should consider the indebtedness of the tide. See physics as one of many small catalogs of (R)elation (this usage of the word 'relation' is indebted to my friend Ariel). So this iteration of the poem is over (see: open`;


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
