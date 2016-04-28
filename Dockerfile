#
# AUTHOR            Jpchen <jpchen@leadstec.com>
# DOCKER-VERSION    1.9.2
# Copyright         (C) 2016 Leads Technologies Ltd. All rights reserved.
#
# Description       Dockerfile for UpdateService image base on nodejs
#
FROM  edu.lxpt.cn/updateservice_base:latest
MAINTAINER Jpchen <jpchen@leadstec.com>
LABEL leadstec-update-build="0.2.1-{{PIPELINE_BUILD_NUMBER}}"

# set environment variables
ENV UPDATE_VERSION="0.2.1"

# install packages
RUN apk --update add make git nodejs && \
    rm /var/cache/apk/*

# add metadate
COPY assets/setup /setup
RUN chmod 755 /setup/install && \
    exec /setup/install
RUN rm -fr /setup

# add custom & runonce scripts
COPY scripts /scripts

# copy code
COPY src ${APP_DIR}
