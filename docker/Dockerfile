FROM ubuntu:24.04

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Update & install nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean

# Copy website files
COPY ../web /var/www/html

# Expose default port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

