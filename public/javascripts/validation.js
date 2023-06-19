const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;
const emailRegex =
  /^\w+([\.-]?\w+)*@(gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com)$/;
const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
const websiteRegex = /https?:\/\/[\w\-]+(\.[\w\-]{2,})+[/#?]?.*/i;

const validate = {
  restaurantName: (value) => {
    return value.length < 6 ? true : false;
  },
  "restaurantContactDetails[email]": (value) => {
    return emailRegex.test(value) ? false : true;
  },
  restaurantWebsite: (value) => {
    return websiteRegex.test(value) ? false : true;
  },

  "restaurantContactDetails[contact1]": (value) => {
    return phoneRegex.test(value) ? false : true;
  },

  "restaurantContactDetails[contact2]": (value) => {
    if(!value) return false
    return phoneRegex.test(value) ? false : true;
  },

  restaurantDescription: (value) => {
    const numOfWords = value.split(" ").length;

    if (numOfWords < 15 || numOfWords > 100) {
      return true;
    } else {
      return false;
    }
  },

  "restaurantAddress[street]": (value) => {
      return (!value)? true: false;
  },

  "restaurantAddress[country]": (value) => {
    if(!value) return true;
    return value.length < 4 ? true : false;
  },

  "restaurantAddress[state]": (value)=>(!value)? true: false ,
  "restaurantAddress[city]": (value)=>(!value)? true: false ,
  "restaurantAddress[zip]": (value)=>(!value)? true: false ,

  password: (value) => {
    return passwordRegex.test(value) ? false : true;
  },

  confirmPassword: (value)=>{
    const password = document.getElementById("password").value;
    if(password === value) return false;
    else return true;
  }
};

const properName = {};

function handleRegisterChange(e) {
  console.log(e.target.value);
  const error = validate[`${e.target.name}`](e.target.value);
  const errorMessage = document.getElementById(`${e.target.name}Error`);
  if (error) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }
}

const form = document.getElementById("restaurantRegisterForm");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let submitable = true;
    const error = [...document.getElementsByClassName("restaurantRegisterError")];
    error.forEach(elem=>{
      if(!elem.classList.contains("hidden")){
        submitable = false;
        return;
      }
    })

    if(submitable){
    form.submit()
    }else{
        alert("Please enter valid values")
    }
})
