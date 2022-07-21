const pdfParser = require('pdf-parse');
const fs = require('fs');

class ParseResume {

     #resume
     #file
     #fileDestination

     constructor(fileDestination) {
          this.#fileDestination=fileDestination;
     }

     initialize() {
          this.setFile()
          this.setResume()
     }

     async setFile(){

         this.#file=await fs.readFileSync(this.#fileDestination)
     }

     async setResume(){
          
          this.#resume = await pdfParser(this.#file)

     }

     async getJson() {

         return{
            resume:await this.#resume
          }
     }


     
        
}

module.exports=ParseResume;