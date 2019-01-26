import { ngExpressEngine, NgSetupOptions } from '@nguniversal/express-engine';
import * as express from 'express';

import { readFile } from './utils';

export function createApi(distPath: string, ngSetupOptions: NgSetupOptions) {
  const api = express();

  api.set('view engine', 'html');
  api.set('views', distPath);

  // Angular Express Engine
  api.engine('html', ngExpressEngine(ngSetupOptions));

  // Server static files from distPath
  api.get('*.*', express.static(distPath));

  // All regular routes use the Universal engine
  api.get('*', (req, res) => {
    const urlQuery = req.originalUrl.split('?');

    if (urlQuery[1] && urlQuery[1] === 'rendered') {
      res.render('index', { req, res });
    } else {
      try {
        Promise.all([
          readFile(`./src/app/components${urlQuery[0]}/props.json`),
          readFile(`./src/app/components${urlQuery[0]}${urlQuery[0]}.component.ts`),
          readFile(`./src/app/components${urlQuery[0]}${urlQuery[0]}.component.html`)
        ]).then(results => {
          const propsTable = (<string>results[0]).replace(/\r?\n|\r/g,'')
          const componentSrc = (<string>results[1]);
          const componentTemplate = (<string>results[2]);
          const host = req.get('host');

          res.json({
            compiled: `<iframe src="http://${host}${urlQuery[0]}?rendered"></iframe>`,
            componentSrc,
            componentTemplate,
            propsTable
          });
        })
      } catch (e) {
        res.status(300).json({ error: 'failed to read component data'});
      }
    }
  });

  return api;
}
