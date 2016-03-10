#
# AUTHOR            Jpchen <jpchen@leadstec.com>
# DOCKER-VERSION    1.7.1
# Copyright         (C) 2015 Leads Technologies Ltd. All rights reserved.
#
# Description       Dockerfile for UpdateService image base on nodejs
#
FROM  edu.lxpt.cn/updateservice-tpl:latest
MAINTAINER Jpchen <jpchen@leadstec.com>

ENV UPDATESERVICE_VERSION 0.2.0

# install packages
RUN apk --update add gcc g++ make

# add metadate
COPY assets/setup /setup
RUN chmod 755 /setup/install && \
    exec /setup/install
RUN rm -fr /setup

# add custom & runonce scripts
COPY scripts /scripts

# copy code
COPY src ${APP_DIR}
