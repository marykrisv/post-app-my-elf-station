const createFullName = (fname: string, lname: string): string => {
    let fullName = lname + ', ' +fname

    return fullName
}

const getInitial = (fname: string): string => {
    return fname.substr(0, 1)
}

export const Utils = {
    createFullName,
    getInitial
}