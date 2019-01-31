FROM hypriot/rpi-node:latest

EXPOSE 3000

ENV NODE_ENV production

WORKDIR /app
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install --production
ADD .next .next

CMD ["npm", "start"]
