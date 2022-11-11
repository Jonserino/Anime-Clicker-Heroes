// Henter info fra HTML om monster og gold
var monster_EL = document.querySelector("#monsters");
var gold_EL = document.querySelector("#gold");

// Skal følge musepekeren din så du kunne ha noe annet bak, men fant det ikke helt ut.
/* const cursorSmall = document.querySelector('.small');
const cursorBig = document.querySelector('.big');
const positionElement = (e)=> {
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    cursorSmall.style.transform = 'translate3d(${mouseX}px, ${mouseY}px, 0)';
    cursorBig.style.transform = 'translate3d(${mouseX}px, ${mouseY}px, 0)';
}

window.addEventListener('mousemove', positionElement); */

// Henter info fra HTML om catknight
var cat_Knight_EL = document.querySelector("#catKnight");
var cat_Knight_Num_EL = document.querySelector("#catKnightNum");
var hire_Cat_Knight_EL = document.querySelector("#catKnightCost");

// Henter info fra HTML om bueskytteren
var archer_EL = document.querySelector("#archer");
var archer_Num_EL = document.querySelector("#archerNum");
var hire_Archer_EL = document.querySelector("#archerCost");

// Henter forskjellig info fra HTML
var container_EL = document.querySelector("#container");
var money_EL = document.querySelector("#money");
var heroes_EL = document.querySelector("#heroesID");
var images_EL = document.querySelector("#images");

// Henter info om health fra HTML
let health = document.getElementById("health");

// Matte funksjoner for å ha en ranom sjanse for å spawne en boss etter at bossCountdown er på null eller hvilke av de to forskjellige monstrene skal spawne
function random(max){
    return Math.floor(Math.random() * max);
}
function bossChance(max){
    return Math.floor(Math.random() * max);
}

// Forskjellige variabler til info om stats
var gold = 0;
var drop = 6;
var hp = 12;
var maxHp = 12;

// Brukes til å vite når en boss skal ha sjansen til å spawne
let totalKills = 0;
let bossCountdown = 10;

// Skal vise hvor mange av de forskjellige monstrene du har drept
let slimesKilled = 0;
let boarsKilled = 0;
let orcsKilled = 0;

// Info om bueskytteren
var archers = 0;
var archerSeconds = 2000;
var hireArcher = 36;
var archerAtk = 6;

// Info om cat knighten
var catKnights = 0;
var catKnightSeconds = 1000;
var hireCatKnight = 24;
var catKnightAtk = 4;

 // Dette er animasjonen til når du skader monsteret
function damaged(){
    monster_EL.style.animation="damaged 0.1s linear";
    monster_EL.style.animationPlayState="playing";
}

// Dette er de forskjellige monstrene som du kan møte på
function slimes(){
    monster_EL.src="Pictures/Monsters/slimeMonster.png";
    monster_EL.style.opacity=0.9;
    drop = 6;
    maxHp = 12;
    hp = 12;
}

function orcs(){
    monster_EL.src="Pictures/Monsters/orcMonster.png";
    monster_EL.style.opacity=1;
    drop = 125;
    maxHp = 250;
    hp = 250;
}

function boars(){
    monster_EL.src="Pictures/Monsters/boarMonster.png";
    monster_EL.style.opacity=1;
    drop = 12;
    maxHp = 24;
    hp = 24;
}

// Dette er funksjonen til å spawne ett nytt monster etter du har drept det forrige
function spawn(){
    die()
    if (monster_EL.style.visibility="hidden"){
        monster_EL.style.visibility="visible";
    }
    if (health.value <= 0){
        spawnrate = random(2);
        console.log("Normal spawnrate: " + spawnrate);
        bossSpawnrate = bossChance(8);
        console.log("Boss Spawn Chance: " + bossSpawnrate);
        if (bossCountdown <= 0){
            if (bossSpawnrate <= 2){
                bossCountdown = 10; 
                orcs();
            }
        }
        else if (spawnrate == 0) {
            boars();
        }
        else if (spawnrate == 1) {
            slimes();
        }
        health.value += hp;
        health.max = maxHp;
    }
}

// Dette er de forskjellige angrepene
function monsterClick(){
    console.log(health.value);
    health.value -= 1;
    damaged();
}

function catKnightAtks(){
    console.log(health.value);
    health.value -= catKnightAtk;
    damaged();
}

function archerAtks(){
    console.log(health.value);
    health.value -= archerAtk;
    damaged();
}

// Dette er funksjonen til å drepe monsteret
function die(){
    if (health.value <= 0){
        console.log("monster dead");
        monster_EL.style.visibility="hidden";
        console.log("monster gone");
        gold += drop;
        totalKills++;
        console.log("Total kills: " + totalKills);
        bossCountdown--;
        if (bossCountdown <= -1){
            bossCountdown ++;
        }
        console.log("Kills until Boss: " + bossCountdown);
    } else {
        monster_EL.style.visibility="visible";
    }
}

// Dette er funksjonene til å både hyre, og levele heltene
function hireCatKnights(){
    if (gold >= hireCatKnight){
        catKnights++;
        cat_Knight_Num_EL.innerHTML = "Level: " + catKnights;
        gold -= hireCatKnight;
        catKnightSeconds -= 1;
        catKnightTimer = setInterval(myTimerCatKnight, catKnightSeconds);
        hireCatKnight = Math.round(hireCatKnight * 1.30);
        hire_Cat_Knight_EL.innerHTML = "Upgrade: " + hireCatKnight + " Gold";
        if (catKnights >= 2){
            catKnightAtk = Math.round(catKnightAtk * 1.10);
            console.log(catKnightAtk)
        }    
    }
}

function hireArchers(){
    if (gold >= hireArcher){
        archers++;
        archer_Num_EL.innerHTML = "Level: " + archers;
        gold -= hireArcher;
        archerSeconds -= 1;
        archerTimer = setInterval(myTimerArcher, archerSeconds);
        hireArcher = Math.round(hireArcher * 1.30);
        hire_Archer_EL.innerHTML = "Upgrade: " + hireArcher + " Gold";
        if (archers >= 2){
            archerAtk = Math.round(archerAtk * 1.10);
            console.log(archerAtk)
        }    
    }
}

// Dette sjekker når du trykker på enten monsteret eller heltene
monster_EL.addEventListener("click", monsterClick); // Når vi klikker på monster
cat_Knight_EL.addEventListener("click", hireCatKnights);
archer_EL.addEventListener("click", hireArchers);



// Dette er intervalene til for angrepene til heltene, og å sjekke om monsteret er død eller ikke, også for å resette animasjonen til monsteret
var catKnightTimer = setInterval(myTimerCatKnight, catKnightSeconds);
var archerTimer = setInterval(myTimerArcher, archerSeconds);
var spawn_check = setInterval(spawn, 10)
var monsterReset = setInterval(myTimerMonsterIdle, catKnightSeconds - 10);
var monsterReset = setInterval(myTimerMonsterIdle, archerSeconds - 10);

// Funksjonene til at heltene skal angripe, de har egne timere så ikke alle heltene skulle angripe samtidig
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

// Denne er for å sette animasjonen til monsteret til idle
function myTimerMonsterIdle(){
    monster_EL.style.animation="idle";
}