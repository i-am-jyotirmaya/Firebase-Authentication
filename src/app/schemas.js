const createUserObject = (uid, name, email, isAdmin = false) => {
    console.log('Creating User Object ----')
    return {
        uid, name, email, isAdmin
    }
}

export {createUserObject};