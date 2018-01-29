FROM node:8.9.4
LABEL MAINTAINER="Val Vinder 'vvinder@gmail.com'"

USER root

# create dev user that this application runs under
RUN groupadd -g 1002 dev
RUN useradd -u 1002 -g 1002 -s /bin/bash -m -d /home/dev dev \
    && mkdir -p /opt/employee-portal \
    && chown dev:dev /opt/employee-portal \
    && chmod 755 /opt/employee-portal

COPY . /opt/employee-portal
RUN cd /opt/employee-portal \
    && rm -rf node_modules \
    && npm install \
    && npm run build

# Expose ports.
ENV PORT=9000
EXPOSE 9000

# switching user
USER dev

WORKDIR /opt/employee-portal
CMD ["npm", "run", "serve"]
