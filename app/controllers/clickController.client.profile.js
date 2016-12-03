`use strict`;

// this file will be added via script tag

(function(){
    var deleteAccountBtn = document.querySelector("#deleteAccountBtn");
    
    deleteAccountBtn.addEventListener("click", function() {
        ajaxFunctions.ajaxRequest('DELETE', apiUrl, function (res) { console.log("Response came from dabtn:", res);});
    })
})();