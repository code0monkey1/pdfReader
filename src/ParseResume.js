const parser=require("pdf-parse")
const fs= require("fs");
const axios = require("axios");
class ParseResume {
  // special syntax for declaring  private variables
     #resume =[] 
     #dir
     #file


     constructor(dir) {
   
      this.#dir = dir;
      this.#file=fs.readFileSync(this.#dir)
      this.#resume=parser(this.#file).then(res=>{
                return res.text.split("\n")
            })
             
    }
  
     async toString() {

         const resume = await this.#resume
         return resume
       
     }

     async getGitHub() {

          const response = await axios.get("https://api.github.com/users/code0monkey1/repos")

          const data = response.data

          return data
     }

     async getSkills()  {

          const resume = await this.#resume
          
          const contactsIndex =resume .indexOf("Contact")

          const skillsIndex = resume.indexOf("Top Skills")
        
          return resume.slice(contactsIndex+1,skillsIndex)

         
     }

     async toJson() {

          return await {
               "resume":await this.toString(), 
               "skills":await this.getSkills(),
               "github":await this.getGitHub()

          }
     }

    async #parse() {

           this.#resume=await parser(this.#file).then(res=>{

                this.#resume= res.text.split("\n")
             //write the resume to a json file
                    this.#writeToJson()
            
            }).catch(err=>{
             console.log(err)
            }
            )
      }

      #writeToJson() {

            fs.writeFileSync(this.#dir+".json",JSON.stringify(this.toString()))
      }
     
//   // private methods are also made using the # symbol before the function name
//     #getSkills() {

//   const topSkillIndex=dataArray.indexOf("Top Skills")
//      const languagesIndex=this.#resume.indexOf("Languages")
     
//      console.log(topSkillsIndex, languagesIndex)
//       const topSkills=dataArray.slice(topSkillIndex+1,languagesIndex)

//           return topSkills
//     }

//     deposit(amount) {

//       if (amount > 0) {
//         this.#balance += amount;
//       }

//       this.#balance += amount;
//     }

//     withdraw(amount) {

//       if (isNaN(amount)) {
//         throw new Error("Amount must be a number");
//       }

//       if(amount > this.#balance) {
//         throw new Error('Insufficient funds');
//       }

//       this.#balance -= amount;
//     }
//    //special getter syntax for getting private variables
//     get balance() {
//       return this.#balance;
//     }
   
//     // special syntax for setting private variables
//     set balance(amount) {

//       if (isNaN(amount)) {
//         throw new Error("Amount must be a number");
//       }

//       if (amount > 0) {
//         this.#balance = amount;
//       }

//       this.#balance = amount;

//     }

 

}

module.exports = ParseResume;