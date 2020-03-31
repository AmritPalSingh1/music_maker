const options_container = document.querySelector(".options-container");
const playhead = document.querySelector(".playhead");

options_container.addEventListener('click', alter_options);

let current_translate = 0;


let selected = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

function alter_options(e){
  
  let row = 0;
  let column = 0;

  if (e.target.nodeName == "I"){
    row = parseInt(e.target.parentElement.getAttribute('row'));
    column = parseInt(e.target.parentElement.getAttribute('column'));
    add_icon(e.target, row, column);
  }
  else{
    row = e.target.getAttribute('row');
    column = e.target.getAttribute('column');
    add_icon(e.target.children[0], row, column);
  }
}

function add_icon(element, row, column){
  if (!element.classList.contains('fa-circle')){
    element.className = "far fa-circle";
    selected[row-1][column-1] = 0;
  }
  else if (row == 1){
    element.className = "fas fa-star fix-size light-text-1";
    selected[row-1][column-1] = 1;
  }
  else if (row == 2){
    element.className = "fas fa-cube fix-size light-text-2";
    selected[row-1][column-1] = 1;
  }
  else if (row == 3){
    element.className = "fab fa-sketch fix-size light-text-3";
    selected[row-1][column-1] = 1;
  }
  else{
    element.className = "fas fa-square fix-size light-text-4";
    selected[row-1][column-1] = 1;
  }
}

function transform(){
  const col_width = get_col_width();

  if (screen.width > 576){
    current_translate = current_translate + 1;
  }
  else{
    current_translate = current_translate + 0.75;
  }

  if (current_translate > col_width*6){
    current_translate = 0;
  }

  playhead.style.transform = `translate3d(${current_translate}px, 0px, 0px)`;

  // Handle play music cases
  if ((current_translate + col_width/2) % col_width == 0 && current_translate != 0){
    const column_hit = (current_translate + col_width/2) / col_width;
    // Play sound
    if (selected[0][column_hit-1] == 1){
      playSound("a");
      addAnimation(1, column_hit);
    }
    if (selected[1][column_hit-1] == 1){
      playSound("b");
      addAnimation(2, column_hit);
    }
    if (selected[2][column_hit-1] == 1){
      playSound("c");
      addAnimation(3, column_hit);
    }
    if (selected[3][column_hit-1] == 1){
      playSound("d");
      addAnimation(4, column_hit);
    }

  }


}


setInterval(transform , 1);

function get_col_width(){
  return document.querySelector(".sample-width").offsetWidth;
}


function playSound(sound){
  const synth = new Tone.Synth().toMaster();

  if (sound == "a"){
    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease('D2', '8n');
  }
  else if (sound == "b"){
    synth.triggerAttackRelease("B3", "8n");
  }
  else if (sound == "c"){
    synth.triggerAttackRelease("A3", "8n");
  }
  else if (sound == "d"){
    synth.triggerAttackRelease("C3", "8n");
  }
}

function addAnimation(box_id, column_hit){
  // Animate first box
  const box = document.getElementById(`box${box_id}`);
  box.classList.add('active');

  setTimeout(function(){ box.classList.remove('active'); }, 250);

  const btn = document.getElementById(`${box_id}${column_hit}`).children[0];
  btn.classList.add('active');

  setTimeout(function(){ btn.classList.remove('active'); }, 250);

}
