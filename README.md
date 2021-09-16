# HN Client

This project is an alternative client to browse the [Hacker News](https://news.ycombinator.com) website by means of its [public API](https://github.com/HackerNews/API).

The live version of the website is available at [murar8-hn-client.web.app](https://murar8-hn-client.web.app)

## Features

- Responsive design.
- Pagination and code splitting for increasing performance.
- PWA support using Workbox for caching static content.
- Dynamic theme based on system preferences.

## Inner workings

### Tech stack

|                               |                             |
| ----------------------------- | --------------------------- |
| Programming language          | Typescript                  |
| UI framework                  | React                       |
| Module bundling/transpilation | Create React App            |
| Testing (integration/unit)    | Jest + React Testing Libray |
| Component library             | Chakra UI                   |
| Routing                       | React Router                |

### Deployment

Deployment is handled using a github actions CI pipeline that deploys the website whenever new code is pushed to the `main` branch. In addition, whenever a PR is opened, the pipeline generates a staging URL where the website containing the proposed modifications is deployed.

## License

Copyright (c) 2021 Lorenzo Murarotto <lnzmrr@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
