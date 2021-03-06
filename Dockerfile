FROM node as build
WORKDIR /app
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run lint
RUN npm run build

FROM node:alpine

EXPOSE 3000

ENV NODE_ENV production

WORKDIR /app
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
RUN npm install --production
COPY --from=build /app/.next /app/.next
COPY --from=build /app/.env /app/.env

CMD ["npm", "start"]
