// AJAX資料
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send('');

xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);   //將資料轉為物件格式
    console.log(data)                         //確認是否撈到資料
}
// Name 景點名稱 Opentime 開放時間 Add 地址 
// Ticketinfo 是否免費參觀 Zone 區域 Tel 電話



// 綁定Dom元素
let selectArea = document.querySelector('.selectArea');
let selectPart = document.querySelectorAll('.selectPart'); //nodeList
let addLocation = document.querySelector('.addLocation');
let showLocation = document.getElementById('showLocation');
let hotPlace =document.querySelectorAll('.hotPlace__list__place') //nodeList
// let scrollTop =document.querySelector('.scrollTop')

// 渲染畫面
function clickHandler(e) {
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var dataArr = data['result']['records'];  //console.log(dataArr);
        var select = e.target.value;  //點擊當下value console.log(select)
        var insertHTML = '';
        for (i = 0; i < dataArr.length; i++) {
            if (select === dataArr[i].Zone) {
                insertHTML +=
                    `<div class="col-6 mb-4">
                    <div class=" d-flex locationImg justify-content-between align-items-end p-2" style="
                        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.20);background-image:url(${dataArr[i].Picture1})">
                        <p class="text-white h4 mb-0">${dataArr[i].Name}</p>
                        <p class="text-white mb-0">${dataArr[i].Zone}</p>
                    </div>
                    <ul class="locationContent mb-0 p-2" style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.20)">
                        <li>
                            <img src="../images/icons_clock.png" alt=""><span class="pl-2">${dataArr[i].Opentime}</span>
                        </li>
                        <li>
                            <img src="../images/icons_pin.png" alt=""><span class="pl-2">${dataArr[i].Add}</span>
                        </li>
                        <li class="d-flex justify-content-between">
                            <p><img src="../images/icons_phone.png" alt="" style="width: 16px;height: 20px;"><span
                                    class="pl-2">${dataArr[i].Tel}</span></p>
                            <p><img src="../images/icons_tag.png" alt=""><span class="pl-2">${dataArr[i].Ticketinfo}</span></p>
                        </li>
                    </ul>
                </div>`
            }
        }
        showLocation.innerHTML =select; 
        addLocation.innerHTML = insertHTML;
    }
}

// 事件監聽
selectArea.addEventListener('change',clickHandler);
for (let i = 0; i < selectPart.length; i++) {
    selectPart[i].addEventListener('click', clickHandler)
}
for(let i=0; i<hotPlace.length; i++){
    hotPlace[i].addEventListener('click',clickHandler)
}







