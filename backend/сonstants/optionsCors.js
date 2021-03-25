const optionsCors = {
  origin: [
    'http://localhost:3001',
    'https://ВАШ ДОМЕЙН С ДОКУМЕНТА', 'https://YOUR.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
module.exports = optionsCors;
