
function valid_id(id){
    try {
    let parsedId = new ObjectId(id);
    return true;
    }
    catch (e){
        return false;
    }
}

function spaces(x){
    let b=true;
    for (const n in x){
        b = b && x[n]===" ";
    }
    return b;
}

function allStrings(x){
    let b=true;
    for (const n in x){
        b = b&&(typeof x[n]==='string');
    }
    return b;
}