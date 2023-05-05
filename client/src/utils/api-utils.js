const BASE_URL = "https://make-a-wish-server.onrender.com";
// export const BASE_URL = "http://localhost:5000";

//TO ADD WISH
export function addWish(data) {
    return fetch(`${BASE_URL}/wish`, {
        method : "POST",
        headers : {
            "content-type" : "application/json",
            "accept" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .catch((err) => alert(err.message))
}

//TO GET SINGLE PERSON WISHES
export function getSinglePersonWishes(id) {
    return fetch(`${BASE_URL}/wish/${id}`)
    .then(res => res.json())
    .catch((err) => alert(err.message))
}

//TO DELETE SINGLE PERSON WISHE
export function deleteSingleWish(id) {
    return fetch(`${BASE_URL}/wish/${id}`, {method : "DELETE"})
    .then(res => res.json())
    .catch((err) => alert(err.message))
}

//TO ADD NEW PERSON
export function addNewPerson(data, id) {
    return fetch(`${BASE_URL}/${id}/new`, {
        method : "POST",
        headers : {
            "content-type" : "application/json",
            "accept" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .catch((err) => alert(err.message))
}

//TO GET ALL PERSON
export function getAllPerson(id) {
    return fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .catch((err) => alert(err.message))
}


//TO GET SINGLE PERSON
export function getSinglePerson(id) {
    return fetch(`${BASE_URL}/person/${id}`)
    .then(res => res.json())
    .catch((err) => alert(err.message))
}

//TO DELETE SINGLE PERSON
export function deleteSinglePerson(id) {
    return fetch(`${BASE_URL}/person/${id}`, { method : "DELETE"})
    .then(res => res.json())
    .catch((err) => alert(err.message))
}

//TO LOG IN
export function loginToAccount(data) {
    return fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

//TO REGISTER
export function registerAnAccount(data) {
    return fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

//TO CHECK SECRET
export function secretCheck(data) {
    return fetch(`${BASE_URL}/user/secret-check`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

//TO RESET PASSWORD
export function passwordReset(data) {
    return fetch(`${BASE_URL}/user/password-reset`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}