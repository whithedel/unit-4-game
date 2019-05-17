//Changing names variables
// HealthPoints = health activeplayer activeplayer activeplayer
// AttackPower=damage
// CounterAttackPower=counterDamage


//main varaibles for my game
var userPlayer;
var compPlayer;
var allPlayersArr = [];
var userPlayerCombat = false;
var compPlayerCombat = false;
var startingDamage = 0;

/* <script>
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

Person.prototype.nationality = "English";

var myFather = new Person("John", "Doe", 50, "blue");
document.getElementById("demo").innerHTML =
"The nationality of my father is " + myFather.nationality; 
</script> */

//main player object
function allPlayer(name,health,damage,counterDamage,picture) {
    this.name = name;
    this.health = health;
    this.damage = damage;
    this.counterDamage = counterDamage;
    this.picture = picture;
};

//The JavaScript prototype property also 
//allows you to add new methods to objects constructors.
//function to upgrade characters damages
allPlayer.prototype.increaseDamage = function(){
    this.damage += startingDamage;
};

//to create damages
allPlayer.prototype.createDamage = function(activePlayer){
    var actionArr = ['You punched','You kicked','You upper cut','You head locked','You tickled','You farted on','You LMAO'];
    var randomActionArr = function(actionArr){
        return actionArr[Math.floor(Math.random()*actionArr.length)];
    };
    activePlayer.health -= this.damage;
    console.log("DAMAGED")

    $('audio#attackAudio')[0].play();
    $('#messageDescription').html(randomActionArr(actionArr)+' '+activePlayer.name+' '+'for'+' '+this.damage+' '+'damage points.');
    this.increaseDamage();
};

//to create counter damages
allPlayer.prototype.createCounterDamage = function(activePlayer){
    var actionArr = ['You punched','You kicked','You upper cut','You head locked','You tickled','You farted on','You LMAO'];
    var randomActionArr = function(actionArr){
        return actionArr[Math.floor(Math.random()*actionArr.length)];
    };
    
    activePlayer.health -= this.counterDamage;
    $('#messageDescription').append('<br>'+' '+this.name+' '+randomActionArr(actionArr)+' '+this.counterDamage+' '+'damage points');   
}


//var myFather = new Person("John", "Doe", 50, "blue");
//creates all playerscards
//Math.floor(Math.random() * 10) + 1) returns a random integer between 1 and 10 
function startingPlayer() {
    var mario = new allPlayer('Mario Mario', Math.floor(Math.random() * 100) + 130, Math.floor(Math.random() * 40) + 10, Math.floor(Math.random() * 28) + 8, "./assets/images/MarioNSMBUDeluxe.png");

    var luigi = new allPlayer('Luigi Mario', Math.floor(Math.random() * 100) + 130, Math.floor(Math.random() * 40) + 10, Math.floor(Math.random() * 28) + 8, "./assets/images/LuigiNSMBW.png");

    var princessPeach = new allPlayer('Princess Peach', Math.floor(Math.random() * 100) + 130, Math.floor(Math.random() * 40) + 10, Math.floor(Math.random() * 28) + 8, "./assets/images/Peach_(Super_Mario_3D_World).png");

    var toad = new allPlayer('Toad', Math.floor(Math.random() * 100) + 130, Math.floor(Math.random() * 40) + 10, Math.floor(Math.random() * 28) + 8, "./assets/images/Toad_3D_Land.png");

    var daisy = new allPlayer('Princess Daisy', Math.floor(Math.random() * 100) + 130, Math.floor(Math.random() * 40) + 10, Math.floor(Math.random() * 28) + 8, "./assets/images/Daisy_(Super_Mario_Party).png");

    var browser = new allPlayer('Browser', Math.floor(Math.random() * 100) + 130, Math.floor(Math.random() * 40) + 10, Math.floor(Math.random() * 28) + 8, "./assets/images/BowserNSMBUD.png");

    var yoshi = new allPlayer('Yoshi', Math.floor(Math.random() * 100) + 130, Math.floor(Math.random() * 40) + 10, Math.floor(Math.random() * 28) + 8, "./assets/images/YoshiMarioParty10.png");

    allPlayersArr.push(mario, luigi, princessPeach, toad, daisy, browser, yoshi);
};

//storing the original damage value
function originalStartingDamage(activePlayer) {
    startingDamage = activePlayer.damage;
};

//funtion to see if player is alive
function isAlive(activePlayer) {
    if (activePlayer.health > 0) {
        return true;
    }
     return false ;
};

//function to check if the userPlayer has won 
function hasWon() {
    if (allPlayersArr.length === 0 && userPlayer.health > 0 && ($('#compPlayerRemainderDiv').is(':empty'))) {
        $('audio#youWinAudio')[0].play();
        return true;
    }
    
    else return false;    
}


//Given a jQuery object that represents a set of DOM elements, the .children() method allows us to search through the children of these elements in the DOM tree and construct a new jQuery object from the matching elements. The .children() method differs from .find() in that .children() only travels a single level down the DOM tree while .find() can traverse down multiple levels to select descendant elements (grandchildren, etc.) as well. Note also that like most jQuery methods, .children() does not return text nodes; to get all children including text and comment nodes, use .contents().

//function to create selection of userPlayer and compPlayer

function allPlayerCards(selectionID) {
    //Similar to .empty(), the .remove() method takes elements out of the DOM. Use .remove() when you want to remove the element itself, as well as everything inside it. In addition to the elements themselves, all bound events and jQuery data associated with the elements are removed. To remove the elements without removing data and events, use .detach() instead.

    //.card-img-top places an image to the top of the card. With .card-text, text can be added to the card. Text within .card-text can also be styled with the standard HTML tags.

    //Image thumbnails
    //In addition to our border-radius utilities, you can use .img-thumbnail to give an image a rounded 1px border appearance.

    // $(selectionID).children().remove();
    for (var i = 0; i < allPlayersArr.length; i++) {
        $(selectionID).append("<div />");
        $(selectionID + " div:last-child").addClass("card");
        $(selectionID + " div:last-child").append("<img style='background-color: rgb(117,249,240,0.800);' />");
        $(selectionID + " img:last-child").attr("id", allPlayersArr[i].name);
        $(selectionID + " img:last-child").attr("class", "card-img-top");
        $(selectionID + " img:last-child").attr("src", allPlayersArr[i].picture);
        $(selectionID + " img:last-child").attr("width", 150);
        $(selectionID + " img:last-child").addClass("img-thumbnail");
        $(selectionID + " div:last-child").append(allPlayersArr[i].name + "<br>");
        $(selectionID + " div:last-child").append("HP: " + allPlayersArr[i].health);
        $(selectionID + " idv:last-child").append();

    }
}

// funnction to update the location of the userPlayer and compPlayer 
function updatePics(fromselectionID, toselectionID) {
    $(fromselectionID).children().remove();
    for (var i = 0; i < allPlayersArr.length; i++) {
        $(toselectionID).append("<img />");
        $(toselectionID + " img:last-child").attr("id", allPlayersArr[i].name);
        $(toselectionID + " img:last-child").attr("src", allPlayersArr[i].picture);
        $(toselectionID + " img:last-child").attr("width", 150);
        $(toselectionID + " img:last-child").addClass("img-thumbnail");
    }
}




// var audio = new Audio("./assets/media/mario-theme-song.mp3");
// var gameStartAudio = new Audio('./assets/media/start_the_game.mp3');
// var youLoseAudio = new Audio('./assets/media/you_lose.mp3');
// var youWinAudio = new Audio('./assets/media/you_win.mp3');
// var beatCardAudio = new Audio('./assets/media/beat_card.mp3');
// var attackAudio = new Audio('./assets/media/attack.mp3');
// plays audio file (.mp3)
// function playAudio() {
//     audio.volume = 0.2;
//     audio.play();
// }






//$(document).on('click','.btn-edit',function()
//This binds a click event to the document and all child elements within it. This method is referred to as delegated event handling.

//$('#table-user').on('click','.btn-edit',function()
//binds the click event to the #table-user directly. captures the event directly on the element.



$(document).on("click", "img", function () {
    // Stores the comPlayer the user has clicked on in the comPlayer variable and removes it from the allPlayersArr
    if (userPlayerCombat && !compPlayerCombat && (this.id != userPlayer.name)) {
        // Access the property on the element directly:
        // this.id
        // Access it from the jQuery object:
        // $(this).attr("id")
        // Pull the object out of jQuery:
        // $(this).get(0).id; Or $(this)[0].id

        for (var j = 0; j < allPlayersArr.length; j++) {
            if (allPlayersArr[j].name == (this).id) {
                compPlayer = allPlayersArr[j]; 
                //The splice() method adds/removes items to/from an array, and returns the removed item(s).
                $('audio#gameStartAudio')[0].play();
                allPlayersArr.splice(j, 1);
                compPlayerCombat = true;
                $("#messageDescription").html("Click the button to attack your rival!");
            }
        }
        $("#compPlayerDiv").append(this); // appends the selected compPlayer to the div 
        $("#compPlayerDiv").addClass("animated zoomInRight");
        $("#compPlayerDiv").append("<br>" + compPlayer.name);
        $("#compPlayerHealthDiv").append("HP: " + compPlayer.health);
        $("#compPlayerHealthDiv").addClass("animated zoomInRight");
    }
    // Stores the userPlayer the user has clicked on in the userPlayer variable and removes it from allPlayersArr
    if (!userPlayerCombat) {
        for (var i = 0; i < allPlayersArr.length; i++) {
            if (allPlayersArr[i].name == (this).id) {
                userPlayer = allPlayersArr[i]; 
               $('audio#audio')[0].play();
                // playAudio(); // starts theme song
                originalStartingDamage(userPlayer);
                //The splice() method adds/removes items to/from an array, and returns the removed item(s).
                allPlayersArr.splice(i, 1);
                userPlayerCombat = true;
                $("#messageDescription").html("Pick an enemy to fight!");
            }
        }
        updatePics("#game", "#compPlayerRemainderDiv");
        $("#userPlayerDiv").append(this); // appends the selected userPlayer to the div
        $("#userPlayerDiv").addClass("animated zoomIn");
        $("#userPlayerDiv").append(userPlayer.name);
        $("#userPlayerHealthDiv").append("HP: " + userPlayer.health);
        $("#userPlayerHealthDiv").addClass("animated zoomIn");
    }

});


// funtion to be able to attack 
$(document).on("click", "#attackBtn", function () {
    if (userPlayerCombat && compPlayerCombat) {
        if (isAlive(userPlayer) && isAlive(compPlayer)) {
            userPlayer.createDamage(compPlayer);
            compPlayer.createCounterDamage(userPlayer);
            $("#userPlayerHealthDiv").html("HP: " + userPlayer.health);
            $("#compPlayerHealthDiv").html("HP: " + compPlayer.health);
            if (!isAlive(compPlayer)) {
                $('audio#beatCardAudio')[0].play();
                $('audio#audio')[0].pause();
                $("#compPlayerHealthDiv").html("Demolish hahaha!");
                $("#userPlayerHealthDiv").html("Rival has been defeated 😀 😁 😂!");
                $("#messageDescription").html("Pick another rival to fight...");
            }
            if (!isAlive(userPlayer)) {
                $("#userPlayerHealthDiv").html("You got Bullied 😪😭!");
                $("#messageDescription").html("Try again...");
                $("#attackBtn").html("Restart Game");
                $('audio#youLoseAudio')[0].play();
                $('audio#audio')[0].pause();
                //The reload() method is used to reload the current document. restarts game
                $(document).on("click", "#attackBtn", function () { 
                    location.reload();
                });
            }
        }
        //.children() method differs from .find() in that .children() only travels a single level down the DOM tree while .find() can traverse down multiple levels to select descendant elements (grandchildren, etc.) as well. Note also that like most jQuery methods, .children() does not return text nodes; to get all children including text and comment nodes, use .contents(). && ($('#compPlayerRemainderDiv').is(':empty'))
        if (!isAlive(compPlayer)) {
            $("#compPlayerDiv").removeClass("animated zoomInRight");
            $("#compPlayerHealthDiv").removeClass("animated zoomInRight");
            $("#compPlayerDiv").find().remove();
            $("#compPlayerDiv").html("");
            $("#compPlayerHealthDiv").html("");
            compPlayerCombat = false;
            if (hasWon()) {
                $("#messageDescription").html("You'ev completed the game please RESTART...");
                $("#userPlayerHealthDiv").html("Rival has been defeated 😀 😁 😂!");
                $("#compPlayerHealthDiv").html("Demolish hahaha!");
                $("#attackBtn").html("Restart Game");
                $(document).on('click', '#attackBtn', function(){
                    location.reload();
                });
            }
        }
        //write if compplayer is not alive and 
    }
});

// get the game started to be able to play.
$(document).ready(function () {
    startingPlayer();
    allPlayerCards("#game");
});


