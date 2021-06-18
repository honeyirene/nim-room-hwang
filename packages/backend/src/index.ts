import app from './app';

const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`listen 127.0.0.1:${port}`);
});
