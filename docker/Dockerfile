FROM ubuntu:24.04

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Update & install nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean

# Expose default port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

