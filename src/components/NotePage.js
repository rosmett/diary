import colours from '../styles/Colours';
import dim from '../styles/Dimensions';
import common from '../styles/Common';

const notePage = (doc, pager, isBlank) => {
  //pager.addPage(side);

  let currentSide = pager.getSide();
  
  if(isBlank) return;

  common.topLine(doc, currentSide);
  common.ruleLines(doc, currentSide);
};

export default notePage;