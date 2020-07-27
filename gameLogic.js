class Card {
    constructor() {
        this.suit = "";
        this.visVal = "";
        this.intVal = "";
        this.value();
    }

    value() {
        if (this.suit === "Hearts") {
            if (this.visVal === 13) {
                this.intVal = -2;
            } else {
                this.intVal = this.visVal;
            }
        } else if (this.suit === "Diamonds") {
            if (this.visVal === 13) {
                this.intVal = -2;
            } else {
                this.intVal = this.visVal;
            }
        } else {
            this.intVal = this.visVal;
        }
    }
}

class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle();
        this.deal();
    }

    reset() {
        this.deck = [];

        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const visVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,];

        for (let suit in suits) {
            for (let value in visVal) {
                var card = new Card();
                card.suit = suits[suit];
                card.visVal = visVal[value];
                card.value();
                this.deck.push(card);
            }
        }
    }

    shuffle() {
        const { deck } = this;
        let m = deck.length, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }

        return this;
    }

    deal() {
        return this.deck.pop();
    }
}

const deck1 = new Deck();
deck1.reset();
deck1.shuffle();

var playerOneHand = [];

var playerTwoHand = [];

var trashPile = [];

var takenCard = [];

var players = [playerOneHand, playerTwoHand];


// score hands
function countHand(hand) {
    var totalScore = 0;

    hand.forEach(card => {
        if (typeof(card) !== "object") {
            totalScore = totalScore + 0;  
            
        } else {
            totalScore = totalScore + card.intVal;    
        }
        
    });

    document.getElementById('scoring').innerHTML = `${totalScore}`
}

// change card images

function alterHandImage(hand, discard) {
    hand.forEach(card => {
        if (card === "") {
            document.getElementById(`card${hand.indexOf(card) + 1}img`).style.display = "none";
            document.getElementById(`card${hand.indexOf(card) + 1}num`).style.display = "none";
        } else {
            document.getElementById(`card${hand.indexOf(card) + 1}img`).src = `images/${card.suit}.png`;
            document.getElementById(`card${hand.indexOf(card) + 1}num`).innerHTML = card.visVal;
        }
    });

    var topTrash = discard[discard.length - 1];

    if (discard[0]) {
        document.getElementById(`cardDiscardImg`).src = `images/${topTrash.suit}.png`;
        document.getElementById(`cardDiscardNum`).innerHTML = topTrash.visVal;
    }
}


// deal hands
function dealCards(players) {

    players.forEach(playerHand => {
        for (let index = 0; index < 4; index++) {
            if (playerHand.length < 4) {
                playerHand.push(deck1.deal());
            }
        }
    });



    alterHandImage(players[0], trashPile);
}

// slap the card

function slap(hand, discard) {


    var slappable = parseInt("");
    hand.forEach(card => {
        if (card.visVal === discard[discard.length - 1].visVal) {
            slappable = hand.indexOf(card);
            discard.push(hand[slappable]);
            hand.splice(slappable, 1, '');

            console.log(hand);
        } else {
            document.getElementById(`cardSlot${hand.indexOf(card) + 1}`).style.backgroundColor = "white";
        }

        

    });


    alterHandImage(hand, discard);
    
    console.log(hand);
    console.log(discard);
    
}


// check to see if slap is possible

// function slapCheck(hand, discard) {
//     var slappable = parseInt("");
//     hand.forEach(card => {
//         if (card.visVal === discard[discard.length - 1].visVal) {
//             document.getElementById(`cardSlot${hand.indexOf(card) + 1}`).style.backgroundColor = "lightgray";
//             slappable = hand.indexOf(card);
//         } else {
//             document.getElementById(`cardSlot${hand.indexOf(card) + 1}`).style.backgroundColor = "white";
//         }

//     });

//     return slappable;
// }

// take card from pile
function takeCardPile(playerHand) {

    takenCard.push(deck1.deal());

    if (confirm(`Do you want the ${takenCard[0].visVal} of ${takenCard[0].suit}?`) === true) {
        // logic for determining empty Spaces.

        // var emptySpaces = [];
        // playerHand.forEach(card => {
        //     if (card == '') {
        //         emptySpaces.push(indexOf(card)+1);
        //     }
        // });

        //  You cannot chose: ${emptySpaces}.
        var choice = prompt(`Which card do you want to switch with? [clockwise from top left]`)

        if (parseInt(choice) === 1) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }

        } else if (parseInt(choice) === 2) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }
        } else if (parseInt(choice) === 3) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }


        } else if (parseInt(choice) === 4) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }

        } else {
            alert('ur an idiot');
        }

    } else {
        trashPile.push(takenCard[0]);
        takenCard.pop();
    }
    alterHandImage(playerHand, trashPile);

    console.log(playerHand);
}

function takeDiscard(playerHand, discard) {

    takenCard.push(discard[discard.length - 1]);

    if (confirm(`Do you want the ${takenCard[0].visVal} of ${takenCard[0].suit}?`) === true) {
        // logic for determining empty Spaces.

        // var emptySpaces = [];
        // playerHand.forEach(card => {
        //     if (card == '') {
        //         emptySpaces.push(indexOf(card)+1);
        //     }
        // });

        //  You cannot chose: ${emptySpaces}.
        var choice = prompt(`Which card do you want to switch with? [clockwise from top left]`)

        if (parseInt(choice) === 1) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }

        } else if (parseInt(choice) === 2) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }
        } else if (parseInt(choice) === 3) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }


        } else if (parseInt(choice) === 4) {
            if (playerHand[parseInt(choice)-1] !== "") {
                trashPile.push(playerHand[parseInt(choice)-1]);
                playerHand[parseInt(choice)-1] = takenCard[0];
                takenCard.pop();
            } else {
                alert('No card there. Try again.');
            }

        } else {
            alert('ur an idiot');
        }

    } else {
        trashPile.push(takenCard[0]);
        takenCard.pop();
    }
    alterHandImage(playerHand, discard);

    console.log(playerHand);
}



