//Algorithm for finding missing variables not been declared in the query
const findKey = (values) => {
    for (let i = 0; i < values.length; i++) {
        if(values[i] == undefined){
            return ['name','color','tail_length','weight'][i]
        }
    }
}

//to check if the values are null or contains invalid characters
const invalidOrEmpty = (values) => {
    for (let i = 0; i < values.length; i++) {
        try{

            if(values[i] == values[i].replace(/[^ ]/g, "")){
                return ['name','color','tail_length','weight'][i]
            }


        } catch(error) {
            return console.log('Erro in the query Method!')
        }
    }
}

const validateIntegers = (values) => {
    for (let i = 0; i < values.length; i++) {
        //For Checking only the tail_length and weight
        if(['name','color','tail_length','weight'][i] == 'tail_length' || ['name','color','tail_length','weight'][i] == 'weight'){
            try {
                const checkValue = values[i].replace(/[^0-9]/g, "")

                if(checkValue !== values[i] && Number(checkValue) >= 0){
                    return `The value for "${['name','color','tail_length','weight'][i]}" Must be a Number and not less than 0!`
                }
            } catch (error) {
                return  console.log('Error ==> Some varaibles not declared!')
            }
        }
    }

}

const validateString = (values) => {
    for (let i = 0; i < values.length; i++) {
        //For Checking only the tail_length and weight
        if(['name','color','tail_length','weight'][i] == 'name' || ['name','color','tail_length','weight'][i] == 'color'){
            try {
                const checkValue = values[i].replace(/[^0-9]/g, "")

                if(checkValue){
                    return `The value for "${['name','color','tail_length','weight'][i]}" Must be a String with no Numbers!`
                }

            } catch (error) {
                return  console.log('Error ==> Some varaibles not declared!')
            }
        }
    }

}


module.exports = { findKey, invalidOrEmpty, validateIntegers, validateString }