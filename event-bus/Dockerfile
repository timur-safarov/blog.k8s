# docker build .
# docker run 7e8d5597cdba22ec591d05ab28657c06fb7ba7ea6b58f2af0884873001e5e928
# docker build -t stephengrider/event-bus .
# docker build -t jgslahrb/event-bus .
# docker run stephengrider/event-bus
# docker login
# docker push jgslahrb/event-bus

FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]