monster_EL = document.querySelector("#monsters");
gold_EL = document.querySelector("#gold");
hero_EL = document.querySelector("#catKnight");
hero_num_EL = document.querySelector("#heroNum");

container_EL = document.querySelector("#container");
money_EL = document.querySelector("#money");
heroes_EL = document.querySelector("#heroesID");
images_EL = document.querySelector("#images");


let health = document.getElementById("health");


console.log(gold_EL);

gold = 0;
heroes = 0;
seconds = 1000;

function monsterClick(){
    health.value -= 1;
    console.log(health.value);
    die();
    spawn();
}
function hireHero(){
    if (gold >= 1){
        heroes++;
        hero_num_EL.innerHTML = "Level: " + heroes;
        gold -= 1;
        seconds -= 10;
    }

}

monster_EL.addEventListener("click", monsterClick); // Når vi klikker på monster
hero_EL.addEventListener("click", hireHero);

var timer = setInterval(myTimer, seconds); // Kjører funksjonen mytimer 1 gang i sekundet
function myTimer(){
    if (heroes + 1){
        timer - 10;
    }
    if (heroes >= 1){
        monsterClick();
    }
    gold_EL.innerHTML = gold;
}

function die(){
    if (health.value <= 0){
        console.log("monster dead");
        monster_EL.style.visibility="hidden";
        console.log("monster gone");
        gold++;
    } else {
        monster_EL.style.visibility="visible";
    }
}
function spawn(){
    if (monster_EL.style.visibility="hidden"){
        monster_EL.style.visibility="visible";
    }
    if (health.value <= 0){
        health.value = 12;
    }
}

var checkbox = document.querySelector("input[name=checkbox]");

checkbox.addEventListener("click", toggleHitboxes);

function toggleHitboxes(){
    if (checkbox.checked) {
        monster_EL.style.border="visible";
        gold_EL.style.border="visible";
        hero_EL.style.border="visible";
        hero_num_EL.style.border="visible";
        images_EL.style.border="visible";
        console.log("Checkbox is checked..");
        } 
    else {
        monster_EL.style.border="hidden";
        gold_EL.style.border="hidden";
        hero_EL.style.border="hidden";
        hero_num_EL.style.border="hidden";
        images_EL.style.border="hidden";
        console.log("Checkbox is not checkd..");
      }
}