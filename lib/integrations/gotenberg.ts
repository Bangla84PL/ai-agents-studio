/**
 * Gotenberg Integration Utilities
 *
 * Provides functions to interact with Gotenberg for PDF generation
 * https://gotenberg.smartcamp.ai
 */

export interface GotenbergPdfOptions {
  paperWidth?: number // inches
  paperHeight?: number // inches
  marginTop?: number // inches
  marginBottom?: number // inches
  marginLeft?: number // inches
  marginRight?: number // inches
  landscape?: boolean
  preferCssPageSize?: boolean
  printBackground?: boolean
  scale?: number // 0.1 to 2
  nativePageRanges?: string // e.g., "1-5, 8, 11-13"
  waitDelay?: number // seconds
  waitForExpression?: string // JavaScript expression
}

const DEFAULT_OPTIONS: GotenbergPdfOptions = {
  marginTop: 0.39,
  marginBottom: 0.39,
  marginLeft: 0.39,
  marginRight: 0.39,
  printBackground: true,
  preferCssPageSize: false,
}

/**
 * Convert HTML to PDF using Gotenberg
 */
export async function htmlToPdf(
  html: string,
  options: GotenbergPdfOptions = {}
): Promise<Blob> {
  const baseUrl = process.env.NEXT_PUBLIC_GOTENBERG_URL || 'https://gotenberg.smartcamp.ai'
  const url = `${baseUrl}/forms/chromium/convert/html`

  const formData = new FormData()

  // Add HTML file
  const htmlBlob = new Blob([html], { type: 'text/html' })
  formData.append('files', htmlBlob, 'index.html')

  // Add options
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }

  if (mergedOptions.paperWidth) {
    formData.append('paperWidth', mergedOptions.paperWidth.toString())
  }
  if (mergedOptions.paperHeight) {
    formData.append('paperHeight', mergedOptions.paperHeight.toString())
  }
  if (mergedOptions.marginTop !== undefined) {
    formData.append('marginTop', mergedOptions.marginTop.toString())
  }
  if (mergedOptions.marginBottom !== undefined) {
    formData.append('marginBottom', mergedOptions.marginBottom.toString())
  }
  if (mergedOptions.marginLeft !== undefined) {
    formData.append('marginLeft', mergedOptions.marginLeft.toString())
  }
  if (mergedOptions.marginRight !== undefined) {
    formData.append('marginRight', mergedOptions.marginRight.toString())
  }
  if (mergedOptions.landscape !== undefined) {
    formData.append('landscape', mergedOptions.landscape.toString())
  }
  if (mergedOptions.preferCssPageSize !== undefined) {
    formData.append('preferCssPageSize', mergedOptions.preferCssPageSize.toString())
  }
  if (mergedOptions.printBackground !== undefined) {
    formData.append('printBackground', mergedOptions.printBackground.toString())
  }
  if (mergedOptions.scale) {
    formData.append('scale', mergedOptions.scale.toString())
  }
  if (mergedOptions.nativePageRanges) {
    formData.append('nativePageRanges', mergedOptions.nativePageRanges)
  }
  if (mergedOptions.waitDelay) {
    formData.append('waitDelay', `${mergedOptions.waitDelay}s`)
  }
  if (mergedOptions.waitForExpression) {
    formData.append('waitForExpression', mergedOptions.waitForExpression)
  }

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Gotenberg request failed with status ${response.status}`)
  }

  return response.blob()
}

/**
 * Convert URL to PDF using Gotenberg
 */
export async function urlToPdf(
  url: string,
  options: GotenbergPdfOptions = {}
): Promise<Blob> {
  const baseUrl = process.env.NEXT_PUBLIC_GOTENBERG_URL || 'https://gotenberg.smartcamp.ai'
  const endpoint = `${baseUrl}/forms/chromium/convert/url`

  const formData = new FormData()
  formData.append('url', url)

  // Add options (same as htmlToPdf)
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }

  if (mergedOptions.paperWidth) {
    formData.append('paperWidth', mergedOptions.paperWidth.toString())
  }
  if (mergedOptions.paperHeight) {
    formData.append('paperHeight', mergedOptions.paperHeight.toString())
  }
  if (mergedOptions.marginTop !== undefined) {
    formData.append('marginTop', mergedOptions.marginTop.toString())
  }
  if (mergedOptions.marginBottom !== undefined) {
    formData.append('marginBottom', mergedOptions.marginBottom.toString())
  }
  if (mergedOptions.marginLeft !== undefined) {
    formData.append('marginLeft', mergedOptions.marginLeft.toString())
  }
  if (mergedOptions.marginRight !== undefined) {
    formData.append('marginRight', mergedOptions.marginRight.toString())
  }
  if (mergedOptions.landscape !== undefined) {
    formData.append('landscape', mergedOptions.landscape.toString())
  }
  if (mergedOptions.printBackground !== undefined) {
    formData.append('printBackground', mergedOptions.printBackground.toString())
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Gotenberg request failed with status ${response.status}`)
  }

  return response.blob()
}

/**
 * Merge multiple PDFs using Gotenberg
 */
export async function mergePdfs(pdfBlobs: Blob[]): Promise<Blob> {
  const baseUrl = process.env.NEXT_PUBLIC_GOTENBERG_URL || 'https://gotenberg.smartcamp.ai'
  const url = `${baseUrl}/forms/pdfengines/merge`

  const formData = new FormData()

  // Add all PDF files
  pdfBlobs.forEach((blob, index) => {
    formData.append('files', blob, `file${index}.pdf`)
  })

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Gotenberg merge request failed with status ${response.status}`)
  }

  return response.blob()
}

/**
 * Test Gotenberg connectivity
 */
export async function testGotenberg(): Promise<boolean> {
  try {
    const testHtml = '<html><body><h1>Test</h1></body></html>'
    const pdf = await htmlToPdf(testHtml)
    return pdf.size > 0
  } catch (error) {
    return false
  }
}
