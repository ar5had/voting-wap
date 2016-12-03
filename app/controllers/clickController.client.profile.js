`use strict`;

// this file will be added via script tag

(function(){
    var deleteAccountBtn = document.querySelector("#deleteAccBtn"),
        deleteProfileUrl = appUrl + '/profile';
    
    deleteAccountBtn.addEventListener("click", function() {
        ajaxFunctions.ajaxRequest('DELETE', deleteProfileUrl, function() {
            // this will redirect the user back to homepage
            // once his account is deleted.
            console.log("In final get req to", appUrl);
            ajaxFunctions.ajaxRequest('GET', appUrl+"/");
        });
    })
})();