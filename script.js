monster_EL = document.querySelector("#monsters");
gold_EL = document.querySelector("#gold");
hero_EL = document.querySelector("#catKnight");
hero_num_EL = document.querySelector("#heroNum");

console.log(gold_EL);

gold = 0;
heroes = 0;

function monsterClick(){
    gold++;
}
function hireHero(){
    if (gold > 50){
        heroes++;
        gold -= 50;
    }

}

monster_EL.addEventListener("click", monsterClick); // Når vi klikker på monster
hero_EL.addEventListener("click", hireHero);

var timer = setInterval(myTimer, 10); // Kjører funksjonen mytimer 1 gang i sekundet
function myTimer(){
    gold += heroes;
    gold_EL.innerHTML = gold;

}