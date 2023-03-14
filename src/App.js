import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import fs from "fs";
import path from "path";
import moment from "moment";

import colours from "./styles/Colours";
import { createDocument } from "./Page";
import printForBooklet from "./Booklet";
import common from "./styles/Common";
import config, { getDates } from "./config";

import frontpage from "./components/FrontPage";
import goalpage from "./components/GoalsPage";
import notepage from "./components/NotePage";
import planWeek from "./components/PlanWeek";
import planDay from "./components/PlanDay";
import monthly from "./components/MonthlyReflection";
import { registerFonts } from "./format";

// document constants
const print = console.log;
const colour = "";
const options = { size: "A5", margin: 0, layout: "landscape" };


// date contants
const { startDate: sdi, endDate: edi, expectedStartWeight } = config;
const { startDate, endDate, totalWeeks } = getDates(sdi, edi);

console.log("Dates to work with: ", { startDate, endDate, totalWeeks });

// maker functions
const { reflectPastWeek, planThisWeek } = planWeek;

const createDocumentWriter = () => {
  const filename = path.join(__dirname, "../out/journal-A5.pdf");

  const doc = new PDFDocument(Object.assign({ autoFirstPage: false }, options));
  doc.pipe(fs.createWriteStream(filename)); // write to PDF
  doc.addSVG = (svg, x, y, options) => SVGtoPDF(doc, svg, x, y, options);
  registerFonts(doc);

  return doc;
};

const adder = (pagesArr) => (title, maker, params) => {
  //params.unshift(doc);
  pagesArr.push({ title, maker, params });
};

const createJournal = () => {
  // const blankpage = (pager) => pager.addPage();
  print("Creating a Journal");

  const doc = createDocumentWriter();

  const pages = [];
  const add = adder(pages);

  // Push page data

  // Starting pages
  add("FrontPage", frontpage, [totalWeeks]);
  add("Blank page", notepage, [true]);
  add("NotePage1", notepage, []);
  add("GoalsPage", goalpage, [{ startDate, expectedStartWeight, totalWeeks }]);
  add("NotePage2", notepage, []);
  add("NotePage3", notepage, []);
  add("NotePage4", notepage, []);

  console.log("Weeks to print: ", totalWeeks);
  // Weekly pages with Monthly reflection interjected
  let lastMonth = moment(startDate).format("MMMM");
  for (let i=0; i<totalWeeks; i++) {
    console.log("Printing Week ", + i+1);
    const starts = moment(startDate).add(i * 7, "days");
    const thisMonth = starts.format("MMMM");

    if (thisMonth != lastMonth) {
      add(`Monthly Reflection ${lastMonth} LS`, monthly.leftPage, [lastMonth]);
      add(`Monthly Reflection ${lastMonth} RS`, monthly.rightPage, [thisMonth]);
      lastMonth = thisMonth;
    }

    add(`Week ${i}`, reflectPastWeek, [{ starts, number: i }]);
    add(`Week ${i}`, planThisWeek, [{ starts, number: i }]);

    for (let j = 0; j < 7; j++) {
      let day = moment(starts).add(j, "days");
      add(`Day ${day.format("MMM D")}`, planDay.reflectTodo, [day]);
      add(`Day ${day.format("MMM D")}`, planDay.planTrack, [day]);
    }
  }
  
  add("NotePage end", notepage, []);
  add("NotePage end", notepage, []);
  add("Final Blank page", notepage, [undefined, true]);

  printForBooklet(doc, pages, options);

  doc.end();
};

createJournal();
