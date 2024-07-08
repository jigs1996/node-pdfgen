import puppeteer, { Browser, Dialog, Page } from 'puppeteer'
import { isValidURL } from './utils'
import { IOption } from './type'
import path from 'path'

/**
 * Generates a PDF from a URL or HTML content.
 *
 * @param urlOrHtml The URL or HTML content to convert to PDF.
 * @param sourceType The type of the input URL or HTML content.
 * @param pdfFileName The name of the generated PDF file.
 * @param options Optional settings for PDF generation.
 * @param evaluateFunc Optional function to evaluate on the page before PDF generation.
 * @returns A Promise resolving to a Buffer containing the generated PDF.
 */
function generate(
  urlOrHtml: string,
  sourceType: 'url' | 'html' = 'url',
  pdfFileName: string,
  options: IOption,
  evaluateFunc: () => void,
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    let browser: Browser | null = null

    try {
      const {
        cookies,
        args,
        headers,
        waterMarkTemplate,
        headerTitle,
        width,
        height,
        sizeOffset = 50,
        footerTitle,
        ...pdfOptions
      } = options

      browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: args || ['--start-fullscreen', '--no-sandbox', '--disable-setuid-sandbox'],
      })

      if (!browser) {
        throw new Error('Failed to launch puppeteer')
      }

      const page: Page = await browser.newPage()

      // Handle injected scripts or malicious content detection
      page.on('dialog', async (dialog: Dialog) => {
        await dialog.dismiss() // Dismiss the dialog
      })

      const headlessUserAgent: string = await page.evaluate(() => navigator.userAgent)
      await page.setUserAgent(headlessUserAgent.replace('HeadlessChrome', 'Chrome'))

      let defaultHeaders = {
        'accept-language': 'en-US,en;q=0.8',
      }

      if (headers && typeof headers === 'object') {
        defaultHeaders = { ...defaultHeaders, ...headers }
      }

      await page.setExtraHTTPHeaders(defaultHeaders)

      if (cookies && cookies.length > 0) {
        await page.setCookie(...cookies)
      }

      if (sourceType === 'url') {
        await page.goto(decodeURIComponent(urlOrHtml), {
          waitUntil: 'networkidle0',
          timeout: options?.timeout || undefined,
        })
      } else {
        await page.setContent(urlOrHtml)
      }

      await page.addStyleTag({
        content: 'html,body{-webkit-print-color-adjust: exact;}',
      })
      await page.addStyleTag({
        content: '.new-page{page-break-after: always;}',
      })

      await page.evaluate(evaluateFunc)

      if (waterMarkTemplate) {
        await page.evaluate((template) => {
          const waterMarkDiv = document.createElement('div')
          waterMarkDiv.innerHTML = template
          document.querySelector('body')?.append(waterMarkDiv)
        }, waterMarkTemplate)
      }

      let pdfWidth = width || undefined
      let pdfHeight = height || undefined

      if (pdfWidth === 'auto' || pdfHeight === 'auto') {
        // Measure the content dimensions
        const bodyHandle = await page.$('body')
        if (bodyHandle) {
          const { width: pageWidth, height: pageHeight } = await bodyHandle.evaluate((body) => {
            return {
              width: body.scrollWidth,
              height: body.scrollHeight,
            }
          })
          await page.setViewport({
            width: pageWidth + sizeOffset,
            height: pageHeight + sizeOffset,
          })
          pdfWidth = pdfWidth === 'auto' ? pageWidth + sizeOffset : pdfWidth
          pdfHeight = pdfWidth === 'auto' ? pageHeight + sizeOffset : pdfHeight
        }
      }

      setTimeout(async () => {
        const pdfBuffer = await page.pdf({
          headerTemplate: `<style>html { -webkit-print-color-adjust: exact; padding: 0!important; margin: 0!important; }</style><div style="-webkit-print-color-adjust: exact;width: 100%; background-color: #ffffff; padding: 0px 20px; display: flex; align-items: center; gap: 12px; justify-content: space-between; color: #00000; height:70px;font-size: 24px;" class="header"><p style="max-width: 967px;  margin: 0 auto; text-align: center; font-size: 20px; line-height: 60px;">${headerTitle || ''}</p></div>`,
          footerTemplate: `<style>html { -webkit-print-color-adjust: exact; padding: 0!important; margin: 0!important; }</style><div style="position:relative;width: 100%; background: #ffffff; padding: 0 20px; display: flex; align-items: center; gap: 12px; justify-content: space-between; color: #00000; position: relative;" class="footer"><p style="max-width: 967px;  margin: 0 auto; text-align: center; font-size: 16px; line-height: 60px;" >${footerTitle || ''}</p></div>`,
          ...pdfOptions,
          width: pdfWidth,
          height: pdfHeight,
        })
        if (browser) {
          await browser.close()
        }
        resolve(pdfBuffer)
      }, 2000)
    } catch (e: any) {
      if (browser) {
        await browser.close()
      }
      reject(new Error(`Failed to generate PDF: ${e.message}`))
    }
  })
}

/**
 * Generates a PDF from a URL or HTML content.
 *
 * @param urlOrHtml The URL or HTML content to convert to PDF.
 * @param fileName The name of the generated PDF file.
 * @param options Optional settings for PDF generation.
 * @param evaluateFunc Optional function to evaluate on the page before PDF generation.
 * @returns A Promise resolving to a Buffer containing the generated PDF.
 */
export async function generatePDF(
  urlOrHtml: string,
  fileName: string = 'download.pdf',
  options: IOption = {},
  evaluateFunc: () => void = () => {},
): Promise<Buffer> {
  let sourceType: 'url' | 'html' = 'url'
  if (!isValidURL(urlOrHtml)) {
    sourceType = 'html'
  }

  const pdfFile = await generate(
    urlOrHtml,
    sourceType,
    fileName,
    {
      ...options,
      path: path.join(
        options?.path
          ? options.path
          : require.main
            ? path.dirname(require.main.filename)
            : process.cwd(),
        fileName,
      ),
    },
    evaluateFunc,
  )

  return pdfFile
}
