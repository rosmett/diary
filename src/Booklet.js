import colours from './styles/Colours';

const printForBooklet = (doc, pages, options) => {
  const pageCount = pages.length, 
    go4 = parseInt(Math.ceil(pageCount/4)),
    middle = go4*2;

  let counterD = middle-1, 
    counterA = middle;

  console.log(`Book has ${pageCount} pages. Physical paper page count is: ${go4}`);

  for(let i = 0; i < go4; i++) {
    
    const lx = (297/2) - 100, rx = (297 + lx)-100, y = 200;

    const print = (index, side, forb) => {
      const page = index >= 0 && index < pages.length 
        ? pages[index] 
        : { title: "None OOB", maker: () => 0, params: [] }; 
      const x = side == 'left' ? lx : rx;

      if(page.title.indexOf("Monthly Reflection") >= 0) {
        console.log("Page? ", page);
      }

      const pageInfo = makePageInfo(side, page.title);
      page.maker(doc, pageInfo, ...page.params);
      //doc.text(`${forb} ${index + 1}: ${page.title}`, x, y, { width: 200, align: 'center'});
    }
    
    doc.addPage(options);
    setDefaults(doc);
    print(counterD, 'left', 'Front');
    print(counterA, 'right','Front');
    counterD--;
    counterA++;

    doc.addPage(options);
    setDefaults(doc);
    print(counterA, 'left', 'Back');
    print(counterD, 'right', 'Back');
    counterD--;
    counterA++;

  }

}

const setDefaults = doc => {
  doc.font('body')
    .fillColor(colours.paleTeal);
}

const makePageInfo = (side, pageTitle) => ({
  addPage: () => 0, //console.log("Unnecessary! ", pageTitle),
  getSide: () => side
});

export default printForBooklet;