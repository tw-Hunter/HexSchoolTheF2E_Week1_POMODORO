$(document).ready(function () {
    //開始-暫停
    $('.btnPlay, .btnStop').click(function (e) {
        $('.btnPlay, .btnStop').toggle();
    });

    var counter;
    var Remaining = 0;
    //取得剩餘時間
    $('.btnPlay').click(function (e) {
        var CurrTime = $('.todoTime span').text();
        var strMin = CurrTime.split('：')[0];
        var strSec = CurrTime.split('：')[1];
        Remaining = (parseInt(strMin) * 60 * 1000) + (parseInt(strSec) * 1000);
        counter = setInterval(PomodoroWorking, 1000);
    });

    //暫停計時
    $('.btnStop').click(function (e) { 
        clearInterval(counter);
    });

    //番茄鐘倒數
    function PomodoroWorking() {
        if (Remaining < 0) {
            //番茄鐘停止計時
            clearInterval(counter);

            //休息時間
            $('.todoTime span').text('00：05');
            $('.main').css('background','#E5F3FF');
            $('.todoTime span').css('color', '#00A7FF');
            $('.outAction').css('border-color','#00A7FF');
            $('.innAction').css('background','#00A7FF');

            //休息時間倒數
            Remaining = 5000;
            counter = setInterval(Resting, 1000);
        }
        else {
            var strMin = Math.floor(((Remaining / 1000) / 60)).toString();
            strMin = padLeft(strMin,2);
            var strSec = Math.floor(((Remaining / 1000) % 60)).toString();
            strSec = padLeft(strSec,2);
            $('.todoTime span').text(strMin + '：' + strSec);
            Remaining = Remaining - 1000;
        }
    };
    //休息時間倒數
    function Resting() {
        if (Remaining < 0) {
            //番茄鐘停止計時
            clearInterval(counter);
        }
        else {
            var strMin = Math.floor(((Remaining / 1000) / 60)).toString();
            strMin = padLeft(strMin,2);
            var strSec = Math.floor(((Remaining / 1000) % 60)).toString();
            strSec = padLeft(strSec,2);
            $('.todoTime span').text(strMin + '：' + strSec);
            Remaining = Remaining - 1000;
        }        
    }

    //共用方法-PadLeft補0
    function padLeft(str,lenght){
        if(str.length >= lenght)
            return str;
        else
            return padLeft("0" +str,lenght);
    };
});