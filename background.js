var keys = "";
if(!window.localStorage){
	alert("你浏览器不支持些脚本！");
}else{
	var isSignIn = 1;
	keys = window.localStorage.getItem('keys');
	if(keys == "" || keys == null)
	{
		keys = "";
		window.localStorage.setItem('keys',keys);
	}
	
	chrome.extension.onConnect.addListener(function(port) {
		console.assert(port.name == "keywordsconnect");
		port.onMessage.addListener(function(msg) {
			
			if (msg.fun == "get")
			{
				port.postMessage({
					mykey: window.localStorage.getItem('keys'),
					recode:window.localStorage.getItem('recode'),
					flag:isSignIn
				});
			}
			else if(msg.fun == "Now")
			{
				//var now = new Date("2013-09-12 8:0:0");
				var now = new Date();
				window.localStorage.setItem("recode", now);
				//port.postMessage({
				//	success:window.localStorage.getItem('recode')
				//});
			}
			else
			{
				var tempStr = msg.fun;
				var pattern = /\|$/i;
				if(pattern.test(tempStr))
				{
					tempStr = tempStr.substring(0, tempStr.length-1)
				}
				
				window.localStorage.setItem('keys',tempStr);
				keys = tempStr;
			}
		});
	});

}
