/*
Name : Satinder Singh
*/

/**
 * This is the load function where the js file starts when the page load for first time
 */
window.addEventListener("load", function() {
    let btn = document.getElementById("btn1"); // This Will grabs the play button
    let div = document.getElementById("div1"); // This Grab the container where we see three images of stone, paper and sessior after clicking on play button
    let btn1 = document.getElementById("btn2"); // This will grabs the help button
    let btn2 = document.getElementById("btn3"); // This will grabs the Play agian button
    let btn3 = document.getElementById("btn4"); // This will grabs the Back button which dispaly after clicking on help button
    let name = document.getElementById("name"); // This grabs the textbox where we write name of the user
    let div2 = document.getElementById("div2"); // This grabs the div where we put play again button
    let divForm = document.getElementById("form"); // This grabs that div where we write name and age of the player
    let div3 = document.getElementById("div3"); // This grabs that div where we want to play again!

    btn1.addEventListener("click", function() {
        //Play button perform the following
        div2.style.display = "block";
        divForm.style.display = "none";
    });


    btn3.addEventListener("click", function() {
        divForm.style.display = "block"; // Display the previous form
        div2.style.display = "none"; // Hide that container which is showing currently
    });

    btn.addEventListener("click", function() {
        let name = document.getElementById("name").value; //Grabs the value of name
        let age = document.getElementById("age").value; //Grabs the value of age
        if (name == "" || age == "") {
            alert("Name or age must be filled");
        } else if (!(isNaN(name))) {
            alert("Something Went wrong!");
        } else {
            div.style.display = "block";

            let div1 = document.getElementById("form"); // This grabs that div where we write name and age of the player
            div1.style.display = "none"; //This unhide the form div

            let imgRock = document.getElementById("rock"); //This grabs the img element which in this case is rock 
            imgRock.addEventListener("click", function() {
                rpsGameD(this); //Pass the properties of rock element into the function
            });

            let imgPaper = document.getElementById("paper"); //This grabs the img element which in this case is paper 
            imgPaper.addEventListener("click", function() {
                rpsGameD(this); //Pass the properties of paper element into the function
            })

            let imgSessior = document.getElementById("sessior"); //This grabs the img element which in this case is sessior 
            imgSessior.addEventListener("click", function() {
                rpsGameD(this); //Pass the properties of sessior element into the function
            })

            /**
             * This function will decide user wins,lost or tie against computer
             * 
             * @param {*event} event : This is the object that user choose. With that code will be able to get the id of particular object
             */
            function rpsGameD(event) {
                var humanChoice; // humanChocie means the choice that we pick
                var botChoice; // botChoice means ComputerChoice
                humanChoice = event.id; // Put that event id 

                /**
                 * botChoice have to pick randomnly numbers between 0 to 2 why 0 to 2 because in numberToChoice function we define an 
                 * array which contain only three elements
                 * This line first call randToRpsInt() function and return a number that pass as an argument for numberToChoice function
                 */
                botChoice = numberToChoice(randToRpsInt());

                results = decideWinner(humanChoice, botChoice);
                message = finalMessage(results);


                div3.style.display = "block"; // Dispaly that div

                rpsFrontEnd(humanChoice, botChoice, message);
            }


            /**
             * Puprpose: It generate the random number
             * return: An random number
             */
            function randToRpsInt() {
                /**
                 * Math floor means did not rounding the number like 0.9 will not become 1 it comes 0
                 * Math.random() always give 0. something so if we * with 3 then the number lies in 0.something to 2.something but 
                 * florr helps to print from 0 to 2 only
                 */
                return Math.floor(Math.random() * 3);
            }

            /**
             * Purpose: By this we know about  the choice of computer 
             * @param {*number} number  : // number means an index to choce a string in the following array
             * return: one string from array depend upon it's index
             */
            function numberToChoice(number) {
                return ["rock", "paper", "sessior"][number];
            }

            /**
             * Purpose: With the help of this we will know about the result of the game.
             * @param {*humanChoice} humanChoice : The object that user chosse
             * @param {*computerChoice} computerChoice : The object that computer chosse
             * return: An array which store the number for player 1 and computer depending upon thier choice
             */
            function decideWinner(humanChoice, computerChoice) {
                var rpsDataBase = {
                    'rock': { 'sessior': 1, 'rock': 0.5, 'paper': 0 },
                    'paper': { 'rock': 1, 'paper': 0.5, 'sessior': 0 },
                    'sessior': { 'paper': 1, 'sessior': 0.5, 'rock': 0 }
                }; // This is call a database in short but actuaaly it is a Dictorinary that contain another dictionery in it

                var yourScore = rpsDataBase[humanChoice][computerChoice]; // get the number for your Score first
                var computerScore = rpsDataBase[computerChoice][humanChoice]; // get the number for Computer Score
                return [yourScore, computerScore];
            }

            /**
             * Purpose: This will print the message on the scrren depending upon the parameters that pass
             * @param {*yourScore} yourScore : The value that user have by choosing the specific object
             * return: A message of win or loss or teid and their color acoording to yourScore value
             */
            function finalMessage([yourScore, computerScore]) {
                if (yourScore === 0) {
                    return { 'message': "You lost! ", 'color': "red" };
                } else if (yourScore === 0.5) {
                    return { 'message': "You Tied! ", 'color': "yellow" };
                } else {
                    return { 'message': "You Won! ", 'color': "green" };
                }

            }

            /**
             * Purpose: That function will appear the human choice image and bot image with the result message.
             * @param {*} humanImageChoice : contain id of the object that user choose
             * @param {*} botImageChoice : contain id of the object that computer choose
             * @param {*} finalMessage : message of result
             */
            function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {

                var imageDatabase = {
                    'rock': document.getElementById('rock').src,
                    'paper': document.getElementById('paper').src,
                    'sessior': document.getElementById('sessior').src
                }; //Image data base is a dictory which is set of key and values

                document.getElementById('rock').remove(); // Remove Rock   Image from the screen
                document.getElementById('paper').remove(); // Remove Paper  Image from the screen
                document.getElementById('sessior').remove(); // Remove Sesior Image from the screen

                var humanDiv = document.createElement('div'); //Create a new Div and store in a varaible
                var messageDiv = document.createElement('div'); //Create a new Div and store in a varaible
                var botDiv = document.createElement('div'); //Create a new Div and store in a varaible

                humanDiv.innerHTML = "<img src = '" + imageDatabase[humanImageChoice] + "' height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(37,50,223,1);'>";
                messageDiv.innerHTML = "<h1 style = 'color: " + finalMessage['color'] + "; font-size: 40px; padding: 30px; '>" + name + " " + finalMessage['message'] + "</h1>";
                botDiv.innerHTML = "<img src = '" + imageDatabase[botImageChoice] + "' height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";

                document.getElementById('flexboxID').appendChild(humanDiv); //That div which id is flexboxID now it contain a humanDiv
                document.getElementById('flexboxID').appendChild(messageDiv); //That div which id is flexboxID now it contain a messageDiv
                document.getElementById('flexboxID').appendChild(botDiv); //That div which id is flexboxID now it contain a botDiv
            }
        }
    })
});