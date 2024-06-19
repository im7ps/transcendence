# Dockerfile

FROM nginx:alpine

# Install OpenSSL and generate SSL certificates
RUN apk update && apk upgrade && \
    apk add --no-cache openssl && \
    mkdir -p /usr/share/nginx/html/ft_transcendence && \
    openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=bong.42.it" \
    -addext "subjectAltName=DNS:bong.42.it" \
    -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt 

# Copy static files
COPY ./index.html /usr/share/nginx/html/ft_transcendence/index.html
COPY ./styles.css /usr/share/nginx/html/ft_transcendence/styles.css
COPY ./app.js /usr/share/nginx/html/ft_transcendence/app.js

# Copy Nginx configuration file
COPY ./default.conf /etc/nginx/conf.d

# Set permissions for static files
RUN chmod -R 755 /usr/share/nginx/html/ft_transcendence/*

# Expose HTTPS port
EXPOSE 443
