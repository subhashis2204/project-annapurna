const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
const pincodeRegex = /^\d{6}$/;
const websiteRegex = /https?:\/\/[\w\-]+(\.[\w\-]{2,})+[/#?]?.*/i;
const orgRegNumRegex = /^([L|U|l|u]{1})([0-9]{5})([A-Z]{2})([0-9]{4})([A-Z]{3})([0-9]{6})$/;


const validate = {
  restaurantName: (value) => {
    return value.trim().length < 6 ? true : false;
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
    const numOfWords = value.trim().split(/\s+/).length;

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
    return value.trim().length < 4 ? true : false;
  },

  "restaurantAddress[state]": (value)=>(!value)? true: false ,
  "restaurantAddress[city]": (value)=>(!value)? true: false ,
  "restaurantAddress[zip]": (value)=>{
    return pincodeRegex.test(value) ? false : true;
  } ,

  password: (value) => {
    return passwordRegex.test(value) ? false : true;
  },

  confirmPassword: (value)=>{
    const password = document.getElementById("password").value;
    if(password === value) return false;
    else return true;
  },
  receiverRegistrationNo: (value)=>{
    return orgRegNumRegex.test(value) ? false : true;
  },
  receiverAreaOfWork: (value)=>{
    const numOfWorks = value.trim().split(", ").length;

    if (numOfWorks < 2) {
      return true;
    } else {
      return false;
    }
  },
  name: (value)=>{
    return (!value)? true: false 
  }
};

validate.email = validate["restaurantContactDetails[email]"];
validate.message = validate.restaurantDescription;
validate.receiverName = validate.restaurantName;
validate["receiverContactDetails[email]"] = validate["restaurantContactDetails[email]"];
validate.receiverWebsite = validate.restaurantWebsite;
validate["receiverContactDetails[contact1]"] = validate["restaurantContactDetails[contact1]"];
validate["receiverContactDetails[contact2]"] = validate["restaurantContactDetails[contact2]"];
validate.receiverDescription = validate.restaurantDescription;
validate["receiverAddress[street]"] = validate["restaurantAddress[street]"];
validate["receiverAddress[country]"] = validate["restaurantAddress[country]"];
validate["receiverAddress[state]"] = validate["restaurantAddress[state]"];
validate["receiverAddress[city]"] = validate["restaurantAddress[city]"];
validate["receiverAddress[zip]"] = validate["restaurantAddress[zip]"];

function handleChange(e) {
  console.log(e.target.value);
  const error = validate[`${e.target.name}`](e.target.value);
  const errorMessage = document.getElementById(`${e.target.name}Error`);
  if (error) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }
}

const restaurantForm = document.getElementById("restaurantRegisterForm");
const loginForm = document.getElementById("loginForm");
const contactForm = document.getElementById("contactForm");
const organizationForm = document.getElementById("organizationForm");

(restaurantForm)? restaurantForm.addEventListener("submit", (e)=>{
    e.preventDefault();
     errorCheck(restaurantForm, "restaurantRegisterError")
}): null;

(loginForm)?loginForm.addEventListener("submit", (e)=>{
  e.preventDefault();
   errorCheck(loginForm, "loginError")
}):null;

(contactForm)?contactForm.addEventListener("submit", (e)=>{
  e.preventDefault();
   errorCheck(contactForm, "contactError")
}):null;

(organizationForm)?organizationForm.addEventListener("submit", (e)=>{
  e.preventDefault();
   errorCheck(organizationForm, "oraganizationError")
}):null;

 function errorCheck(form, errorClassName){
  let submitable = true;
  const error = [...document.getElementsByClassName(errorClassName)];
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
}
