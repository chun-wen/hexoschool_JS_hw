// 最終目的：設計BMI檢測機器，將結果渲染在網頁上，並使用localStorage儲存資料

//dom元素宣告
var inputHeight = document.querySelector('#inputHeight');
var inputWeight = document.querySelector('#inputWeight');
var submit = document.querySelector('#submit');
var submitButton = document.querySelector('#submitButton');
var List = document.querySelector('#List');

//宣告BMIdata等於localStorage中的陣列；如果本身有資料的話，就去localStorage中尋找key名為BMIdataList的陣列；如果沒有，就宣告為空陣列
var BMIdata = JSON.parse(localStorage.getItem('BMIdataList')) || [];

var submitArea = document.querySelector('.submit-area');
var yourResult = document.querySelector('.your-result');

updateData(BMIdata);
//網頁開啟時預設頂部狀態結果區域不可見
yourResult.style.display = "none";



//綁定監聽


submitButton.addEventListener('click', addData);


List.addEventListener('click', deleteData);

inputHeight.addEventListener('keydown', addDataByKey);
inputWeight.addEventListener('keydown', addDataByKey);

function addDataByKey(e) {
  if (e.keyCode !== 13) {
    return;
  } else {
    if (inputHeight.value !== "" && inputWeight.value !== "") {
      console.log('ready');
    }
  }
}




// 方法


// 計算BMI數值並增加進LocalStorage的方法
function addData(e) {
  //刪除a連結預設效果
  e.preventDefault();
  //變數定義
  //特別注意身高公分公尺的單位轉換
  var yourHeight = parseFloat(inputHeight.value / 100);
  var yourWeight = parseFloat(inputWeight.value);
  //BMI計算公式，並四捨五入取小數點後一位(運算的時候使用float型別下去運算)
  var yourBMI = parseFloat((yourWeight / (yourHeight * yourHeight)).toFixed(2));

  var yourStatus = "";
  //宣告today是今日日期
  var today = new Date();
  //擷取需要的年月日部分
  var testDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  var BMIlist = {
    //紀錄身高體重的時候使用int型別紀錄避免出錯
    Height: parseInt(yourHeight * 100),
    Weight: parseInt(yourWeight),
    BMI: yourBMI,
    Status: yourStatus,
    Date: testDate

  };

  //檢查任一輸入皆不可為空，並用空白替代掉所有<>，防外來代碼
  if (inputHeight.value.replace(/[<>]/g, "") == "" || inputWeight.value.replace(/[<>]/g, "") == "") {
    alert('請輸入身高與體重！');
    return;
  } else { //判斷BMI等級
    if (18.5 > yourBMI) {
      // 將物件中的狀態屬性更改成過輕記錄下來
      BMIlist.Status = "過輕";
      BMIdata.push(BMIlist);
      updateData(BMIdata);
      //將新的BMIlist物件轉換成文字形別，儲存進localStorage新建的BMIdataList(key)中
      localStorage.setItem('BMIdataList', JSON.stringify(BMIdata));

    } else if (25 > yourBMI && yourBMI >= 18.5) {
      BMIlist.Status = "理想";
      BMIdata.push(BMIlist);
      updateData(BMIdata);//刷新網頁
      localStorage.setItem('BMIdataList', JSON.stringify(BMIdata));

    } else if (30 > yourBMI && yourBMI >= 25) {
      BMIlist.Status = "過重";
      BMIdata.push(BMIlist);
      updateData(BMIdata);
      localStorage.setItem('BMIdataList', JSON.stringify(BMIdata));

    } else if (35 > yourBMI && yourBMI >= 30) {
      BMIlist.Status = "輕度肥胖";
      BMIdata.push(BMIlist);
      updateData(BMIdata);
      localStorage.setItem('BMIdataList', JSON.stringify(BMIdata));

    } else if (40 > yourBMI && yourBMI >= 35) {
      BMIlist.Status = "中度肥胖";
      BMIdata.push(BMIlist);
      updateData(BMIdata);
      localStorage.setItem('BMIdataList', JSON.stringify(BMIdata));

    } else if (yourBMI > 40) {
      BMIlist.Status = "重度肥胖";
      BMIdata.push(BMIlist);
      updateData(BMIdata);
      localStorage.setItem('BMIdataList', JSON.stringify(BMIdata));

    } else {
      console.log('failed');
    }
  }

  //看結果按鈕顯示設定為不顯示
  submit.style.display = "none";
  //頂部結果區域顯示設定為flex
  yourResult.style.display = "flex";
  //BMI數值設定為運算數值
  document.querySelector('.BMI-result').textContent = yourBMI;
  //狀態數值設定為狀態
  document.querySelector('.your-Status').textContent = BMIlist.Status;
  document.querySelector('.reflesh-button').addEventListener('click', reflesh);


  //判斷顏色區域
  //宣告外圈區域
  var resultArea = document.querySelector('.result-area');
  var StatusColor = "";
  if (BMIlist.Status == "理想") {
    StatusColor = "color-Health";
    resultArea.classList.add(StatusColor);
  } else if (BMIlist.Status == "過輕") {
    StatusColor = "color-UnderWeight";
    resultArea.classList.add(StatusColor);

  } else if (BMIlist.Status == "過重") {
    StatusColor = "color-OverWeight";
    resultArea.classList.add(StatusColor);

  } else if (BMIlist.Status == "輕度肥胖") {
    StatusColor = "color-MildObesity";
    resultArea.classList.add(StatusColor);

  } else if (BMIlist.Status == "中度肥胖") {
    StatusColor = "color-ModerateObesity";
    resultArea.classList.add(StatusColor);

  } else if (BMIlist.Status == "重度肥胖") {
    StatusColor = "color-SevereObesity";
    resultArea.classList.add(StatusColor);

  } else {
    alert('wrong!');
  }
  //取得邊框顏色色碼
  var StatusWordColor = window.getComputedStyle(document.querySelector('.result-area')).getPropertyValue('border-color');
  //賦予色碼給狀態文字與刷新按鈕
  document.querySelector('.reflesh-button').style.backgroundColor = StatusWordColor;
  document.querySelector('.your-Status').style.color = StatusWordColor;

};

function reflesh(e) {
  //刪除預設連結功能
  e.preventDefault();
  //設定submit的樣式顯示為flex
  submit.style.display = "flex";
  yourResult.style.display = "none";
  var resultArea = document.querySelector('.result-area');
  //重新設置樣式(剔除顏色)
  resultArea.setAttribute('class', 'result-area animated fadeInRight');
  //清空輸入框
  inputHeight.value = "";
  inputWeight.value = "";

}


//更新網頁的方法
function updateData(items) {


  var len = items.length;
  var str = "";
  var yourBMIcolor = "";

  for (i = 0; i < len; i++) {
    //判別列表邊框顏色
    if (items[i].Status == "理想") {
      yourBMIcolor = "border-health";
    } else if (items[i].Status == "過重") {
      yourBMIcolor = "border-overWeight";
    } else if (items[i].Status == "輕度肥胖") {
      yourBMIcolor = "border-mildObesity";
    } else if (items[i].Status == "中度肥胖") {
      yourBMIcolor = "border-moderateObesity";
    } else if (items[i].Status == "重度肥胖") {
      yourBMIcolor = "border-severeObesity";
    } else if (items[i].Status == "過輕") {
      yourBMIcolor = "border-underWeight";
    }
    //拼結果
    str += '<li class="' + yourBMIcolor + '"><div>' + items[i].Status + '</div><div><small>BMI</small>' + items[i].BMI + '</div><div><small>weight</small>' + items[i].Weight + 'kg</div><div><small>height</small>' + items[i].Height + 'cm</div><div class="date">' + items[i].Date + '</div><div><a class ="deleteData" data-index=' + i + '>delete</a></div></li>';
  }
  //塞html
  List.innerHTML = str;

};


//刪除資料的方法
function deleteData(e) {

  e.preventDefault();
  //如果被點擊的不是A連結，則返回

  if (e.target.nodeName !== 'A') {
    return
  }

  //宣告index為data-index的值
  var index = e.target.dataset.index;

  BMIdata.splice(index, 1);
  //將BMIdata轉文字儲存進localStorage之中,並設定名稱是BMIdataList
  localStorage.setItem('BMIdataList', JSON.stringify(BMIdata));

  updateData(BMIdata);

};



// 動態載入className 跟animation效果

// 切換回原本button

// 列表能夠儲存在localStorage中
