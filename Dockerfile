FROM node:18 AS builder


WORKDIR /app/builder

COPY . .
RUN npm ci

ARG NODE_ENV='production'
ARG VITE_BACKEND_URL

RUN export NODE_ENV=production
RUN echo VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN echo NODE_ENV=$NODE_ENV

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.26

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist ./
COPY nginx /etc/nginx
