// http://localhost:4000/posts

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Этот запрос не используется, оставим пока просто для вывода данных в консоль
app.get('/posts', (req, res) => {
	// Выводим все записи из posts
	res.send(posts);
});

app.post('/posts/create', async (req, res) => {

	// Генерируем наш случайный id
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;

	// Добавляем новую запись в posts
	posts[id] = {
		id,
		title
	};

	await axios.post('http://event-bus-srv:4005/events', {
		type: 'PostCreated',
		data: {
			id,
			title
		}
	});

	res.status(201).send(posts[id]);

});


app.post('/events', (req, res) => {
	console.log('Received Event', req.body.type);
	res.send({});
});


app.listen(4000, () => {
	console.log('v55');
	console.log('Listening on 4000');
});