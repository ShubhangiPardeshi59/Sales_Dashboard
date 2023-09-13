export  function validateAge(inputAge){
    const age = Number(inputAge.trim());
    if(!isNaN(age) && (age>0 && age<120)){
        return true;
    }
    return false;
}

export  function validateAmount(val){
    const temp = Number(val.trim());
    if(!isNaN(temp) && temp>0 ){
        return true;
    }
    return false;
}

export  function validateQuantity(val){
    const temp = Number(val.trim());
    if(!isNaN(temp) && parseInt(temp)>0 ){
        return true;
    }
    return false;
}