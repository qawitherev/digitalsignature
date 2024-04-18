const key = process.env.REACT_APP_JWT_KEY

//TODO: to use try catch block for proper error handling
export function readValue() {
    return localStorage.getItem(key)
}

export function saveValue(value) {
    localStorage.setItem(key, value)
}