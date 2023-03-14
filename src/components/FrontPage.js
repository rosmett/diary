import colours from "../styles/Colours";
import common from "../styles/Common";
import blossom from "../styles/svg/blossom";
import config from "../config";
import moment from "moment";

const frontPage = (doc, pager, totalWeeks) => {
  const { startDate } = config;

  const year = moment(startDate).format('YYYY');
  const startMonth = moment(startDate).format('MMMM');
  const endMonth = moment(startDate).add(totalWeeks, 'weeks').format('MMMM');

  console.log("Frontpage using: ", { startMonth, endMonth, year});

  pager.addPage();
  
  let side = pager.getSide(),
    { lx, rx } = common.getLeftAndRightMargins(),
    midX = common.getMidX(side),
    blossomSize = 160,
    blossomX = midX - blossomSize / 2;

  doc.addSVG(blossom, blossomX, 200, {
    width: blossomSize,
    height: blossomSize,
    preserveAspectRatio: "none",
  });

  //console.log(`Front page is on ${side} side`);
  doc
    .fillColor(colours.midGrey)
    .font("bold")
    .fontSize(32)

    .text(`Journal ${year}`, lx, 100, {
      align: "center",
      lineGap: 2,
      width: 290,
    })
    .fontSize(18)
    .fillColor(colours.paleTeal)
    .font("charlotte")
    .text(`${startMonth}-${endMonth}`, { align: "center", lineGap: 2 });
};

export default frontPage;
