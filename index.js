let login = document.getElementById("login");
let signup = document.getElementById("signup");
(function (){
    if(localStorage.getItem('token')){
        let link = document.createElement("a");
        link.href= "./shop.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }
})()

signup.addEventListener("click",(e)=>{
    e.preventDefault();
    let link = document.createElement("a");
    link.href="./signup.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
})

login.addEventListener("click",(e)=>{
    e.preventDefault();
    let link = document.createElement("a");
    link.href="./login.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})
