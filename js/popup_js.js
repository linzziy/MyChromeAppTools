var bgpg;
$(function(){
	if(!window.localStorage){
		$("#content").val('你浏览器不支持些脚本！');
	}else{
		bgpg = chrome.extension.getBackgroundPage();
		
		console.info(bgpg.keys);
		
		$("#content").val(bgpg.keys);
	}
	
	$("#KeyWordsBtn").click(function(){
		
		var port = chrome.extension.connect({
			name: "keywordsconnect"
		});
		port.postMessage({
			fun: $("#content").val()
		});
		
		alert("保存成功！");
	});
	
	$("#FormatBtn").click(function(){
		var txt = $("#content").val();
		
		txt = txt.replace(/style="(.*?)"/ig, "");
		txt = txt.replace(/<div[ ]?>(.*)<\/div>/ig, "<p>$1</p>");
		txt = txt.replace(/(<pre)(>[\s\S]+?<\/pre>)/ig, "$1 class=\"brush:csharp\"$2");

		$("#content").val(txt);
	});
	
	$("#CourseID").click(function(){
		var txt = $("#content").val();
		
		txt = txt.match(/(\d{6})/ig);
		//txt = txt.replace(/(\d{6})/ig, "$1,");
		//txt.replace(/\n/ig, "");
		
		$("#content").val(txt);
	});
	
	/*
	$("input.isSingin").change(function(){

		alert($(this).attr("checked");
	});
	*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$("#SignIn").click(function(){	//window.open('http://www.google.com','Derek','width=1024,height=768,status=yes,toolbar=yes,menubar=no,location=no');
		window.open('http://class.hujiang.com/home');
		window.open('http://bulo.hujiang.com/home');
	});
});
