FROM node:9-slim
WORKDIR /usr/src/app
COPY . .
RUN chmod +x ./wait_for_it.sh

EXPOSE 43037
VOLUME [ "/usr/src/app" ]
