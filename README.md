# @jigs1996/node-pdfgen

  Convert web pages and HTML content into polished PDF documents with `@jigs1996/node-pdfgen`. This versatile Node.js package supports seamless conversion from both public and private URLs ensuring rendering of content, including emojis and images. Customize headers, footers, and even add watermarks for branding—all with intuitive options for dynamic page sizing. Simplify your PDF generation process with `@jigs1996/node-pdfgen` and empower your applications to deliver beautifully formatted documents effortlessly.

  ![Node Current](https://img.shields.io/node/v/%2540jigs1996%252Fnode-pdfgen) ![NPM Version](https://img.shields.io/npm/v/%2540jigs1996%252Fnode-pdfgen) ![NPM License](https://img.shields.io/npm/l/%2540jigs1996%252Fnode-pdfgen)

## Versions

  | Node.js  | @jigs1996/node-pdfgen |
  | -------- | :-------------------: |
  | >=20.0.0 |        v1.x.x         |

## Installation

  ```bash
  npm install @jigs1996/node-pdfgen
  ```

## Features

- **Public/Private URL to PDF**: Convert web pages accessible via public or private URLs to PDF documents.
- **HTML Content to PDF**: Generate PDF documents directly from HTML content.
- **Cookie Support**: Set cookies for the page during PDF generation.
- **Header and Footer**: Customize headers and footers for the PDF.
- **Emoji Support**: Proper rendering of emojis in the generated PDF.
- **Image Support**: Include images in PDFs, supporting both base64 encoded and URL images.
- **Custom Fonts**: Use custom fonts in PDFs, such as Google Fonts.
- **Watermarking**: Add watermark templates to PDFs for branding or security purposes.
- **Page Breaks**: Implement page breaks using CSS classes or use like this `<div class="page-break"></div>`
- **Dynamic Page Dimensions**: Automatically adjust page dimensions based on content or specify dimensions manually.
- **Script Handling**: Automatically dismiss JavaScript dialogs like alerts, confirms, and dialogs.

## Method

```typescript
generatePDF(urlOrHtml: string, fileName?: string, options?: IOption, evaluateFunc?: () => void): Promise<Buffer>;
```

| Parameter       | Type               | Description                                                                                                                                                 |
|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `urlOrHtml`     | `string`           | The URL or HTML content to convert into PDF.                                                                                                                |
| `fileName`      | `string` (optional)| Optional. The name of the generated PDF file. Defaults to "download.pdf" if not provided.                                                                    |
| `options`       | [`IOption`](/#ioptions-interface) (optional)| Optional. Configuration options for generating the PDF, such as page size, margins, headers, and more.                                                       |
| `evaluateFunc`  | `() => void` (optional)| Optional. Callback function to execute JavaScript code on the page before generating the PDF. Use this to customize page content dynamically.      |

## Example Usage

  ```typescript
  import { generatePDF, IOption } from "@jigs1996/node-pdfgen";
  // const { generatePDF } = require("@jigs1996/node-pdfgen");

  const url = "https://jignesh.dev";
  const options: IOption = {
      format: 'letter',
      landscape: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
      printBackground: true,
      displayHeaderFooter: true,
      headerTitle: "Header Title",
      footerTitle: "Footer Title"
  };

  const pdfBuffer = await generatePDF(url, "example.pdf", options);
  ```

## Options list

  The `generatePDF` function accepts various options through the IOption interface:

### `IOptions` interface

  | Feature              | Type                                                 | Description                                                                                                      | Default                                                              |
  |----------------------|------------------------------------------------------|------------------------------------------------------------------------------------------------------------------| ---------------------------------------------------------------------|
  | args                 | `string[]`                                           | Array of additional arguments passed to Puppeteer during PDF generation.                                         | `['--start-fullscreen', '--no-sandbox', '--disable-setuid-sandbox']` |
  | cookies              | [`ICookie[]`](/#icookies-interface)                   | Custom cookies to set for the page being converted to PDF.                                                       | `[]`                                                                 |
  | headers              | `Record<string, string>`                             | HTTP headers to include in the page request for PDF generation. Key-value pairs (header name: header value)      | `{}`                                                                 |
  | format               | `string`                                             | Paper format for the PDF. letter , legal , tabloid , a0 , a1 , a2 , a3 , a4 , a5 , a6                            | `letter`                                                             |
  | landscape            | `boolean`                                            | Specifies whether the PDF should be rendered in landscape orientation.                                           | `false`                                                              |
  | printBackground      | `boolean`                                            | Determines whether background graphics should be included in the PDF.                                            | `false`                                                              |
  | displayHeaderFooter  | `boolean`                                            | Controls the display of header and footer in the generated PDF.                                                  | `false`                                                              |
  | margin               | [`IMargin`](/#imargin-interface)                     | Page margins (top, bottom, left, right) for the PDF document.                                                    | `undefined` no margins are set.                                      |
  | waterMarkTemplate    | `string`                                             | Template for adding a watermark to each page of the PDF.                                                         |                                                                      |
  | headerTitle          | `string`                                             | Title for the header section in the PDF.                                                                         |                                                                      |
  | footerTitle          | `string`                                             | Title for the footer section in the PDF.                                                                         |                                                                      |
  | headerTemplate       | `string`                                             | Custom HTML template for the header content in the PDF.                                                          |                                                                      |
  | footerTemplate       | `string`                                             | Custom HTML template for the footer content in the PDF.                                                          |                                                                      |
  | omitBackground       | `boolean`                                            | Specifies whether background graphics should be omitted in the PDF.                                              | `false`                                                              |
  | outline              | `boolean`                                            | Determines whether to display the PDF outline (table of contents).                                               | `false`                                                              |
  | pageRanges           | `string`                                             | Specifies the range of pages to include in the PDF document. (e.g., "1-3, 5")                                    | The empty string, which means all pages are printed.                 |
  | path                 | `string`                                             | Output path where the generated PDF should be saved.                                                             | Root of the project                                                  |
  | preferCSSPageSize    | `boolean`                                            | Specifies whether to prefer the CSS page size over the default PDF page size.                                    | `false`, which will scale the content to fit the paper size.         |
  | scale                | `number`                                             | Scale factor for the webpage rendering in the PDF.                                                               | `1`                                                                  |
  | tagged               | `boolean`                                            | Specifies whether to produce a tagged PDF.                                                                       | `true`                                                               |
  | timeout              | `number`                                             | Timeout duration for the PDF generation process.                                                                 | `30_000`                                                             |
  | height               | `string | number`                                    | Height of the pages in the generated PDF.                                                                        |                                                                      |
  | width                | `string | number`                                    | Width of the pages in the generated PDF. (e.g., "1000px", 1000)                                                  |                                                                      |
  | sizeOffset           | `number`                                             | Offset value used for dynamic page height adjustment and single page PDF customization.                          |`50`                                                                  |

### `ICookies` interface

| Property      | Type                                    | Description                                                                                                                                                  | Default |
|---------------|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| name          | `string`                                | Cookie name.                                                                                                                                                 |         |
| value         | `string`                                | Cookie value.                                                                                                                                                |         |
| domain        | `string`                                | Cookie domain.                                                                                                                                               |         |
| expires       | `number`                                | Cookie expiration date, session cookie if not set.                                                                                                             |         |
| httpOnly      | `boolean`                               | True if cookie is http-only.                                                                                                                                 |         |
| partitionKey  | `string`                                | Cookie partition key. The site of the top-level URL the browser was visiting at the start of the request to the endpoint that set the cookie. If not set, the cookie will be set as not partitioned. |         |
| path          | `string`                                | Cookie path.                                                                                                                                                 |         |
| priority      | Low, Medium, High | Cookie Priority. Supported only in Chrome.                                                                                                                    |         |
| sameParty     | `boolean`                               | True if cookie is SameParty. Supported only in Chrome.                                                                                                         |         |
| sameSite      | Strict, Lax, None | Cookie SameSite type.                                                                                                                                         |         |
| secure        | `boolean`                               | True if cookie is secure.                                                                                                                                     |         |
| sourceScheme  | Unset , NonSecur, Secure | Cookie source scheme type. Supported only in Chrome.                                                                                                           |         |
| url           | `string`                                | The request-URI to associate with the setting of the cookie. This value can affect the default domain, path, and source scheme values of the created cookie. |         |

### `IMargin` interface

  | Property | Type   | Description          | Default |
  |----------|--------|----------------------|---------|
  | top      | `string | number` | Top margin value. | 0 |
  | bottom   | `string | number` | Bottom margin value. | 0 |
  | left     | `string | number` | Left margin value. | 0 |
  | right    | `string | number` | Right margin value. | 0 |

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For support or inquiries, please contact <jigneshsanghani6@gmail.com> or create an issue on the GitHub repository.

## Contributions

Contributions are welcome! Fork the repository and submit a pull request.

## Connect with Me

- [Twitter](https://twitter.com/jignesh19961020/)
- [LinkedIn](https://www.linkedin.com/in/jigs1996/)
- [GitHub](https://github.com/jigs1996)

Feel free to reach out for any questions or feedback!
