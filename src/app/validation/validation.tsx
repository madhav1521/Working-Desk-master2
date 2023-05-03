import validator from 'validator';
export const Proregistration = (value:any,checked:boolean)=>{
    let error:string[]=[];
    if(value.FirstName === ""){
        error.push('firstname is require')
    }
    if(value.LastName === ""){
        error.push('LastName is require')
    }
    if(value.Email === ""){
        error.push('Email is require')
    }
    if(value.Mobile === ""){
        error.push('Mobile is require')
    }
    if(value.Password === ""){
        error.push('Password is require')
    }
    if(value.ConfirmPassword === ""){
        error.push('ConfirmPassword is require')
    }
    if(value.Password !== value.ConfirmPassword){
        error.push('Password is not match')
    }
    if(checked===false)
    {
        error.push('please accept terms and conditions,privacy policy')
    }
    return error
} 
export const Loginvalidation = (value:any)=>{
    let error:string[]=[];
    
    if(value.Email === ""){
        error.push('Email is require')
        if(!validator.isEmail(value.Email)){
            error.push('Enter valid email')
        }
    }
    
    if(value.Password === ""){
        error.push('Password is require')
    }
    return error
} 
export const Uservalidation = (value:any,checked:boolean)=>{
    let error:string[]=[];
    if(value.FirstName === ""){
        error.push('firstname is require')
    }
    if(value.LastName === ""){
        error.push('LastName is require')
    }
    if(value.Email === ""){
        error.push('Email is require')
        if(!validator.isEmail(value.Email)){
            error.push('Enter valid email')
        }
    }
    
    if(value.Mobile === ""){
        error.push('Mobile is require')
    }
    if(value.Password === ""){
        error.push('Password is require')
    }
    if(value.ConfirmPassword === ""){
        error.push('ConfirmPassword is require')
    }
    if(value.Password !== value.ConfirmPassword){
        error.push('Password is not match')
    }
    if(checked===false)
    {
        error.push('please accept privacy policy')
    }
    return error
} 
export const Forgotvalidation = (value:any)=>{
    let error:string[]=[];
    
    if(value.Email === ""){
        error.push('Email is require')
        if(!validator.isEmail(value.Email)){
            error.push('Enter valid email')
        }
    }
    
    if(value.Password === ""){
        error.push('Password is require')
    }
    return error
} 
export const Pincodevalidation = (value:any)=>{
    let error:string[]=[];
    
    if(value === ""){
        error.push("Please fill up pincode")
    }
    return error
}
export const addressvalidation = (value:any)=>{
    let error:string[]=[];
    
    if(value.StreetName === ""){
        error.push("Please fill up StreetName")
    }
    if(value.HouseNumber === ""){
        error.push("Please fill up House number")
    }
    if(value.PostalCode === ""){
        error.push("Please fill up Postal code")
    }
    if(value.City === ""){
        error.push("Please fill up City")
    }
    if(value.MobileNumber === ""){
        error.push("Please fill up Mobile number")
    }
    return error
}
export const contactvalidation = (value:any)=>{
    let error:string[]=[];
    
    if(value.Firstname === "" || value.Lastname=== "" || value.Mobile=== "" || value.Email=== ""  || value.Message=== ""){
        error.push("Please fill up all the details")
    }
  
    return error
}
