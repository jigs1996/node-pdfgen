const { generatePDF } = require('@jigs1996/node-pdfgen')

const options = {
  printBackground: true,
  omitBackground: true,
  displayHeaderFooter: true,
  headerTitle: 'Header Title',
  footerTitle: 'Footer Title',
  waterMarkTemplate:
    '<div style="font-size: 50px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);rotate: -30deg;font-size: 50px;color: rgba(0, 0, 0, 0.1);z-index: -1;pointer-events: none;white-space: nowrap;opacity: 0.4;"><div><img src="https://lipsum.app/700x150" width="700" height="150"/><p>WaterMark Text</p></div></div>',
}

generatePDF('https://jignesh.dev', 'jignesh.pdf', options)
