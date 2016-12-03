`use strict`;

// this file will be added via script tag

(function(){
    var deleteAccountBtn = document.querySelector("#deleteAccountBtn"),
        deleteProfileUrl = appUrl + '/profile';
    
    deleteAccountBtn.addEventListener("click", function() {
        ajaxFunctions.ajaxRequest('DELETE', deleteProfileUrl, function (res) { console.log("Response came from dabtn:", res);});
    })
})();