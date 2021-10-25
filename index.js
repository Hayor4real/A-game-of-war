

let id = 0 
class Character {
    constructor (name, level){
        let myCharacter = {name, level, id,
            hitpoints: 4 * level,
            maxHitpoints: 4 * level,
            inventory: []
        }
        Object.assign(this, myCharacter) 

        id++
        // this.name = name
        // this.level = level
        // this.id = id++
        // this.hitpoints = 4 * level
        // this.maxHitpoints = 4 * level
        // this.inventory = []
    }
     attack(target)  {
        let updatedHitpoints = target.hitpoints - this.level
        target.updateHitpoints(updatedHitpoints)
    
    }
    

    levelUp(){
        this.level++
        this.maxHitpoints = 4 * this.level
        this.hitpoints = this.maxHitpoints
    }

    pickup(item){
        this.inventory.push(item)
    }

    drop(droppedItem){
        let inventory = []
        for (let item of this.inventory) {
            if (droppedItem.id != item.id){
                inventory.push(item)
            }
        }
        this.inventory = inventory
    }
   domElement(){
       const domElement = document.getElementById(`character-${this.id}`)
       if (domElement){
           return domElement
       }
   }

   initializeInventory(){
       for (let item of this.inventory){
           item.domElement().onclick = () => {
               let updatedHitpoints = this.hitpoints + item.restores
               this.updateHitpoints(updatedHitpoints)
               this.drop(item)
               let inventoryDom = document.getElementById(`character-${this.id}-inventory`)
               inventoryDom.innerHTML = this.getInventoryView()
               this.initializeInventory()
           }
       }
   }
   updateHitpoints(newHitpoints){ 
      this.hitpoints = newHitpoints
      let {id, hitpoints, maxHitpoints} = this
       const hitpointsDom = document.getElementById(`character-${id}-hitpoints`) 
     hitpointsDom.innerHTML =  `HP: ${hitpoints}/${maxHitpoints}`
   }

   getInventoryView(){
       let inventoryView = ``

    //    for(let i = 0; i < this.inventory.length; i++){
    //        inventoryView += this.inventory[i].view()
    //    }
    //    console.log(inventoryView)
      for (let item of this.inventory){
          inventoryView += item.view()
      }

       return inventoryView
   }
    
view(details = " "){
   let {name, level, id, hitpoints, maxHitpoints }  = this
  return `<div class ="character" id="character-${id}">
  <div>${name}</div> 
  <div> Lv: ${level}</div>
  <div id = "character-${id}-hitpoints"> 
  HP: ${hitpoints}/${maxHitpoints}
  </div>
  <div class="inventory" id="character-${id}-inventory">
  ${this.getInventoryView()}
  </div>
  ${details}
  </div>`
}
}




class Wizard extends Character {
    constructor(name, level){
        super(`${name}🧙🏽‍♀️`, level)
        this.mana = 4 * level
    }

    attack(target) {
        let updatedHitpoints = target.hitpoints - (1.5 * this.level)
        target.updateHitpoints(updatedHitpoints)
        this.updateMana(this.mana - 2)
    }

    levelUp(){
        super.levelUp()
        this.mana += 4 
    }
    restore(){
        this.updateMana(this.mana + 1)
        this.mana++
    }
    
    updateMana(newMana) {
        this.mana = newMana
        document.getElementById(`character-${this.id}-mana`).innerHTML = `Mana: ${this.mana}`
    }

    prepareForBattle(){
        document.getElementById(`character-${this.id}-restore`).onclick = () => {
            this.restore() 
        }
    }


    view(){
        return super.view(`<div id="character-${this.id}-mana"> mana: ${this.mana}</div>
        <button id="character-${this.id}-restore">Restore</button>`)
    }
}

class Archer extends Character {
    constructor(name, level){
        super(`${name}🏹`,  level)
        this.arrows = 3 * level
    }
   
    attack(target) {
        super.attack(target)
        this.updateArrows(this.arrows - 1)
    }

    levelUp(){
        super.levelUp()
        this.arrows += 3 
    }
    reload(){
        this.updateArrows(this.arrows + 1)
        this.arrows++
    }
    updateArrows(newArrows) {
        this.arrows = newArrows
        document.getElementById(`character-${this.id}-arrows`).innerHTML = `Arrow: ${this.arrows}`
    }

    prepareForBattle(){
        document.getElementById(`character-${this.id}-reload`).onclick = () => {
            this.reload() 
        }
    }

view(){
        return super.view(`<div id="character-${this.id}-arrows"> Arrows: ${this.arrows}</div>
        <button id="character-${this.id}-reload">Reload</button>`)
    }
}

class Warrior extends Character{
    constructor(name, level){
        super(name + "⚔️", level)
        this.strenght = 2.5 * level
    }

    attack(target) {
        let updatedHitpoints = target.hitpoints - this.strenght
        target.updateHitpoints(updatedHitpoints)
        this.updateStrenght(this.strenght - 1)
    }

    levelUp(){
        super.levelUp()
        this.strenght += 2.5
    }
  charge(){
      this.updateStrenght(this.strenght + 1)
      this.strenght++
  }

  updateStrenght(newStrenght) {
    this.strenght = newStrenght
    document.getElementById(`character-${this.id}-strenght`).innerHTML = `Strength: ${this.strenght}`
}

prepareForBattle(){
    document.getElementById(`character-${this.id}-charge`).onclick = () => {
        this.charge() 
    }
}


  view(){
    return super.view(`<div id="character-${this.id}-strenght"> Strenght: ${this.strenght}</div>
    <button  id="character-${this.id}-charge">Charge</button>
    `)
  }
}




class Food {
    constructor(name, restores){
        let myFood = {name, restores, id}
        id++
        Object.assign(this, myFood)

        // this.name = name
        // this.restores = restores
        // this.id = id++
    } 

    domElement(){
        const domElement = document.getElementById(`food-${this.id}`)
        if(domElement){
            return domElement
        }
    }

    view(){
        return`<div class="food" id="food-${this.id}">${this.name}</div>`  
    }  
}  


class Spider extends Character {
    constructor(level){
        super(`Spider🕷`, level)

    }
    
    attack(target) {
       this.bite(target)
    }

    bite(target){
         let damage = target.maxHitpoints / 8
         target.updateHitpoints(target.hitpoints - damage)
    }
    
}
class Scorpion extends Character {
    constructor(level){
        super(`Scorpion🦂`, level)

    }

    attack(target) {
        this.sting(target)
    }
    sting(target){
        let damage = target.maxHitpoints / 4
        target.updateHitpoints(target.hitpoints - damage)
    }
    
}
class Dragon extends Character {
    constructor(level){
        super(`Dragon🐉 `, level)

    }
    
    attack(target) {
        this.fireBreath(target)
    }

    fireBreath(target){
        let damage = target.maxHitpoints / 2
        target.updateHitpoints(target.hitpoints - damage)
   }
    
}


  class Dungeon {
      constructor(hero, enemies) {
          let [currentEnemy, ...remainingEnemies] = enemies
          Object.assign(this, {hero, currentEnemy, remainingEnemies})
      }

      start() {
          this.startBattle()
    }

    next() {
        let [currentEnemy, ...remainingEnemies] = this.remainingEnemies
        Object.assign(this, {currentEnemy, remainingEnemies})
        // this.currentEnemy = currentEnemy
        // this.remainingEnemies = remainingEnemies
        if (remainingEnemies.length == 0) {
            this.hero.pickup(currentEnemy)
            this.end()
        } else {
            this.startBattle()
            
        }
    }
     end(){
         document.body.innerHTML = `${this.hero.view()}
         <h1>Congratulations you have completed the dungeon</h1>`
     } 
      
startBattle = () => {
        let {hero, currentEnemy} = this
          document.body.innerHTML = `
          ${hero.view()} 
          <button id="attack-button">Attack</button>
          ${currentEnemy.view()}`

    hero.initializeInventory()
    hero.prepareForBattle()
    document.getElementById("attack-button").onclick = () => {
        hero.attack(currentEnemy)
          if(isKnockedOut(currentEnemy)) {
            this.endBattle(hero)
          } else {
            currentEnemy.attack(hero)
          }
      }
   }
    endBattle()  {
        let { hero } = this
    if(!isKnockedOut(hero)) {
        hero.levelUp()
    }
        document.body.innerHTML = `${hero.view()}
        <button id="next-battle">Start next battle </button>`
        
        document.getElementById("next-battle").onclick = () => {
            this.next()
        }
    }
}





const isKnockedOut = character => character.hitpoints <=  0
    



    
const croissant = new Food("🥐", 5)
const bread = new Food("🍞", 3)
const pizza = new Food("🍕", 10)
const sandwish = new Food("🍞", 7)


const seun= new Warrior("seun", 1)
const didi= new Archer("didi", 1)
const ayo = new Wizard("Ayo", 1)

const spider = new Spider(1)
const scorpion = new Scorpion(5)
const dragon = new Dragon(10)
// didi.pickup(sandwish)
// didi.pickup(croissant)
// didi.pickup(bread)
// didi.pickup(pizza)

let myDungeon = new Dungeon(seun, [
    new Spider(1),
    new Spider(1),
    new Spider(2),
    new Spider(3),
    new Scorpion(5),
    new Scorpion(8),
    new Scorpion(13),
    new Dragon(21),
    new Food ("🍕", 1000  )
])

myDungeon.start()

// startDungeon(seun, myDungeon)
// seun.updateStrenght(10) 
// let [firstFood, ...leftoverInventory] = didi.inventory
// console.log(firstFood.name, leftoverInventory)
// didi.inventory = leftoverInventory

// startBattle(didi, spider)

// didi.getInventoryView()
//  startBattle(seun, spider)
//  didi.updateHitpoints(12)
// document.body.innerHTML += croissant.view()
// document.body.innerHTML += seun.view()
// document.body.innerHTML += didi.view()
// document.body.innerHTML += ayo.view()
// document.body.innerHTML += spider.view()
// document.body.innerHTML += scorpion.view()
// document.body.innerHTML += dragon.view()




