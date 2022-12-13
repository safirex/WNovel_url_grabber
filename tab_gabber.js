
novel_list = '';
document.addEventListener("DOMContentLoaded", listTabs);

function getCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true});
}
function listTabs() {
    document.getElementById('copy_button').onclick = function(){
        copyToClipboard(novel_list);
    };

    getCurrentWindowTabs().then((tabs) => {
        
        let novelList = document.getElementById('novels');
        url_to_fetch = ['syosetu.com/','kakuyomu.jp/works/'];
        for (let tab of tabs) {
            for (let url of url_to_fetch){
                if(tab.url.includes(url) ){
                    code_prefix='';
                    if (tab.url.includes('novel18.syosetu')){
                        code_prefix='n18';
                    }


                    console.log(tab.url);
                    pos = tab.url.indexOf(url);
                    var code = tab.url.split(url)[1].split('/')[0];
                    if(code.includes('#')){
                        code = code.split(code.indexOf('#'))[0];
                    }

                    code = code_prefix+code;
                    novel_title = tab.title.replace('💤','');


                    novel_line = code+';'+novel_title;

                    novel_list += novel_line + '\r\n';

                    
                    let tabLink = document.createElement('li');
                    novelList.innerHTML = novelList.innerHTML+'<li>'+ novel_line +'</li>';
                }
            }
        }
    });
}



function copyToClipboard(value) {
    navigator.clipboard.writeText(value);
}