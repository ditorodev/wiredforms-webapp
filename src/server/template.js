import serialize from 'serialize-javascript';

export default ({body, title, data}) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="/assets/index.css" />
            <script defer src="/assets/bundle.js"></script>
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        
        <body>
            <div id="app">${body}</div>
        </body>
        </html>
  `;
}