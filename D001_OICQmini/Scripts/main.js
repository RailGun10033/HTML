window.onload = function(){
    var url = 'Resource/frendship.json'
    var request = new XMLHttpRequest();
    request.open('get', url)
    request.send(null);
    let json;
    request.onload = function(){
        if (request.status == 200) {
            json = JSON.parse(request.responseText);
            console.log(json);
            displayContactList(json);
        }
    }  
}

function displayContactList(frendInfo) {
    console.log()
}