const options_container = document.querySelector(".options-container");
const playhead = document.querySelector(".playhead");

options_container.addEventListener('click', alter_options);

let current_translate = 0;


let selected = [[1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

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
    element.className = "fas fa-drum ";
    selected[row-1][column-1] = 1;
  }
  else if (row == 2){
    element.className = "fas fa-cube ";
    selected[row-1][column-1] = 1;
  }
  else{
    element.className = "fab fa-gg-circle ";
    selected[row-1][column-1] = 1;
  }
  console.log(selected)
}

function transform(){
  const col_width = get_col_width();

  current_translate = current_translate + 1;

  if (current_translate > col_width*6){
    current_translate = 0;
  }

  playhead.style.transform = `translate3d(${current_translate}px, 0px, 0px)`;

  // Handle play music cases
  if ((current_translate + col_width/2) % col_width == 0 && current_translate != 0){
    const column_hit = (current_translate + col_width/2) / col_width;
    // create sound

    if (selected[0][column_hit-1] == 1){
      playSound("a");
    }
    if (selected[1][column_hit-1] == 1){
      playSound("b");
    }
    if (selected[2][column_hit-1] == 1){
      playSound("c");
    }

    // playSound();
  }


}


setInterval(transform , 5)

function get_col_width(){
  return document.getElementById("sample-width").offsetWidth;
}


// Loop JS intro

// let loopBeat;

// let bassSynth;

// function setup(){

//   bassSynth = new Tone.MembraneSynth().toMaster();

//   loopBeat = new Tone.Loop(song, '4n');
//   Tone.Transport.start();
//   loopBear.start(0);
// }

// function song(time){
//   triggerAttackRelease('cl', '8n', time)
//   console.log(time)
// }

//create a synth and connect it to the master output (your speakers)
// const synth = new Tone.Synth().toMaster();

// //play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

function playSound(sound){
  const synth = new Tone.Synth().toMaster();

  if (sound == "a"){
    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease('E3', '8n');
  }
  else if (sound == "b"){
    synth.triggerAttackRelease("E4", "8n");
  }
  else if (sound == "c"){
    synth.triggerAttackRelease("D3", "8n");
  }

}


// const synth = new Tone.Synth().toMaster();
// //play a note every quarter-note
// const loop = new Tone.Loop(time => {
// 	synth.triggerAttackRelease("C2", "8n", time);
// }, "4n");


// loop.start("0m").stop("4m");

// Tone.Transport.start();