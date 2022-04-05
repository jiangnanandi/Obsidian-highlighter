//Date: 2021.12.21
var verNum = '1.1.2'; //Indenting bug in Slack chat
var getPage = location.href;
var iframeDoc = document;

//-1 = Only for current item you are testing... never leave these permanently
//0 = [Default] Don't show debug
//1 = Show all log items marked logLevel = 1
//2 = Show all log items marked logLevel 1 & 2
//3 = Show all log items (Full Verbose)
var debugMode = 3;
var consoleTabLevel = '';


//本地存储的默认设置
var sameBlock = Number(0);
var parentTitleArr =
[
    ['*NONE',''],
    ['*Roam','[{%title%}]({%url%}) #[[Roam-Highlights]]'],
    ['*Obsidian','[{%title%}]({%url%}) [[Obsidian-Highlights]]'],
    ['*All Placeholders','[{%title%}]({%url%}) {%date%} {%time%} ... TRUNCATE TITLE BY ADDING @ followed by character(s) to cutoff at ex. {%title@-%} ... FORMAT DATES ex. {%date@mm-dd-yyyy%} or {%date@day month dd, yyyy%} or Roam date [[{%date@roam%}]]']
];
var parentTitle = parentTitleArr[1][2];
var sideWidth = "20%";
var sideHeight = "30%";
var showWindow = Number(1);
var formatBold = '**';
var formatItalics = '__';
var formatStrike = '~~';
var formatInsert = formatBold;
var formatCode = '`';
var formatBullets = '- ';
var bHeaders = true;
var bIndents = true;
var bLinks = true;
var bAutoHL = false;
var pgRefCase = Number(0);
var elipOpt = Number(0);
var obsidianVault = "";
var obsidianPath ="";


var pageTitle = document.title.toString();
var roamHighlighterLoaded;
var veryFirstRun = 1;

function writeToConsole(textString, logLevel = 1, tabLevel = 1, alwaysShow = "no")
{
    if(alwaysShow == "yes" || (debugMode == -1 && logLevel == -1) || (debugMode == 1 && logLevel == 1) || (debugMode == 2 && logLevel <= 2) || debugMode == 3)
    {
        var finalTextString = textString;
        if(tabLevel != 0){finalTextString = consoleTabLevel + textString;}
        console.log(finalTextString);
    }
}


//See if using Chrome or Firefox
if(typeof userAgentString === "undefined")
{
    writeToConsole('userAgentString loaded',-1);
    var userAgentString = navigator.userAgent;
    var chromeAgent = userAgentString.indexOf("Chrome") > -1;
    if(chromeAgent){var useBrowser = chrome}else{var useBrowser = browser}
}


async function getLocalStorageValue(varName)
{
    return new Promise((resolve, reject) => {
        try
        {
            if(typeof useBrowser  === "undefined"){
                var chromeAgent = userAgentString.indexOf("Chrome") > -1;
                if(chromeAgent){useBrowser = chrome}else{useBrowser = browser}
            }
            writeToConsole('useBrowser.storage'+useBrowser.storage);
            useBrowser.storage.local.get(varName, function (value){resolve(value);})
        }
        catch(ex)
        {
            reject(ex);
        }
    });
}

function setLocalStorageValue(varName, varValue)
{
    useBrowser.storage.local.set({[varName]:varValue}, function(){});
}

async function startFunction(){
    if(debugMode != 0)
    {
        writeToConsole("sameBlock: " + sameBlock,-1);
        writeToConsole("sideWidth: " + sideWidth,-1);
        writeToConsole("sideHeight: " + sideHeight,-1);
        writeToConsole("showWindow: " + showWindow,-1);
        writeToConsole("formatBold: " + formatBold,-1);
        writeToConsole("formatItalics: " + formatItalics,-1);
        writeToConsole("formatCode: " + formatCode,-1);
        writeToConsole("bHeaders: " + bHeaders,-1);
        writeToConsole("formatBullets: " + formatBullets,-1);
        writeToConsole("bIndents: " + bIndents,-1);
        writeToConsole("bLinks: " + bLinks,-1);
        writeToConsole("bAutoHL: " + bAutoHL,-1);
        writeToConsole("pgRefCase: " + pgRefCase,-1);
        writeToConsole("elipOpt: " + elipOpt,-1);
        writeToConsole("parentTitleArr: " + parentTitleArr,-1);
        writeToConsole("parentTitle: " + parentTitle,-1);
        /* //以下 Kindle 相关暂时屏蔽
        writeToConsole("kindleHLref: " + kindleHLref,-1);
        writeToConsole("bLocation: " + bLocation,-1);
        writeToConsole("bColor: " + bColor,-1);
        writeToConsole("bColorRef: " + bColorRef,-1);
        writeToConsole("kindleHLstructure: " + kindleHLstructure,-1); */
        writeToConsole("obVault: " + obsidianVault,-1);
        writeToConsole("obPath: " + obsidianPath,-1);

    }

    //循环数组从 browser.storage.local 获取存储的值
    var settingsArray = [
        "sameBlock", "sideWidth", "sideHeight", "showWindow", "formatBold",
        "formatItalics", "formatCode", "bHeaders", "formatBullets", "bIndents",
        "bLinks", "bAutoHL", "pgRefCase", "elipOpt", "parentTitleArr", "parentTitle",
        "obsidianVault","obsidianPath",
        // "kindleHLref", "bLocation", "bColor", "bColorRef", "kindleHLstructure" //kindle 先关暂时屏蔽
    ];

    for(var s = 0; s < settingsArray.length; s++)
    {
        var storageVar = settingsArray[s];
        var storResult = await getLocalStorageValue(storageVar);
        var varResult = storResult[Object.keys(storResult)[0]];
        if(debugMode != 0)
        {
            writeToConsole("storageVar: " + storageVar,-1);
            writeToConsole("localStorageResult: " + varResult,-1);
        }

        switch(storageVar)
        {
            case "sameBlock":
                if(varResult !== undefined){sameBlock = varResult;}
                setLocalStorageValue("sameBlock", sameBlock);
                break;
            case "sideWidth":
                if(varResult !== undefined){sideWidth = varResult;}
                setLocalStorageValue("sideWidth", sideWidth);
                break;
            case "sideHeight":
                if(varResult !== undefined){sideHeight = varResult;}
                setLocalStorageValue("sideHeight", sideHeight);
                break;
            case "showWindow":
                if(varResult !== undefined){showWindow = varResult;}
                setLocalStorageValue("showWindow", showWindow);
                break;
            case "formatBold":
                if(varResult !== undefined){formatBold = varResult;}
                setLocalStorageValue("formatBold", formatBold);
                break;
            case "formatItalics":
                if(varResult !== undefined){formatItalics = varResult;}
                setLocalStorageValue("formatItalics", formatItalics);
                break;
            case "formatCode":
                if(varResult !== undefined){formatCode = varResult;}
                setLocalStorageValue("formatCode", formatCode);
                break;
            case "bHeaders":
                if(varResult !== undefined){bHeaders = varResult;}
                setLocalStorageValue("bHeaders", bHeaders);
                break;
            case "formatBullets":
                if(varResult !== undefined){formatBullets = varResult;}
                setLocalStorageValue("formatBullets", formatBullets);
                break;
            case "bIndents":
                if(varResult !== undefined){bIndents = varResult;}
                setLocalStorageValue("bIndents", bIndents);
                break;
            case "bLinks":
                if(varResult !== undefined){bLinks = varResult;}
                setLocalStorageValue("bLinks", bLinks);
                break;
            case "bAutoHL":
                if(varResult !== undefined){bAutoHL = varResult;}
                setLocalStorageValue("bAutoHL", bAutoHL);
                break;
            case "pgRefCase":
                if(varResult !== undefined){pgRefCase = varResult;}
                setLocalStorageValue("pgRefCase", pgRefCase);
                break;
            case "elipOpt":
                if(varResult !== undefined){elipOpt = varResult;}
                setLocalStorageValue("elipOpt", elipOpt);
                break;
            case "parentTitleArr":
                if(varResult !== undefined){parentTitleArr = varResult;}
                /*parentTitleArr =
                [
                    ['*NONE',''],
                    ['*Roam','[{%title%}]({%url%}) #[[Roam-Highlights]]'],
                    ['*Obsidian','[{%title%}]({%url%}) [[Obsidian-Highlights]]'],
                    ['*All Placeholders','[{%title%}]({%url%}) {%date%} {%time%}']
                ];*/
                setLocalStorageValue("parentTitleArr", parentTitleArr);
                break;
            case "parentTitle":
                if(varResult !== undefined){parentTitle = varResult;}
                //parentTitle = parentTitleArr[1][1];
                setLocalStorageValue("parentTitle", parentTitle);
                break;

            case "obsidianVault":
                if(varResult != undefined){obsidianVault = varResult;}
                setLocalStorageValue("obsidianVault",obsidianVault);
                break;
            case "obsidianPath":
                if(varResult != undefined){obsidianPath = varResult;}
                setLocalStorageValue("obsidianPath", obsidianPath);
                break;

            /* case "kindleHLref": //kindle 相关暂时屏蔽
                if(varResult !== undefined){kindleHLref = varResult;}
                setLocalStorageValue("kindleHLref", kindleHLref);
                break;
            case "bLocation":
                if(varResult !== undefined){bLocation = varResult;}
                setLocalStorageValue("bLocation", bLocation);
                break;
            case "bColor":
                if(varResult !== undefined){bColor = varResult;}
                setLocalStorageValue("bColor", bColor);
                break;
            case "bColorRef":
                if(varResult !== undefined){bColorRef = varResult;}
                setLocalStorageValue("bColorRef", bColorRef);
                break;
            case "kindleHLstructure":
                if(varResult !== undefined){kindleHLstructure = varResult;}
                setLocalStorageValue("kindleHLstructure", kindleHLstructure);
                break; */
        }
    }

    //主函数调用
    mainFunction();

    var sideWindow = document.getElementById('rmHLiframe');
    if(showWindow == 0){sideWindow.style.setProperty('display', 'none');}
}

// 1.初始化各种存储，并执行 mainFunction()
startFunction()

// 2.主函数，包括相关函数也在这里
// 2.1 创建右下角显示区域
// 2.2 响应各种 Command 命令（对应注册的快捷键）
//2.3 监听 cut 事件，获取选中的文本，并使之高亮显示
//2.4 监听鼠标选取事件，以实现「自动高亮」功能监听鼠标选取事件，以实现「自动高亮」功能
//2.5 处理鼠标点击「高亮」内容的操作，包括移除高亮和增加高亮
//2.6 alt + ctrl 鼠标右键，调整 header 层级 相当于选中后 alt+A
//2.7 双击创建「双相连接」
function mainFunction(){
    if(typeof roamHighlighterLoaded !== "undefined" || getPage.includes('roamresearch.com'))
    {
        //Variable already present/set so therefore do not need to run again as don't want to duplicate load the Javascript code
        if(roamHighlighterLoaded == 1)
        {
            var divElemMain = document.getElementById('rmHLiframe');
            iframeDoc = divElemMain.contentWindow.document;
            if(divElemMain.style.display != "none")
            {
                divElemMain.style.setProperty('display', 'none');
                showWindow = 0;
                setLocalStorageValue("showWindow", showWindow);
            }
            else
            {
                divElemMain.style.setProperty('display', 'block');
                showWindow = 1;
                setLocalStorageValue("showWindow", showWindow);
            }
        }
        else
        {
            //On Roam website so will not load highlighter but need to set this variable so no console error after mainFunction() ran
            showWindow = 1;
        }
    }
    else
    {
        roamHighlighterLoaded = 1;
        //变量用于查看是否由点击事件（删除高光）或由用户添加高光的 "剪切 "事件开始。
        //部分操作需要键盘+点击
        var clickEvent = 0;

        var kindleClickEvent = 0;
        //计算被选中的高亮有多少条，然后创建 Span 标题，以便可以合并同一亮点，即使出现断行
        //highlightCtr 当前页面全局
        var highlightCtr = 0;

        console.log('Loaded highlighter.js script v' + verNum);

        //创建新元素
        function createNewElement(fElemType,fElemVal,fElemFor,fElemCss,fAppendTo,fElemId,fElemName)
        {
            if(fElemType != 'checkbox'){var fElem = document.createElement(fElemType);}

            switch (fElemType)
            {
                case 'label':
                    fElem.innerHTML = fElemVal;
                    fElem.htmlFor = fElemFor;
                    break;
                case 'textarea':
                    fElem.value = fElemVal;
                    fElem.id = fElemId;
                    fElem.name = fElemName;
                    break;
                case 'select':
                    fElem.id = fElemId;
                    fElem.name = fElemName;
                    break;
                case 'input':
                    fElem.value = fElemVal;
                    fElem.id = fElemId;
                    fElem.name = fElemName;
                    break;
                case 'checkbox':
                    var fElem = document.createElement('input');
                    fElem.setAttribute("type", "checkbox");
                    fElem.id = fElemId;
                    fElem.name = fElemName;
                    break;
                case 'span':
                    fElem.innerHTML = fElemVal;
                    fElem.htmlFor = fElemFor;
                    break;
                case 'a':
                    fElem.innerText = fElemVal;
                    break;
                case 'button':
                    fElem.innerHTML = fElemVal;
                    fElem.id = fElemId;
                    fElem.name = fElemName;
                    break;
            }

            fElem.style.cssText = fElemCss;
            fAppendTo.appendChild(fElem);

            return fElem;
        }

        //2.1 创建右下角显示区域
        //2.1.1 创建 iFrame
        {
            //创建右下角 iFrame 区域
            var iframeElem = document.createElement('iframe');
            iframeElem.id = 'rmHLiframe';
            iframeElem.style.setProperty('display', 'none');
            iframeElem.style.cssText = 'position:fixed;bottom:3px;right:3px;width:' + sideWidth + ';height:' + sideHeight + ';opacity:0.8;z-index:9999;font-size:12px;line-height:normal;border-bottom:1px solid black;border-top:none;border-left:none;border-right:none;';
            document.body.appendChild(iframeElem);
            iframeDoc = iframeElem.contentWindow.document;
            iframeDoc.body.style.cssText = 'margin:0px;';
            var divElem = iframeDoc.body;

            //创建顶部按钮区域div（最小化/隐藏/换行/设置）
            var divButtonsElem = document.createElement('div');
            divButtonsElem.id = 'rmHLdivButt';
            divButtonsElem.style.cssText = 'width:100%;display:flex;height:30px';
            divElem.appendChild(divButtonsElem);

            //创建右侧展示高亮原文的区域 div
            var divTextElem = document.createElement('div');
            divTextElem.id = 'rmHLdivText';
            divTextElem.style.cssText = 'width:100%;height:calc(100% - 31px);float:right';
            divElem.appendChild(divTextElem);

            //2.1.2 iframe 中创建 setting 的左侧区域
            var divSetElem = document.createElement('div');
            divSetElem.id = 'rmHLdivSett';
            //TODO:默认是不显示的 display:none
            divSetElem.style.cssText = 'width:50%;height:calc(100% - 31px);display:none;float:left';
            divElem.appendChild(divSetElem);

            //创建 setting 中的主要 div 组件
            var formElem = document.createElement('div');
            formElem.id = 'rmHLform';
            formElem.style.cssText = 'width:55%;height:calc(100% - 30px);background-color:white;padding:15px;float:left;border-left:1px solid black;border-top:1px solid black';
            divSetElem.appendChild(formElem);

            //TODO：Kindle settings DIV  将来考虑去掉
            var divKindle = document.createElement('div');
            divKindle.id = 'rmHLdivKindle';
            divKindle.style.cssText = 'width:45%;height:calc(100% - 30px);background-color:white;padding:15px;float:left;border-top:1px solid black';
            divSetElem.appendChild(divKindle);
        }
        //2.1.2 创建左侧 Main 区域
        {
            //创建第一行「清除按钮」和「自动高亮选项框」
            {
                //在 rmHLform 中创建「清除标记」按钮，并绑定点击事件
                var butClearAll = createNewElement('button','清楚所有高亮','','background-color:black;color:white;border-color:white;margin-left:0px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;vertical-align:bottom',formElem,'rmHLclear','rmHLclear');
                butClearAll.addEventListener("click", function(){
                    removeAllHighlights();
                });

                //创建 checkbox 勾选是否自动高亮
                var labelElemAutoHL = createNewElement('label','自动高亮','rmHLcbAutoHL','font-size:12px;line-height:normal;margin-left:15px;margin-bottom:7px;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var cbElemAutoHL = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;margin-bottom:-2px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbAutoHL','rmHLcbAutoHL');
                if(bAutoHL){cbElemAutoHL.checked = true;}else{cbElemAutoHL.checked = false;}
            }
            
            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));

            //创建「Parent Title Format」设置区域
            {
                var labelElemPT = createNewElement('label','父标题格式 - 可以在下方自定义','rmHLparentTitle','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                formElem.appendChild(document.createElement('br'));
                var selElemPT = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:225px;max-width:225px;width:225px',formElem,'rmHLparentTitle','rmHLparentTitle');

                var arrLength = parentTitleArr.length;
                for (var i = 0; i < arrLength; i++)
                {
                    selElemPT.options.add( new Option(parentTitleArr[i][0],parentTitleArr[i][1]) );
                }
                selElemPT.value = parentTitle;

                //监听 change 事件，让「保存」按钮变成可点击，并且替换  textarea 元素中内容（Parent Title for Highlights）
                selElemPT.addEventListener("change", function(evt){
                    var selElemPT = evt.target;
                    var textElem2 = iframeDoc.getElementById("rmHLta2");
                    textElem2.value = selElemPT.value;
                    parentTitle = textElem2.value;
                    var butSave = iframeDoc.getElementById("rmHLsave");
                    butSave.style.backgroundColor = 'blue';
                    butSave.click();
                });

                //TODO:创建 save 按钮和 id='rmHLta2' 的 textarea
                
                //添加和删除按钮
                var butAdd = createNewElement('button','Add','','background-color:grey;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:default;padding:5px;margin-left:10px;',formElem,'rmHLadd','rmHLadd');
                var butDel = createNewElement('button','Delete','','background-color:crimson;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;margin-left:10px;',formElem,'rmHLdel','rmHLdel');
                //添加/删除，自定义的「title」格式
                //TODO:待补充功能
                //点击后，在「Parent Title Format」区域新增一个「自定义」选项
                butAdd.addEventListener("click", function(evt){
                    var butAdd = evt.target;
                    //灰色不可点击
                    if(butAdd.style.backgroundColor == 'grey'){return;}
                    //获取用户自定义输入内容
                    var textElem2 = iframeDoc.getElementById("rmHLta2");
                    var textElem2Val = textElem2.value;
                    var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
                    parentTitle = textElem2Val;
                    //Calling the butSave.click after the prompt was causing issues (probably async related) to where teh 'cut' event wouldn't fire from butSave.click if waited on the prompt for a few seconds.
                    //点击保存按钮
                    var butSave = iframeDoc.getElementById("rmHLsave");
                    butSave.style.backgroundColor = 'blue';
                    butSave.click();
                    //要求用户输入「自定义的选项」名称
                    var itemDesc = prompt("Enter a short description to save for future.", "New");
                    if(itemDesc == '' || itemDesc == null){itemDesc = 'Saved without a name'}
                    parentTitleArr.push([itemDesc,textElem2Val]);
                    //新增选项并默认选中
                    selElemPT.options.add( new Option(itemDesc,textElem2Val) );
                    selElemPT.value = textElem2Val;
                    //按钮恢复不可点击
                    butAdd.style.backgroundColor = 'grey';
                    butAdd.style.cursor = 'default';
                    //本地存储
                    setLocalStorageValue("parentTitle", parentTitle);
                    setLocalStorageValue("parentTitleArr", parentTitleArr);
                });
                //TODO:待补充功能
                butDel.addEventListener("click", function(evt){
                    //获取用户输入的内容
                    var textElem2 = iframeDoc.getElementById("rmHLta2");
                    var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
                    var selIndex = selElemPT.selectedIndex;
                    if(selIndex <= 3)
                    {
                        window.alert("Cannot delete default items!");
                        return;
                    }
                    //移除选中元素，并选中最后一个选项
                    parentTitleArr.splice(selIndex, 1);
                    selElemPT.remove(selIndex);
                    if(selIndex >= selElemPT.length){selIndex = selElemPT.length - 1};
                    selElemPT.selectedIndex = selIndex;
                    textElem2.value = selElemPT.value;
                    parentTitle = textElem2.value;
                    //点击保存按钮
                    var butSave = iframeDoc.getElementById("rmHLsave");
                    butSave.style.backgroundColor = 'blue';
                    butSave.click();
                });
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            // Parent Title for Highlights 区域
            {
                //父标题 label
                var labelElem2 = createNewElement('label','设置父标题的样式','rmHLta2','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
                //隐藏的一个选项框，记录是否修改了「父标题」，默认 true
                var cbElemPgTitle = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto;display:none',formElem,'rmHLcbPgTitle','rmHLcbPgTitle');
                cbElemPgTitle.checked = true;

                formElem.appendChild(document.createElement('br'));
                //父标题输入框
                var textElem2 = createNewElement('textarea',parentTitle,'','width:90%;min-height:auto;height:auto;max-height:none;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;padding:5px',formElem,'rmHLta2','rmHLta2');
                textElem2.rows = 2;
                //如果有输入，add 按钮可点击
                textElem2.addEventListener("input", function(evt){
                    var butAdd = iframeDoc.getElementById("rmHLadd");
                    butAdd.style.backgroundColor = 'green';
                    butAdd.style.cursor = 'pointer';
                });
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //处理高亮换行的逻辑选择
            {
                //5 Options for handling line breaks within each selected highlight by the user (a few words, or a few paragraphs... whatever user selects as a single highlight)
                //Set to 0 (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
                //Set to 1 if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
                //Set to 2 if you want line breaks (e.g., each paragraph) to be in same bullet with Ctrl + Shift "soft line breaks" like Ctrl+Shift+V does in browser pasting
                //Set to 3 if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks
                var labelElem3 = createNewElement('label','高亮时如何处理换行','rmHLsel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                formElem.appendChild(document.createElement('br'));
                var selElem = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:225px;max-width:225px;width:225px',formElem,'rmHLsel','rmHLsel');
                selElem.options.add( new Option("「默认」所有换行都新建子弹笔记，并保持原文中的层级","0", true, true) );
                selElem.options.add( new Option("每个换行都处于第一段的下一级","1") );
                selElem.options.add( new Option("每个换行都按「软换行」处理","2") );
                selElem.options.add( new Option("用空格代替换行","3") );
                selElem.options.add( new Option("删除掉换行","4") );
                selElem.value = sameBlock;
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //设置窗口宽和高
            {
                var labelElem7 = createNewElement('label','窗口的尺寸 (最小尺寸: 300px or 15%)','','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                formElem.appendChild(document.createElement('br'));
                var labelElem8 = createNewElement('label','W:','rmHLtbSize','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                var tbSizeElem = createNewElement('input',sideWidth,'','padding-left:5px;text-align:center;width:50px;margin-left:5px;margin-right:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbSize','rmHLtbSize');
                tbSizeElem.placeholder = "17%";

                var labelElem9 = createNewElement('label','H:','rmHLtbSize2','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                var tbSizeElem2 = createNewElement('input',sideHeight,'','padding-left:5px;text-align:center;width:50px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbSize2','rmHLtbSize2');
                tbSizeElem2.placeholder = "20%";
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //markdown style 设置
            {
                var labelElemStyle = createNewElement('label','设置 markdown 语法（保留默认即可）','','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
                formElem.appendChild(document.createElement('br'));
                var labelElemBold = createNewElement('label','加粗:','rmHLtbBold','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var tbElemBold = createNewElement('input',formatBold,'','padding:0px;text-align:center;width:25px;margin-left:5px;margin-right:0px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbBold','rmHLtbBold');
                //tbElemBold.placeholder = '**';

                var labelElemItalic = createNewElement('label','斜体:','rmHLtbItalic','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var tbElemItalic = createNewElement('input',formatItalics,'','padding:0px;text-align:center;width:25px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbItalic','rmHLtbItalic');
                //tbElemItalic.placeholder = '__';

                var labelElemCode = createNewElement('label','代码:','rmHLtbCode','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var tbElemCode = createNewElement('input',formatCode,'','padding:0px;text-align:center;width:25px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbCode','rmHLtbCode');
                //tbElemCode.placeholder = '`';

                var labelElemHeaders = createNewElement('label','是否保留 header:','rmHLcbHeaders','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var cbElemHeaders = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;margin-bottom:-2px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbHeaders','rmHLcbHeaders');
                if(bHeaders){cbElemHeaders.checked = true;}else{cbElemHeaders.checked = false;}
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //子弹样式设置
            {
                var labelElemStyle = createNewElement('label','设置子弹样式语法（保持默认即可）','','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
                formElem.appendChild(document.createElement('br'));
                var labelElemBullet = createNewElement('label','Bullets:','rmHLtbBullet','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var tbElemBullet = createNewElement('input',formatBullets,'','padding:0px;text-align:center;width:25px;margin-left:5px;margin-right:0px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbBullet','rmHLtbBullet');
                //tbElemBullet.placeholder = '- ';

                var labelElemIndents = createNewElement('label','Indent:','rmHLcbIndents','font-size:12px;line-height:normal;margin-left:15px;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var cbElemIndents = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;margin-bottom:-2px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbIndents','rmHLcbIndents');
                if(bIndents){cbElemIndents.checked = true;}else{cbElemIndents.checked = false;}

                var labelElemLinks = createNewElement('label','Links:','rmHLcbLinks','font-size:12px;line-height:normal;margin-left:15px;color:black;font-weight:bold;display:inline-block',formElem,'','');
                var cbElemLinks = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;margin-bottom:-2px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbLinks','rmHLcbLinks');
                if(bLinks){cbElemLinks.checked = true;}else{cbElemLinks.checked = false;}
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //保存剪贴板样式设置
            {
                var labelElem4 = createNewElement('label','显示剪贴板:','','margin-right:20px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                var cbElem1 = createNewElement('checkbox','','','margin-bottom:-2px;vertical-align:inherit;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbType1','rmHLcbType1');
                cbElem1.checked = true;

                var labelElem5 = createNewElement('label','Plain Text','rmHLcbType1','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                var cbElem2 = createNewElement('checkbox','','','margin-bottom:-2px;vertical-align:inherit;margin-left:20px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbType2','rmHLcbType2');
                cbElem2.checked = false;

                var labelElem6 = createNewElement('label','HTML','rmHLcbType2','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //Reset to Defaults Page/Tag Case Ellipsis
            {
                var labelElemDefaults = createNewElement('label','重置为默认设置','rmHLdefaultsSel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block;width:115px',formElem,'','');
                var labelElemRefCase = createNewElement('label','页面大小写设置','rmHLcaseSel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block;margin-left:15px;width:145px',formElem,'','');
                var labelElemElip = createNewElement('label','Ellipsis','rmHLelip','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block;margin-left:15px;width:85px',formElem,'','');
                formElem.appendChild(document.createElement('br'));

                //Reset to Defaults
                var selDefaults = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:115px;max-width:115px;width:115px;display:inline-flex',formElem,'rmHLdefaultsSel','rmHLdefaultsSel');
                selDefaults.options.add( new Option("Obsidian","0", true, true) );
                selDefaults.options.add( new Option("Roam Research","1") );

                //var butReset = createNewElement('button','SET','','background-color:black;color:white;border-color:white;margin-left:5px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;display:inline-flex',formElem,'rmHLreset','rmHLreset');

                //Page/Tag Case
                var selPgRefCase = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:145px;max-width:145px;width:145px;margin-left:15px',formElem,'rmHLcaseSel','rmHLcaseSel');
                selPgRefCase.options.add( new Option("As is on page","0", true, true) );
                selPgRefCase.options.add( new Option("Each Word Capitalized","1") );
                selPgRefCase.options.add( new Option("First word capitalized","2") );
                selPgRefCase.options.add( new Option("all lower case","3") );
                selPgRefCase.options.add( new Option("ALL UPPER CASE","4") );
                selPgRefCase.value = pgRefCase;

                //Ellipsis
                var selElip = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:85px;max-width:85px;width:85px;margin-left:15px',formElem,'rmHLelip','rmHLelip');
                selElip.options.add( new Option("None","0", true, true) );
                selElip.options.add( new Option("Front","1") );
                selElip.options.add( new Option("Back","2") );
                selElip.options.add( new Option("Both","3") );
                selElip.value = elipOpt;

                //Reset to Defaults 重置为默认的 change 事件
                selDefaults.addEventListener("change", function(evt){
                    //var divElemMain = iframeDoc.getElementById("rmHLmain");
                    var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
                    var textElem2 = iframeDoc.getElementById("rmHLta2");
                    var selElem = iframeDoc.getElementById("rmHLsel");
                    var tbSizeW = iframeDoc.getElementById("rmHLtbSize");
                    var tbSizeH = iframeDoc.getElementById("rmHLtbSize2");
                    var tbElemBold = iframeDoc.getElementById("rmHLtbBold");
                    var tbElemItalic = iframeDoc.getElementById("rmHLtbItalic");
                    var tbElemCode = iframeDoc.getElementById("rmHLtbCode");
                    var cbElemHeaders = iframeDoc.getElementById("rmHLcbHeaders")
                    var tbElemBullet = iframeDoc.getElementById("rmHLtbBullet");
                    var cbElemIndents = iframeDoc.getElementById("rmHLcbIndents")
                    var cbElemLinks = iframeDoc.getElementById("rmHLcbLinks")
                    var cbElemAutoHL = iframeDoc.getElementById("rmHLcbAutoHL")
                    var cbElem1 = iframeDoc.getElementById("rmHLcbType1")
                    var cbElem2 = iframeDoc.getElementById("rmHLcbType2")
                    var cbElemPgTitle = iframeDoc.getElementById("rmHLcbPgTitle");
                    var selPgRefCase = iframeDoc.getElementById("rmHLcaseSel");
                    var selElip = iframeDoc.getElementById("rmHLelip");
                    //Kindle settings
                    var tbKinHLref = iframeDoc.getElementById("rmHLkingleTb1");
                    var cbLoc = iframeDoc.getElementById("rmHLcbLoc");
                    var cbCol = iframeDoc.getElementById("rmHLcbHlColor");
                    var cbColRef = iframeDoc.getElementById("rmHLcbHlColorLink");
                    var selKindle = iframeDoc.getElementById("rmHLkindleSel");
                    var selDefaults = iframeDoc.getElementById("rmHLdefaultsSel");
                    //obsidian setting
                    var obVault = iframeDoc.getElementById("rmHLtbObVault");
                    var obPath = iframeDoc.getElementById("rmHLtbObPath");

                    switch (Number(selDefaults.value))
                    {
                        case 0:
                            //Obsidian
                            tbElemBold.value = '**';
                            tbElemItalic.value = '_';
                            tbElemCode.value = '`';
                            cbElemHeaders.checked = false;
                            tbElemBullet.value = '- ';
                            cbElemIndents.checked = true;
                            cbElemLinks.checked = true;
                            cbElemAutoHL.checked = false;
                            //Kindle settings
                            if(tbKinHLref != null){tbKinHLref.value = '[[Kindle-Highlights]]';}
                            textElem2.value = '[{%title%}]({%url%}) [[Obsidian-Highlights]]';
                            parentTitle = textElem2.value;
                            selElemPT.value = parentTitle;
                            break;
                        case 1:
                            //Roam
                            tbElemBold.value = '**';
                            tbElemItalic.value = '__';
                            tbElemCode.value = '`';
                            cbElemHeaders.checked = true;
                            tbElemBullet.value = '- ';
                            cbElemIndents.checked = true;
                            cbElemLinks.checked = true;
                            cbElemAutoHL.checked = false;
                            //Kindle settings
                            if(tbKinHLref != null){tbKinHLref.value = '#[[Kindle-Highlights]]';}
                            textElem2.value = '[{%title%}]({%url%}) #[[Roam-Highlights]]';
                            parentTitle = textElem2.value;
                            selElemPT.value = parentTitle;
                            break;
                    }

                    selElem.value = 0;
                    tbSizeW.value = '20%';
                    tbSizeH.value = '30%';
                    cbElem1.checked = true;
                    cbElem2.checked = false;
                    selPgRefCase.value = 0;
                    selElip.value = 0;
                    if(tbKinHLref != null)
                    {
                        cbLoc.checked = true;
                        cbCol.checked = true;
                        cbColRef.checked = true;
                        selKindle.value = 0;
                    }
                    cbElemPgTitle.checked = true;
                    obVault.value = "";
                    obPath.value = "";

                    /*pageTitle = textElem2.value;*/
                    sameBlock = Number(selElem.value);
                    sideWidth = tbSizeW.value;
                    sideHeight = tbSizeH.value;
                    formatBold = tbElemBold.value;
                    formatItalics = tbElemItalic.value;
                    formatCode = tbElemCode.value;
                    bHeaders = cbElemHeaders.checked;
                    formatBullets = tbElemBullet.value;
                    bIndents = cbElemIndents.checked;
                    bLinks = cbElemLinks.checked;
                    bAutoHL = cbElemAutoHL.checked;
                    pgRefCase = Number(selPgRefCase.value);
                    elipOpt = Number(selElip.value);
                    obsidianVault = obVault.value;
                    obsidianPath = obPath.value;

                    /* //Kindle settings
                    if(tbKinHLref != null)
                    {
                        kindleHLref = tbKinHLref.value;
                        bLocation = cbLoc.checked;
                        bColor = cbCol.checked;
                        bColorRef = cbColRef.checked;
                        kindleHLstructure = Number(selKindle.value);
                    }*/

                    //Save to local storage to keep persistent
                    setLocalStorageValue("sameBlock", sameBlock);
                    setLocalStorageValue("sideWidth", sideWidth);
                    setLocalStorageValue("sideHeight", sideHeight);
                    setLocalStorageValue("formatBold", formatBold);
                    setLocalStorageValue("formatItalics", formatItalics);
                    setLocalStorageValue("formatCode", formatCode);
                    setLocalStorageValue("bHeaders", bHeaders);
                    setLocalStorageValue("formatBullets", formatBullets);
                    setLocalStorageValue("bIndents", bIndents);
                    setLocalStorageValue("bLinks", bLinks);
                    setLocalStorageValue("bAutoHL", bAutoHL);
                    setLocalStorageValue("pgRefCase", pgRefCase);
                    setLocalStorageValue("elipOpt", elipOpt);
                    /*//Kindle settings
                    setLocalStorageValue("kindleHLref", kindleHLref);
                    setLocalStorageValue("bLocation", bLocation);
                    setLocalStorageValue("bColor", bColor);
                    setLocalStorageValue("bColorRef", bColorRef);
                    setLocalStorageValue("kindleHLstructure", kindleHLstructure);*/
                    setLocalStorageValue("parentTitle", parentTitle);
                    setLocalStorageValue("parentTitleArr", parentTitleArr);
                    setLocalStorageValue("obsidianVault",obsidianVault);
                    setLocalStorageValue("obsidianPath",obsidianPath);

                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 1;
                    var pasteEvent = new ClipboardEvent('cut');
                    document.dispatchEvent(pasteEvent);
                    // document.execCommand('cut');

                    var butSave = iframeDoc.getElementById("rmHLsave");
                    butSave.style.backgroundColor = 'grey';
                    butSave.style.cursor = 'default';
                });
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //设置导入到 Obsidian 的库和文件目录，以及按钮
            //如果目录不存在可以自动创建
            {
                var labelElemOb = createNewElement('label','设置导出到 Obsidian 的库和路径','','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                formElem.appendChild(document.createElement('br'));
                var labelElemOb1 = createNewElement('label','库名:','rmHLtbObVault','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                var tbSizeElemOb1 = createNewElement('input',obsidianVault,'','padding-left:5px;text-align:center;width:100px;margin-left:5px;margin-right:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbObVault','rmHLtbObVault');
                tbSizeElemOb1.placeholder = "personal";

                var labelElemOb2 = createNewElement('label','路径:','rmHLtbObPath','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

                var tbSizeElemOb2 = createNewElement('input',obsidianPath,'','padding-left:5px;text-align:center;width:100px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbObPath','rmHLtbObPath');
                tbSizeElemOb2.placeholder = "/";

                //在 rmHLform 中创建「导出到 Obsidian」按钮，并绑定点击事件
                var butExportObsidian = createNewElement('button','导出到 Obsidian','','background-color:black;color:white;border-color:white;margin-left:15px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;vertical-align:bottom',formElem,'rmHLexport','rmHLexport');
                butExportObsidian.addEventListener("click", function(){
                    //获取内容，并导出
                    let textInput = iframeDoc.getElementById("rmHLtextArea");
                    let content = encodeURIComponent(textInput.value);
                    if (obsidianVault == "") {obsidianVault = "personal"};
                    //如果没有「highlight/」或者 「highlight/」不是开头，确保根路径为 「highlight/」
//                    if(obsidianPath.indexOf("highlight/") == -1 || obsidianPath.indexOf("highlight/")!=0){
//                        obsidianPath = "highlight/"+ obsidianPath;
//                    };
                    //确保路径中最后一位是「/」
                    if (obsidianPath.substr(obsidianPath.length-1,1) != "/"){ obsidianPath += "/"}
                    //替换路径中的 `\:` 以及空格
                    obsidianPath = obsidianPath.replace(/[:]/g, "-").replace(/\\/g, "-").replace(/[ ]/g,"");
                    //替换标题中 `/\:`
                    pageTitle = pageTitle.replace(/[/]/g, "-").replace(/[:]/g, "-").replace(/\\/g, "-");
                    let url = "obsidian://new?vault="+encodeURIComponent(obsidianVault)+"&file="+encodeURIComponent(obsidianPath+pageTitle)+"&content="+content;
                    alert(url)
                    writeToConsole(url);
                    window.location = url;
                });
            }

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            //保存按钮
            {
                var butSave = createNewElement('button','Save','','background-color:grey;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:default;padding:5px;margin-left:0px;',formElem,'rmHLsave','rmHLsave');
                //绑定输入事件，使得按钮可用状态修改
                formElem.addEventListener("input", function(evt){
                    if(evt.target.id != 'rmHLdefaultsSel' && evt.target.id != 'rmHLta2')
                    {
                        var butSave = iframeDoc.getElementById("rmHLsave");
                        butSave.style.backgroundColor = 'blue';
                        butSave.style.cursor = 'pointer';
                    }
                });
                //TODO：将来去掉 kindle 相关
                divKindle.addEventListener("input", function(evt){
                    var butSave = iframeDoc.getElementById("rmHLsave");
                    butSave.style.backgroundColor = 'blue';
                    butSave.style.cursor = 'pointer';
                });

                //按钮点击
                butSave.addEventListener("click", function(){
                    var butSave = iframeDoc.getElementById("rmHLsave");
                    if(butSave.style.backgroundColor == 'grey'){return;}
                    //var divElemMain = iframeDoc.getElementById("rmHLmain");
                    var textElem2 = iframeDoc.getElementById("rmHLta2");
                    var selElem = iframeDoc.getElementById("rmHLsel");
                    var tbSizeW = iframeDoc.getElementById("rmHLtbSize");
                    var tbSizeH = iframeDoc.getElementById("rmHLtbSize2");
                    var tbElemBold = iframeDoc.getElementById("rmHLtbBold");
                    var tbElemItalic = iframeDoc.getElementById("rmHLtbItalic");
                    var tbElemCode = iframeDoc.getElementById("rmHLtbCode");
                    var cbElemHeaders = iframeDoc.getElementById("rmHLcbHeaders")
                    var tbElemBullet = iframeDoc.getElementById("rmHLtbBullet");
                    var cbElemIndents = iframeDoc.getElementById("rmHLcbIndents")
                    var cbElemLinks = iframeDoc.getElementById("rmHLcbLinks")
                    var cbElemAutoHL = iframeDoc.getElementById("rmHLcbAutoHL")
                    var selPgRefCase = iframeDoc.getElementById("rmHLcaseSel");
                    var selElip = iframeDoc.getElementById("rmHLelip");
                    //Kindle settings
                    var tbKinHLref = iframeDoc.getElementById("rmHLkingleTb1");
                    var cbLoc = iframeDoc.getElementById("rmHLcbLoc");
                    var cbCol = iframeDoc.getElementById("rmHLcbHlColor");
                    var cbColRef = iframeDoc.getElementById("rmHLcbHlColorLink");
                    var selKindle = iframeDoc.getElementById("rmHLkindleSel");
                    //obsidian setting
                    var obVault = iframeDoc.getElementById("rmHLtbObVault");
                    var obPath = iframeDoc.getElementById("rmHLtbObPath");

                    butSave.style.backgroundColor = 'grey';
                    butSave.style.cursor = 'default';
                    //父标题修改
                    parentTitle = textElem2.value;

                    sameBlock = Number(selElem.value);
                    //页面宽高处理
                    sideWidth = tbSizeW.value;
                    if(sideWidth.indexOf("px") > -1 || sideWidth.indexOf("PX") > -1 || sideWidth.indexOf("Px") > -1 || sideWidth.indexOf("pX") > -1)
                    {
                        if(parseInt(sideWidth,10) < 300)
                        {
                            sideWidth = "300px";
                            tbSizeW.value = "300px";
                        }
                    }
                    if(sideWidth.indexOf("%") > -1)
                    {
                        if(parseInt(sideWidth,10) < 15)
                        {
                            sideWidth = "15%";
                            tbSizeW.value = "15%";
                        }
                    }
                    sideHeight = tbSizeH.value;
                    if(sideHeight.indexOf("px") > -1 || sideHeight.indexOf("PX") > -1 || sideHeight.indexOf("Px") > -1 || sideHeight.indexOf("pX") > -1)
                    {
                        if(parseInt(sideHeight,10) < 200)
                        {
                            sideHeight = "200px";
                            tbSizeH.value = "200px";
                        }
                    }
                    if(sideHeight.indexOf("%") > -1)
                    {
                        if(parseInt(sideHeight,10) < 15)
                        {
                            sideHeight = "15%";
                            tbSizeH.value = "15%";
                        }
                    }
                    formatBold = tbElemBold.value;
                    formatItalics = tbElemItalic.value;
                    formatCode = tbElemCode.value;
                    bHeaders = cbElemHeaders.checked;
                    formatBullets = tbElemBullet.value;
                    bIndents = cbElemIndents.checked;
                    bLinks = cbElemLinks.checked;
                    bAutoHL = cbElemAutoHL.checked;
                    pgRefCase = Number(selPgRefCase.value);
                    elipOpt = Number(selElip.value);
                    /*//Kindle settings
                    {
                        kindleHLref = tbKinHLref.value;
                        bLocation = cbLoc.checked;
                        bColor = cbCol.checked;
                        bColorRef = cbColRef.checked;
                        kindleHLstructure = Number(selKindle.value);
                    }*/
                    //Obsidian 设置处理
                    obsidianVault = obVault.value;
                    obsidianPath = obPath.value;

                    //Save to local storage to keep persistent
                    setLocalStorageValue("sameBlock", sameBlock);
                    setLocalStorageValue("sideWidth", sideWidth);
                    setLocalStorageValue("sideHeight", sideHeight);
                    setLocalStorageValue("formatBold", formatBold);
                    setLocalStorageValue("formatItalics", formatItalics);
                    setLocalStorageValue("formatCode", formatCode);
                    setLocalStorageValue("bHeaders", bHeaders);
                    setLocalStorageValue("formatBullets", formatBullets);
                    setLocalStorageValue("bIndents", bIndents);
                    setLocalStorageValue("bLinks", bLinks);
                    setLocalStorageValue("bAutoHL", bAutoHL);
                    setLocalStorageValue("pgRefCase", pgRefCase);
                    setLocalStorageValue("elipOpt", elipOpt);
                    setLocalStorageValue("parentTitle", parentTitle);
                    setLocalStorageValue("parentTitleArr", parentTitleArr);
                    setLocalStorageValue("obsidianVault", obsidianVault);
                    setLocalStorageValue("obsidianPath",obsidianPath);
                    /*//Kindle settings
                    setLocalStorageValue("kindleHLref", kindleHLref);
                    setLocalStorageValue("bLocation", bLocation);
                    setLocalStorageValue("bColor", bColor);
                    setLocalStorageValue("bColorRef", bColorRef);
                    setLocalStorageValue("kindleHLstructure", kindleHLstructure);*/


                    //强制执行 cut 事件，为了激活 clipboardData 的 setData
                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 1;
                    var pasteEvent = new ClipboardEvent('cut');
                    document.dispatchEvent(pasteEvent);
                    // document.execCommand('cut');
                });
            }

            //重要资源
            {
                formElem.appendChild(document.createElement('br'));
                formElem.appendChild(document.createElement('br'));
                var spanElem1 = createNewElement('span','Important Links and Resources (v' + verNum + ')','','font-weight:bold;color:red;font-size:12px;line-height:normal;display:inline-block',formElem,'','');

                formElem.appendChild(document.createElement('br'));
                formElem.appendChild(document.createElement('br'));
                var link1 = createNewElement('a','详细说明、快捷方式和功能','','font-size:12px;line-height:normal;color:blue',formElem,'','');
                link1.href = 'https://github.com/jiangnanandi/obsidian-highlighter';
                link1.target = '_blank';

                formElem.appendChild(document.createElement('br'));
                var link2 = createNewElement('a','查看 Demo 视频','','font-size:12px;line-height:normal;color:blue',formElem,'','');
                link2.href = 'https://youtu.be/JBYiudo-Mzc';
                link2.target = '_blank';

                formElem.appendChild(document.createElement('br'));
                var link3 = createNewElement('a','Bug 上报/问题','','font-size:12px;line-height:normal;color:blue',formElem,'','');
                link3.href = 'https://github.com/jiangnanandi/obsidian-highlighter/issues/new';
                link3.target = '_blank';

                formElem.appendChild(document.createElement('br'));
                var link4 = createNewElement('a','提交想法或功能请求','','font-size:12px;line-height:normal;color:blue',formElem,'','');
                link4.href = 'https://github.com/jiangnanandi/obsidian-highlighter/issues/new';
                link4.target = '_blank';

                formElem.appendChild(document.createElement('br'));
                var link5 = createNewElement('a','提问','','font-size:12px;line-height:normal;color:blue',formElem,'','');
                link5.href = 'https://github.com/jiangnanandi/obsidian-highlighter/issues/new';
                link5.target = '_blank';

                formElem.appendChild(document.createElement('br'));
                var link6 = createNewElement('a','Kindle Notes & Highlights','','font-size:12px;line-height:normal;color:blue',formElem,'','');
                link6.href = 'https://read.amazon.com/notebook';
                link6.target = '_blank';
            }
        }

        //2.1.3 最小化窗口按钮
        {
            var butMax = createNewElement('button','最大化','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'rmHLexpand','rmHLexpand');

            butMax.addEventListener("click", function(){
                var divElemMain = document.getElementById('rmHLiframe');
                var divTextElem = iframeDoc.getElementById("rmHLdivText");
                var butMax = iframeDoc.getElementById("rmHLexpand");
                var divSetElem = iframeDoc.getElementById("rmHLdivSett");

                if(butMax.innerHTML == "最大化")
                {
                    /*//kindle 去掉
                    if(getPage.includes(kindleNotesAddress) || getPage.includes(kindleNotesLoginAddress) || getPage.includes(kindleNotesAddressFR) || getPage.includes(kindleNotesAddressDE))
                    {
                        divElemMain.style.width = "90%";
                        divElemMain.style.height = "80%";
                    }
                    else*/
                    {
                        divElemMain.style.width = "95%";
                        divElemMain.style.height = "92%";
                    }

                    butMax.innerHTML = '最小化';
                    divElemMain.style.opacity = "1";
                }
                else
                {
                    if(divSetElem.style.display == "flex")
                    {
                        divTextElem.style.width = "100%";
                        divSetElem.style.setProperty('display', 'none');
                    }

                    divElemMain.style.width = sideWidth;
                    divElemMain.style.height = sideHeight;

                    butMax.innerHTML = '最大化';
                    divElemMain.style.opacity = "0.8";
                }
            });
        }

        //2.1.4 隐藏窗口按钮
        {
            var butHide = createNewElement('button','隐藏窗口','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'','');

            butHide.addEventListener("click", function(){
                var divElemMain = document.getElementById('rmHLiframe');
                divElemMain.style.setProperty('display', 'none');
                //divElemMain.style.setProperty('display', 'block');
                showWindow = 0;
                setLocalStorageValue("showWindow", showWindow);
            });
        }

        //2.1.5 换行显示按钮
        {
            var butWrap = createNewElement('button','Wrap','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'rmHLwrap','rmHLwrap');

            butWrap.addEventListener("click", function(){
                var textInput = iframeDoc.getElementById("rmHLtextArea");
                var butWrap = iframeDoc.getElementById("rmHLwrap");

                if(butWrap.innerHTML == "Wrap")
                {
                    //textInput.style.whiteSpace = "normal";
                    //Changed for firefox compatibility
                    textInput.style.whiteSpace = "pre-wrap";
                    butWrap.innerHTML = 'Un-Wrap';
                }
                else
                {
                    textInput.style.whiteSpace = "pre";
                    butWrap.innerHTML = 'Wrap';
                }
            });
        }

        //2.1.6 进入设置按钮
        {
            var butSett = createNewElement('button','设置','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'rmHLsettings','rmHLsettings');

            butSett.addEventListener("click", function(){
                var divElemMain = document.getElementById('rmHLiframe');
                var divSetElem = iframeDoc.getElementById("rmHLdivSett");
                var divTextElem = iframeDoc.getElementById("rmHLdivText");
                var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
                var textElem2 = iframeDoc.getElementById("rmHLta2");
                var selElem = iframeDoc.getElementById("rmHLsel");
                var butSett = iframeDoc.getElementById("rmHLsettings");
                var butMax = iframeDoc.getElementById("rmHLexpand");
                var butWrap = iframeDoc.getElementById("rmHLwrap");

                if(divSetElem.style.display == "none")
                {
                    divElemMain.style.opacity = "1";
                    divTextElem.style.width = "50%";
                    divSetElem.style.setProperty('display', 'flex');
                    selElem.value = sameBlock;
                    if(butMax.innerHTML == "最大化"){butMax.click();}
                }
                else
                {
                    //divElemMain.style.opacity = "0.8";
                    divTextElem.style.width = "100%";
                    divSetElem.style.setProperty('display', 'none');
                    //butMax.click();
                }
            });
        }

        //2.1.7 右侧摘录文本区域
        {
            var textInput = createNewElement('textarea','','','width:100%;max-width:100%;height:100%;max-height:100%;background-color:white;color:black;font-weight:bold;white-space:pre;float:right;padding-left:5px;padding-right:1px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;border-bottom:none',divTextElem,'rmHLtextArea','textAreaInput');
            textInput.value = `
查看演示视频:
- B站 ：https://b23.tv/I15MWVS
- 油管 : https://youtu.be/JBYiudo-Mzc

Obsidian-highlighter Shortcut Keys (v${verNum})

[ALT + X]
\t- 激活扩展并显示/隐藏侧面窗口

[Ctrl + X] (WIN) or [CMD + X] (MAC)
\t- 高亮选中的文本
\t- 要删除部分高亮，选择文本并按[Ctrl + X]

[Alt + Click]
\t- 移除整个高亮部分

[ALT + Q]
\t- 删除页面上的所有高光

[ALT + A]
\t- 使选中的高亮部分成为「标题」；后面的高亮部分将被嵌套，直到另一个高亮部分被选为「标题」使选中的高亮部分成为「标题」；后面的高亮部分将被嵌套，直到另一个高亮部分被选为「标题」

[Double-Click] 单个单词（必须已经高亮）
\t- 添加[[双括号]]用于「双向链接」

[ALT + Z] (必须已经突出显示)
\t- 为「双向链接」的选择添加[[双括号]]
`;
        }


        //2.2 响应各种 Command 命令（对应注册的快捷键）
        useBrowser.runtime.onMessage.addListener(function(request,sender,sendResponse){
            // 监听函数事件
            if (request.callFunction == "convertToHeader"){
                //将候选的高亮句子设为「标题」其后续的高亮为「嵌套」直到出现另一个「标题」
                var theSelection = window.getSelection();
                var curElement = theSelection.anchorNode.parentElement;

                if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
                {
                    var titleOfElement = curElement.title;
                    var elemsInSameHighlight = document.querySelectorAll('[title="' + titleOfElement + '"]');

                    for(var i = 0; i < elemsInSameHighlight.length; i++)
                    {
                        eachElement = elemsInSameHighlight.item(i);
                        //Check if already set
                        var foundHeader = eachElement.getAttribute('hlheader');
                        if(foundHeader == null)
                        {
                            eachElement.setAttribute("hlHeader", "1");
                            eachElement.style.setProperty("color", "red", "important");
                        }else if(foundHeader == '1')
                        {
                            eachElement.setAttribute("hlHeader", "2");
                            eachElement.style.setProperty("color", "darkseagreen", "important");
                        }else if(foundHeader == '2')
                        {
                            eachElement.removeAttribute("hlHeader");
                            eachElement.style.setProperty("color", "black", "important");
                        }
                        //Only do the first item otherwise if you have a multi line highlight it will indent out for each line
                        break;
                    }

                    //Clear the original user mouse selection //Update: Want to leave it so can quickly toggle betweeen options above
                    //document.getSelection().removeAllRanges();

                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 1;
                    var pasteEvent = new ClipboardEvent('cut');
                    document.dispatchEvent(pasteEvent);
                    // document.execCommand('cut');
                }
            }
            
            if(request.callFunction === 'addDoubleBrackets')
            {
                //双击时间，设置「双向链接」
                var theSelection = window.getSelection();
                var curElement = theSelection.anchorNode.parentElement;
                if(theSelection.toString().length > 0)
                {
                    if(curElement.className === "roamJsHighlighter")
                    {
                        // 只处理已经高亮的句子
                        //创建新的 span 用于在页面中进行新的高亮颜色（和普通高亮区分）
                        var divTest = document.createRange();
                        //divTest = window.getSelection();
                        // 设置div 的开始和结束分别为 Selection 的锚点其实和结束
                        // 用户可以从左到右（按文件顺序）或从右到左（与文件顺序相反）进行选择。 Selection.anchorNode 是用户开始选择的地方。
                        // Selection.anchorOffset 只读属性返回选择的锚点在 Selection.anchorNode 中偏移的字符数
                        divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                        // 用户可以从左到右（按文件顺序）或从右到左（与文件顺序相反）进行选择。Selection.focusOffset 是用户结束选择的地方
                        // Selection.focusOffset 只读属性返回选择的焦点在 Selection.focusNode 中被偏移的字符数。
                        divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
                        var subSelection = divTest;
                        var selectedText = subSelection.extractContents();
                        //Create new HTML element SPAN
                        var newSpanTag = document.createElement("span");
                        // 强制设置颜色，防止「黑色模式」下看不清
                        //Adding !important to CSS to account for Dark Theme extensions that override styles... otherwise can't see highlights in dark mode
                        newSpanTag.style.setProperty("background-color", "aqua", "important");
                        newSpanTag.style.setProperty("color", "black", "important");
                        //Set class for the new SPAN element so you can loop through the highlights later to copy to clipboard
                        newSpanTag.className = "roamJsHighlighter pageLink";
                        newSpanTag.title = curElement.title;
                        newSpanTag.appendChild(selectedText);
                        subSelection.insertNode(newSpanTag);

                        //清楚原始鼠标选择状态
                        document.getSelection().removeAllRanges();

                        //强制执行 "剪切 "事件，因为除非从剪切/复制事件中激活，否则 clipboardData 事件 setData 不会工作。
                        //我们已经设置了 "剪切 "事件监听器来运行我们的代码，所以这应该激活它。
                        clickEvent = 1;
                        var pasteEvent = new ClipboardEvent('cut');
                        document.dispatchEvent(pasteEvent);
                        // document.execCommand('cut');
                    }
                }
            }
            if(request.callFunction === 'removeAllHighlights')
            {
                if(confirm("是否删除页面中所有的高亮内容?")){removeAllHighlights()}
            }
            if(request.callFunction === 'showHideSideWindow'){
                var divElemMain = document.getElementById('rmHLiframe');
                iframeDoc = divElemMain.contentWindow.document;
                if(divElemMain.style.display != "none")
                {
                    divElemMain.style.setProperty('display', 'none');
                    showWindow = 0;
                    setLocalStorageValue("showWindow", showWindow);
                }
                else
                {
                    divElemMain.style.setProperty('display', 'block');
                    showWindow = 1;
                    setLocalStorageValue("showWindow", showWindow);
                }
            }

        })

        //2.3 监听 cut 事件，获取选中的文本，并使之高亮显示
        document.addEventListener('cut', function (e){
            if(debugMode != 0){writeToConsole("start CUT");}

            // kindle 找时间去掉
            if(kindleClickEvent == 1)
            {
                getKindleHighlights(e);
            }
            else if(clickEvent == 0){ //为了和「点击事件」区分，否则处理的时候两段代码干扰
                //Get current selected text which will be used to highlight and then later when ready to export to Roam
                var selection = window.getSelection();
                //Create range from selected text
                var range = selection.getRangeAt(0);
                var startCont = range.startContainer;
                var startOff = range.startOffset;
                var endCont = range.endContainer;
                var endOff = range.endOffset;


                //Variables for parsing selected elements for highlight
                var foundEnd = 0;
                var foundStartOfSelection = 0;
                //检查是否发现用户的至少一个选择被高亮显示（稍后将用于增加highlightCtr变量）。
                var foundSelection = 0;


                range.setStart(startCont, startOff)
                range.setEnd(endCont, endOff)
                //所有选中范围的父元素
                var allWithinRangeParent = range.commonAncestorContainer;

                if(debugMode != 0)
                {
                    writeToConsole('');
                    writeToConsole(selection,1,0);
                    writeToConsole(range,1,0);
                    writeToConsole(startCont,1,0);
                    writeToConsole(endCont,1,0);
                    writeToConsole('startOff: ' + startOff);
                    writeToConsole('endOff: ' + endOff);
                }

                //Other variables
                var tempLogLevel = 1;
                var allTextFound = "";
                var thisIsFirst = 0;

                //忽略元素容器
                function ignoreElementContainer(elemInput)
                {
                    //这将停止解析发现的元素的任何子元素，这样你就可以添加一个父元素类，而不是像ignoreElement函数那样，必须添加它下面的所有变化。
                    //Slack帖子的反应、时间戳、媒体等。+ GitHub的隐藏评论框和反应表情符号的东西
                    var elemClassCheck = elemInput.className;
                    if (typeof elemClassCheck === 'string' || elemClassCheck instanceof String){elemClassCheck = elemClassCheck.trim()}else{elemClassCheck = ''}

                    if(
                        //Slack messages
                        elemClassCheck == 'c-message_kit__attachments' || elemClassCheck == 'toggl-button slack-message min'
                        //Github issues
                        || elemClassCheck == 'avatar-parent-child TimelineItem-avatar d-none d-md-block' || elemClassCheck == 'timeline-comment-actions flex-shrink-0' || elemClassCheck == 'd-none d-sm-flex' || elemClassCheck == 'text-normal drag-and-drop hx_drag-and-drop position-relative d-flex flex-justify-between' || elemClassCheck == 'comment-reactions flex-items-center border-top  js-reactions-container' || elemClassCheck == 'js-details-container Details toolbar-commenting d-flex no-wrap flex-items-start flex-wrap px-2 pt-2 pt-lg-0 border-md-top border-lg-top-0' || elemClassCheck == 'js-comment-update' || elemClassCheck == 'js-minimize-comment d-none js-update-minimized-content' || elemClassCheck == 'js-comment-edit-history' || elemClassCheck == 'TimelineItem' || elemClassCheck == 'TimelineItem js-targetable-element')
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                //寻找底层的 node 进行处理
                function findLowestNode(elemInput, hierarchyLevel)
                {
                    //由于要创建新元素，我们必须确保跳过任何已经高亮显示的元素，否则将无限循环
                    if(elemInput.className == "roamJsHighlighter"){return;}
                    var thisHierarchyLevel = hierarchyLevel + ':' + elemInput.nodeName;
                    if(debugMode != 0){writeToConsole("FIND LOWEST NODE: " + thisHierarchyLevel,3);}
                    var inputNodeName = elemInput.nodeName;
                    if(debugMode != 0)
                    {
                        writeToConsole("elemInput.childNodes.length: " + elemInput.childNodes.length,3);
                        writeToConsole(elemInput.childNodes, 3, 0);
                    }
                    if(elemInput.childNodes.length > 0)
                    {
                        //长度不为 0 就需要继续检查
                        //如果在「忽略列表」中，则跳过对该元素的递归查找(主要用于 slack 中我们不想处理的视频等附件）
                        var skipElement = ignoreElementContainer(elemInput);
                        if(!skipElement)
                        {
                            //不在忽略列表中
                            for(var k=0, newElemInput; newElemInput = elemInput.childNodes[k]; k++)
                            {
                                if(selection.containsNode(newElemInput, true))
                                {
                                    if(debugMode != 0){writeToConsole(`hierarchyLevel: ${thisHierarchyLevel} | k: ${k} | elementText: ${newElemInput.nodeName}`, 3);}
                                    //thisHierarchyLevel += ':' + newElemInput.nodeName;
                                    //递归调用自己，并高亮选中文本
                                    findLowestNode(newElemInput, thisHierarchyLevel);
                                }
                                else
                                {
                                    if(debugMode != 0){writeToConsole(`NOT SELECTED: hierarchyLevel: ${thisHierarchyLevel} | k: ${k} | elementText: ${newElemInput.nodeName}`, 3);}
                                }
                            }
                        }
                    }
                    else
                    {
                        // 长度为 0，就可以进行高亮处理了
                        if(debugMode != 0){writeToConsole("FIND LOWEST NODE: NO CHILDREN",3);}
                        if(inputNodeName == '#text'){inputNodeText = elemInput.textContent;}else{inputNodeText = elemInput.innerText;}
                        if (typeof inputNodeText == "undefined"){inputNodeText = '';}
                        thisHierarchyLevel += ':' + inputNodeText.trim();
                        if(inputNodeText.trim() != '')
                        {
                            var startPos = 0;
                            var endPos = inputNodeText.length;
                            var resultText = inputNodeText;
                            if(debugMode != 0){writeToConsole(`RETURNED hierarchyLevel: ${thisHierarchyLevel}`);}

                            if(foundStartOfSelection == 0)
                            {
                                if(startCont.textContent.trim() == inputNodeText.trim())
                                {
                                    //通常，第一次找到的不带节点的 text 就是 starCont 元素的内容，此时需要记录是否找到，是否第一次以及起始位置等值
                                    resultText = startCont.textContent.substring(startOff);
                                    allTextFound += resultText;
                                    foundStartOfSelection = 1;
                                    thisIsFirst = 1;
                                    startPos = startOff;
                                    if(debugMode != 0){writeToConsole(`startCont.textContent.trim: ${startCont.textContent.trim()} ,inputNodeText.trim: ${inputNodeText.trim()} `);}
                                }
                            }
                            else
                            {
                                if(endCont.textContent.trim() == inputNodeText.trim() && endCont.parentElement == elemInput.parentElement)
                                {
                                    //如果找到了最后一段选中内容，累计选中内容，并记录结束位置等信息
                                    if(debugMode != 0){writeToConsole(`******* FOUND THE END ********`);}
                                    if(debugMode != 0){writeToConsole(`endCont.textContent.trim(): ${inputNodeText.trim()} | elemInput.parentElement: ${elemInput.parentElement}`);}
                                    resultText = endCont.textContent.substring(0, endOff);
                                    foundEnd = 1;
                                    endPos = endOff;
                                }
                                allTextFound += '\n' + resultText;
                            }

                            if(endOff == 0 && (elemInput.parentElement == endCont || elemInput.parentElement == endCont.parentElement))
                            {
                                //至此，这个元素已经找到底了，记录一下 foundEnd 值
                                if(debugMode != 0){writeToConsole(`******* FOUND THE END here ********`);}
                                foundEnd = 1;
                                endPos = endOff;
                            }
                            else
                            {
                                //跳过某些不想添加高亮的元素，例如 Slack 中的帖子
                                var skipElement = ignoreElement(elemInput);

                                //debugMode = 1;
                                if(debugMode != 0)
                                {
                                    writeToConsole('');
                                    writeToConsole('skipElement: ' + skipElement);
                                    writeToConsole('foundStartOfSelection: ' + foundStartOfSelection);
                                    writeToConsole(elemInput,1,0);
                                    writeToConsole(elemInput.parentElement,1,0);
                                    writeToConsole('elemInput.parentElement.nodeName: ' + elemInput.parentElement.nodeName);
                                    writeToConsole('startPos: ' + startPos);
                                    writeToConsole('endPos: ' + endPos);
                                    writeToConsole('elemInput.parentElement.className: ' + elemInput.parentElement.className);
                                }
                                //debugMode = 0;

                                if(!skipElement)
                                {
                                    //if(foundStartOfSelection == 1 && elemInput.parentElement.nodeName != 'STYLE' && elemInput.nodeName != 'TEMPLATEs'){createSpanElement(elemInput, startPos, elemInput, endPos);}
                                    if(foundStartOfSelection == 1 && elemInput.parentElement.nodeName != 'STYLE' && elemInput.parentElement.nodeName != 'SVG'){
                                        //创建元素，包裹选中文本，使之高亮
                                        createSpanElement(elemInput, startPos, elemInput, endPos);
                                    }
                                }
                            }
                        }
                        if(debugMode != 0){writeToConsole(`ENDING hierarchyLevel: ${thisHierarchyLevel} | inputNodeName: ${inputNodeName} | inputNodeText: ${inputNodeText}`,3);}
                    }

                    return;
                }

                //创建元素，包裹选中文本，使之高亮
                function createSpanElement(startElemNode, startElemPos, endElemNode, endElemPos, spanClass = "roamJsHighlighter", spanColor = "yellow", spanTitle = "")
                {
                    //Create a range to create the new SPAN element from below
                    var divTest = document.createRange();
                    //添加 Range 的起点和终点（将选中文本包裹起来）
                    divTest.setStart(startElemNode, startElemPos);
                    divTest.setEnd(endElemNode, endElemPos);
                    //获取 Range 包含的文档片段
                    var subSelection = divTest;
                    var selectedText = subSelection.extractContents();
                    //创建 span 元素，并将它添加到 romaJsHighlighter 类，方便后续循环调用
                    var newSpan = document.createElement("span");

                    if(foundSelection == 0)
                    {
                        // 累加计数
                        foundSelection = 1;
                        highlightCtr++
                    }
                    //生成标题，HL:计数
                    if(spanTitle == ""){spanTitle = 'HL:' + highlightCtr;}

                    //添加 CSS 样式，但是要考虑样式支持「黑色主题」，否则 Dark mode 下看不到高亮
                    newSpan.style.setProperty("background-color", spanColor, "important");
                    newSpan.style.setProperty("color", "black", "important");

                    //指定高亮元素的 class ，方便后续可以循环通过 class 获取至剪贴板
                    newSpan.className = spanClass;
                    newSpan.title = spanTitle;

                    //Don't think I am using this yet but idea is to be able to indent in Roam under a UL
                    if(startElemNode.parentNode.nodeName == 'LI')
                    {
                        newSpan.setAttribute("hltabs", "1");
                    }

                    newSpan.appendChild(selectedText);
                    subSelection.insertNode(newSpan);
                    if(debugMode != 0){writeToConsole("NEW SPAN CREATED: " + newSpan);}
                    if(thisIsFirst == 1)
                    {
                        thisIsFirst = 0;
                    }

                    return newSpan;
                }
                //跳过不想添加到 highlighter 的某些类型元素
                function ignoreElement(elemInput)
                {
                    //Toggl Tracker hidden svg creates errors
                    if(elemInput.parentElement.parentElement.nodeName == 'svg' || elemInput.parentElement.nodeName == 'svg'){return true}

                    //Slack post reactions, timestamps, media etc.
                    var elemClassCheck = elemInput.parentElement.className.trim();
                    var parElemClassCheck = elemInput.parentElement.parentElement.className.trim();
                    var parParElemClassCheck = elemInput.parentElement.parentElement.parentElement.className.trim();
                    var parElemType = elemInput.parentElement.nodeName;

                    if(
                        //Slack
                        elemClassCheck == 'c-reaction__count' || elemClassCheck == 'c-timestamp__label' || elemClassCheck == 'c-message__edited_label' || elemClassCheck == 'c-message_kit__file__meta__text' || elemClassCheck == 'c-message_kit__file__meta' || elemClassCheck == 'c-pillow_file__swap' || elemClassCheck == 'c-pillow_file__title' || elemClassCheck == 'c-pillow_file__slide c-pillow_file__size__action' || parElemClassCheck == 'c-message_kit__file__meta__text' || elemClassCheck == 'c-link--button c-message_kit__labels__link' || parElemClassCheck == 'c-pillow_file__header c-pillow_file__header--tombstone' || elemClassCheck == 'c-message_attachment__author_name' || elemClassCheck == 'c-message_attachment__author c-message_attachment__author--has_subname' || elemClassCheck == 'c-message_attachment__author_subname' || parElemClassCheck == 'c-link c-message_attachment__title_link' || elemClassCheck == 'p-threads_flexpane__separator_count' || elemClassCheck == 'p-threads_view_load_older_message p-threads_view_load_older_message--with-gutter' || elemClassCheck == 'c-link--button c-message_attachment__text_expander' || elemClassCheck == 'c-message_attachment__footer_attribution c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__footer_attribution c-message_attachment__part' || elemClassCheck == 'c-message_attachment__footer_text c-message_attachment__part' || parParElemClassCheck == 'c-message_attachment__footer_text c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__text' || parParElemClassCheck == 'c-message_attachment__text' || elemClassCheck == 'c-message_attachment__footer' || parElemClassCheck == 'c-link--button c-member_link c-message_attachment__author_name' || parElemClassCheck == 'c-message_attachment__footer_text c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__footer_ts c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__part sk_highlight' || elemClassCheck == 'c-message_list__unread_divider__label'
                        //Github issues
                        || parElemType == 'G-EMOJI' || parElemType == 'BUTTON' || parElemType == 'TEXTAREA' || parElemClassCheck == 'comment-form-error comment-show-stale' || parElemClassCheck == 'link-gray js-timestamp')
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }


                switch (debugMode)
                {
                    case 1:
                        writeToConsole("Show Level 1 Debugging",1);
                        break;
                    case 2:
                        writeToConsole("Show Level 1 Debugging",1);
                        writeToConsole("Show Level 2 Debugging",2);
                        break;
                    case 3:
                        writeToConsole("Show Level 1 Debugging",1);
                        writeToConsole("Show Level 2 Debugging",2);
                        writeToConsole("Show All Debugging Levels",3);
                        break;
                    default:
                        //Don't show any debugging
                        break;
                }

                if(debugMode != 0)
                {
                    writeToConsole('range:');
                    writeToConsole(range,1,0);
                    writeToConsole('startCont: ' + startCont);
                    writeToConsole('startOffset: ' + startOff);
                    writeToConsole('endCont: ' + endCont);
                    writeToConsole('endOffset: ' + endOff);
                    writeToConsole('allWithinRangeParent:');
                    writeToConsole(allWithinRangeParent,1,0);
                    writeToConsole('allWithinRangeParent.childNodes:');
                    writeToConsole(allWithinRangeParent.childNodes,1,0);
                }

                var bRemoveHighlights = false;
                //如果只选择了一个 HTML 元素
                if(allWithinRangeParent.childNodes.length == 0)
                {
                    if(allWithinRangeParent.parentElement.className == "roamJsHighlighter" || allWithinRangeParent.parentElement.className == "roamJsHighlighter pageLink")
                    {
                        //调用函数，删除高亮显示
                        removeHighlight(allWithinRangeParent.parentElement);
                        bRemoveHighlights = true;
                    }
                    else
                    {
                        if(startCont === endCont && endOff > startOff)
                        {
                            //处理只选择了一个 HTML 元素
                            createSpanElement(startCont, startOff, endCont, endOff);
                            //清除原始用户鼠标选择
                            document.getSelection().removeAllRanges();
                        }
                    }
                }

                //----------------------------------------------------------------
                //以下是处理选中了多行文本
                //如果被选中的是以前高亮的文本，那么用户就会试图移除高亮部分
                if(bRemoveHighlights == false)
                {
                    //快速循环浏览每个选定的元素，看是否有元素已经被高亮显示。
                    for(var i=0, elem; elem = allWithinRangeParent.childNodes[i]; i++)
                    {
                        if(elem == endCont && endOff == 0)
                        {
                            //这通常发生在鼠标三连击选中元素，会导致选中范围溢出到下一个元素，但是偏移量 endOffset 为0
                            if(debugMode != 0){writeToConsole("Exiting the PRE loop as came to the EndContainer of Range and it has endOffset of 0");}
                            break;
                        }
                        if(debugMode != 0)
                        {
                            writeToConsole(elem,1,0);
                            writeToConsole('elem.className: ' + elem.className,1);
                        }
                        if(selection.containsNode(elem, true))
                        {
                            //只处理选中范围内的元素
                            writeToConsole("Selection here found");
                            if (typeof elem.querySelectorAll !== "undefined")
                            {
                                var elemsInSameHighlight = elem.querySelectorAll(".roamJsHighlighter, .roamJsHighlighter pageLink");
                                var m = 0;
                                for(var m = 0; m < elemsInSameHighlight.length; m++)
                                {
                                    //循环移除 elems 中每一个高亮元素
                                    var newCurElement = elemsInSameHighlight.item(m);
                                    if(debugMode != 0)
                                    {
                                        writeToConsole(newCurElement,1,0);
                                        writeToConsole('newCurElement.className: ' + newCurElement.className,1);
                                    }
                                    if(selection.containsNode(newCurElement, true))
                                    {
                                        if(newCurElement.className == "roamJsHighlighter" || newCurElement.className == "roamJsHighlighter pageLink")
                                        {
                                            //移除高亮元素
                                            removeHighlight(newCurElement);
                                            bRemoveHighlights = true;
                                        }
                                    }else{if(debugMode != 0){writeToConsole('NOT SELECTED newCurElement.className: ' + newCurElement,1);}}
                                }
                                //如果当前元素本身就是高亮的，那么直接移除
                                if(m == 0 && (elem.className == "roamJsHighlighter" || elem.className == "roamJsHighlighter pageLink"))
                                {
                                    //Remove highlights
                                    removeHighlight(elem);
                                    bRemoveHighlights = true;
                                }
                            }
                        }else{if(debugMode != 0){writeToConsole('NOT SELECTED elem.className: ' + elem,1);}}
                    }
                }

                if(bRemoveHighlights)
                {
                    //移除高亮，而不是新增
                    document.getSelection().removeAllRanges();
                }else{
                    //循环整个选项，逐段处理，高亮选中的内容
                    if(debugMode != 0){writeToConsole("Starting loop through all elements contained in the parent container of the highest common level of selected text");}
                    for (var i=0, elem; elem = allWithinRangeParent.childNodes[i]; i++)
                    {
                        if(elem == endCont && endOff == 0)
                        {
                            //This typically occurs if you triple click a paragraph to select it all and the selection bleeds over into the next element but zero offset
                            if(debugMode != 0){writeToConsole("Exiting the REAL loop as came to the EndContainer of Range and it has endOffset of 0");}
                            //Clear the original user mouse selection
                            document.getSelection().removeAllRanges();
                            break;
                        }
                        consoleTabLevel = '';
                        var elementNodeName = elem.nodeName;
                        if(debugMode != 0){writeToConsole(`i: ${i} | Elem: ${elem} | Elem.nodeName: ${elementNodeName}`,2);}
                        var elementText = "";
                        if(elementNodeName == '#text'){elementText = elem.textContent;}else{elementText = elem.innerText;}

                        //Set to loglevel 2 if H1, H2, H3, H4 Header elements... otherwise loglevel 3
                        if(elementNodeName == 'H1' || elementNodeName == 'H2' || elementNodeName == 'H3' || elementNodeName == 'H4'){tempLogLevel = 2;}else{tempLogLevel = 3;}
                        if(debugMode != 0)
                        {
                            writeToConsole(`i: ${i} | elementText: ${elementText}`, tempLogLevel);
                            writeToConsole(`i: ${i} | elementInnerHtml: ${elem.innerHTML}`, 3);
                        }

                        //检查元素是否是选中文本的一部分，否则就跳过
                        if(selection.containsNode(elem, true))
                        {
                            consoleTabLevel = '\t';
                            if(debugMode != 0)
                            {
                                writeToConsole("This element was at least partially found in the Selected Text by the user");
                                writeToConsole(`i: ${i} | Elem: ${elem} | Elem.nodeName: ${elementNodeName}`);
                                writeToConsole(`i: ${i} | elementText: ${elementText}`)
                            }

                            //递归直到找到 #text 的值
                            var newCtr = 1;
                            consoleTabLevel = '\t\t';

                            //var findHierarchy = findLowestNode(elem, 'root:' + elementNodeName);
                            //递归查找每一层，将选中的文本内容高亮
                            findLowestNode(elem, 'root');
                            if(debugMode != 0){writeToConsole("foundStart: " + foundStartOfSelection + " foundEnd: " + foundEnd, 3);}
                            //如果没有找到选择的开头，则跳到循环的下一项
                            if(foundStartOfSelection == 0){continue;}

                            if(foundEnd == 1)
                            {
                                //清除鼠标选择状态
                                document.getSelection().removeAllRanges();
                                if(debugMode != 0){writeToConsole("Exiting the REAL loop as foundEnd == 1");}
                                break;
                            }
                            consoleTabLevel = '\t';
                        }
                        consoleTabLevel = '';
                    }
                    if(debugMode != 0)
                    {
                        writeToConsole(`allTextFound: ${allTextFound}`);
                        writeToConsole(`Ended i Loop at: ${i}`);
                    }
                }
            }

            //----------------------------------------------------------------
            //以下是剪贴板部分
            writeToConsole("BEFORE RUNNING UPDATECLIPBOARD");
            //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
            // 运行函数循环将高亮显示的元素复制到剪贴板，以便粘贴
            clickEvent = 0;
            if(kindleClickEvent != 1){updateClipboard(e);}
            kindleClickEvent = 0;
            e.preventDefault();
        });

        //2.4 监听鼠标选取事件，以实现「自动高亮」功能
        //Add listener for auto highlighting trigger without needing ctrl+X
        document.addEventListener('click', function (evt)
        {
            if(bAutoHL && showWindow == 1)
            {
                if(evt.detail > 1 && evt.detail != 3){return} //Prevents double-click so that if already highlighted then double click still changes to blue which means Roam page link; also allows triple click to work

                if(typeof window.getSelection != "undefined")
                {
                    var selectedTextStr = window.getSelection().toString();
                    if(selectedTextStr != '')
                    {
                        var selectedElement = evt.target;
                        if(selectedElement.className == "roamJsHighlighter" || selectedElement.className == "roamJsHighlighter pageLink"){return} //Exit if already highlighted as need ability to select multi word highlights to turn blue with Alt + Z
                        //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                        //We already have the "cut" event listener set to run our code, so this should activate it
                        clickEvent = 0;
                        //TODO:这里的问题有两个需要解决
                        //1.document.execCommand('cut'); 在 safari 下不能被触发（自定义的方法）
                        //2.采用 document.dispatchEvent(); 倒是触发了，但是无法将内容保存到剪贴板
                        // var dT  = new DataTransfer();
                        // var pasteEvent = new ClipboardEvent('cut',{clipboardData: dT});
                        var pasteEvent = new ClipboardEvent('cut');
                        document.dispatchEvent(pasteEvent);
                        // document.execCommand('cut'); // safari 下不支持
                    }
                }
            }
        });

        //2.5 处理鼠标点击「高亮」内容的操作，包括移除高亮和增加高亮
        //点击高亮部分（按住 Alt 键）可以取消对应的高亮
        //按住 ctrl 单击，会让选中的词高亮
        //Add click event to allow for "erasing" of previous highlights you don't want anymore. Simply click anywhere inside the highlight
        //Or if you selected text then it will try and add page linking for Roam
        //Lastly if you hold ctrl and click then it will add page link for that single word you clicked
        //Going to change the single click to require ctrl to be held down to remove highlights which will allow for double click even to fire for selecting a word
        document.addEventListener('click', function(evt) {
            var curElement = evt.target || evt.srcElement;
            //MACs can't use the ctrl key because that simulates a right click so using Alt for them
            //var specialKeyHeld = evt.shiftKey;
            //var specialKeyHeld = evt.ctrlKey;
            var specialKeyHeld = evt.altKey;
            //var specialKeyHeld = evt.metaKey; //metakey for Macs is Command key
            if(specialKeyHeld || evt.ctrlKey)
            {
                if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
                {
                    var bSelFound = 0;
                    if(typeof window.getSelection != "undefined") //If there is selected text
                    {
                        var theSelection = window.getSelection();
                        if(theSelection.toString().length > 0){bSelFound = 1;}
                    }

                    if(bSelFound == 1)
                    {
                        var theSelection = window.getSelection();
                        if(theSelection.toString().length > 0)
                        {
                            //Create new SPAN element for the page reference highlight
                            var divTest = document.createRange();
                            //divTest = window.getSelection();
                            divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                            divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
                            var subSelection = divTest;
                            var selectedText = subSelection.extractContents();
                            //Create new HTML element SPAN
                            var newSpanTag = document.createElement("span");
                            //Adding !important to CSS to account for Dark Theme extensions that override styles... otherwise can't see highlights in dark mode
                            newSpanTag.style.setProperty("background-color", "aqua", "important");
                            newSpanTag.style.setProperty("color", "black", "important");
                            //Set class for the new SPAN element so you can loop through the highlights later to copy to clipboard
                            newSpanTag.className = "roamJsHighlighter pageLink";
                            newSpanTag.title = curElement.title;
                            newSpanTag.appendChild(selectedText);
                            subSelection.insertNode(newSpanTag);
                        }
                    }
                    else
                    {
                        //Remove highlights
                        var titleOfElement = curElement.title;
                        if(curElement.className == 'roamJsHighlighter pageLink')
                        {
                            removeHighlight(curElement);
                        }
                        else
                        {
                            var elemsInSameHighlight = document.querySelectorAll('[title="' + titleOfElement + '"]');

                            for(var i = 0; i < elemsInSameHighlight.length; i++)
                            {
                                curElement = elemsInSameHighlight.item(i);
                                //call function to remove element
                                removeHighlight(curElement);
                            }
                        }
                    }

                    evt.preventDefault();
                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 1;
                    var pasteEvent = new ClipboardEvent('cut');
                    document.dispatchEvent(pasteEvent);
                    // document.execCommand('cut');
                }
                else
                {
                    //Commenting this out because when writing to console it actually prevents a quick highlight after selecting text
                    //and trying to use ctrl + x "cut" to trigger a highlight if you do it too quickly because when you highlight you are clicking first
                }
            }
        });

        //2.6 alt + ctrl 鼠标右键，调整 header 层级 相当于选中后 alt+A
        document.addEventListener('contextmenu', function(evt) {
            var curElement = evt.target || evt.srcElement;
            var specialKeyHeld = evt.altKey;
            if(specialKeyHeld || evt.ctrlKey)
            {
                if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
                {
                    var titleOfElement = curElement.title;
                    var elemsInSameHighlight = document.querySelectorAll('[title="' + titleOfElement + '"]');

                    for(var i = 0; i < elemsInSameHighlight.length; i++)
                    {
                        eachElement = elemsInSameHighlight.item(i);
                        //Check if already set
                        var foundHeader = eachElement.getAttribute('hlheader');
                        if(foundHeader == null)
                        {
                            eachElement.setAttribute("hlHeader", "1");
                            eachElement.style.setProperty("color", "red", "important");
                        }else if(foundHeader == '1')
                        {
                            eachElement.setAttribute("hlHeader", "2");
                            eachElement.style.setProperty("color", "darkseagreen", "important");
                        }else if(foundHeader == '2')
                        {
                            eachElement.removeAttribute("hlHeader");
                            eachElement.style.setProperty("color", "black", "important");
                        }
                        //Only do the first item otherwise if you have a multi line highlight it will indent out for each line
                        break;
                    }

                    // evt.preventDefault();
                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 1;
                    var pasteEvent = new ClipboardEvent('cut');
                    document.dispatchEvent(pasteEvent);
                    // document.execCommand('cut');
                }
            }
        });

        //2.7双击创建「双相连接」
        //Add Double Click event to allow for page linking to a single word since double click will highlight the word you are clicking already
        document.addEventListener('dblclick', function(evt) {
            var curElement = evt.target || evt.srcElement;

            if(debugMode != 0)
            {
                writeToConsole("****** DOUBLE CLICK *******");
                writeToConsole(curElement,1,0);
                writeToConsole(curElement.className);
            }

            if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
            {
                var bSelFound = 0;
                if (typeof window.getSelection != "undefined")
                {
                    var theSelection = window.getSelection();
                    var theSelectionString = theSelection.toString();
                    if(debugMode != 0)
                    {
                        writeToConsole(theSelectionString);
                        writeToConsole(theSelection.anchorNode,1,0);
                        writeToConsole(theSelection.anchorOffset);
                        writeToConsole(theSelection.focusNode,1,0);
                        writeToConsole(theSelection.focusOffset);
                    }
                    if(theSelectionString.length > 0)
                    {
                        var divTest = document.createRange();
                        //If there is a single bolded word on webpage it is its own element and the selection then will extend into next element with double click when adding extra space
                        if(theSelection.anchorNode != theSelection.focusNode)
                        {
                            if(theSelectionString.substring(0,1) == " ")
                            {
                                //Extra space at beginning of word which means the full word should be in the extendNode instead
                                divTest.setStart(theSelection.focusNode, 0);
                                divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
                            }
                            else
                            {
                                //Extra space at end of word which means the full word should be in the anchorNode
                                divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                                divTest.setEnd(theSelection.anchorNode, theSelection.anchorNode.length);
                            }
                        }
                        else
                        {
                            //Fix the selection in case it extends a character and grabs space character in front or after the word
                            if(theSelectionString.substring(0,1) == " "){var addOffset = 1;}else{var addOffset = 0;}
                            if(theSelectionString.substring(theSelectionString.length - 1) == " "){var subOffset = 1;}else{var subOffset = 0;}
                            divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset + addOffset);
                            divTest.setEnd(theSelection.focusNode, theSelection.focusOffset - subOffset);
                        }
                        document.getSelection().removeAllRanges();
                        document.getSelection().addRange(divTest);
                        bSelFound = 1;
                    }
                }

                if(bSelFound == 1)
                {
                    theSelection = window.getSelection();
                    writeToConsole(theSelection,1,0);
                    if(theSelection.toString().length > 0)
                    {
                        if(debugMode != 0)
                        {
                            writeToConsole(theSelection.anchorNode,1,0);
                            writeToConsole(theSelection.anchorOffset);
                            writeToConsole(theSelection.focusNode,1,0);
                            writeToConsole(theSelection.focusOffset);
                            writeToConsole(curElement.title);
                        }
                        //Create new SPAN element for the page reference highlight
                        var divTest = document.createRange();
                        //divTest = window.getSelection();
                        divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                        divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
                        var subSelection = divTest;
                        var selectedText = subSelection.extractContents();
                        //Create new HTML element SPAN
                        var newSpanTag = document.createElement("span");
                        //Adding !important to CSS to account for Dark Theme extensions that override styles... otherwise can't see highlights in dark mode
                        newSpanTag.style.setProperty("background-color", "aqua", "important");
                        newSpanTag.style.setProperty("color", "black", "important");
                        //Set class for the new SPAN element so you can loop through the highlights later to copy to clipboard
                        newSpanTag.className = "roamJsHighlighter pageLink";
                        newSpanTag.title = curElement.title;
                        newSpanTag.appendChild(selectedText);
                        subSelection.insertNode(newSpanTag);
                    }
                }
                //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
                //Old Way which wasn't working with clipboardData setData since not called by a cut or copy event
                //updateClipboard();
                //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                //We already have the "cut" event listener set to run our code, so this should activate it
                clickEvent = 1;
                var pasteEvent = new ClipboardEvent('cut');
                document.dispatchEvent(pasteEvent);
                // document.execCommand('cut');
            }
            else
            {
                //Commenting this out because when writing to console it actually prevents a quick highlight after selecting text
                //and trying to use ctrl + x "cut" to trigger a highlight if you do it too quickly because when you highlight you are clicking first
            }
        });

        //剪贴板函数解决 Safari 无法直接复制剪贴板
        const copyToClipboard = (text) => {
            const textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
            textarea.value = text;
            textarea.select();
            textarea.setSelectionRange(0, 99999);
            document.execCommand('copy');
            document.body.removeChild(textarea);
        };

        //2.8 -----------------再次调用 cut 事件防止没有被执行
        //初始状态下激活剪贴板，从而获得 [Page Title](URL)
        //Run during initial activation of highlighter in order to have by default the [Page Title](URL)
        //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
        //We already have the "cut" event listener set to run our code, so this should activate it
        clickEvent = 1;
        var pasteEvent = new ClipboardEvent('cut');
        document.dispatchEvent(pasteEvent);
        // document.execCommand('cut');
        //---------下边是相关函数
        //移除所有高亮元素
        function removeAllHighlights()
        {
            var prevText = "", nextText = "";
            var elemHighlights = document.querySelectorAll(".roamJsHighlighter");
            for (var i = 0; i < elemHighlights.length; i++)
            {
                var curElement = elemHighlights.item(i);

                //Check the previous and next siblings (i.e., the element before and after our highlight SPAN)
                if(curElement.previousSibling !== null){prevText = curElement.previousSibling.textContent;}
                if(curElement.nextSibling !== null){nextText = curElement.nextSibling.textContent;}
                if(prevText.length > 0)
                {
                    //If there is a previous sibling, then will append the highlighted text to that element to try and get HTML back to way it was before highlighter
                    if(nextText.length > 0)
                    {
                        //If there is ALSO a next sibling then that means the highlight was in the middle of a paragraph etc.
                        //We will then want to merge the highlighted text, and the prevoius and next siblings all into one element to get back to way it was before highlighter
                        var newText = prevText + curElement.innerText + nextText;
                        curElement.previousSibling.textContent = newText;
                        curElement.nextSibling.remove();
                    }else {
                        var newText = prevText + curElement.innerText;
                        curElement.previousSibling.textContent = newText;
                    }
                }
                else
                {
                    var newText = curElement.innerText + nextText;
                    curElement.nextSibling.textContent = newText;
                }

                // remove the empty element that had the highlights before
                curElement.remove();
            }

            //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
            //We already have the "cut" event listener set to run our code, so this should activate it
            clickEvent = 1;
            var pasteEvent = new ClipboardEvent('cut');
            document.dispatchEvent(pasteEvent);
            // document.execCommand('cut');
        }

        //This function adds Roam markdown formatting based on Element type (e.g., <STRONG> --> **text**)
        // 重点函数处理一些格式化问题（缩进/链接等）
        //1. 应该是 Roam markdown 标记，Obsidian 应用不多
        //2. 将 HTML 元素转变成对应的 MarkDown 标记例如缩进和列表
        function convertFormat(eachHighlight, elemSpan) {
            var parNodeName = elemSpan.parentElement.nodeName;
            var parElemText = elemSpan.parentElement.innerText;
            if(parElemText == null){parElemText = ''}

            var parParNodeName = elemSpan.parentElement.parentElement.nodeName;
            var parParElemText = "";
            if(parParNodeName != 'DIV' && parParNodeName != 'BODY' && parParNodeName != 'ARTICLE'){parParElemText = elemSpan.parentElement.parentElement.innerText;}
            if(parParElemText == null){parParElemText = ''}

            var parParParNodeName = elemSpan.parentElement.parentElement.parentElement.nodeName;
            var parParParElemText = "";
            if(parParParNodeName != 'DIV' && parParParNodeName != 'BODY' && parParParNodeName != 'ARTICLE'){parParParElemText = elemSpan.parentElement.parentElement.parentElement.innerText;}

            var parParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.nodeName;
            var parParParParElemText = "";
            if(parParParParNodeName != 'DIV' && parParParParNodeName != 'BODY' && parParParParNodeName != 'ARTICLE'){parParParParElemText = elemSpan.parentElement.parentElement.parentElement.parentElement.innerText;}

            if(parNodeName == "A")
            {
                if(elemSpan.parentElement.classList.contains("c-message__sender_link")) //Slack username link
                {
                    elemSpan.setAttribute("hlHeader", "3");
                }
            }

            var foundHeader = elemSpan.getAttribute('hlheader'); //Red text selected by user
            var bFoundHeader = false;
            var bFoundUlBullet = false;
            //debugMode = 1;
            if(debugMode != 0)
            {
                writeToConsole('');
                writeToConsole('eachHighlight: ' + eachHighlight);
                writeToConsole('parNodeName: ' + parNodeName);
                writeToConsole('parElemText: ' + parElemText);
                writeToConsole('parParNodeName: ' + parParNodeName);
                writeToConsole('parParElemText: ' + parParElemText);
                writeToConsole('parParParNodeName: ' + parParParNodeName);
                writeToConsole('parParParElemText: ' + parParParElemText);
                writeToConsole('parParParParNodeName: ' + parParParParNodeName);
                writeToConsole('parParParParElemText: ' + parParParParElemText);
            }
            //debugMode = 0;

            //var origEachHighlight = eachHighlight;
            //Adding to default setting to replace line breaks within an element with a space as for the most part, shouldn't have line breaks within a single element.
            if(sameBlock == 0){eachHighlight = eachHighlight.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ");}

            //Determine whether to add ellipsis later in the code
            var prevElemSib = elemSpan.parentElement.previousElementSibling
            var prevNodeSib = elemSpan.parentElement.previousSibling
            var nextELemSib = elemSpan.parentElement.nextElementSibling
            var nextNodeSib = elemSpan.parentElement.nextSibling
            var nextSibNode = elemSpan.nextSibling
            var nextSibELem = elemSpan.nextElementSibling
            var prevSibNode = elemSpan.previousSibling
            var prevSibElem = elemSpan.previousElementSibling

            if(prevElemSib){var prevElemSibName = prevElemSib.nodeName}else{var prevElemSibName = ""}
            if(prevNodeSib){var prevNodeSibName = prevNodeSib.nodeName}else{var prevNodeSibName = ""}
            if(prevNodeSib){var prevNodeSibText = prevNodeSib.textContent.replace(/\n|\r/g,'').trim()}else{var prevNodeSibText = ""}
            if(nextELemSib){var nextElemSibName = nextELemSib.nodeName}else{var nextElemSibName = ""}
            if(nextNodeSib){var nextNodeSibName = nextNodeSib.nodeName}else{var nextNodeSibName = ""}
            if(nextNodeSib){var nextNodeSibText = nextNodeSib.textContent.replace(/\n|\r/g,'').trim()}else{var nextNodeSibText = ""}
            if(prevSibElem){var prevSibElemName = prevSibElem.nodeName}else{var prevSibElemName = ""}
            if(prevSibElem){var prevSibElemClass = prevSibElem.className}else{var prevSibElemClass = ""}
            if(nextSibELem){var nextSibELemName = nextSibELem.nodeName}else{var nextSibELemName = ""}
            if(prevSibNode){var prevSibNodeText = prevSibNode.textContent.replace(/\n|\r/g,'').trim()}else{var prevSibNodeText = ""}
            if(nextSibNode){var nextSibNodeText = nextSibNode.textContent.replace(/\n|\r/g,'').trim()}else{var nextSibNodeText = ""}

            var tmpEachHighlight = eachHighlight
            //根据「标记」在字符串前后添加「开始」和「结束」标记位（指的是是整段选择，不是每一行）
            if(parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "EM" || parNodeName == "U" || parNodeName == "CODE")
            {
                //Check if start of line (SOL) ; this is used for determining later whether to add ellipsis on front / end
                if(prevNodeSibName == 'BR' || (prevElemSibName == 'BR' && prevNodeSibText == '') || eachHighlight == parParElemText.substring(0,eachHighlight.length)){tmpEachHighlight = '||SOL||' + eachHighlight}
                //Check if end of line (EOL)
                if(nextNodeSibName == 'BR' || (nextElemSibName == 'BR' && nextNodeSibText == '') || eachHighlight == parParElemText.slice(-1*eachHighlight.length)){tmpEachHighlight = tmpEachHighlight + '||EOL||'}
            }
            else
            {
                //Check if start of line (SOL) ; this is used for determining later whether to add ellipsis on front / end
                if(eachHighlight == parElemText.substring(0,eachHighlight.length) || ((prevSibElemName == 'BR' || prevSibElemClass == 'c-mrkdwn__br') && prevSibNodeText == '')){tmpEachHighlight = '||SOL||' + eachHighlight}
                //Check if end of line (EOL)
                if(eachHighlight == parElemText.slice(-1*eachHighlight.length) || (nextSibELemName == 'BR' && nextSibNodeText == '')){tmpEachHighlight = tmpEachHighlight + '||EOL||'}
            }

            eachHighlight = tmpEachHighlight

            if(parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "EM" || parNodeName == "U" || parNodeName == "CODE" || parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "DEL" || parNodeName == "INS"){eachHighlight = eachHighlight.split("#").join("_")} //Replace hashtag with _ because otherwise later in script we put `#` backticks around it and then formatting won't work around it

            if(parNodeName == "STRONG" || parNodeName == "B"){eachHighlight = formatBold + eachHighlight + formatBold;}
            if(parNodeName == "EM" || parNodeName == "U"){eachHighlight = formatItalics + eachHighlight + formatItalics;}
            if(parNodeName == "CODE"){eachHighlight = formatCode + eachHighlight + formatCode;}
            if(parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "DEL"){eachHighlight = formatStrike + eachHighlight + formatStrike;}
            if(parNodeName == "INS"){eachHighlight = formatInsert + eachHighlight + formatInsert;}
            //if(origEachHighlight == parElemText || origEachHighlight == parParElemText || origEachHighlight == parParParElemText)
            //{
            if(parNodeName == "H1" || parNodeName == "H2" || parNodeName == "H3" || parParNodeName == "H1" || parParNodeName == "H2" || parParNodeName == "H3" || parParParNodeName == "H1" || parParParNodeName == "H2" || parParParNodeName == "H3")
            {
                bFoundHeader = true;
                if(parNodeName == "H1" || parParNodeName == "H1" || parParParNodeName == "H1"){eachHighlight = '||h1||' + eachHighlight;}
                if(parNodeName == "H2" || parParNodeName == "H2" || parParParNodeName == "H2"){eachHighlight = '||h2||' + eachHighlight;}
                if(parNodeName == "H3" || parParNodeName == "H3" || parParParNodeName == "H3"){eachHighlight = '||h3||' + eachHighlight;}
            }
            //}

            //Adding indent for bullet list sub bullets when there is no "other" element directly around text like Bold/Italics etc.
            //当文本元素周围没有其他元素时，为子弹头列表中的子弹头添加缩进，还有粗体/斜体等
            if(parNodeName == 'LI' && (parParNodeName == 'UL' || parParNodeName == 'OL'))
            {
                bFoundUlBullet == true;
                var parParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;
                var parParParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;

                var newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                if(newParElement != null)
                {
                    var parParParParParParParNodeName = newParElement.nodeName;

                    newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if(newParElement != null)
                    {
                        var parParParParParParParParNodeName = newParElement.nodeName;
                        newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                        if(newParElement != null){var parParParParParParParParParNodeName = newParElement.nodeName;}else{var parParParParParParParParParNodeName = "NULL";}
                    }
                    else
                    {
                        var parParParParParParParParNodeName = "NULL";
                        var parParParParParParParParParNodeName = "NULL";
                    }
                }
                else
                {
                    var parParParParParParParNodeName = "NULL";
                    var parParParParParParParParNodeName = "NULL";
                    var parParParParParParParParParNodeName = "NULL";
                }

                var levelsDeep = 1;
                if(parParParNodeName == 'LI' && (parParParParNodeName == 'UL' || parParParParNodeName == 'OL')){levelsDeep = 2;}
                if(parParParParParNodeName == 'LI' && (parParParParParParNodeName == 'UL' || parParParParParParNodeName == 'OL')){levelsDeep = 3;}
                if(parParParParParParParNodeName == 'LI' && (parParParParParParParParNodeName == 'UL' || parParParParParParParParNodeName == 'OL')){levelsDeep = 4;}
                //Outlook webmail
                if((parParNodeName == 'UL' || parParNodeName == 'OL') && (parParParNodeName == 'UL' || parParParNodeName == 'OL'))
                {
                    levelsDeep = 2;
                    if(parParParParNodeName == 'UL' || parParParParNodeName == 'OL')
                    {
                        levelsDeep = 3;
                        if(parParParParParNodeName == 'UL' || parParParParParNodeName == 'OL')
                        {
                            levelsDeep = 4;
                        }
                    }
                }

                switch (levelsDeep)
                {
                    case 1:
                        eachHighlight = '||ul-one||' + eachHighlight;
                        break;
                    case 2:
                        eachHighlight = '||ul-two||' + eachHighlight;
                        break;
                    case 3:
                        eachHighlight = '||ul-three||' + eachHighlight;
                        break;
                    case 4:
                        eachHighlight = '||ul-four||' + eachHighlight;
                        break;
                    default:
                        eachHighlight = '||ul-four||' + eachHighlight;
                        break;
                }
            }else if(parParNodeName == 'LI' && (parParParNodeName == 'UL' || parParParNodeName == 'OL') && parNodeName != 'LI') //Adding indent for bullet list sub bullets when there is Bold/Italics etc. around text (one level deeper of parent elements to access)
            {
                //子弹头处理，标记为 true
                bFoundUlBullet == true;
                var parParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;
                var parParParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;

                var newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                if(newParElement != null)
                {
                    var parParParParParParParNodeName = newParElement.nodeName;

                    newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if(newParElement != null)
                    {
                        var parParParParParParParParNodeName = newParElement.nodeName;
                        newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                        if(newParElement != null){var parParParParParParParParParNodeName = newParElement.nodeName;}else{var parParParParParParParParParNodeName = "NULL";}
                    }
                    else
                    {
                        var parParParParParParParParNodeName = "NULL";
                        var parParParParParParParParParNodeName = "NULL";
                    }
                }
                else
                {
                    var parParParParParParParNodeName = "NULL";
                    var parParParParParParParParNodeName = "NULL";
                    var parParParParParParParParParNodeName = "NULL";
                }
                //判断子弹头缩进的层级
                var levelsDeep = 1;
                if(parParParParNodeName == 'LI' && (parParParParParNodeName == 'UL' || parParParParParNodeName == 'OL')){levelsDeep = 2;}
                if(parParParParParParNodeName == 'LI' && (parParParParParParParNodeName == 'UL' || parParParParParParParNodeName == 'OL')){levelsDeep = 3;}
                if(parParParParParParParParNodeName == 'LI' && (parParParParParParParParParNodeName == 'UL' || parParParParParParParParParNodeName == 'OL')){levelsDeep = 4;}
                //Outlook webmail
                if((parParParNodeName == 'UL' || parParParNodeName == 'OL') && (parParParParNodeName == 'UL' || parParParParNodeName == 'OL'))
                {
                    levelsDeep = 2;
                    if(parParParParParNodeName == 'UL' || parParParParParNodeName == 'OL')
                    {
                        levelsDeep = 3;
                        if(parParParParParParNodeName == 'UL' || parParParParParParNodeName == 'OL')
                        {
                            levelsDeep = 4;
                        }
                    }
                }

                switch (levelsDeep)
                {
                    case 1:
                        eachHighlight = '||ul-one||' + eachHighlight;
                        break;
                    case 2:
                        eachHighlight = '||ul-two||' + eachHighlight;
                        break;
                    case 3:
                        eachHighlight = '||ul-three||' + eachHighlight;
                        break;
                    case 4:
                        eachHighlight = '||ul-four||' + eachHighlight;
                        break;
                    default:
                        eachHighlight = '||ul-four||' + eachHighlight;
                        break;
                }
            }

            if(foundHeader == 3 && bFoundHeader == false && bFoundUlBullet == false){eachHighlight = '<h6>' + eachHighlight + '</h6>';}
            if(foundHeader == 1 && bFoundHeader == false && bFoundUlBullet == false){eachHighlight = '||h-out||' + eachHighlight;}
            if(foundHeader == 2 && bFoundHeader == false && bFoundUlBullet == false){eachHighlight = '||h-in||' + eachHighlight;}

            return eachHighlight;
        }

        //This function looks at current and previous "node" aka highlight aka span element to decide whether it should actually be on the same line or not
        //这个函数查看当前和前一个 "节点"（又称高亮）（又称跨度元素），以决定它实际上是否应该在同一行中。
        function isSameLine(curNode, prevNode, lastParNodeName) {
            var parNodeName = curNode.parentElement.nodeName;
            var parOfparNodeName = curNode.parentElement.parentElement.nodeName;
            var prevSibNode = curNode.previousElementSibling;
            if(prevSibNode == null){var prevSibNodeName = ""}else{var prevSibNodeName = prevSibNode.nodeName;}
            //var lastParNodeName = prevNode.parentElement.nodeName;
            var curHighlight = curNode.textContent;
            //debugMode = 1;
            if(debugMode != 0)
            {
                writeToConsole('curHighlight: ' + curHighlight);
                writeToConsole('curHighlight (1st char): "' + curHighlight.substring(0,1) + '"');
                writeToConsole(curNode,1,0);
                writeToConsole('parNodeName: ' + parNodeName);
                writeToConsole('parOfparNodeName: ' + parOfparNodeName);
                writeToConsole(curNode.parentElement.parentElement,1,0);
                writeToConsole(curNode.parentElement.parentElement.parentElement,1,0);
                writeToConsole(prevNode,1,0);
                writeToConsole(prevNode.parentElement.parentElement,1,0);
                writeToConsole(prevNode.parentElement.parentElement.parentElement,1,0);
                writeToConsole('prevSibNodeName: ' + prevSibNodeName);
                writeToConsole('prevNode.innerText: ' + prevNode.innerText);
                writeToConsole('prevNode.innerText (last 1 char): "' + prevNode.innerText.substring(prevNode.innerText.length - 1) + '"');
                writeToConsole('prevNode.innerText (last 1 char) MATCH: ' + (prevNode.innerText.substring(prevNode.innerText.length - 1) == '\xa0'));
                writeToConsole('prevNodeParent.innerText: ' + prevNode.parentElement.innerText);
                writeToConsole('lastParNodeName: ' + lastParNodeName);
            }
            //debugMode = 0;

            if(prevNode.parentElement == null || curNode.parentElement == null || prevNode.parentElement.innerText == null || curNode.parentElement.innerText == null){return false}

            if(
                (
                    (
                        (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "KBD" || parNodeName == "EM" || parNodeName == "I" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "DEL" || parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "INS")
                        || (prevSibNodeName == "A" || prevSibNodeName == "CODE" || prevSibNodeName == "KBD" || prevSibNodeName == "EM" || prevSibNodeName == "I" || prevSibNodeName == "U" || prevSibNodeName == "G-EMOJI" || prevSibNodeName == "STRONG" || prevSibNodeName == "B" || prevSibNodeName == "DEL" || prevSibNodeName == "STRIKE" || prevSibNodeName == "S" || prevSibNodeName == "INS")
                    )
                    && (
                        prevNode.innerText.substring(prevNode.innerText.length - 1) == " " || prevNode.innerText.substring(prevNode.innerText.length - 1) == '\xa0' || prevNode.innerText.substring(prevNode.innerText.length - 1) == "(" || prevNode.innerText.substring(prevNode.innerText.length - 1) == '"' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '“' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '”' || prevNode.innerText.substring(prevNode.innerText.length - 1) == "[" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "+" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "–" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "-"
                        || (prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == "[" && prevSibNodeName == "")
                        || (prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == "(" && prevSibNodeName == "")
                        || (prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == " " && prevSibNodeName == "")
                        || (prevNode.innerText.substring(prevNode.innerText.length - 1) == "]" && curHighlight.substring(0,1) == "(")
                        || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ")" && curHighlight.substring(0,1) == "#")
                        || ((prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == " " || prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == '\xa0') && prevSibNodeName == "")
                        || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ":" && (curHighlight.substring(0,1) == " " || curHighlight.substring(0,1) == '\xa0'))
                        || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ":" && (lastParNodeName == "EM" || lastParNodeName == "I" || lastParNodeName == "STRONG" || lastParNodeName == "B" || lastParNodeName == "DEL" || lastParNodeName == "STRIKE" || lastParNodeName == "S" || lastParNodeName == "INS") && curNode.parentElement.parentElement.innerText.toString().trim() != curHighlight.toString().trim())
                    )
                    && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim()) //If an LI item and current matches full text of LI, then you want a new line
                    && (parNodeName != "A" || (lastParNodeName != 'H1' && lastParNodeName != 'H2' && lastParNodeName != 'H3'))
                )
                || (
                    (
                        (lastParNodeName == "A" || lastParNodeName == "CODE" || lastParNodeName == "KBD" || lastParNodeName == "EM" || lastParNodeName == "I" || lastParNodeName == "U" || lastParNodeName == "G-EMOJI" || lastParNodeName == "STRONG" || lastParNodeName == "B" || lastParNodeName == "SUP" || lastParNodeName == "SUB" || lastParNodeName == "DEL" || lastParNodeName == "STRIKE" || lastParNodeName == "S" || lastParNodeName == "INS")
                        || (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "KBD" || parNodeName == "EM" || parNodeName == "I" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "DEL" || parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "INS")
                    )
                    && (
                        curHighlight.substring(0,1) == " " || curHighlight.substring(0,1) == '\xa0' || curHighlight.substring(0,1) == ")" || curHighlight.substring(0,1) == "." || curHighlight.substring(0,1) == "?" || curHighlight.substring(0,1) == "!" || curHighlight.substring(0,1) == "," || curHighlight.substring(0,1) == ":" || curHighlight.substring(0,1) == ";" || curHighlight.substring(0,1) == '”' || curHighlight.substring(0,1) == '“' || curHighlight.substring(0,1) == ']' || curHighlight.substring(0,1) == '+' || curHighlight.substring(0,1) == "–" || curHighlight.substring(0,1) == "-" || curHighlight.substring(0,1) == "'" || curHighlight.substring(0,1) == '"' ||
                        prevNode.parentElement.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.innerText.toString().trim()
                    )
                    && prevNode.getAttribute('hlheader') != 1
                    && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim()) //If an LI item and current matches full text of LI, then you want a new line
                )
                || parNodeName == "SUP" || parOfparNodeName == "SUP" || curHighlight.substring(0,1) == "."
                || parNodeName == "SUB"
                || curNode.parentElement.parentElement.className == "mw-editsection"
                || (lastParNodeName == "A" && parNodeName == "A" && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim().substring(0,curHighlight.toString().trim().length)) && (curNode.parentElement.parentElement.innerText.toString().trim() != curHighlight.toString().trim() || (curNode.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.innerText.toString().trim() && curNode.parentElement.parentElement.dataset.sk == 'tooltip_parent')) && (prevNode.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.parentElement.innerText.toString().trim() || prevNode.parentElement.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.parentElement.innerText.toString().trim() || prevNode.parentElement.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.parentElement.parentElement.innerText.toString().trim())) //Was added due to Wikipedia back to back link use case ; adding one more requirement though as created another issue; and another case for Slack
                || (curHighlight.substring(0,1) == " " && prevNode.innerText.substring(prevNode.innerText.length - 1) == " ")
            )
            {
                return true;
            }
            else{return false;}
        }

        function addEllipsis(wholeLine, thisIsHeader, thisIsBullet)
        {
            //* NEW FEATURE from 10-21-20 to add "..." at beginning and/or end of highlights that are mid-sentence
            var tmpwholeLine = wholeLine
            if(thisIsHeader == 0 && thisIsBullet == 0)
            {
                var tmp1 = tmpwholeLine.indexOf('<li>')
                var tmp2 = tmpwholeLine.indexOf('</li>')
                if(tmp1 > -1 && tmp2 > -1)
                {
                    var begOfLine = tmpwholeLine.substring(0,tmp1+4)
                    var endOfLine = tmpwholeLine.substring(tmp2)
                    tmpwholeLine = tmpwholeLine.substring(tmp1 + 4, tmp2)
                    var begBold = tmpwholeLine.startsWith(formatBold)
                    var endBold = tmpwholeLine.endsWith(formatBold)
                    var begItalics = tmpwholeLine.startsWith(formatItalics)
                    var endItalics = tmpwholeLine.endsWith(formatItalics)
                    if(begBold){tmpwholeLine = tmpwholeLine.substring(formatBold.length)}
                    if(endBold){tmpwholeLine = tmpwholeLine.substring(0,tmpwholeLine.length-formatBold.length)}
                    if(begItalics){tmpwholeLine = tmpwholeLine.substring(formatItalics.length)}
                    if(endItalics){tmpwholeLine = tmpwholeLine.substring(0,tmpwholeLine.length-formatItalics.length)}
                }

                var getFirstChar = tmpwholeLine.substring(0,1)
                var begEllips = false
                var getLastChar = tmpwholeLine.slice(-1)
                var endEllips = false

                switch (elipOpt)
                {
                    case 0:
                        //Default
                        break;
                    case 1:
                        //Front - Start lower case
                        if((/[a-z]/.test(getFirstChar))){begEllips = true}
                        break;
                    case 2:
                        //Back - End with letter, and not a LI bullet
                        if((/[A-Za-z]/.test(getLastChar))){endEllips = true}
                        break;
                    case 3:
                        //Both - combine front and back
                        if((/[a-z]/.test(getFirstChar))){begEllips = true}
                        if((/[A-Za-z]/.test(getLastChar))){endEllips = true}
                        break;
                }

                if(tmp1 > -1 && tmp2 > -1)
                {
                    if(begItalics){tmpwholeLine = formatItalics + tmpwholeLine}
                    if(endItalics){tmpwholeLine = tmpwholeLine + formatItalics}
                    if(begBold){tmpwholeLine = formatBold + tmpwholeLine}
                    if(endBold){tmpwholeLine = tmpwholeLine + formatBold}
                }

                if(begEllips){tmpwholeLine = '...' + tmpwholeLine}
                if(endEllips){tmpwholeLine = tmpwholeLine + '...'}

                if(tmp1 > -1 && tmp2 > -1)
                {
                    tmpwholeLine = begOfLine + tmpwholeLine + endOfLine
                }
            }

            return tmpwholeLine
        }

        function customDate(dateValue, dateFormat = 'mm-dd-yyyy')
        {
            //var dateString = dateValue.toLocaleDateString();
            var dateString = dateFormat.toLowerCase().trim();
            var monthFound = dateValue.getMonth();
            var monthStr = ("0" + (monthFound+1)).slice(-2);

            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
            var monthNameStr = months[monthFound];

            var dayFound = dateValue.getDate();
            var dayStr = ("0" + dayFound).slice(-2);

            var dayOfWeek = dateValue.getDay();
            const daysOfWeek = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ]
            var dayOfWeekStr = daysOfWeek[dayOfWeek];

            var yearFound = dateValue.getFullYear();
            var yearStr = yearFound.toString();

            var lookFor = '';
            var replaceWith = '';

            lookFor = 'mm';
            replaceWith = monthStr;
            if(dateString.indexOf(lookFor) > -1)
            {
                dateString = dateString.replace(lookFor,replaceWith);
            }

            lookFor = 'month';
            replaceWith = monthNameStr;
            if(dateString.indexOf(lookFor) > -1)
            {
                dateString = dateString.replace(lookFor,replaceWith);
            }

            lookFor = 'dd';
            replaceWith = dayStr;
            if(dateString.indexOf(lookFor) > -1)
            {
                dateString = dateString.replace(lookFor,replaceWith);
            }

            lookFor = 'day';
            replaceWith = dayOfWeekStr;
            if(dateString.indexOf(lookFor) > -1)
            {
                dateString = dateString.replace(lookFor,replaceWith);
            }

            lookFor = 'yyyy';
            replaceWith = yearStr;
            if(dateString.indexOf(lookFor) > -1)
            {
                dateString = dateString.replace(lookFor,replaceWith);
            }

            lookFor = 'yy';
            replaceWith = yearStr.slice(-2);
            if(dateString.indexOf(lookFor) > -1)
            {
                dateString = dateString.replace(lookFor,replaceWith);
            }

            lookFor = 'roam';
            var itm = 0;
            if (dayFound <= 0) {itm = 4;}
            else if ((dayFound > 3 && dayFound < 21) || dayFound % 10 > 3) {itm = 0;} //% gives you remainder after dividing
            else {itm = dayFound % 10;}
            replaceWith = monthNameStr + ' ' + (dayFound + ['th', 'st', 'nd', 'rd', ''][itm]) + ', ' + yearStr;
            if(dateString.indexOf(lookFor) > -1)
            {
                dateString = dateString.replace(lookFor,replaceWith);
            }
            return dateString;
        }

        //解析父标题
        function parseParentTitle()
        {
            var textElem2 = iframeDoc.getElementById("rmHLta2");
            var ptDate = new Date();

            //Split by {% and %} placeholder format and loop through
            var delimeters = textElem2.value.split(/({%|%})/)
            var openPlaceholder = false;
            var finalPTstring = '';
            for(var x=0, eachValue; eachValue = delimeters[x]; x++)
            {
                var parsedText = eachValue;
                if(parsedText != '' && parsedText != '%}')
                {
                    if(openPlaceholder)
                    {
                        var eachValueArr = parsedText.split('@');
                        var eachValueStr = eachValueArr[0];
                        if(eachValueArr[1]){var eachValParam = eachValueArr[1]}else{var eachValParam = ''}

                        switch (eachValueStr.toLowerCase())
                        {
                            case 'title':
                                parsedText = pageTitle;
                                if(eachValParam != ''){parsedText = parsedText.split(eachValParam)[0].trim();}
                                //Since Roam doesn't handle [ ] inside markdown links, replace with ( ) if found in page title
                                parsedText = parsedText.split("[").join("(").split("]").join(")");
                                break;
                            case 'url':
                                parsedText = location.href;
                                break;
                            case 'date':
                                var parsedText = ptDate.toLocaleDateString();
                                if(eachValParam != ''){parsedText = customDate(ptDate, eachValParam);}
                                break;
                            case 'time':
                                var parsedText = ( ("0" + ptDate.getHours()).slice(-2) ) + ":" + ( ("0" + ptDate.getMinutes()).slice(-2) );
                                break;
                        }

                        finalPTstring = finalPTstring + parsedText;
                        openPlaceholder = false;
                    }
                    else
                    {
                        if(eachValue == '{%')
                        {
                            openPlaceholder = true;
                        }
                        else
                        {
                            finalPTstring = finalPTstring + parsedText;
                        }
                    }
                }
            }

            return finalPTstring;
        }

        //重点函数!!!循环在脚本中查找 class = highlighter 的元素，并按照 roam 格式放到剪贴板
        //其中复制剪贴板行为由于 Safari 安全限制采用了其他方式
        function updateClipboard(event) {
            //根据「Parent Title for Highlights」设置获取标题
            var reference = parseParentTitle();
            reference = reference.trim();
            if(debugMode != 0){writeToConsole('reference: ' + reference);}

            var plainConcatHighlights = "";
            var htmlConcatHighlights = "";
            var eachHighlight = "";
            var origHighlight = "";

            //基于类名 roamJsHighlighter 查找所有高亮元素
            //var elemHighlights = document.getElementsByClassName("roamJsHighlighter");
            var elemHighlights = document.querySelectorAll(".roamJsHighlighter");
            if(debugMode != 0){writeToConsole(elemHighlights,3,0);}
            for (var i = 0; i < elemHighlights.length; i++)
            {
                var tempString = "";
                var htmlString = "";
                var plainText = "";
                //title = 'HL:' + highlightCtr;
                //获取 title 等级
                var elemTitle = elemHighlights.item(i).title.split(":")[1];
                if(debugMode != 0){writeToConsole('elemTitle: ' + elemTitle,3);}
                //var elemTabs = elemHighlights.item(i).getAttribute('hltabs');
                var elemSpan = elemHighlights.item(i);
                if(debugMode != 0){writeToConsole(elemSpan,3,0);}
                //获取高亮文本
                eachHighlight = elemSpan.textContent;
                origHighlight = eachHighlight;
                if(debugMode != 0){writeToConsole('eachHighlight: ' + eachHighlight,3);}
                var parNodeName = elemSpan.parentElement.nodeName;
                if(debugMode != 0){writeToConsole(elemSpan.parentElement,1,0);}
                if(debugMode != 0){writeToConsole('parNodeName: ' + parNodeName,3);}
                //处理超链样式 A，超链样式要做特殊处理 MarkDown
                if(parNodeName == "A")
                {
                    var eachLink = elemSpan.parentElement;
                    var linkTextToUse = eachLink.innerText;
                    //Account for footnote numbering like [7] because it turns to double brackets then which we don't want
                    linkTextToUse = linkTextToUse.split("[").join("(").split("]").join(")");
                    //Replace hashtag # in the markdown link name to No. as they mess with in Roam messing up the link (example is Github Issue # references)
                    linkTextToUse = linkTextToUse.split("#").join("No.");
                    linkTextToUse = linkTextToUse.trim().replace(/(\r\n|\n|\r)/gm," ");
                    var linkHref = eachLink.href;
                    //Change # in a link address for now so can replace later in script because otherwise it will auto replace # with `#` and ruin link
                    linkHref = linkHref.split("#").join("|HASHTAG|")

                    if(linkHref.indexOf("http") > -1 || linkHref.indexOf("www.") > -1)
                    {
                        if(eachLink.innerText == eachLink.href || eachLink.innerText == eachLink.href + '/' || eachLink.innerText + '/' == eachLink.href)
                        {
                            var foundALink = linkHref;
                        }
                        else
                        {
                            var foundALink = `[${linkTextToUse}](${linkHref})`;
                        }
                    }
                    else
                    {
                        var foundALink = `[${linkTextToUse}]`;
                    }

                    foundALink = foundALink.split(")]").join("|)|]");
                    if(!bLinks || eachLink.classList.contains("c-message__sender_link") || eachLink.classList.contains("c-member_slug--link")) //Remove link formatting like from Wikipedia as it can be distracting... also slack username links
                    {
                        if(eachLink.innerText == eachLink.href || (eachLink.innerText + '/') == eachLink.href || ('http://' + eachLink.innerText) == eachLink.href || ('https://' + eachLink.innerText) == eachLink.href || ('http://' + eachLink.innerText + '/') == eachLink.href || ('https://' + eachLink.innerText + '/') == eachLink.href)
                        {
                            foundALink = eachLink.href;
                            foundALink = foundALink.split("#").join("|HASHTAG|")
                        }
                        else
                        {
                            foundALink = formatItalics + eachLink.innerText.split("#").join("_") + formatItalics;
                        }
                    }

                    if(debugMode != 0){writeToConsole(`Here: [${eachLink.innerText}](${eachLink.href})`);}
                    eachHighlight = eachHighlight.replace(eachLink.innerText, foundALink);
                    //Can't just set to foundALink because there could be ||ul-two|| etc. in front of link which would be lost
                    //Fixed line breaks in middle of <a> links anyways with the new "default" option to remove line breaks within a single element
                    //eachHighlight = foundALink;
                }

                //获取「格式化」后的标题
                eachHighlight = convertFormat(eachHighlight, elemSpan);

                //Check if the next element is the same "title" which means is the same user selected highlight and should be combined into one bullet/node unless there is legitimate line break
                //检查下一个元素是否是相同的 "标题"，这意味着是相同的用户选择的亮点，应该合并为一个子弹/节点，除非有合法的换行。
                var lastMainSpanText = origHighlight;
                if(i + 1 < elemHighlights.length)
                {
                    var prevNode = elemSpan;
                    var lastParNodeName = parNodeName;
                    //循环处理每一段高亮信息，做标记
                    while(elemTitle == elemHighlights.item(i+1).title.split(":")[1])
                    {
                        var elemSpan = elemHighlights.item(i+1);
                        if(elemSpan.parentElement.parentElement.className == "mw-editsection")
                        {}
                        else
                        {
                            if(debugMode != 0)
                            {
                                writeToConsole('elemSpan.title: ' + elemSpan.title);
                                writeToConsole('prevNode.title: ' + prevNode.title);
                            }
                            var newHighlight = elemSpan.textContent;
                            var classFound = elemSpan.className;
                            parNodeName = elemSpan.parentElement.nodeName;
                            if(debugMode != 0)
                            {
                                writeToConsole('newHighlight: ' + newHighlight,3);
                                writeToConsole('while loop elemSpan.parentElement.nodeName: ' + parNodeName,3)
                                writeToConsole(elemSpan.parentElement,1,0);
                            }
                            var bIsSameLine = true;

                            if(classFound == 'roamJsHighlighter pageLink')
                            {
                                //TODO:如何通过 alt + 点击 让一个已经高亮的句子变成 link 模式，通过浏览器调试没找到规律，有时候好使有时候不好使
                                bIsSameLine = isSameLine(elemSpan, prevNode, lastParNodeName);
                                lastParNodeName = parNodeName;
                                prevNode = elemSpan;
                                if(debugMode != 0)
                                {
                                    writeToConsole('newHighlight: ' + newHighlight);
                                    writeToConsole('lastMainSpanText: ' + lastMainSpanText);
                                }
                                //first try to get rid of ** or __ or ` for bold or italics or code since can't format a page link
                                var replaceLastText = lastMainSpanText.replace(formatBold + newHighlight + formatBold, newHighlight);
                                replaceLastText = replaceLastText.replace(formatItalics + newHighlight + formatItalics, newHighlight);
                                replaceLastText = replaceLastText.replace(formatCode + newHighlight + formatCode, newHighlight);
                                var newHighlightCase = newHighlight.toLowerCase();

                                switch (pgRefCase)
                                {
                                    case 0:
                                        //Default as is on page
                                        newHighlightCase = newHighlight;
                                        break;
                                    case 1:
                                        //Each Word Capitalized
                                        newHighlightCase = newHighlightCase.replace(/\w\S*/g, function(txt){
                                            return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
                                        });
                                        break;
                                    case 2:
                                        //First word capitalized
                                        newHighlightCase = newHighlightCase.charAt(0).toUpperCase() + newHighlightCase.slice(1);
                                        break;
                                    case 3:
                                        //all lower
                                        newHighlightCase = newHighlightCase;
                                        break;
                                    case 4:
                                        //ALL UPPER
                                        newHighlightCase = newHighlightCase.toUpperCase();
                                        break;
                                }

                                replaceLastText = replaceLastText.replace(newHighlight,`|[|[${newHighlightCase}|]|]`);
                                if(debugMode != 0)
                                {
                                    writeToConsole('replaceLastText: ' + replaceLastText);
                                    writeToConsole('lastMainSpanText: ' + lastMainSpanText);
                                    writeToConsole('eachHighlight: ' + eachHighlight);
                                }
                                eachHighlight = eachHighlight.replace(lastMainSpanText,replaceLastText);
                                eachHighlight = eachHighlight.split(formatBold + "|[|[").join("|[|[").split(formatItalics + "|[|[").join("|[|[").split(formatCode + "|[|[").join("|[|[").split("|]|]" + formatBold).join("|]|]").split("|]|]" + formatItalics).join("|]|]").split("|]|]" + formatCode).join("|]|]");
                                if(debugMode != 0){writeToConsole('eachHighlight: ' + eachHighlight);}
                                lastMainSpanText = replaceLastText;
                            }
                            else
                            {
                                bIsSameLine = isSameLine(elemSpan, prevNode, lastParNodeName);
                                lastParNodeName = parNodeName;
                                prevNode = elemSpan;
                                newHighlight = convertFormat(newHighlight, elemSpan);
                                if(debugMode != 0){writeToConsole('newHighlight: ' + newHighlight);}

                                if(parNodeName == "A")
                                {
                                    var eachLink = elemSpan.parentElement;
                                    var linkTextToUse = eachLink.innerText;
                                    //Account for footnote numbering like [7] because it turns to double brackets then which we don't want
                                    linkTextToUse = linkTextToUse.split("[").join("(").split("]").join(")");
                                    //Replace hashtag # in the markdown link name to No. as they mess with in Roam messing up the link (example is Github Issue # references)
                                    linkTextToUse = linkTextToUse.split("#").join("No.");
                                    linkTextToUse = linkTextToUse.trim().replace(/(\r\n|\n|\r)/gm," ");
                                    var linkHref = eachLink.href;
                                    //Change # in a link address for now so can replace later in script because otherwise it will auto replace # with `#` and ruin link
                                    linkHref = linkHref.split("#").join("|HASHTAG|")

                                    if(linkHref.indexOf("http") > -1 || linkHref.indexOf("www.") > -1)
                                    {
                                        if(eachLink.innerText == eachLink.href || eachLink.innerText == eachLink.href + '/' || eachLink.innerText + '/' == eachLink.href)
                                        {
                                            var foundALink = linkHref;
                                        }
                                        else
                                        {
                                            var foundALink = `[${linkTextToUse}](${linkHref})`;
                                        }
                                    }
                                    else
                                    {
                                        var foundALink = `[${linkTextToUse}]`;
                                    }

                                    foundALink = foundALink.split(")]").join("|)|]");
                                    if(!bLinks || eachLink.classList.contains("c-message__sender_link") || eachLink.classList.contains("c-member_slug--link")) //Remove link formatting like from Wikipedia as it can be distracting... also slack username links
                                    {
                                        if(eachLink.innerText == eachLink.href || (eachLink.innerText + '/') == eachLink.href || ('http://' + eachLink.innerText) == eachLink.href || ('https://' + eachLink.innerText) == eachLink.href || ('http://' + eachLink.innerText + '/') == eachLink.href || ('https://' + eachLink.innerText + '/') == eachLink.href)
                                        {
                                            foundALink = eachLink.href;
                                            foundALink = foundALink.split("#").join("|HASHTAG|")
                                        }
                                        else
                                        {
                                            foundALink = formatItalics + eachLink.innerText.split("#").join("_") + formatItalics;
                                        }
                                    }

                                    if(debugMode != 0){writeToConsole(`HERE2: [${eachLink.innerText}](${eachLink.href})`);}
                                    newHighlight = newHighlight.replace(eachLink.innerText, foundALink);
                                    //Can't just set to foundALink because there could be ||ul-two|| etc. in front of link which would be lost
                                    //Fixed line breaks in middle of <a> links anyways with the new "default" option to remove line breaks within a single element
                                    //newHighlight = foundALink;
                                }
                                //每一段完成标记后，要和上一段换行
                                if(bIsSameLine && elemSpan.getAttribute('hlheader') != 1){eachHighlight += newHighlight;}else{eachHighlight += '\n' + newHighlight;}
                                lastMainSpanText = newHighlight;
                            }
                            if(debugMode != 0){writeToConsole('newHighlight: ' + newHighlight);}
                            if(debugMode != 0){writeToConsole('eachHighlight: ' + eachHighlight);}
                        }
                        i++;
                        if(i + 1 >= elemHighlights.length){break;}
                    }
                }
                if(debugMode != 0){writeToConsole("LINE BREAK OPTION SET TO: " + sameBlock);}
                if(sameBlock == 3)
                {
                    //Instead of looping through line breaks below, replace line breaks with a SPACE to bring into same block.
                    if(eachHighlight.trim().length > 0)
                    {
                        tempString = eachHighlight.trim().replace(/(\r\n|\n|\r)/gm," ");
                        tempString = tempString.replace(/\s+/g," ");
                        plainText = `\t${formatBullets}${tempString.trim()}\n`;
                        htmlString = `<li>${tempString.trim()}</li>`;
                    }
                }
                else if(sameBlock == 4)
                {
                    //Instead of looping through line breaks below, replace line breaks with NOTHING to bring into same block (may merge words).
                    if(eachHighlight.trim().length > 0)
                    {
                        tempString = eachHighlight.trim().replace(/(\r\n|\n|\r)/gm,"");
                        tempString = tempString.replace(/\s+/g,"");
                        plainText = `\t${formatBullets}${tempString.trim()}\n`;
                        htmlString = `<li>${tempString.trim()}</li>`;
                    }
                }
                else
                {
                    //Loop through each line break within each highlight
                    //Even if no line breaks it will still go through loop and have lineBreaks[0] as the only value it loops through
                    //通过字符串的「换行符」进行循环
                    var lineBreaks = eachHighlight.trim().split(/[\r\n]+/);
                    var lineCtr = 0;
                    for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
                    {
                        //Replace all double white spaces with single spaces
                        //替换所有双空格为单空格
                        //NOTE: Do not use this AFTER the loop of each line break as it removes the line breaks needed for each Bullet
                        //注意：不要再每次换行循环后使用次选择项，因为它会删除每个项目符号所需的换行符（主要指子弹笔记那种)
                        eachLine = eachLine.replace(/\s+/g," ");
                        //If string is NOT empty, add to variable with a TAB and "-" for bullet
                        //替换后如果不为空，则通过「TAB」+ '-' 缩进，「同时处理plainText 和 html格式」
                        //注意：这里很重要，主要处理了设置中的「Page/Tag Case」部分内容
                        if(eachLine.trim().length > 0)
                        {
                            switch (sameBlock)
                            {
                                case 0:
                                    plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                    htmlString += `<li>${eachLine.trim()}</li>`;
                                    break;
                                case 1:
                                    if(x > 0)
                                    {
                                        //Nested under the first bullet/linebreak from the highlight
                                        plainText += `\t\t${formatBullets}${eachLine.trim()}\n`;
                                        htmlString += `<li>${eachLine.trim()}</li>`;
                                    }
                                    else
                                    {
                                        //First line which will go in parent bullet that the rest of the highlight will go under
                                        plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                        if(lineBreaks.length > 1){htmlString += `<li>${eachLine.trim()}<ul>`;}else{htmlString += `<li>${eachLine.trim()}</li>`;}
                                    }
                                    break;
                                case 2:
                                    //Plain text can't handle the Ctrl + Enter "soft line breaks" but still want to show like that in the side window
                                    if(x > 0)
                                    {
                                        //Second line and on which is nested in the same bullet replicating ctrl + Enter
                                        plainText += `${eachLine.trim()}\n`;
                                        htmlString += `\n${eachLine.trim()}`;
                                    }
                                    else
                                    {
                                        //First line
                                        plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                        if(lineBreaks.length > 1){htmlString += `<li>${eachLine.trim()}`;}else{htmlString += `<li>${eachLine.trim()}</li>`;}
                                    }
                                    break;
                                default:
                                    plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                    htmlString += `\t${formatBullets}${eachLine.trim()}\n`;
                            }
                            lineCtr++
                        }
                    }

                    switch (sameBlock)
                    {
                        case 0:
                            break;
                        case 1:
                            if(lineCtr > 1){htmlString += `</ul></li>`;}
                            break;
                        case 2:
                            if(lineCtr > 1){htmlString += `</li>`;}
                            break;
                        default:
                    }
                }

                //For some special Roam stuff add single ticks ` around it like :: attributes so it doesn't try to create pages/attributes in Roam when pasted
                //OLD WAY (only first occurence replaced): tempString = tempString.replace("::","`::`").replace("[[","`[[`").replace("]]","`]]`").replace("#","`#`");
                //Using Split/Join allows to replace multiple instances of the characters you are looking to replace
                //替换各种 obsidian 或 roam 自定义的标记例如`[[]]` 等
                plainText = plainText.split(")]]").join("^)^]^");
                htmlString = htmlString.split(")]]").join("^)^]^");
                //Account for a parenthesis after a [page](URL) which causes a double )) which we replace below to avoid block references in Roam
                if(htmlString.indexOf("((") == -1 && htmlString.indexOf("))") > -1)
                {
                    plainText = plainText.split("))").join("^)^)^");
                    htmlString = htmlString.split("))").join("^)^)^");
                }

                plainText = plainText.split("::").join("`::`").split("[[").join("[").split("]]").join("]").split("#").join("`#`").split("|[|[").join("[[").split("|]|]").join("]]").split("|HASHTAG|").join("#").split(")]").join(")").split("))").join(")").split("((").join("(").split("|)|]").join(")]").split("||h1||").join("<h1>").split("||h2||").join("<h2>").split("||h3||").join("<h3>").split("^)^]^").join(")]]").split("||ul-one||").join("").split("||ul-two||").join("").split("||ul-three||").join("").split("||ul-four||").join("").split(":**__").join(":** __").split(":****").join(":** **").split("^)^)^").join("))").split("||h-out||").join("").split("||h-in||").join("");
                htmlString = htmlString.split("::").join("`::`").split("[[").join("[").split("]]").join("]").split("#").join("`#`").split("|[|[").join("[[").split("|]|]").join("]]").split("|HASHTAG|").join("#").split(")]").join(")").split("))").join(")").split("((").join("(").split("|)|]").join(")]").split("<H1>").join("<`H1`>").split("<H2>").join("<`H2`>").split("<H3>").join("<`H3`>").split("<h1>").join("<`h1`>").split("<h2>").join("<`h2`>").split("<h3>").join("<`h3`>").split("^)^]^").join(")]]").split(":**__").join(":** __").split(":****").join(":** **").split("^)^)^").join("))");

                if(plainText.trim().length > 0){plainConcatHighlights += `${plainText}`;}
                if(htmlString.trim().length > 0){htmlConcatHighlights += `${htmlString}`;}
            }

            var cbElemPgTitle = iframeDoc.getElementById("rmHLcbPgTitle");
            if(iframeDoc.getElementById("rmHLta2").value != ''){cbElemPgTitle.checked = true;}else{cbElemPgTitle.checked = false;}
            //Check if no highlights and just want the page name in Roam link format [Page Title](URL)
            //生成带着「标题」的文本内容（接近最终拷贝到内存的版本）
            if(plainConcatHighlights == "" || htmlConcatHighlights == "")
            {
                var bOnlyPageRef = true;
                plainConcatHighlights = reference;
                htmlConcatHighlights = reference;
            }
            else
            {
                var bOnlyPageRef = false;

                if(cbElemPgTitle.checked)
                {
                    plainConcatHighlights = formatBullets + reference + '\n' + plainConcatHighlights;
                    htmlConcatHighlights = '<li>' + reference + '</li><ul>' + htmlConcatHighlights;
                }
                else
                {
                    htmlConcatHighlights = '<ul>' + htmlConcatHighlights;
                }
            }

            //lOOP THROUGH EACH LINE LOOKING FOR HEADER ROWS TO INDENT UNDER
            //在每行循环中查找要缩进的标题行，做一些特殊处理
            //htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\n<ul>').split("<li>").join('\n<li>').split("<h1>").join('\n<h1>').split("<h2>").join('\n<h2>').split("<h3>").join('\n<h3>') //.split("<h4>").join('\n<h4>').split("<h5>").join('\n<h5>') //.split("<h6>").join('\n<h6>')
            htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\r\n<ul>').split("<li>").join('\r\n<li>').split("<h1>").join('\r\n<h1>').split("<h2>").join('\r\n<h2>').split("<h3>").join('\r\n<h3>')
            var lineBreaks = htmlConcatHighlights.trim().split('\r\n');
            var indentLevel = 0;
            var ulList = 0;
            var levelNumber = 0;
            var lastLevelNumber = 0;
            var rootBullet = 0;
            var htmlConcatHighlights = "";
            var lastWasHeader = 0;
            for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
            {
                //debugMode = 1;
                if(debugMode != 0){writeToConsole(x);}
                if(debugMode != 0){writeToConsole(eachLine);}
                if(debugMode != 0){writeToConsole('indentLevel: ' + indentLevel);}
                if(debugMode != 0){writeToConsole('ulList: ' + ulList);}
                if(debugMode != 0){writeToConsole('rootBullet: ' + rootBullet);}
                if(debugMode != 0){writeToConsole('levelNumber: ' + levelNumber);}
                if(debugMode != 0){writeToConsole('lastLevelNumber: ' + lastLevelNumber);}

                //var elemType = eachLine.substring(0,4);
                //if(elemType == '<h1>' || elemType == '<h2>' || elemType == '<h3>' || elemType == '<h4>' || elemType == '<h5>')
                //{
                var thisIsHeader = 0;
                if(eachLine.substring(0,10) == '<li>||h1||')
                {
                    thisIsHeader = 1;
                    eachLine = eachLine.split("||h1||").join('').split("<li>").join('').split("</li>").join('');
                    //if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                    if(bHeaders)
                    {
                        if(indentLevel == 0){eachLine = '<li><h1>' + eachLine + '</h1></li><ul>';}else{eachLine = '</ul><li><h1>' + eachLine + '</h1></li><ul>';}
                    }
                    else
                    {
                        if(indentLevel == 0){eachLine = '<li>' + eachLine + '</li><ul>';}else{eachLine = '</ul><li>' + eachLine + '</li><ul>';}
                    }
                    indentLevel++;
                }
                if(eachLine.substring(0,10) == '<li>||h2||')
                {
                    thisIsHeader = 1;
                    eachLine = eachLine.split("||h2||").join('').split("<li>").join('').split("</li>").join('');
                    //if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                    if(bHeaders)
                    {
                        if(indentLevel == 0){eachLine = '<li><h2>' + eachLine + '</h2></li><ul>';}else{eachLine = '</ul><li><h2>' + eachLine + '</h2></li><ul>';}
                    }
                    else
                    {
                        if(indentLevel == 0){eachLine = '<li>' + eachLine + '</li><ul>';}else{eachLine = '</ul><li>' + eachLine + '</li><ul>';}
                    }
                    indentLevel++;
                }
                if(eachLine.substring(0,10) == '<li>||h3||')
                {
                    thisIsHeader = 1;
                    eachLine = eachLine.split("||h3||").join('').split("<li>").join('').split("</li>").join('');
                    //if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                    if(bHeaders)
                    {
                        if(indentLevel == 0){eachLine = '<li><h3>' + eachLine + '</h3></li><ul>';}else{eachLine = '</ul><li><h3>' + eachLine + '</h3></li><ul>';}
                    }
                    else
                    {
                        if(indentLevel == 0){eachLine = '<li>' + eachLine + '</li><ul>';}else{eachLine = '</ul><li>' + eachLine + '</li><ul>';}
                    }
                    indentLevel++;
                }

                if(eachLine.substring(0,8) == '<li><h6>')
                {
                    thisIsHeader = 1;
                    //In case multi element part line and added manually header H6 for indent, need to remove all <h6></h6> stuff and add on just ends so not multiple
                    eachLine = eachLine.split("<h6>").join('').split("</h6>").join('').split("<li>").join('').split("</li>").join('');
                    if(bHeaders){eachLine = '<li><h6>' + eachLine + '</h6></li>';}else{eachLine = '<li>' + eachLine + '</li>';}
                    if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                    indentLevel++;
                }

                if(eachLine.substring(0,13) == '<li>||h-out||')
                {
                    eachLine = eachLine.split("||h-out||").join('').split("<li>").join('').split("</li>").join('');
                    eachLine = '<li>' + eachLine + '</li>';
                    eachLine = eachLine.replace('</li>','</li><ul>');
                    indentLevel++;
                }

                if(eachLine.substring(0,12) == '<li>||h-in||')
                {
                    eachLine = eachLine.split("||h-in||").join('').split("<li>").join('').split("</li>").join('');
                    eachLine = '<li>' + eachLine + '</li>';
                    if(indentLevel > 0)
                    {
                        eachLine = eachLine + '</ul>';
                        indentLevel--;
                    }
                }

                //if(eachLine.substring(0,9) == '<li>||ul-')
                var thisIsBullet = 0;
                if(eachLine.indexOf('||ul-') > -1)
                {
                    thisIsBullet = 1
                    if(debugMode != 0){writeToConsole(eachLine.substring(0,9));}
                    /*
                    if(eachLine.substring(0,12) == '<li>||ul-one'){levelNumber = 1;}
                    if(eachLine.substring(0,12) == '<li>||ul-two'){levelNumber = 2;}
                    if(eachLine.substring(0,12) == '<li>||ul-thr'){levelNumber = 3;}
                    if(eachLine.substring(0,12) == '<li>||ul-fou'){levelNumber = 4;}
                    */

                    if(eachLine.indexOf('||ul-one') > -1){levelNumber = 1;}
                    if(eachLine.indexOf('||ul-two') > -1){levelNumber = 2;}
                    if(eachLine.indexOf('||ul-thr') > -1){levelNumber = 3;}
                    if(eachLine.indexOf('||ul-fou') > -1){levelNumber = 4;}
                    var origLevelNumber = levelNumber;

                    //First item under the page reference / link and opening UL so if it is bullet, then move the levels back one because it is now "root"
                    if(x == 2)
                    {
                        rootBullet = levelNumber;
                        lastLevelNumber = levelNumber;
                        ulList = levelNumber;
                    }

                    if(levelNumber < rootBullet)
                    {
                        levelNumber = rootBullet;
                        rootBullet = origLevelNumber;
                        ulList = origLevelNumber;
                    }

                    //In case multi element part line and added UL for indent, need to remove all ||ul|| stuff and add on just ends so not multiple
                    eachLine = eachLine.split("||ul-one||").join('').split("||ul-two||").join('').split("||ul-three||").join('').split("||ul-four||").join('').split("<li>").join('').split("</li>").join('');

                    if(levelNumber - lastLevelNumber > 0)
                    {
                        eachLine = '<ul><li>' + eachLine + '</li>'
                        ulList++;
                    }

                    if(levelNumber - lastLevelNumber < 0)
                    {
                        eachLine = '</ul><li>' + eachLine + '</li>'
                        ulList--;

                        while(ulList > levelNumber)
                        {
                            eachLine = '</ul>' + eachLine
                            ulList--;
                        }
                    }

                    if(levelNumber - lastLevelNumber == 0)
                    {
                        eachLine = '<li>' + eachLine + '</li>';
                    }

                    if(debugMode != 0){writeToConsole('indentLevel: ' + indentLevel);}
                    if(debugMode != 0){writeToConsole('ulList: ' + ulList);}
                    if(debugMode != 0){writeToConsole('rootBullet: ' + rootBullet);}
                    if(debugMode != 0){writeToConsole('levelNumber: ' + levelNumber);}
                    if(debugMode != 0){writeToConsole('lastLevelNumber: ' + lastLevelNumber);}
                    if(debugMode != 0){writeToConsole('lastWasHeader: ' + lastWasHeader);}

                    if(lastWasHeader == 1 && lastLevelNumber == 0 && levelNumber == 1 && ulList > 0){ulList--} //Accounts for when a header is followed directly by bullet/numbered list so shouldn't have ulList becasue already nested naturally under header
                    lastLevelNumber = origLevelNumber;
                }
                else
                {
                    levelNumber = 0;
                    if(rootBullet == lastLevelNumber)
                    {
                        ulList = 0;
                    }
                    rootBullet = 0;

                    if(levelNumber - lastLevelNumber < 0)
                    {
                        while(ulList > 0)
                        {
                            eachLine = '</ul>' + eachLine
                            ulList--;
                        }
                    }
                    lastLevelNumber = levelNumber;
                }
                if(debugMode != 0){writeToConsole(eachLine);}
                eachLine = eachLine.split("  ").join(" ")
                if(elipOpt > 0 && (x > 0 || cbElemPgTitle.checked == false || reference == '')){eachLine = addEllipsis(eachLine, thisIsHeader, thisIsBullet)}
                htmlConcatHighlights = htmlConcatHighlights + eachLine;
                //debugMode = 0;
                lastWasHeader = thisIsHeader;
            }

            if(indentLevel > 0){htmlConcatHighlights = htmlConcatHighlights + '</ul>';}

            while(ulList > 0)
            {
                htmlConcatHighlights = htmlConcatHighlights + '</ul>';
                ulList = ulList - 1;
            }

            if(htmlConcatHighlights.indexOf("<ul>") > -1){htmlConcatHighlights = htmlConcatHighlights + '</ul>';}
            htmlConcatHighlights = htmlConcatHighlights.split("<ul><ul>").join('<ul>');
            htmlConcatHighlights = htmlConcatHighlights.split(")[").join(") ["); //Fixing when two links are back to back next to each other. Need to add a space.
            htmlConcatHighlights = htmlConcatHighlights.split("||SOL||").join("").split("||EOL||").join(""); //start of line and end of line used for ellipsis logic
            htmlConcatHighlights = htmlConcatHighlights.split("<li> ").join("<li>").split(" </li>").join("</li>"); //Fixing when two links are back to back next to each other. Need to add a space.
            if(debugMode != 0){writeToConsole(htmlConcatHighlights);}

            //lOOP THROUGH EACH LINE OF HTML TO MAKE THE PLAIN TEXT INDENT LIKE IT
            //遍历 HTML文本的每一行，让它像 Plain Text 那样换行
            var loopHtml = htmlConcatHighlights.split("<ul>").join('\r\n<ul>').split("<li>").join('\r\n<li>').split("</ul>").join('\r\n</ul>')
            var lineBreaks = loopHtml.trim().split('\r\n');

            var newPlainText = "";
            var indentAmount = '    ';
            if(bIndents == false){indentAmount = '';}
            var indentCtr = 0;
            for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
            {
                if(x > 0 || cbElemPgTitle.checked){if(eachLine.substring(0,4) == '<ul>'){indentCtr++;}}
                if(eachLine.substring(0,5) == '</ul>'){indentCtr--;}
                if(eachLine.substring(0,4) == '<li>')
                {
                    eachLine = eachLine.split("<li>").join('').split("</li>").join('');
                    var indentSpaces = "";
                    var tmpIndentCtr = indentCtr;
                    while(tmpIndentCtr > 0)
                    {

                        indentSpaces = indentSpaces + indentAmount;
                        tmpIndentCtr--;
                    }
                    newPlainText += '\n' + indentSpaces + formatBullets + eachLine;
                    if(formatBullets == ''){newPlainText += '\n';}
                }
                if(x == 0 && cbElemPgTitle.checked){newPlainText = eachLine + '\n';} //Page link does not need bullet
            }

            if(newPlainText.trim() != ''){plainConcatHighlights = newPlainText.trim();}

            var clipboardDataEvt = event.clipboardData;
            if (clipboardDataEvt == null){
                //说明是通过鼠标等操作触发的 Cut 事件，需要使用拷贝函数
                copyToClipboard(plainConcatHighlights);
                /*//safari 下可能为空所以需要重新创建
                clipboardDataEvt = new DataTransfer();
                clipboardDataEvt.setData('text/plain', plainConcatHighlights);
                clipboardDataEvt.setData('text/html', htmlConcatHighlights);*/
            }else{
                //将格式好的字符串添加到剪贴板
                clipboardDataEvt.setData('text/plain', plainConcatHighlights);
                clipboardDataEvt.setData('text/html', htmlConcatHighlights);
            }


            var textInput = iframeDoc.getElementById("rmHLtextArea");
            if(debugMode != 0){writeToConsole("UPDATED THE CLIPBOARD");}
            //textInput.value = 'tESTING MAKING empty';
            htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\n<ul>').split("<li>").join('\n\t<li>') //.split("</ul>").join('\n</ul>').split("</li>").join('\n</li>');

            //If just activating extension, no highlights yet, and just want the page title and URL then don't update textarea as want to keep instructions in window
            //根据情况判断是否更新窗口（默认情况窗口不更新，因为现实使用说明
            if(bOnlyPageRef == false || veryFirstRun == 0)
            {
                textInput.value = "";
                if(cbElem1.checked)
                {
                    //textInput.value += '\n'
                    textInput.value += plainConcatHighlights;
                }
                if(cbElem2.checked)
                {
                    textInput.value += '\n'
                    textInput.value += htmlConcatHighlights;
                }

                textInput.value += '\n'
            }

            veryFirstRun = 0;
            //Scroll to the bottom of the textArea element to see the latest highlights when your window is full
            textInput.scrollTop = textInput.scrollHeight;
            return;
        }

        //根据给定的元素，删除高亮显示
        function removeHighlight(curElement)
        {
            var prevText = "", nextText = "";

            //检查上一个和下一个统计（即高亮显示范围前后的元素）
            if(curElement.previousSibling !== null){prevText = curElement.previousSibling.textContent;}
            if(curElement.nextSibling !== null){nextText = curElement.nextSibling.textContent;}
            if(prevText.length > 0){
                //如果有前一个同级元素，那么将高亮显示的文本追加到该元素上，试图让 HTML 会发哦高亮显示之前的样子
                if(nextText.length > 0)
                {
                    //如果有 ALSO 的下一个同级元素，那么意味着高亮显示是在一个断粮的中间等等。
                    //然后把要高亮显示的文本和前一个元素以及下一级元素合并到一个元素中，以恢复到以前的样子
                    var newText = prevText + curElement.innerText + nextText;
                    curElement.previousSibling.textContent = newText;
                    curElement.nextSibling.remove();
                }else {
                    var newText = prevText + curElement.innerText;
                    curElement.previousSibling.textContent = newText;
                }
            }else {
                var newText = curElement.innerText + nextText;
                curElement.nextSibling.textContent = newText;
            }

            // 删除之前高亮的空元素
            curElement.remove();
        }

        //-----相关函数实现
    }

}


