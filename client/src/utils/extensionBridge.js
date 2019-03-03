const EXTENSION_ID = 'ljljicolcbhofhcbagjdgflhhbeopgaj';
export default {
  changeVisualSetting: ({name, value}) => {
    // console.log("sending: ", {name, value});
    // var evt = document.createEvent('Event');
    // evt.initEvent('VISUAL_SETTING_CHANGE', true, true);
    // document.dispatchEvent(evt, 'hii');

    var evt = new CustomEvent('VISUAL_SETTING_CHANGE', { detail: {name, value} });
    document.dispatchEvent(evt);

    // window.chrome.runtime.sendMessage(EXTENSION_ID, {
    //   type: "VISUAL_SETTING_CHANGE",
    //   payload: {
    //     name, value
    //   }
    // });
  }
};