# docker build .
# docker run 7e8d5597cdba22ec591d05ab28657c06fb7ba7ea6b58f2af0884873001e5e928
# docker build -t stephengrider/posts:0.0.1 .
# docker build -t jgslahrb/posts
# docker run jgslahrb/posts
# docker login
# docker push jgslahrb/posts

FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]