const axios = require('axios');
const fs=require("fs")
const parser=require("pdf-parse")

class LinkedinResumeParser{

  #resume

 async getParsedResume(file){

   this.#resume= await parser(file)
    
    return {
      resume: this.#resume,
     contactDetails:await this.#getContactDetails(),
     skills:await this.#getSkills(),
      education:await this.#getEducation(),
      experience:await this.#getExperience()
     
    }
 }

 async #getContactDetails(){

    const resume = await this.#resume.text.split('\n')
    const contactsIndex =resume.indexOf("Contact")
    const skillsIndex = resume.indexOf("Top Skills")
    const contactDetails= resume.slice(contactsIndex+1,skillsIndex)

    //get the email address
    const emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

    const email = contactDetails.filter(line=>{ 
      return line.match(emailRegex)
    })
    const githubId = contactDetails.filter(line=>{
        
       return(line.includes('github.com'))
      
    })
    
    const linkedinId = contactDetails.filter(line=>{
          return line.includes('(LinkedIn)')
    })

    const contact={

      email:email[0]||"",
      // get the github if it exists
      githubId:"https://"+githubId[0]||"",
         //get the linkedinId
      linkedinId:"https://www.linkedin.com/in/"+
      linkedinId[0]
      .substring(0,linkedinId[0].indexOf('(LinkedIn)'))

    }
    return contact
 
  }

  async #getExperience(){

    const resume = await this.#resume.text.split('\n')
    const experienceIndex =resume.indexOf("Experience")
    const educationIndex =resume.indexOf("Education")
    const experience= resume.slice(experienceIndex+1,educationIndex-1)
    
    const monthYearRegex="(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) [0-9]{4}"
    
    const experienceDurationRegex="(?<value>(?<=\().*(?=\)))"

    const months =experience.filter( instance =>{
      return instance.match(monthYearRegex)
    })

    const duration =experience.filter( instance =>{
      return instance.match(experienceDurationRegex)
    }
    )

    const getExperienceMonths=(monthsAndYears) =>{
      
    }

    return{
      experience,
      months,
      duration
    }

  }

  async #getSkills(){
    
    const resume = await this.#resume.text.split('\n')
    const skillsIndex =resume.indexOf("Top Skills")
    const languagesIndex = resume.indexOf("Languages")
    return resume.slice(skillsIndex+1,languagesIndex)

  }

  async #getEducation(){

      const mapping={
        "\n":""
      }
      
      const resume = await this.#resume.text.split('\n')
      const educationIndex =resume.indexOf("Education")
      const education= resume.slice(educationIndex+1)

      //remove white spaces
      

      return education
  
  }


    
 }


module.exports = LinkedinResumeParser