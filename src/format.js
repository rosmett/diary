import path from "path";

const fontPath = path.join(__dirname, "../fonts/");
const avenirPath = "avenir-lt-std-cufonfonts/";

export const registerFonts = (doc) => {
  doc.registerFont("body", fontPath + avenirPath + "AvenirLTStd-Book.otf");
  doc.registerFont("bold", fontPath + avenirPath + "AvenirLTStd-Heavy.otf");
  doc.registerFont("charlotte", fontPath + "charlotte_5/charlotte.otf");
};