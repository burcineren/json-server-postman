const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('markets.json'); // Veritabanı dosyanız
const middlewares = jsonServer.defaults();

// Varsayılan middleware'leri ekleyin (logger, static, cors ve no-cache)
server.use(middlewares);

// CORS yapılandırması ekleyin
server.use(
  cors({
    origin: 'http://localhost:4200', // Angular uygulamanızın URL'si
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// JSON Server body-parser'ı kullanarak POST, PUT ve PATCH işlemlerini destekleyin
server.use(jsonServer.bodyParser);

// Özel bir test rotası ekleyin
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// Varsayılan JSON Server rotasını kullanın
server.use(router);

// Sunucuyu başlatın
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});