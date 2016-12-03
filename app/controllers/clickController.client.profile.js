`use strict`;

// this file will be added via script tag

(function(){
    var deleteAccountBtn = document.querySelector("#deleteAccBtn"),
        deleteProfileUrl = appUrl + '/profile';
    
    deleteAccountBtn.addEventListener("click", function() {
        ajaxFunctions.ajaxRequest('DELETE', deleteProfileUrl, function() {
            ajaxFunctions.ajaxRequest('GET', appUrl);
        });
    })
})();