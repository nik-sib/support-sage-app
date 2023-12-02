
// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {

  var newURL = chrome.runtime.getURL('FE/index.html');
  
  // var newURL = 'http://supportsage.dvl.to';
  // var newURL = 'http://127.0.0.1:5500';
  
  let ss_query = '';
  if (info.menuItemId == 'selection') {
    ss_query = info.selectionText;
  }
  if (info.menuItemId == 'link') {
    ss_query = info.linkUrl;
  }
  
  if (ss_query != '') {
    chrome.storage.sync.set({'ss_query': ss_query}, function() {
    });  
  }
  
  chrome.tabs.create({ url: newURL });
}

chrome.runtime.onInstalled.addListener(function () {
  let contexts = [
    'page',
    'link',
    'selection'
    // 'editable',
    // 'image',
    // 'video',
    // 'audio'
  ];
  for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i];
    let title = '';
    if (context == 'page') {
      title = "Go to SupportSage main page";
    } else if (context == 'selection') {
      title = "search selected text on SupportSage";
    } else {
      title = "search '" + context + "' on SupportSage";
    }

    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context
    });
  }

});