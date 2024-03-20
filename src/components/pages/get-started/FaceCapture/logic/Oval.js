import { isMobile } from "./deviceType";

export const calculateOvalStyle = (cameraWidth, cameraHeight) => {
  let ovalStyle;
  let ovalWidth;
  let ovalLeft;

  if (isMobile(navigator.userAgent)) {
    ovalWidth = (400 / cameraHeight) * 100;
    ovalLeft = (100 - ovalWidth) / 2;
    const ovalHeight = (600 / cameraWidth) * 100;
    const ovalTop = (100 - ovalHeight) / 2;
    ovalStyle = {
      /* eslint-disable */
      height: ovalHeight + "%",
      left: ovalLeft + "%",
      top: ovalTop + "%",
      width: ovalWidth + "%",
      /* eslint-disable */
    };
  } else {
    ovalWidth = (56 * cameraHeight) / cameraWidth;
    ovalLeft = (100 - ovalWidth) / 2;
    ovalStyle = {
      height: "68%",
      left: ovalLeft + "%",
      top: "16%",
      width: ovalWidth + "%",
    };
  }
  return ovalStyle;
};
