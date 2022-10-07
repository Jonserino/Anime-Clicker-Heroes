var monster_EL = document.querySelector("#monsters");
var gold_EL = document.querySelector("#gold");

var cat_Knight_EL = document.querySelector("#catKnight");
var cat_Knight_Num_EL = document.querySelector("#catKnightNum");
var hire_Cat_Knight_EL = document.querySelector("#catKnightCost");

var archer_EL = document.querySelector("#archer");
var archer_Num_EL = document.querySelector("#archerNum");
var hire_Archer_EL = document.querySelector("#archerCost");

var container_EL = document.querySelector("#container");
var money_EL = document.querySelector("#money");
var heroes_EL = document.querySelector("#heroesID");
var images_EL = document.querySelector("#images");


let health = document.getElementById("health");

function random(max){
    return Math.floor(Math.random() * max);
}


var gold = 0;
var drop = 6;
var hp = 12;
var maxHp = 12;

var archers = 0;
var archerSeconds = 2000;
var hireArcher = 36;
var archerAtk = 6;

var catKnights = 0;
var catKnightSeconds = 1000;
var hireCatKnight = 24;
var catKnightAtk = 4;

function slimes(){
    monster_EL.src="Pictures/Monsters/slimeMonster.png";
    drop = 6;
    maxHp = 12;
    hp = 12;
}

function boars(){
    monster_EL.src="Pictures/Monsters/boarMonster.png";
    drop = 8;
    maxHp = 24;
    hp = 24;
}

console.log(gold_EL);
console.log(hp);
console.log(random(2));

function spawn(){
    die()
    if (monster_EL.style.visibility="hidden"){
        monster_EL.style.visibility="visible";
    }
    if (health.value <= 0){
        console.log(random(2));
        if (random(2) == 0) {
            boars();
        }
        if (random(2) == 1) {
            slimes();
        }
        health.value += hp;
        health.max = maxHp;
    }
}

function monsterClick(){
    console.log(health.value);
    health.value -= 1;
}

function catKnightAtks(){
    console.log(health.value);
    health.value -= catKnightAtk;
    console.log(catKnightAtk);
}

function archerAtks(){
    console.log(health.value);
    health.value -= archerAtk;
    console.log(archerAtk);
}

function die(){
    if (health.value <= 0){
        console.log("monster dead");
        monster_EL.style.visibility="hidden";
        console.log("monster gone");
        gold += drop;
    } else {
        monster_EL.style.visibility="visible";
    }
}

function hireCatKnights(){
    if (gold >= hireCatKnight){
        catKnights++;
        cat_Knight_Num_EL.innerHTML = "Level: " + catKnights;
        gold -= hireCatKnight;
        catKnightSeconds -= 10;
        catKnightTimer = setInterval(myTimerCatKnight, catKnightSeconds);
        hireCatKnight = Math.round(hireCatKnight * 1.30);
        hire_Cat_Knight_EL.innerHTML = "Upgrade: " + hireCatKnight + " Gold";
        if (catKnights >= 2){
            catKnightAtk = Math.round(catKnightAtk * 1.40);
        }    
    }
}

function hireArchers(){
    if (gold >= hireArcher){
        archers++;
        archer_Num_EL.innerHTML = "Level: " + archers;
        gold -= hireArcher;
        archerSeconds -= 10;
        archerTimer = setInterval(myTimerArcher, archerSeconds);
        hireArcher = Math.round(hireArcher * 1.30);
        hire_Archer_EL.innerHTML = "Upgrade: " + hireArcher + " Gold";
        if (archers >= 2){
            archerAtk = Math.round(archerAtk * 1.40);
        }    
    }
}


monster_EL.addEventListener("click", monsterClick); // Når vi klikker på monster
cat_Knight_EL.addEventListener("click", hireCatKnights);
archer_EL.addEventListener("click", hireArchers);

var catKnightTimer = setInterval(myTimerCatKnight, catKnightSeconds); // Kjører funksjonen mytimer 1 gang i sekundet
var archerTimer = setInterval(myTimerArcher, archerSeconds); // Kjører funksjonen mytimer 1 gang i sekundet
var spawn_check = setInterval(spawn, 10)

function myTimerCatKnight(){
    if (catKnights >= 1){
        catKnightAtks();
    }
    gold_EL.innerHTML = gold;
}
function myTimerArcher(){
    if (archers >= 1){
        archerAtks();
    }
    gold_EL.innerHTMl = gold;
}