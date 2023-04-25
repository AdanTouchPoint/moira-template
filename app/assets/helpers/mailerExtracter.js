const mailerExtracter =  (mps) => {
    let emailsArr =[];
    for (let index = 0; index < mps.length; index++) {
        emailsArr.push(mps[index]?.email)
        
    }
    return emailsArr
}

export {
    mailerExtracter,
}