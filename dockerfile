FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY index.html .
COPY styles/ styles/
COPY scripts/ scripts/

EXPOSE 80
