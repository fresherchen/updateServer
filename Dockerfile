#
# AUTHOR            Jpchen <jpchen@example.com>
# DOCKER-VERSION    1.9.1
# Copyright         (C) 2016 example Technologies Ltd. All rights reserved.
#
# Description       Dockerfile for Update Service image base on nodejs
#
FROM  edu.example.cn/nodejs_ms:latest
MAINTAINER Jpchen <jpchen@example.com>
LABEL example-update-build="0.3.1-{{PIPELINE_BUILD_NUMBER}}"

# set environment variables
ENV UPDATE_VERSION="0.3.1"

# install packages
RUN apk --update add make git nodejs && \
    rm /var/cache/apk/*

# add metadate custom & runonce scripts
COPY scripts /scripts
RUN bash /scripts/setup/install
RUN rm -fr /scripts/setup

# copy code
COPY src ${APP_DIR}
