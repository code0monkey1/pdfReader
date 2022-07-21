const axios = require('axios');
const fs=require("fs")
const parser=require("pdf-parse")

class Web{

  #resume

 async getParsedResume(file){

   this.#resume= await parser(file)
    
    return {
     contactDetails:await this.#getContactDetails(),
     skills:await this.#getSkills()
    }

 }

 async #getContactDetails(){

    const resume = await this.#resume.text.split('\n')
    const contactsIndex =resume.indexOf("Contact")
    const skillsIndex = resume.indexOf("Top Skills")
    return resume.slice(contactsIndex+1,skillsIndex)

  }

  async #getSkills(){
    
    const resume = await this.#resume.text.split('\n')
    const skillsIndex =resume.indexOf("Top Skills")
    const languagesIndex = resume.indexOf("Languages")
    return resume.slice(skillsIndex+1,languagesIndex)

  }
    
 }


module.exports = Web