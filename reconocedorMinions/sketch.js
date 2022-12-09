  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = './model/';
  let texto = ""
  // Video
  let video;
  let flippedVideo;
  let pikachu
  let camara
  let tata
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    pikachu = loadImage("./images/minion.jpg")
    camara = loadImage("./images/gato.jfif")
    tata = loadImage("./images/santa.jfif")
  }

  function setup() {
    createCanvas(640, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
    if (label=== "Pikachu") {
      texto = "⚡⚡⚡⚡⚡⚡"
      image(pikachu,321,0,320,240)
    } else if (label === "Camara") {
      texto = "📷📷📷📷📷"
      image(camara,321,0,320,240)
    } else if (label === "Osito") {
      texto = "🧸🧸🧸🧸🧸🧸🧸"
      image(tata,321,0,320,240)
    }
    textAlign(CENTER,CENTER)
    text(texto,width/2, height/2)

  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }