const history = document.getElementById('history');
const input = document.getElementById('input');
const cursor = document.getElementById('cursor');

function focusAndMoveCursorToTheEnd(e) {  
  input.focus();
  
  const range = document.createRange();
  const selection = window.getSelection();
  const { childNodes } = input;
  const lastChildNode = childNodes && childNodes.length - 1;
  
  range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}

function handleCommand(command) {
  const line = document.createElement('DIV');
  var response = document.createElement("div");
  line.innerHTML = `<span style="color: #86e033;">guest@thestrange300.github.io</span>:<span style="color: #7db8f5;">~</span>$  ${ command }`;
  response.innerHTML = line.innerHTML + "<br>" +" "+displayResponse(command);

  if (command=='') {
    history.appendChild(line);
  }
  else{
    history.appendChild(response);
  }
}

function displayResponse(message) {
  var response = document.createElement("div");
  response.innerHTML = message + " juga";
  var keywordResponses = {
    "experience":
    "└───Experience <br>&emsp; ├───Staff of Media and Information at Student Body of Airlangga University <br>&emsp; ├───Head of Artistic Departement at LPM FORMAT FST Unair <br>&emsp; └───Human Resource Staff at Airlangga Orchestra",
    "apa kabar?": "Baik-baik saja, terima kasih sudah bertanya. Bagaimana dengan Anda?",
    "Selamat pagi": "Selamat pagi juga!",
    "Terima kasih": "Sama-sama!",
    "Tchau": "Sampai jumpa lagi!"
  };
  
  switch (message) {
    case "experience":
    case "apa kabar?":
    case "Selamat pagi":
    case "Terima kasih":
    case "Tchau":
      response.innerHTML = keywordResponses[message];
      break;
    default:
      response.innerHTML = "Sorry, keyword not match";
  }
  return response.innerHTML;
}

function detectdict(response){
  var response = document.createElement("div");
  
}

document.addEventListener('selectionchange', () => {
  if (document.activeElement.id !== 'input') return;
  
  const range = window.getSelection().getRangeAt(0);
  const start = range.startOffset;
  const end = range.endOffset;
  const length = input.textContent.length;
  
  if (end < length) {
    input.classList.add('noCaret');
  } else {
    input.classList.remove('noCaret');
  }
});

input.addEventListener('input', () => {    
  // If we paste HTML, format it as plain text and break it up
  // input individual lines/commands:
  if (input.childElementCount > 0) {
    const lines = input.innerText.replace(/\n$/, '').split('\n');
    const lastLine = lines[lines.length - 1];
    
    for (let i = 0; i <= lines.length - 2; ++i) {
      handleCommand(lines[i]);
    }
  
    input.textContent = lastLine;

    
    focusAndMoveCursorToTheEnd();
  }
  
  // If we delete everything, display the square caret again:
  if (input.innerText.length === 0) {
    input.classList.remove('noCaret');  
  }  
});

document.addEventListener('keydown', (e) => {   
  // If some key is pressed outside the input, focus it and move the cursor
  // to the end:
  if (e.target !== input) focusAndMoveCursorToTheEnd();
});

const inputcontent = [];
let index = inputcontent.length - 1;

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    console.log(inputcontent);
    input.textContent = inputcontent[index];
    focusAndMoveCursorToTheEnd();
    index--;
    if (index < 0) {
      index = 0;
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowDown") {
    console.log(inputcontent);
    input.textContent = inputcontent[index];
    focusAndMoveCursorToTheEnd();
    index++;
    if (index > inputcontent.length-1) {
      index = inputcontent.length-1;
    }
  }
});

input.addEventListener('keydown', (e) => {    
  if (e.key === 'Enter') {
    e.preventDefault();
    
    inputcontent.push(input.textContent);
    handleCommand(input.textContent);    
    input.textContent = '';
    index = inputcontent.length - 1;
    focusAndMoveCursorToTheEnd();
  }
});

// Set the focus to the input so that you can start typing straigh away:
input.focus();

const starting = document.getElementById('starting');
const dots = [".", "..", "..."];
let indexanim = 0;
let hide = document.getElementById('hiding');
window.onload = animatetext();

function animatetext() {
  addDot();
  setTimeout(removeText, 3000);
  
}

function addDot() {
  if (indexanim === 3) {
    indexanim = 0;
  }
  starting.innerHTML = "starting" + dots[indexanim];
  indexanim++;
  addot = setTimeout(addDot, 500);
}

function removeText() {
  starting.innerHTML = "";
  clearTimeout(addot);
  hide.style.display="block";
  focusAndMoveCursorToTheEnd();
}