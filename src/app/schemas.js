const createUserObject = (name, email, isAdmin = false) => {
    console.log('Creating User Object ----')
    return {
        name, email, isAdmin
    }
}

export {createUserObject};