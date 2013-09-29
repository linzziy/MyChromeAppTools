/*----------------------------------------*\ 
 * 关键词高亮-问题反馈：lnjasony@gmail.com
\*----------------------------------------*/
	
(function () {

	var now = new Date();
	//alert();

	var port = chrome.extension.connect({
		name: "keywordsconnect"
	});
	port.postMessage({
		fun: "get"
	});
	port.onMessage.addListener(function(msg) {

		var mybody = document.getElementById('main');
		
		var keys = msg.mykey;		//关键字
		var isSignin = msg.flag;	//是否开启自动登录
		var onweek = msg.onweek;	//登录的时间，以周为单位
		if(keys && keys !== "")
		{
			HighlightKeyWords(document, keys);
		}
		// if(mybody)	//去用些功能
		// {
		//  alert('no');
		//  mybody = mybody.contentDocument;
		// }
		
		var recode = new Date(msg.recode);
		//var nowStr = now.getFullYear()+"-"+now.getDay()+"-"+now.getDate();
		//var recStr = recode.getFullYear()+"-"+recode.getDay()+"-"+recode.getDate()

		if(now.getDate() != recode.getDate())
		{
			if(isSignin && in_array(onweek, now.getDay()))	//需要开启且在设定日期之内
			{
				InitWebSite();
			}
		}
		//HighlightKeyWords(mybody, msg.mykey); 
	});
	
	SingIn();

})();

function SetSingIn()
{
	var port = chrome.extension.connect({
		name: "keywordsconnect"
	});
	//获取当前时间
	port.postMessage({
		fun: "Now"
	});
	port.onMessage.addListener(function(msg) {
		//alert(msg.success);
	});
}

function in_array(arr, num){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == num) return true;
	}
	return false;
}


function DateCompare(a, b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes > lktimes) {
        return true;
    }
    else
        return false;
}


function InitWebSite()
{
	SetSingIn();
	window.open('http://class.hujiang.com/home');
	window.open('http://bulo.hujiang.com/home');
}


/*----------------------------------------*\ 
 * 使用 javascript HTML DOM 高亮显示页面特定字词
 * 参数说明: HighlightKeyWords(o, flag, rndColor, url)
 * o: 对象, 要进行高亮显示的对象. 
 * flag: 字符串, 要进行高亮的词或多个词, 使用 竖杠(|) 分隔多个词 . 
 * rndColor: 布尔值, 是否随机显示文字背景色与文字颜色, true 表示随机显示. 
 * url: URI, 是否对高亮的词添加链接.  
\*----------------------------------------*/
function HighlightKeyWords(o, flag, rndColor, url) {
    var bgCor = fgCor = '';
    if (rndColor) {
        bgCor = fRndCor(10, 20);
        fgCor = fRndCor(230, 255);
    } else {
        bgCor = 'yellow';
        fgCor = 'black';
    }
    var re = new RegExp(flag, 'i');
	
    for (var i = 0; i < o.childNodes.length; i++) {
        var o_ = o.childNodes[i];
        var o_p = o_.parentNode;
        if (o_.nodeType == 1) {
            HighlightKeyWords(o_, flag, rndColor, url);
        } else if (o_.nodeType == 3) {
            if(!(o_p.nodeName == 'STYLE') && !(o_p.nodeName == 'SCRIPT'))
			{
				if (! (o_p.nodeName == 'A')) {   				
					if (o_.data.search(re) == -1) continue;
					var temp = fEleA(o_.data, flag);
					o_p.replaceChild(temp, o_);
				}
				else{
					if (o_.data.search(re) == -1) continue;
					var temp = fEleA(o_.data, flag);
					o_p.replaceChild(temp, o_);
				}
			}
        }
    }
    //------------------------------------------------ 
    function fEleA(text, flag) {
        var style = ' style="background-color:' + bgCor + ';color:' + fgCor + ';" '
        var o = document.createElement('span');
        var str = '';
        var re = new RegExp('(' + flag + ')', 'gi');
        if (url) {
            str = text.replace(re, '<a href="' + url + '$1"' + style + '>$1</a>'); //这里是给关键字加链接，红色的$1是指上面链接地址后的具体参数。
        } else {
            str = text.replace(re, '<span ' + style + '>$1</span>'); //不加链接时显示
        }
        o.innerHTML = str;
        return o;
    }
    //------------------------------------------------ 
    function fRndCor(under, over) {
        if (arguments.length == 1) {
            var over = under;
            under = 0;
        } else if (arguments.length == 0) {
            var under = 0;
            var over = 255;
        }
        var r = fRandomBy(under, over).toString(16);
        r = padNum(r, r, 2);
        var g = fRandomBy(under, over).toString(16);
        g = padNum(g, g, 2);
        var b = fRandomBy(under, over).toString(16);
        b = padNum(b, b, 2);
        //defaultStatus=r+' '+g+' '+b 
        return '#' + r + g + b;
        function fRandomBy(under, over) {
            switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * under + 1);
            case 2:
                return parseInt(Math.random() * (over - under + 1) + under);
            default:
                return 0;
            }
        }
        function padNum(str, num, len) {
            var temp = ''
            for (var i = 0; i < len; temp += num, i++);
            return temp = (temp += str).substr(temp.length - len);
        }
    }
}

function SingIn()
{
	//SetSingIn();
	
	//===================================================
	var href = window.location.href;
	var r1 = /bulo.hujiang.com\/home/ig;
	var r2 = /class.hujiang.com\/home/ig;
	var r3 = /mis.hujiang.com/ig;
	if(r1.test(href))
	{
		var  btn = document.getElementById("btn_card_do");
		if(btn != null)
		{
			btn.click();
		}
	}
	if(r2.test(href))
	{
		var  btn = document.getElementById("btnClassCard");
		if(btn != null)
		{
			btn.click();
		}
	}
	if(r3.test(href))
	{
		var  btn = document.getElementById("btn_card");
		if(btn != null)
		{
			btn.click();
		}
	}
}
