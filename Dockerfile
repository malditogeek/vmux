# DOCKER-VERSION 0.6.1

FROM  ubuntu:12.04

RUN apt-get install -y python-software-properties python
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get -y update
RUN apt-get install -y nodejs supervisor redis-server

ADD ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN mkdir -p /var/log/supervisor

ADD . /src/vmux
RUN cd /src/vmux; npm install

EXPOSE 5000
EXPOSE 3478

CMD ["supervisord", "-n"]
