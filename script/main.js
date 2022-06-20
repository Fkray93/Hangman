//Declared variables
var timer = 120;
var attempts = 5;
var totalPoints = 0;
var totalCorrectAnswers = 0;
var errorsArray = [];
var chosenDifficulty = 0;


//fetching elements from HTML
var playBtn = document.getElementById("play");
var difficultyChecked = document.querySelector('input[name="difficulty"]:checked');
var difficulty = document.querySelectorAll('input[name="difficulty"]');

var introPanel = document.getElementById("introPanel");
var inGamePanel = document.getElementById("inGamePanel");

var letterCheckContainer = document.getElementById("letterCheckContainer");
var letterInput = document.getElementById("LetterInput");
var timerContainer = document.getElementById("timer");
var triesLeftSpan = document.getElementById("triesLeft");
var totalPointsContainer = document.getElementById("totalPoints");
var success = document.getElementById("success");
var successRecipeContainer = document.getElementById("successRecipeContainer");
var errors = document.getElementById("totalErrors");

var difficultyArray = [0, 1, 2];
for (i = 0; i < difficultyArray.length; i++) {
    difficulty[i].addEventListener('click', function () {
        chosenDifficulty = this.value;
        if (this.value == 0) {
            timer = 120;
        } else if (this.value == 1) {
            timer = 60;
        } else if (this.value == 2) {
            timer = 45;
        } else {
            timer = 120;
        }
    });
}
playBtn.addEventListener('click', function () {

    introPanel.style.display = "none";
    inGamePanel.style.display = "flex";

    //start timer
    var timerActive = setInterval(function () {
        if (timer <= 0) {
            if (confirm("Better luck next time :( wanna try again?")) {
                location.reload();
            }
            clearInterval(timerActive);
        }
        timerContainer.innerText = timer;
        timer -= 1;

        if (attempts <= 0) {
            clearInterval(timerActive);
        }
    }, 1000);


    //main game
    totalPointsContainer.innerText = totalPoints;
    triesLeftSpan.innerText = attempts;
    //svg parts
    let svgHead = document.getElementById("head");
    let svgBody = document.getElementById("body");
    let svgArms = document.getElementById("arms");
    let svgLegs = document.getElementById("legs");
    let svgScaffold = document.getElementById("scaffold");
    var partsArr = [svgHead, svgBody, svgArms, svgLegs, svgScaffold];
    var checkedParts = -1;

    var words = ["baklawa", "upsidedown cake", "picarones", "gelato", "mochi", "brigadeiros", "belgian waffle", "lamingtons", "skyr", "prinsesstarta", "koeksisters"];
    var recepies = ["https://mykitchenstories.se/baklava/",
        "https://www.bbcgoodfood.com/recipes/pineapple-upsidedown-cake",
        "https://perudelights.com/picarones-peruvian-doughnuts-bunuelos-or-beignets-are-one-of-a-kind/",
        "https://www.koket.se/grundrecept-pa-gelato",
        "https://www.japancentre.com/sv/recipes/386-mochi-med-jordgubb-och-sota-azukibonor-ichigo-daifuku",
        "https://zeinaskitchen.se/brigadeiros/",
        "https://thesaltymarshmallow.com/homemade-belgian-waffle-recipe/",
        "https://www.recipetineats.com/classic-lamingtons/",
        "https://www.foodiewithfamily.com/icelandic-yogurt/",
        "https://www.ica.se/recept/prinsesstarta-med-hallonsylt-526115/",
        "https://www.koket.se/marcus_samuelsson/kakor_och_tartor/mjol/marcus_samulesons_koesisters"
    ];
    var random = Math.floor(Math.random() * words.length);
    var chosenWord = words[random];

    var lettersAmount = chosenWord.split('');

    //display letter inputs inside of html
    for (i = 0; i < lettersAmount.length; i++) {

        //create new check letter boxes for every chosen word
        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.disabled = true;
        //newInput.value = lettersAmount[i];
        if (lettersAmount[i].valueOf() == " ") {
            newInput.style.backgroundColor = "transparent";
            newInput.style.border = 0;
            totalCorrectAnswers++;
        }
        letterCheckContainer.appendChild(newInput);
    }
    console.log(lettersAmount)

    //check letter 
    letterInput.addEventListener('change', function () {

        var checkIfExist = lettersAmount.includes(letterInput.value);

        if (attempts <= 0) {
            if (confirm("Better luck next time :( wanna try again?")) {
                location.reload();
            }
            attempts = 0;
        } else {

            if (checkIfExist) {
                for (i = 0; i < lettersAmount.length; i++) {
                    if (letterInput.value == lettersAmount[i].valueOf()) {
                        if (letterCheckContainer.children[i].value == "") {
                            //If the letter exisit then give points in accordance with timer
                            if (chosenDifficulty == 0) {
                                if (timer >= 100 && timer <= 120) {
                                    totalPoints += 5;
                                } else if (timer >= 60 && timer < 100) {
                                    totalPoints += 4;
                                } else if (timer >= 30 && timer < 60) {
                                    totalPoints += 3;
                                } else if (timer >= 20 && timer < 30) {
                                    totalPoints += 2;
                                } else if (timer >= 10 && timer < 20) {
                                    totalPoints += 1;
                                }
                            } else if (chosenDifficulty == 1) {
                                if (timer >= 50 && timer <= 60) {
                                    totalPoints += 5;
                                } else if (timer >= 40 && timer < 50) {
                                    totalPoints += 4;
                                } else if (timer >= 30 && timer < 40) {
                                    totalPoints += 3;
                                } else if (timer >= 20 && timer < 30) {
                                    totalPoints += 2;
                                } else if (timer >= 0 && timer < 20) {
                                    totalPoints += 1;
                                }
                            } else {
                                if (timer >= 35 && timer <= 45) {
                                    totalPoints += 5;
                                } else if (timer >= 25 && timer < 35) {
                                    totalPoints += 4;
                                } else if (timer >= 15 && timer < 25) {
                                    totalPoints += 3;
                                } else if (timer >= 0 && timer < 15) {
                                    totalPoints += 2;
                                }
                            }
                            totalPointsContainer.innerText = totalPoints;

                            letterCheckContainer.children[i].value = letterInput.value;

                            totalCorrectAnswers++;
                        }
                    }

                }

            } else {
                //When attempts = 0 give following statement
                if (attempts <= 1) {
                    triesLeftSpan.innerText = 0;
                    setTimeout(function () {
                        if (confirm("Better luck next time :( wanna try again?")) {
                            location.reload();
                        }
                    }, 20);
                    attempts = 0;
                } else { //if attemps is not 0 then for every mistake remove -1 from attempt amount
                    var checkIfErrorExist = errorsArray.includes(letterInput.value);
                    if (!checkIfErrorExist) {
                        attempts--;
                        triesLeftSpan.innerText = attempts;
                        checkedParts++;
                        partsArr[checkedParts].style.display = "block";
                        errors.innerText = errors.innerText + " " + letterInput.value;
                        errorsArray.push(letterInput.value);
                    }
                }
            }

            letterInput.value = "";

        } //If the input of totalCorrectAnswers equals chosenWord (the random word) then it´s a win
        if (totalCorrectAnswers == chosenWord.length) {
            clearInterval(timerActive);
            success.style.display = "flex";
            for (i = 0; i < chosenWord.length; i++) {
                var recipeIndex = words.indexOf(chosenWord);

                //when the user wins show matching recipe
                successRecipeContainer.href = recepies[recipeIndex];
            }
        }
    });








});