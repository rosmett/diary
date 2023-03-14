import moment from 'moment';

import colours from '../styles/Colours';
import dim from '../styles/Dimensions';
import common from '../styles/Common';
import { todos } from '../config';

const { topLineY, lineHeight } = dim;
const { paleTeal } = colours;

const ruleLines = (doc, side, { topLine, ruleLines, ruleCentreVertical }) => {
  topLine(doc, side);
  ruleLines(doc, side);
  ruleCentreVertical(doc, side);
}

const printTodos = (doc, side, date) => {
  const tdX = common.getMidX(side) + 2,
    tdY = topLineY + 3,
    tdPadX = 2,
    tdOffsetY = lineHeight - 6,
    checkSize = 12;

  const dayOfWeek = date.day();
  todos
    .filter(({ days }) => days === undefined || days?.includes(dayOfWeek))
    .forEach(({ task }, index) => {
      // draw check
      const bx = tdX + tdPadX;
      const by = tdY + (tdOffsetY - checkSize - 1) + (index * lineHeight);

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

      // write task
      const tx = bx + checkSize + 4;
      const ty = tdY + tdOffsetY + (index * lineHeight);
      doc
        .font('body')
        .fontSize(10)
        .text(task, tx, ty, { baseline: 'bottom' });
    });
}

const reflectTodo = (doc, page, date) => {
  page.addPage();
  let side = page.getSide(),
    { lx, rx } = common.getLeftAndRightMargins(side),
    topY = topLineY;


  ruleLines(doc, side, common);

  doc.font('bold').fontSize(12)
    .text(date.format('dddd D'), lx, 10);

  let x = lx + doc.widthOfString(date.format('dddd D')),
    y = 10;
  doc.fontSize(8)
    .text(common.getDaySuffix(date), x, y);

  doc.font('body')
    .fontSize(10)
    .text(date.format('MMMM'), x + 10, y);

  let yt = topLineY;
  doc.font('charlotte')
  doc.text('Reflection', lx, yt + 3, { baseline: 'bottom' });
  doc.text('To do', common.getMidX(side) + 2, yt + 3, { baseline: 'bottom' });

  printTodos(doc, side, date);
}

const planTrack = (doc, page, date) => {
  page.addPage();
  let side = page.getSide();
  let { lx, rx } = common.getLeftAndRightMargins(side),
    midX = common.getMidX(side);

  common.topLine(doc, side);
  common.ruleLines(doc, side);
  common.ruleCentreVertical(doc, side);

  doc.font('charlotte').fontSize(12);
  doc.text('Plan', lx, topLineY + 3, { baseline: 'bottom' });
  doc.text('Track', midX + 2, topLineY + 3, { baseline: 'bottom' });

  doc.font('body');

  let tracks = ['Sleep', 'Fast', 'WT', 'EX'];
  for (let i = 0; i < tracks.length; i++) {
    let yi = common.getLineY(common.defaultLineNumber - (tracks.length - i) + 1);
    doc.text(tracks[i] + ':', midX + 2, yi - 2, { baseline: 'bottom' });
  }

  doc.font('body')
    .fontSize(7);

  let startHour = 6,
    hour = moment(date).hour(startHour);
  for (let i = 0; i < common.defaultLineNumber; i++) {
    hour.hour(startHour + i);
    let yi = common.getLineY(i);
    doc.text(hour.format('h:00 a'), lx, yi + 2, { width: 30, align: 'right' });
  }

}

const planDay = {
  reflectTodo,
  planTrack
};

export default planDay;