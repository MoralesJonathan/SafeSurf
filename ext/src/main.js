const IMG_ENDPOINT = 'http://localhost:3001/api/image';
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

var debounceClearImages = debounce(clearImages, 500)

function banImg(el) {

}

function banBackgroundImg(el) {

}

function setLoadingState(el) {

}

function clearImages() {
    var images = $('img');
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
        elementsList.push({$el: $imgEl, url: originalSrc, type: 'image'})
    })
    backgroundImages.each(function() {
        console.log($(this));
        var $imgEl = $(this);
        $imgEl.addClass('img-spinner blocked-content');
        var originalSrc = $imgEl.css('background-image').replace('url(', '');
        originalSrc = originalSrc.substr(1, originalSrc.length - 3);
        elementsList.push({$el: $imgEl, url: originalSrc, type: 'background'})
    });
    if(!isQueueInProcess) {

    }
}

function listenForNewElements() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log('mutation aqui')
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

function getImagesResults() {
    isQueueInProcess = true;
    var urls = elementsList.map(img => img.url);
    $.ajax(IMG_ENDPOINT, {
        data : JSON.stringify({imgSrcs: urls}),
        contentType : 'application/json',
        type : 'POST',
    })
}

$(init)
