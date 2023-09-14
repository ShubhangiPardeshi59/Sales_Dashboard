export  function validateAge(inputAge){
    if(!isNaN(inputAge) && (inputAge>0 && inputAge<120)){
        return true;
    }
    return false;
}

export  function validateAmount(val){
    if(!isNaN(val) && val>0 ){
        return true;
    }
    return false;
}

export  function validateQuantity(val){
    if(!isNaN(val) && val>0 ){
        return true;
    }
    return false;
}