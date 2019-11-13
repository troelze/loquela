const prompt = document.getElementById("prompt");
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");

let prompts = [];

fetch('lesson/1')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        //console.log(data);
        data.prompts.forEach(element => {
            prompts.push(element.text);
            console.log(prompts);
            startLesson();
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


let currentPrompt = {};
let acceptingAnswers = true;

let score = 0;
let promptCounter = 0;
let availablePrompts = [];

// // let prompts = [
//     {
//         prompt: "Como se llama?"   
//     },
//     {
//         prompt: "De donde eres?"
//     },
//     {
//         prompt: "Cuantos anos tienes?"
//     },
//     {
//         prompt: "Bienvenido"
//     }
// ]

//CONSTANTS
const MAX_PROMPTS = 4;


startLesson = () => {
    promptCounter = 0;
    availablePrompts = [ ...prompts];
    //console.log(availablePrompts);
    getNewPrompt();
};

getNewPrompt = () => {

    if(availablePrompts.length === 0 || promptCounter >= MAX_PROMPTS) {
        //go to end page
        return window.location.assign("/results")
    }

    promptCounter++;

    progressText.innerText = `Prompt ${promptCounter}/${MAX_PROMPTS}`;
    //update progress bar
    //console.log(promptCounter/MAX_PROMPTS);
    progressBarFull.style.width = `${(promptCounter/MAX_PROMPTS) * 100}%`;


    const promptIndex = Math.floor(Math.random() * availablePrompts.length);
        currentPrompt = availablePrompts[promptIndex];
        prompt.innerText = currentPrompt;

    availablePrompts.splice(promptIndex, 1); //get rid of used prompt
}


document.getElementById("next").addEventListener("click", getNewPrompt);




