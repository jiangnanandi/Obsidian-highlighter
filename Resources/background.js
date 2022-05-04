var userAgentString = navigator.userAgent;
var chromeAgent = userAgentString.indexOf("Chrome") > -1;
if(chromeAgent){var useBrowser = chrome}else{var useBrowser = browser}

useBrowser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello background")
        sendResponse({ farewell: "goodbye" });
});

useBrowser.browserAction.onClicked.addListener(function(activeTab) {
    //将脚本注入到页面
    useBrowser.tabs.executeScript(null, {file: "highlighter.js"});
//    useBrowser.tabs.query({active: true, currentWindow: true}, function(tabs){
//        useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'showHideSideWindow'});
//    });
});

function onError(error) {
    console.error(`Error: ${error}`);
}


//console.log('has: ', browser.commands.onCommand.hasListener(command));
useBrowser.commands.onCommand.addListener(function (command) {
    if(command == "add-double-brackets") {
        useBrowser.tabs.query({active: true, currentWindow: true}, function(tabs){
            useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'addDoubleBrackets'});
        });
    }
    else if (command =="remove-all-highlights") {
        useBrowser.tabs.query({active: true, currentWindow: true}, function(tabs){
            useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'removeAllHighlights'})
        });
    }
    else if(command == "convert-to-header") {
        //监听到注册的命令后，browser.tabs.query 查找当前的 tab(tab[0])，并给他发送消息
        //browser.tabs.sendMessage 从 background scripts 中发送单个消息到任何带着扩展脚本的 Tab 中。
        useBrowser.tabs.query({active: true, currentWindow: true}, function (tabs) {
            useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'convertToHeader'});
        });
    }else if (command == "export-to-obsidian"){
        //导出到 Obsidian
        useBrowser.tabs.query({active: true, currentWindow: true}, function (tabs) {
            useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'exportToObsidian'});
        });
//    }else if(command == "show-hide-side-window"){
//        useBrowser.tabs.query({active: true, currentWindow: true}, function(tabs){
//            useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'showHideSideWindow'});
//        });
    }else {
        //alert("No Match To Commands!");
    }
});

