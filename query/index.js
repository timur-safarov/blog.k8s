const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// QUICK EXAMPLE
// posts = {
// 	'ew4f47h35': {
// 		id: 'ew4f47h35',
// 		title: 'post title',
// 		comments: [
// 			{
// 				id: 'kd35ty447',
// 				content: 'comment!'
// 			}
// 		]
// 	}
// };

const handleEvent = (type, data) => {

	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}

	if (type === 'CommentCreated') {
		const { id, content, postId, status } = data;
		const post = posts[postId];
		post.comments.push({ id, content, status });
	}

	if (type === 'CommentUpdated') {
		const { id, content, postId, status } = data;

		const post = posts[postId];
		const comment = post.comments.find(comment => {
			return comment.id === id;
		});

		comment.status = status;
		comment.content = content;
	}

};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);
	res.send({});
});

app.listen(4002, async () => {

	console.log('Listening on 4002');
	

	const res = await axios.get('http://event-bus-srv:4005/events');

	for (let event of res.data) {
		console.log('Processing event:', event.type, ' id: ', event.data.id);
		handleEvent(event.type, event.data);
	}

});