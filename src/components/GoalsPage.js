import colours from '../styles/Colours';
import moment from 'moment';

const gap = 20, paddingY = 8, topY = 45, leftX = 10;
// const columns = { 
//   week: leftX, 
//   month: leftX + 30, 
//   day: leftX + 65, 
//   expected: leftX + 105, 
//   actual: leftX + 155,
//   waist: leftX + 195,
//   hips: leftX + 218, //218-195 = 23
//   thigh: leftX + 241,
// };

const columnDefs = { 
  week: 35, 
  month: 35, 
  day: 40, 
  expected: 50, 
  actual: 40,
  waist: 24,
  hips: 24,
  thigh: 24,
};

const calculateColumns = (cols) => {
  const columns = {};
  const reducer = (accumulator, colName) => {
    columns[colName] = accumulator;
    const value = accumulator + columnDefs[colName];
    return value;
  }
  Object.keys(columnDefs).reduce(reducer, leftX);

  console.log("Returning calculated columns: ", columns);
  return columns;
}

const columns = calculateColumns(columnDefs);


const printHeaders = doc => {
  doc.font('bold')
    .fontSize(10);    

  let Y = 35;
  doc.text("Week", columns.week, Y);
  doc.text("Month", columns.month, Y);
  doc.text("Starts", columns.day, Y);
  doc.text("Expected", columns.expected, Y);
  doc.text("Actual", columns.actual, Y);

  let mOpt = { width: 20, align: 'center' };
  doc.text('W', columns.waist, Y, mOpt);
  doc.text('H', columns.hips, Y, mOpt);
  doc.text('T', columns.thigh, Y, mOpt);
};

const printweek = (doc, week, i, weeks) => {
  let y = topY + i*gap, padY = y + paddingY, 
    options = { lineGap: 2.7 },
    starts = moment(week.starts);

    let thisMonth = week.starts.getMonth(),
      lastWeeksMonth = i > 0 ? weeks[i-1].starts.getMonth() : "",
      weekText = thisMonth != lastWeeksMonth ? starts.format('MMM') : " ";
  // console.log("Month: ", weekText);

  doc.lineWidth(0.25);
  doc.moveTo(10, y)
    .lineTo(287, y)
    .stroke(colours.paleTeal);

  doc.text(week.number, leftX, padY);
  doc.text(weekText, columns.month, padY );
  doc.text(starts.format("D"),columns.day, padY, { align: 'right', width: 25 });
  doc.text(`${week.expected} kg`, columns.expected, padY);
  
  doc.rect(columns.actual, padY-6, 30, 16)
    .stroke();

  if(weekText.length > 1) {
    doc.dash(1);
    doc.rect(columns.waist, padY-6, 20, 16).stroke();
    doc.rect(columns.hips, padY-6, 20, 16).stroke();
    doc.rect(columns.thigh, padY-6, 20, 16).stroke();

    doc.undash();
  }
}

const getDates = options => {
  let { startDate, expectedStartWeight, totalWeeks } = options,
   m = startDate.getMonth(), //Jan = 0
   d = startDate.getDate(),
   y = startDate.getFullYear();

  let weeks = [];
  for(let i=0; i<(totalWeeks + 1); i++) {
    let weekstart = new Date(y,m,d + (i*7)),
      week = { starts: weekstart, number: i, expected: expectedStartWeight - i }
    weeks.push(week);
  }
  return weeks;
}

const goalsPage = (doc, pager, options) => {
  //console.log("About to make new page for goals with options: ", options);  
  pager.addPage(undefined, { margin: 0 });

  let weeks = getDates(options),
    weekstext = weeks.join(',\n');
  // Table specifying: Week | Month | Date | Expected | Actual
  doc.font('charlotte')
    .fontSize(12)
    .text('Goals', 10,8)
  
  printHeaders(doc);

  doc.fontSize(10);    
  doc.font('body');
  weeks.forEach((week, i, weeks) => printweek(doc, week, i, weeks));
}

export default goalsPage;