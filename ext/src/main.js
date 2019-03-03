const IMG_ENDPOINT = 'http://localhost:3001/api/image';
const ELEMENTS_PER_BASH = 10;
const OBSERVE_DEBOUNCE_TIME = 1500;
var isQueueInProcess = false;
var elementsList = [];

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this
        const args = arguments;
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    } 
}

var debounceClearImages = debounce(clearImages, OBSERVE_DEBOUNCE_TIME)

function banImg(el) {

}

function banBackgroundImg(el) {

}

function setLoadingState(el) {

}

function clearImages() {
    var images = $('img').not('[data-timestamp]');
    var backgroundImages = $("*").not('[data-timestamp]').filter(function() {
        $(this).attr('data-surf-analyzed', true);
        var backgroundImage = $(this).css("background-image")
        return backgroundImage.includes('http');
    });
    images.each(function() {
        var $imgEl = $(this);
        $imgEl.attr('data-surf-analyzed', true);
        var originalSrc = $imgEl.prop('src');
        $imgEl.css('position', 'relative').addClass('img-spinner blocked-content');
        elementsList.unshift({$el: $imgEl, url: originalSrc, type: 'image'})
    })
    backgroundImages.each(function() {
        var $imgEl = $(this);
        $imgEl.addClass('img-spinner blocked-content');
        var originalSrc = $imgEl.css('background-image').replace('url(', '');
        originalSrc = originalSrc.substr(1, originalSrc.length - 3);
        elementsList.unshift({$el: $imgEl, url: originalSrc, type: 'background'})
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
    clearImages();
    listenForNewElements();
}

function queueImages({startIndex = 0} = {}) {
    // stop condition
    if (Array.isArray(elementsList) && elementsList.length <= 0) {
        isQueueInProcess = false;
        return null;
    }
    // continue analyzing
    isQueueInProcess = true;
    const urlBash = getUrlArr({startIndex, endIndex: ELEMENTS_PER_BASH + startIndex})
    performImageAnalysis(urlBash)
    if(startIndex === 0) { // condition to analyze other 10 images in pararell
        return queueImages({startIndex: ELEMENTS_PER_BASH})
    }
    setTimeout(queueImages, 500);
    return null;
}

function getUrlArr({startIndex = 0, endIndex = 10}) {
    return elementsList
        .filter((img, index) => (index > startIndex && index < endIndex))
        .map(img => img.url);
}

function performImageAnalysis(urlBash) {
    console.log('posting: ', urlBash)
    $.ajax(IMG_ENDPOINT, {
        data : JSON.stringify({imgSrcs: urlBash}),
        contentType : 'application/json',
        type : 'POST',
    }).then(data => {
        console.log(data)
    }).fail(err => {
        console.log('err while analyzing images. See network');
        elementsList = [];
    })
}

$(init)
