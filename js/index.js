var siteName = document.getElementById('site');
var siteUrl = document.getElementById('url');
var submitBtn = document.getElementById('submitBtn');

submitBtn.onclick = addElement;

var infoArray;
if (localStorage.getItem('info') !== null) {
    infoArray = JSON.parse(localStorage.getItem('info'));
    display();
} else {
    infoArray = [];
}

siteName.addEventListener('input', realTimeValidation);
siteUrl.addEventListener('input', realTimeValidation);

function addElement() {
    if (siteName.value.trim() === "" || siteUrl.value.trim() === "" || siteName.value.length < 3 || !isValidUrl(siteUrl.value)) {
        Swal.fire({
            html: `
            <div class="points d-flex mb-5">
                <span><i class="fa-solid fa-circle mx-1 fs-5 text-danger"></i></span>
                <span><i class="fa-solid fa-circle mx-1 fs-5 text-warning"></i></span>
                <span><i class="fa-solid fa-circle mx-1 fs-5 text-success"></i></span>
            </div>
            <div class="text-start">
                <p class="warning-title mb-3">Site Name or Url is not valid, Please follow the rules below :</p>
                <p>Site name must contain at least 3 characters</p>
                <p>Site URL must be a valid one</p>
            </div>`,
            showCloseButton: true,
        });
        return;
    }

    var formattedName = capitalizeFirstLetter(siteName.value);

    info = {
        name: formattedName,
        url: siteUrl.value,
    };
    infoArray.push(info);
    localStorage.setItem('info', JSON.stringify(infoArray));
    display();
    reset();
}

function reset() {
    siteName.value = null;
    siteUrl.value = null;
}

function dltElement(index) {
    infoArray.splice(index, 1);
    display();
    localStorage.setItem('info', JSON.stringify(infoArray));
}

function viewSite(index) {
    var siteUrl = infoArray[index].url;
    window.open(siteUrl, "_blank");
}

function display() {
    var box = ``;
    for (var i = 0; i < infoArray.length; i++) {
        box += `<tr>
                        <th scope="row">${i}</th>
                        <td>${infoArray[i].name}</td>
                        <td><button type="button" class="btn btn-success btn-sm px-3" id="visit" onclick="viewSite(${i})"><i class="fa-regular fa-eye"></i> Visit</button></td>
                        <td><button type="button" class="btn btn-danger btn-sm px-3" onclick="dltElement(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
                      </tr>`;
    }
    document.getElementById('tableBody').innerHTML = box;
}

function isValidUrl(url) {
    var pattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)(\.[a-zA-Z]{2,})(\/\S*)?$/;
    return pattern.test(url);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function realTimeValidation() {
    if (siteName.value.length < 3) {
        siteName.style.boxShadow = "0 0 10px red"; 
    } else {
        siteName.style.boxShadow = "0 0 10px green";  
    }

   
    if (!isValidUrl(siteUrl.value)) {
        siteUrl.style.boxShadow = "0 0 10px red";  
    } else {
        siteUrl.style.boxShadow = "0 0 10px green"; 
    }
}