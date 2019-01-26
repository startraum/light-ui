import React from 'react'
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: any) {
    const sheet: any = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps: any = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [...initialProps.styles, ...sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }
}
