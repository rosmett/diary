import colours from '../styles/Colours';
import dim from '../styles/Dimensions';
import common from '../styles/Common';

import smiley from '../styles/svg/smiley';
import needswork from '../styles/svg/needswork';

import moment from 'moment';

const { lineHeight } = dim;
const { paleTeal } = colours;

const reflectPastWeek = (doc, pager, data) => {
  pager.addPage();
  let side = pager.getSide(),
    { lx, rx } = common.getLeftAndRightMargins(side);

  let weekStart = data.starts,
    weekEnd = moment(weekStart).add(6, 'days'),
    endFormatString = weekStart.format('M') === weekEnd.format('M') ? 'D' : 'MMM D';
  let weekHeading = `${weekStart.format("MMM D")} - ${weekEnd.format(endFormatString)}`;

  common.topLine(doc, side);
  common.title(doc, `Week ${data.number}`, side);

  doc.font('charlotte').fontSize(10);
  doc.text(weekHeading, rx - 100, common.getLineY(0) + 4, { width: 100, align: 'right', baseline: 'bottom' });
  common.setDefaultFont(doc);

  common.ruleLines(doc, side);
  common.ruleCentreVertical(doc, side);

  doc.fontSize(10);
  let boxWidth = 29, boxHeight = 15, lwgWidth = 100,
    midX = common.getMidX(side),
    lwgX = midX - boxWidth - lwgWidth - 5,
    y1 = common.getLineY(1);
  doc.text('Last week\'s goal', lwgX, y1 - 2, { width: lwgWidth, align: 'right', baseline: 'bottom' });

  doc.rect(midX - boxWidth - 2, y1 - dim.lineHeight + 4, boxWidth, boxHeight).stroke(paleTeal);
  doc.rect(midX + 2, y1 - dim.lineHeight + 4, boxWidth, boxHeight).stroke(paleTeal);

  doc.text('Actual', midX + boxWidth + 5, y1 - 2, { width: 100, align: 'left', baseline: 'bottom' });

  let y2 = common.getLineY(2);
  doc.addSVG(smiley, midX - 25, y2 - 23.5, { width: 25, height: 25, preserveAspectRatio: 'none' });
  doc.addSVG(needswork, midX, y2 - 23.5, { width: 25, height: 25, preserveAspectRatio: 'none' });

  common.drawLine(doc, side, 8);
  let y8 = common.getLineY(8);
  doc.text('Learnings', lx, y8 + 2);
  doc.text('Actions', midX + 2, y8 + 2);
}

const planThisWeek = (doc, pager, data) => {
  pager.addPage();
  let side = pager.getSide();
  let { lx, rx } = common.getLeftAndRightMargins(side),
    midX = common.getMidX(side),
    y12 = common.getLineY(12), y16 = common.getLineY(16);

  common.title(doc, "Week at a Glance");
  common.topLine(doc, side);

  common.setDefaultFont(doc);

  common.ruleLines(doc, side);
  common.ruleCentreVertical(doc, side);

  common.drawLine(doc, side, 4, 0.5);
  common.drawLine(doc, side, 8, 0.5);
  common.drawLine(doc, side, 12, 0.5);
  common.drawLine(doc, side, 16, 0.5);
  // doc.rect(midX+0.5, y12+0.5, rx-midX-1, y16-y12-1).fill('white').lineWidth(1).stroke(paleTeal);

  doc.fillColor(paleTeal);

  for (let i = 0; i < 7; i++) {
    let x = (i % 2) == 0 ? lx : midX + 2,
      lineNumber = parseInt(Math.floor(i / 2) * 4),
      y = common.getLineY(lineNumber) + 2,
      date = moment(data.starts).add(i, 'days');
    // console.log(`x: ${x}, ${y}`);

    doc.text(date.format("ddd D"), x, y, { continued: true });


    let DoM = date.date() % 10,
      suffix = DoM == 1 ? 'st' :
        DoM == 2 ? 'nd' :
          DoM == 3 ? 'rd' : 'th';
    doc.fontSize(6).text(suffix);
    doc.fontSize(10);

    // kidsMeals(doc, i, side, lineNumber);
  }

  doc.text('Goals this week:', midX + 2, common.getLineY(12) + 2);
  printGoalChecks(doc, side, 3);
}

const printGoalChecks = (doc, side, count) => {
  const offsetX = common.getMidX(side);
  const offsetY = common.getLineY(13);
  const checkSize = 12;
  const checkPadX = 4, checkPadY = 6;

  for (let i = 0; i < count; i++) {

    // doc
    //   .rect(offsetX + checkPadX, offsetY + checkPadY + (i*lineHeight), checkSize, checkSize)
    //   .stroke();

    const bx = offsetX + checkPadX,
      by = offsetY + checkPadY + (i * lineHeight);

    let grad = doc.linearGradient(bx, by, bx + checkSize, by + checkSize);

    grad.stop(0, 'white').stop(1, paleTeal);

    doc
      .rect(bx, by, checkSize, checkSize)
      .fillOpacity(0.5)
      .fill(grad);
    doc
      .fillOpacity(1)
      .fillColor(paleTeal)
      .rect(bx, by, checkSize, checkSize)
      .stroke();
  }

}

const kidsMeals = (doc, index, side, lineNumber) => {
  const { lx, rx } = common.getLeftAndRightMargins(side),
    midX = common.getMidX(side);

  let x = ((index % 2) == 0 ? midX : rx) - 50;
  let y = common.getLineY(lineNumber + 3) + 10;

  doc.text("K: ", x, y);
}

export default {
  reflectPastWeek,
  planThisWeek
};