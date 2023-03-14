import colours from './styles/Colours';

const setDefaults = doc => {
  doc.font('body')
    .fillColor(colours.paleTeal);
}

export const createDocument = (doc, defaultOptions) => {
  let count = 0;
  const getSide = pageNumber => (pageNumber || count) % 2 === 1 ? 'left': 'right';

  return {
    addPage: (side, options) => {
        count++;
        let newSide = getSide();
        let nOpts = Object.assign(defaultOptions || {}, options)

        if(!side && newSide == 'left') {
          doc.addPage(nOpts);
          setDefaults(doc);
          return;
        }

        if(side == 'left') {
          doc.addPage(doc.addPage(nOpts));
          setDefaults(doc);
        }
        else if(side == 'right' && newSide == 'left') {
          doc.addPage(nOpts);
          setDefaults(doc);
          count++; //increase pageCounter to be on right side
        }
      },
    getSide 
  }
};

const page = (doc, side, options) => ({
  
  new: (pageOpts) => {
    if(!(side == 'left' || side == 'right')) {
      console.error('Page side must be specified')
      return;
    }

    if(pageOpts) 
      pageOpts = Object.assign(options || {}, pageOpts);

    console.log("PageOpts: ", pageOpts);

    if(side == 'left') {
      doc.addPage(pageOpts);

      doc.fillColor(colours.paleTeal)
        .fontSize(12)
        .font('body');
    }
  }
});

export default page;