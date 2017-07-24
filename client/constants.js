export const SET_EXAMPLE = 'SET_EXAMPLE';
export const SET_DRAFT = 'SET_DRAFT';
export const LOAD_BLOG = 'LOAD_BLOG';
export const SET_START = 'SET_START';
export const SET_CURRENT = 'SET_CURRENT';
export const LOAD_BLOGS = 'LOAD_BLOGS';
export const SET_NAME = 'SET_NAME';
export const DELETE_BLOG = 'DELETE_BLOG';



0bb4:0c81

echo SUBSYSTEM=="usb", ATTR{idVendor}=="0bb4", ATTR{idProduct}="0c81" MODE="0666", GROUP="plugdev" | sudo tee /etc/udev/rules.d/51-android-usb.rules