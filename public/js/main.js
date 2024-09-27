
export let loginPageUrl = "index.html";
export let availableRidesUrl = "available_ride_offers.html";
export  let requestRideUrl = "request_ride.html";
export let rejectOrAcceptUrl = "reject_accept_request.html";
export let acceptedRideUrl = "accepted_ride_request.html";
export let profilePageDisplayRidesUrl = "profile_page_rides_given_and_taken.html";
export let manageRequests = "manage_requests.html";
export let hostAndPortUrl = "https://carpool-api-andela.herokuapp.com";


export function getTokenFromVerifyUser() {
    return localStorage.getItem('Token');
}

export function getFromCurrentUserInfo() {
    return localStorage.getItem('userUsername')
}
export function getCurrentUserEmail() {
    return localStorage.getItem('userEmail')
}
export function getCurrentUserPhoneNumber() {
    return localStorage.getItem('userPhoneNumber')
}
export function getCurrentUserBio() {
    return localStorage.getItem('userBio')
}
export  function getRideId() {
    return localStorage.getItem('ride_id');
}
export  function getGivenRideId() {
    return localStorage.getItem('givenRideId');
}
export  function getTakenRideId() {
    return localStorage.getItem('takenRideId');
}
export  function getAcceptedRequestId() {
    return localStorage.getItem('accepted_request');
}
export  function getRejectedRequestId() {
    return localStorage.getItem('rejected_request');
}
export  function getAcceptRequestId() {
    return localStorage.getItem('accept_request');
}
export  function getRejectRequestId() {
    return localStorage.getItem('reject_request');
}
export  function getCancelRequestId() {
    return localStorage.getItem('cancel_request_id');
}
export function logoutUser() {
    // logout the current user
    localStorage.clear();
    window.location.replace(loginPageUrl)
}

function fetchCurrentUserInfo(pathToResource, RedirectUrlParameter) {
    fetch(pathToResource) // 1
    .then((response) => response.json()) // 2
    .then((data) => {
        console.log(data);
        if(data.message){
            window.location.replace(loginPageUrl)
        }else {
            logResult("userUsername", data.User_info.username);
            logResult("userEmail", data.User_info.email);
            logResult("userBio", data.User_info.bio);
            logResult("userPhoneNumber", data.User_info.phone_number);
            window.location.replace(RedirectUrlParameter);
        }
    }) // 3
}


export function getUserInfo(RedirectUrlParameter) {
  
        const userInfoUrl = hostAndPortUrl+"/api/v1/current/user/info";

        let header = new Headers({"Content-Type": "application/json",
                                  "Authorization": getTokenFromVerifyUser()});

        let option = {
            method: "GET",
            headers: header
        };

        let req = new Request(userInfoUrl, option);

        fetchCurrentUserInfo(req, RedirectUrlParameter);

    }

export function logResult(key, value) {
    localStorage.setItem(key, value);
}