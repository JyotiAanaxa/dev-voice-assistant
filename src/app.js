import { getWeather } from "./api";
import { wait, runAudio } from "./utils";
import VoiceAssistant from "./voiceAssistant";
import VoiceVisualizer from "./voiceVisualizer";

const startButton = document.getElementById("start-btn");
const restartBUtton = document.querySelector("#restart");

let isStarted = false;
let processingWord = null;

const voiceVisualizer = new VoiceVisualizer();
const voiceAssistant = new VoiceAssistant();

async function processWord(word) {
  switch (word) {
    case "Hello":
      voiceAssistant.saySpeech("Hello Islem, How are you doing today?");
      await wait(3000);
      break;
    case "Weather":
      const location = "London";
      const weather = await getWeather(location);
      voiceAssistant.saySpeech(
        `The weather for today in ${location} is ${weather} degrees`
      );
      await wait(3000);
      break;
    case "Good Morning":
      voiceAssistant.saySpeech(
        "Good Morning islem, Hope you slept well, for Today's schedule you have a meeting at 10am with you manager"
      );
      await wait(3000);
      break;
    case "Play a Song":
      voiceAssistant.saySpeech(
        "We are friends in a sleeping bag splitting the heat"
      );
      voiceAssistant.saySpeech(
        "We have one filthy pillow to share and your lips are in my hair"
      );
      voiceAssistant.saySpeech("Someone upstairs has a rat that we laughed at");
      await wait(3000);
      break;
  }

  processingWord = null;
}

function onListen(word) {
  if (processingWord) return;

  console.log("Word: ", word);
  processingWord = word;
  processWord(word);
}
let stop_, resume_;
startButton.onclick = async () => {
  console.log("====isStarted", isStarted);
  if (!isStarted) {
    //Start assistant
    startButton.innerText = "Starting...";

    // await voiceAssistant.startAssistant(onListen);
    await voiceVisualizer.startVisualization();
    isStarted = true;
    // start
    const { stop } = runAudio();
    stop_ = stop;
    // end
    startButton.innerText = "Stop Assistant";
  } else {
    if (typeof stop_ === "function") {
      stop_();
    }
    //Stop assistant
    startButton.innerText = "Stopping...";
    // await voiceAssistant.stopAssistant();
    // voiceVisualizer.stopVisualization();
    isStarted = false;
    startButton.innerText = "Start Assistant";
    // let unrec = saySpeech(
    //   "We welcome  , you on our , Manodyam's , holistic online  solution ,on Mental health wellness , powered by Artificial intelligence , & machine learning  Will like to know few important , things about , you followed by , a self Voassessment."
    // );
    // unrec;
    // const speech = new window.SpeechSynthesisUtterance(
    //   "We welcome  , you on our , Manodyam's , holistic online  solution ,on Mental health wellness , powered by Artificial intelligence , & machine learning  Will like to know few important , things about , you followed by , a self Voassessment."
    // );
    // window.speechSynthesis.speak(speech);
  }
};
console.log(`${restartBUtton}`);
document.querySelector("#restart").addEventListener("click", () => {
  console.log("clicked");
  runAudio();
  document.getElementById("id01").style.display = "none";
});

document.querySelector("#restart").addEventListener("click", () => {
  console.log("clicked");
  runAudio();
  document.getElementById("id01").style.display = "none";
});
