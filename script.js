monster_EL = document.querySelector("#monsters");
gold_EL = document.querySelector("#gold");
hero_EL = document.querySelector("#catKnight");
hero_num_EL = document.querySelector("#heroNum");

container_EL = document.querySelector("#container");
money_EL = document.querySelector("#money");
heroes_EL = document.querySelector("#heroesID");
images_EL = document.querySelector("#images");


let health = document.getElementById("health");

function random(max){
    return Math.floor(Math.random() * max);
}


gold = 0;
heroes = 0;
seconds = 1000;
var drop = 12;
var hp = 12;
var maxHp = 12;


function slimes(){
    monster_EL.src="Pictures/Monsters/slimeMonster.png";
    drop = 12;
    maxHp = 12;
    hp = 12;
}

function boars(){
    monster_EL.src="Pictures/Monsters/boarMonster.png";
    drop = 24;
    maxHp = 24;
    hp = 24;
}

console.log(gold_EL);
console.log(hp);
console.log(random(2));

function spawn(){
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
    die();
    spawn();
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

function hireHero(){
    if (gold >= 10){
        heroes++;
        hero_num_EL.innerHTML = "Level: " + heroes;
        gold -= 10;
        seconds -= 10;
        timer = setInterval(myTimer, seconds);
    }
}





monster_EL.addEventListener("click", monsterClick); // Når vi klikker på monster
hero_EL.addEventListener("click", hireHero);

var timer = setInterval(myTimer, seconds); // Kjører funksjonen mytimer 1 gang i sekundet
function myTimer(){
    if (heroes >= 1){
        monsterClick();
    }
    gold_EL.innerHTML = gold;
}