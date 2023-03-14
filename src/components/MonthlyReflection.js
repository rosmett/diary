import colours from '../styles/Colours';
import dim from '../styles/Dimensions';
import common from '../styles/Common';
import blossom from '../styles/svg/blossom';

const { lineHeight } = dim;
const { paleTeal } = colours;

const leftPage = (doc, pager, title) => {
  //pager.addPage(side);

  let side = pager.getSide();
  const { lx, rx } = common.getLeftAndRightMargins(side);


  //doc.text("SIDE? " + title);
  let prefix = "Monthly reflection for ";
  common.title(doc, prefix, side);

  let x = doc.widthOfString(prefix) + dim.leftX + 5;

  doc.font('charlotte').fontSize(12).text(title, x, dim.topLineY + 4, { baseline: 'bottom' });

  common.topLine(doc, side);
  common.ruleLines(doc, side);

  //Measurements
  common.setDefaultFont(doc);
  let texts = ['W:', 'H:', 'T:'],
    lineStart = 13, pad = -10;
  texts.forEach((text, i) => {
    doc.text(text, lx, common.getLineY(i + lineStart + 1) + pad);
  });

  doc.font('bold');
  doc.text("Measurements:", lx, common.getLineY(lineStart) + pad);

  const goalW = 60, goalH = (lineHeight * 2);
  const goalX = rx- goalW - 10;
  doc.text("Weight:", goalX, common.getLineY(lineStart) + pad);
  doc
    .rect(goalX, common.getLineY(lineStart) + (lineHeight/2), goalW, goalH)
    .fillAndStroke('white', paleTeal); 
};

const rightPage = (doc, pager, title) => {
  //pager.addPage(side);


  const side = pager.getSide();
  const { lx, rx } = common.getLeftAndRightMargins(side);

  // if(isBlank) return;

  let prefix = "Goals for";
  common.title(doc, prefix, side);

  let x = lx + doc.widthOfString(prefix) + 5;

  doc.font('charlotte')
    .fontSize(12).text(title, x, dim.topLineY + 4, { baseline: 'bottom' });


  common.topLine(doc, side);
  common.ruleLines(doc, side);

  doc.addSVG(blossom, rx - 45, 409 - 45, { width: 45, height: 45, preserveAspectRatio: 'none' });
};


export default {
  leftPage,
  rightPage
};