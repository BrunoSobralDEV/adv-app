import app from './app';

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`⚡ Server is running at http://${HOST}:${PORT}`)
});