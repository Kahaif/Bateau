FROM node:22.2.0 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install -g @angular/cli

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
