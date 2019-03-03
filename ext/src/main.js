function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this
        const args = arguments;
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    } 
}
document.addEventListener('VISUAL_SETTING_CHANGE', function(evt){
    const { name, value } = evt.detail;
    const toStore = {};
    toStore[name] = value;
    console.log('about to save ' + toStore);
    sessionStorage.setItem(name, value);
    if(chrome.storage && chrome.storage.local) {
        chrome.storage.local.set(toStore, function() {
            console.log('Name: ', name, '. Value: ', value);
            init();
        });
    }
 }.bind(this), false);
 
const OBSERVE_DEBOUNCE_TIME = 500;
var debounceClearImages = debounce(clearImages, OBSERVE_DEBOUNCE_TIME)
const DEFAULT_OPTIONS = {
    blurLevel: 3,
    blankContent: false,
    showContent: true
};
const BAN_CLASS_NAMES = ['.blocked-content-hidden','.blocked-content-opaque','.blocked-content','.blocked-content-0','.blocked-content-1','.blocked-content-2','.blocked-content-3','.blocked-content-4','.blocked-content-5'];
const OPTS = ['blurLevel','blankContent','showContent'];
const IMG_ENDPOINT = 'https://vast-ravine-66821.herokuapp.com/api/image';
var ban_class_name = 'blocked-content';
const ELEMENTS_PER_BASH = 10;
const ALLOW_MULTIPLE_CALL = false;
var isQueueInProcess = false;
var isCallInProcess = false;
var blockedHere = 0;
var config = {};
var elementsList = [];
var processedElementsList = [];

function loadConfig() {
    return new Promise((resolve, reject) => {
        var customConfig = {}
        if(chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(OPTS, function(result) {
                customConfig = result;
                config = Object.assign({}, DEFAULT_OPTIONS, customConfig)
                console.log("se va con customConfig: ", customConfig)
                console.log("se va con config: ", config)
                setBanClassName();
                resolve();
            });
        }
        else {
            console.log('grabbing default config');
            config = DEFAULT_OPTIONS;
            setBanClassName();
            resolve();
        }
    });
}

function setBanClassName() {
    ban_class_name = `blocked-content-${config.blurLevel}`;
    if (config.blankContent) {
        ban_class_name = `blocked-content-opaque`;
    }
    if (!config.showContent) {
        ban_class_name = `blocked-content-hidden`;
    }
}

function clearBody() {
    document.body.classList.add('surf-clean');
}

function backToNormality() {
    clearBody();
    $(BAN_CLASS_NAMES.join(',')).each((i, el) => {
        unblockElement(el);
    })
}

function unblockElement(el) {
    el.classList.remove(BAN_CLASS_NAMES.join(','));
}

function banBackgroundImgAndGetUrl($el) {
    $el.addClass(ban_class_name);
    var originalSrc = $el.css('background-image').replace('url(', '');
    originalSrc = originalSrc.substr(1, originalSrc.length - 3);
    originalSrc = decodeURIComponent(originalSrc);
    return originalSrc;
}

function banImgAndGetUrl($el) {
    var originalSrc = decodeURIComponent($el.prop('src'));
    $el.addClass(ban_class_name);
    return originalSrc;
}

function clearImages() {
    var images = $('img').not('[data-timestamp]');
    var backgroundImages = $("*").not('[data-timestamp]').filter(function() {
        var $el = $(this);
        $el.attr('data-surf-analyzed', true);
        var backgroundImage = $el.css("background-image");
        return backgroundImage.includes('http');
    });
    images.each(function(i, el) {
        var $imgEl = $(this);
        var original = $imgEl.get(0);
        if(original.clientWidth > 128 && original.clientHeight > 128 && $imgEl.prop('src').includes('http')) {
            var url = banImgAndGetUrl($imgEl);
            elementsList.unshift({$el: $imgEl, url, type: 'image'})
        }
    })
    backgroundImages.each(function() {
        var $imgEl = $(this);
        var el = $imgEl.get(0);
        if(el.clientWidth > 128 && el.clientHeight > 128) {
            var url = banBackgroundImgAndGetUrl($imgEl);
            elementsList.unshift({$el: $imgEl, url, type: 'background'})
        }
    });
    if(!isQueueInProcess) {
        queueImages();
    }
}

function listenForNewElements() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log('mutation happened')
            debounceClearImages();
        })
      })
      observer.observe(document, {
          childList: true
        , subtree: true
        , attributes: false
        , characterData: false
      })
}

function init() {
    loadConfig().then(res => {
        clearImages();
        listenForNewElements();
    });
}

function queueImages({startIndex = 0} = {}) {
    // stop condition
    if (Array.isArray(elementsList) && elementsList.length <= 0) {
        isQueueInProcess = false;
        clearBody();
        return null;
    }
    // continue analyzing
    isQueueInProcess = true;
    // wait for call to finish
    if (!isCallInProcess || ALLOW_MULTIPLE_CALL) {
        const urlBash = deQueueImages({startIndex, endIndex: ELEMENTS_PER_BASH + startIndex});
        performImageAnalysis(urlBash);
    }
    if(startIndex === 0) { // condition to analyze other 10 images in pararell
        return setTimeout(queueImages, 1000, [{startIndex: ELEMENTS_PER_BASH}]);
    }
    setTimeout(queueImages, 1000);
    return null;
}

function deQueueImages({startIndex = 0, endIndex = 10}) {
    var bash = elementsList.splice(0, ELEMENTS_PER_BASH);
    processedElementsList.push([...bash]);
    var urlBash = bash.map(img => img.url);
    return urlBash;
}

function performImageAnalysis(urlBash) {
    isCallInProcess = true;
    console.log('posting: ', urlBash)
    try {
        $.ajax(IMG_ENDPOINT, {
            data : JSON.stringify({imgSrcs: urlBash}),
            contentType : 'application/json',
            type : 'POST',
        }).then(data => {
            console.log(data);
            deQueueElements(data);
        }).fail(err => {
            console.log('err while analyzing images. See network');
            backToNormality();
            elementsList = [];
        }).done(res => {
            isCallInProcess = false;
        })
    }
    catch(err) {
        console.log('something horrible happened');
        backToNormality();
    }
}

function deQueueElements(results) {
    var srcDecodedURI = '';
    var matchRecordsIndex = [];
    results.forEach(src => {
        var srcDecodedURI = decodeURIComponent(src.orgSrc)
        processedElementsList.filter((el, i) => {
            if(srcDecodedURI === el.url) {
                matchRecordsIndex.push(i);
                return true;
            }
            return false;
            // "orgSrc": "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fs3-ap-northeast-1.amazonaws.com%2Fpsh-ex-ftnikkei-3937bb4%2Fimages%2F6%2F8%2F4%2F9%2F15649486-1-eng-GB%2FRTS20UQK.jpg?source=nar-cms",
            // "safe": false
            // $el: $imgEl, url, type: 'background'
        }).forEach(matchEl => {
            unblockElement(matchEl.$el);
        })
        for (var i = matchRecordsIndex.length; i >= 0; i--) {
            processedElementsList.splice(matchRecordsIndex[i], 1);
            blockedHere ++;
            console.log("blocked ", blockedHere, " times!");
        }
        matchRecordsIndex = [];
    })
}

$(init)
