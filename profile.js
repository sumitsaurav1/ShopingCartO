let yourProfile = document.getElementById("your-profie");

let userDetails = JSON.parse(localStorage.getItem("userDetails"))
let userIndex = JSON.parse(localStorage.getItem("userIndex"));

let profile = document.getElementById("profile");
profile.innerText=`Hi, ${userDetails[userIndex].firstName} ${userDetails[userIndex].lastName}`;

yourProfile.innerHTML=`<div class="your-profile">
<div>${userDetails[userIndex].firstName} ${userDetails[userIndex].lastName}</div>
<div>${userDetails[userIndex].email}</div>
</div>`

localStorage.setItem("userDetails",JSON.stringify(userDetails));

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let saveInfo = document.getElementById("saveInfo");

let oldPassword = document.getElementById("oldPassword");
let newPassword = document.getElementById("newPassword");
let ConNewPassword = document.getElementById("ConNewPassword");
let changePassword = document.getElementById("changePassword");
let logout = document.getElementById("logout");

saveInfo.addEventListener("click",(e)=>{
    e.preventDefault();

    let userDetails = JSON.parse(localStorage.getItem("userDetails"))

    userDetails[userIndex].firstName= firstName.value;
    userDetails[userIndex].lastName=lastName.value;
    
    profile.innerText=`Hi, ${userDetails[userIndex].firstName} ${userDetails[userIndex].lastName}`;

    yourProfile.innerHTML=`<div class="your-profile">
    <div>${userDetails[userIndex].firstName} ${userDetails[userIndex].lastName}</div>
    <div>${userDetails[userIndex].email}</div>
    </div>`
    localStorage.setItem("userDetails",JSON.stringify(userDetails));

})
function verifyPassword(i,userDetails){
    let result = "";
    for(let j=0;j<userDetails[i].password.length;j++){
        result += String.fromCharCode(userDetails[i].password.charCodeAt(j)-1)
    }
    return result;
}

function passwordHashing(password){
    let result ="";
    for(let i=0;i<password.length;i++){
        result += String.fromCharCode(password.charCodeAt(i)+1)
    }
    return result;
}

function specialChacterVerify(mySet){
    let flag1 = false;
    let flag2= false;
    for(let i=33;i<=47;i++){
        if(mySet.has(String.fromCharCode(i))){
            flag1=true;
        }
    }
    for(let i=58;i<=64;i++){
        if(mySet.has(String.fromCharCode(i))){
            flag2=true;
        }
    }
    if(flag1 || flag2){
        return true;
    }
    else{
        return false;
    }
}

function digitVerify(mySet){
    let flag = false;
    for(let i=48;i<=57;i++){
        if(mySet.has(String.fromCharCode(i))){
            flag=true;
        }
    }
    if(flag){
        return true;
    }
    else{
        return false;
    }
}
function veryfyPassword(password){
    let mySet = new Set(password)
    //console.log(mySet)
   if(specialChacterVerify(mySet) && digitVerify(mySet)){
    return true;
   }
   else{
    return false;
   }
}
changePassword.addEventListener("click",(e)=>{
    e.preventDefault();
    
    let userDetails = JSON.parse(localStorage.getItem("userDetails"))
    if((oldPassword.value===verifyPassword(userIndex,userDetails))){
        if(newPassword.value===ConNewPassword.value && newPassword.value.trim()!=""){
            
            if(newPassword.value.length>=8){
                if(veryfyPassword(newPassword.value)){
                       userDetails[userIndex].password=passwordHashing(newPassword.value);
                       localStorage.setItem("userDetails",JSON.stringify(userDetails));
                       newPassword.value="";
                       oldPassword.value="";
                       ConNewPassword.value="";
                       alert("Password changed successfully")
                }
                else{
                    // verifyText.innerText="Error: Password should contains one special chachcter,one digit"
                    // verifyText.style.color="red";
                    alert("Error: Password should contains one special chachcter,one digit")
                }
           }else{
                // verifyText.innerText="Error: Password length should be greater than or equal to 8"
                // verifyText.style.color="red";
                alert("Error: New Password length should be greater than or equal to 8")
           }
        }else{
            alert("New Password and Confirm Password didn't matches")
        }
    }else{
        alert("Incorrect Old Password")
    }
})

logout.addEventListener("click",(e)=>{
    e.preventDefault();
    let link= document.createElement("a");
    link.href="./index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
    localStorage.removeItem('token')
})


function getUserCartDetails(cartDetails){
    let r;
    cartDetails.forEach((userCart)=>{
        if(userCart[0]===`${userDetails[userIndex].email}`){
            console.log(userCart)
            r=userCart
        }
    })
    return r;
}

let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
let userCartDetails = getUserCartDetails(cartDetails);

let digit = document.getElementById("digit");
function updateCartQuantity(userCartDetails){
    digit.innerText=""
    digit.innerText=`${userCartDetails.length-1}`
}

function f(cartDetails){
    let userCartDetails = getUserCartDetails(cartDetails);
    updateCartQuantity(userCartDetails)
}
f(cartDetails)
