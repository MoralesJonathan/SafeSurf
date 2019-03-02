// var css = `@keyframes img-spinner {
//     to {transform: rotate(360deg);}
//   }
  
//   .img-spinner:before {
//     content: '';
//     box-sizing: border-box;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 20px;
//     height: 20px;
//     margin-top: -10px;
//     margin-left: -10px;
//     border-radius: 50%;
//     border: 1px solid #f6f;
//     border-top-color: #0e0;
//     border-right-color: #0dd;
//     border-bottom-color: #f90;
//     animation: img-spinner .6s linear infinite;
//   }`,
//     head = document.head || document.getElementsByTagName('head')[0],
//     style = document.createElement('style');

// style.type = 'text/css';
// if (style.styleSheet){
//   // This is required for IE8 and below.
//   style.styleSheet.cssText = css;
// } else {
//   style.appendChild(document.createTextNode(css));
// }

// head.appendChild(style);


var elementsList = [];
var loadingImgURL = chrome.extension.getURL("../assets/spinner.gif");
var loadingImg = new Image();

function banImg(el) {

}

function banBackgroundImg(el) {

}

function setLoadingState(el) {

}

function init() {
    var images = $('img');
    var backgroundImages = $("div").filter(function() {
        return $(this).css("background-image") !== 'none'
    });


    images.each(function() {
        var $imgEl = $(this);
        var originalSrc = $imgEl.prop('src');
        $imgEl.css('position', 'relative').addClass('img-spinner blocked-content');
        // var img = new Image();
        // img.onload = function() {
        //     // alert(this.width + 'x' + this.height);
        //     var newImg = getLoadingImg({width: this.width, height: this.height});
        //     $imgEl.prop('src',newImg);
        //     img.remove();
        // }
        // img.src = originalSrc;
        elementsList.push({el: $imgEl.get(0), url: originalSrc})
    })
    
    backgroundImages.each(function() {
        console.log($(this));
        var $imgEl = $(this);
        $imgEl.addClass('img-spinner blocked-content');
        var originalSrc = $imgEl.css('background-image').replace('url(', '');
        originalSrc = originalSrc.substr(1, originalSrc.length - 3);
        elementsList.push({el: $imgEl.get(0), url: originalSrc})
        // var img = new Image();
        // img.onload = function() {
        //     var newImg = getLoadingImg({width: this.width, height: this.height});
        //     $imgEl.css("background-image", `url(${newImg})`);
        //     img.remove();
        // }
        // img.src = originalSrc;
    });
    console.log("image url: ",elementsList);
    var urls = images.map((i, el) => el.src).get().concat(backgroundImages.map((i, el) => el.style && el.style.backgroundImage).get());
    console.log("images got: ",urls.length);
}

loadingImg.onload = function() {
    init();
}
loadingImg.src = loadingImgURL;
