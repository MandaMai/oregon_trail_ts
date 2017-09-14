(function(){
    
        /*
        * Interfaces
        */
    
        //interface describing what attributes and methods a traveler should have
        interface ITraveler {
            food: number;
            name: string;
            isHealthy: boolean;
            hunt(): number;
            eat(): boolean;
        }
    
        //interface describing attributes and methods a wagon should have
        interface IWagon{
            capacity: number;
            passengerArray: Traveler[];
            addPassenger(traveler: Traveler): string;
            isQuarantined(): boolean;
            getFood(): number;
    
        }
    
        /*
        * Classes
        */
    
        //The traveler class that implements the ITraveler interface
        //Create the code required to satisfy the contract with the interface
        class Traveler implements ITraveler {
            food: number;
            name: string;
            isHealthy: boolean;

            //constructor to create new Traveler item with a default food amount of 100 and isHealthy value of true
            constructor(name: string, food: number=100, isHealthy: boolean = true){
                this.name = name;
                this.food = food;
                this.isHealthy = isHealthy;
                // console.log("traveler has been created with the name: " + this.name + " food amount: " + this.food + " and health status of " + this.isHealthy);
            }//end constructor
    

            hunt(): number{
                let chance = getRandomIntInclusive(0,1);//returns result of 50% chance
                let tempAmount = this.food;
                //console.log(tempAmount);
                if(chance ==1) {tempAmount = tempAmount + 100;}//successful hunt}
                return tempAmount;//return travelers new food value
            }//end hunt
    
            //when implemented, we should check to see if the traveler has a food supply of 20
            eat(): boolean {
                if(this.food>20){//traveler has enough food to eat
                    this.food = this.food-20;//If they do then we should consume 20 of the available food supply
                }else{//traveler doesn't have enough food to consume
                    this.isHealthy = false;//If they don't have 20 food then we should change isHealthy to false
                }
                return this.isHealthy; //return the travelers health after attempting to eat
            }//end eat

        }//end Traveler
    
        //The wagon class that implements the IWagon interface
        //This is currently in violation of its contract with the interface.
        //Create the code required to satisfy the contract with the interface 
        class Wagon implements IWagon {
            capacity: number;
            passengerArray: Traveler[];
            
            constructor(capacity: number=4) {
                this.passengerArray= [];
                this.capacity = capacity;
                // console.log("wagon created correctly with a capacity of "+ this.capacity);
              }//end constructor

            //when implemented, we should add the traveler to the wagon if the capacity permits
            //this function should return the string "added" on success and "sorry" on failure
            addPassenger(traveler: Traveler): string {
                //let result = "added";
                // console.log("Array size: " + this.passengerArray.length);
                // console.log("capacity: " + this.capacity);
                if(this.passengerArray.length<this.capacity){
                    this.passengerArray.push(traveler);
                    // console.log("after add: " + this.passengerArray.length);
                    // for(let i = 0; i<this.passengerArray.length; i++){
                    //     console.log(i + ": " + this.passengerArray[i].name);
                    // }
                    return "added to wagon because you are awesome"
                }else{
                    return "sorry, you were not added due to capacity restraints"
                }//end else
            }//end addPassenger
    
            //this should return true if there is at least one unhealthy person in the wagon
            //if everyone is healthy false should be returned
            isQuarantined(): boolean {
                for(let i =0; i < this.passengerArray.length; i++) {
                    if(this.passengerArray[i].isHealthy===false) {
                        return true;//return true if someone is unhealthy
                    }//end if statement to check if anyone in wagon is unhealthy
                }//end for loop to go through everyone in the wagon as needed
                return false;//return false if no one was unhealthy
            }
    
            //Calculate total amount of food in the wagon
            getFood(): number {
                let food = 0;
                for(let i = 0; i < this.passengerArray.length; i++){//go through each person in the wagon
                    food = food + this.passengerArray[i].food; //add individual amount to current wagon total
                    //console.log("current wagon food amount: " + food)
                }
                return food;//Return the total amount of food among all passengers of the wagon.
            }
        }//end wagon class
        
        
        //get random number based on incoming parameters
        function getRandomIntInclusive(min: number = 0, max: number = 100) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
          }

        /*Play the game*/
        console.log("The game is on!")
        // Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
        let poshSpice = new Traveler("Posh Spice", getRandomIntInclusive());
        let babySpice = new Traveler("Baby Spice", getRandomIntInclusive());
        let sportySpice = new Traveler("Sporty Spice", getRandomIntInclusive());
        let gingerSpice = new Traveler("Ginger Spice", getRandomIntInclusive());
        let scarySpice = new Traveler("Scary Spice", getRandomIntInclusive());
        // Create wagon with an empty passenger list and a capacity of 4.
        let spiceWagon = new Wagon();
        // Make 3 of 5 the travelers eat by calling their eat methods
        console.log(babySpice.eat());
        console.log(sportySpice.eat());
        console.log(gingerSpice.eat());
        // Make the remaining 2 travelers hunt
        console.log(poshSpice.hunt());
        console.log(scarySpice.hunt());
        // Create an array of your travelers, 
        let added = 0;
        let queue = [poshSpice, babySpice, sportySpice, gingerSpice, scarySpice];
        // loop over the array of travelers and give each traveler a 50% chance
        // of attempting to be being added to the wagon using the wagons addPassenger method.
        for(let i = 0; i< queue.length; i++) {
            if(getRandomIntInclusive(0,1)==1){
                spiceWagon.addPassenger(queue[i]);
            }else{
                console.log(queue[i].name + " was not able join the wagon because she tripped")
            }
        }
        // Run the isQuarantined method for the wagon
        console.log("Current people in the wagon and their health status:");
        for(let j = 0; j < spiceWagon.passengerArray.length; j++){
            console.log(spiceWagon.passengerArray[j].name + " : " + spiceWagon.passengerArray[j].isHealthy);
        }
        console.log("Quarantined status: " + spiceWagon.isQuarantined());
        // Run the getFood method for the wagon
        console.log("Amount of Food in the Wagon: " + spiceWagon.getFood());
        console.log("the game has ended!")

    
    })();
    