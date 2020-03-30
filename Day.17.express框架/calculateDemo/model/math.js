exports.factorComputed = function(number){
    let arr =  [];
    for(let i = 1; i <= number; i++){
        if(number%i == 0){
            arr.push(i);
        }
    }
    return arr;
}