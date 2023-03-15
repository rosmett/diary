import colours from '../styles/Colours';
import dim from '../styles/Dimensions';

const defaultLineNumber = 16;
const { leftX, rightX, bindPad, topLineY, lineHeight, rightPagePad } = dim;
const { paleTeal } = colours;

const getLeftAndRightMargins = side => ({
  lx: side == 'left' ? 10 : 315,
  rx: side == 'left' ? 282 : 584
});

const topLine = (doc, side) => {
  let { lx, rx } = getLeftAndRightMargins(side);
  doc.lineWidth(1);
  doc.moveTo(lx, dim.topLineY)
    .lineTo(rx, dim.topLineY)
    .stroke(paleTeal);
}

const drawLine = (doc, side, line, weight) => {
  let { lx, rx } = getLeftAndRightMargins(side),
    y = topLineY + (line * lineHeight)
  doc.lineWidth(weight || 1);
  doc.moveTo(lx, y)
    .lineTo(rx, y)
    .stroke(paleTeal);
}


const printHorizontalLine = (doc, leftX, leftY, length, options = {}) => {
  const { lineWidth = 0.25, color = paleTeal, dash } = options;

  if(dash) {
    doc.dash(dash);
  }

  doc.lineWidth(lineWidth)
    .moveTo(leftX, leftY)
    .lineTo(leftX + length, leftY)
    .stroke(color);

    if(dash) {
      doc.undash();
    }
}

const ruleLines = (doc, side) => {
  let { lx, rx } = getLeftAndRightMargins(side);

  // console.log(`Side? ${side}, Margins: ${lx} and ${rx}`);

  for (let i = 1; i <= defaultLineNumber; i++) {
    doc.lineWidth(0.25)
      .moveTo(lx, topLineY + (i * lineHeight))
      .lineTo(rx, topLineY + (i * lineHeight))
      .stroke(paleTeal);
  }
}

const moveToLine = (doc, side, line) => {
  let { lx, rx } = getLeftAndRightMargins(side),
    lineY = topLineY + (line * lineHeight);

  doc.moveTo(lx, lineY);
}

const getLineY = lineNumber => topLineY + (lineNumber * lineHeight);

const ruleCentreVertical = (doc, side) => {
  let centreX = getMidX(side),
    bottomY = topLineY + (defaultLineNumber * lineHeight);

  doc.lineWidth(0.5);
  doc.moveTo(centreX, topLineY)
    .lineTo(centreX, bottomY)
    .stroke(paleTeal);
}

const getDaySuffix = date => {
  let DoM = date.date() % 10,
    suffix = DoM == 1 ? 'st' :
      DoM == 2 ? 'nd' :
        DoM == 3 ? 'rd' : 'th';

  return suffix;
}

const title = (doc, text, side, options, setFont) => {
  let { lx, rx } = getLeftAndRightMargins(side);

  let dOpts = {
    baseline: 'bottom'
  }
  let tOpts = Object.assign(dOpts, options);

  if (setFont) {
    console.log("Setting font: ")
    setFont();
  } else {
    doc.font('bold')
      .fontSize(12);
  }
  doc.text(text + ' ', lx, dim.topLineY, dOpts);
}

const setDefaultFont = doc => {
  doc.font('body')
    .fontSize(10)
}

const getMidX = (side) => {
  let { lx, rx } = getLeftAndRightMargins(side);

  return ((rx - lx) / 2) + lx;

}

const common = ({
  defaultLineNumber,
  drawLine,
  getDaySuffix,
  getLeftAndRightMargins,
  getLineY,
  getMidX,
  moveToLine,
  ruleCentreVertical,
  ruleLines,
  setDefaultFont,
  title,
  topLine,
  printHorizontalLine
});

export default common;