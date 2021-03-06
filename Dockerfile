FROM node:14-buster-slim as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]