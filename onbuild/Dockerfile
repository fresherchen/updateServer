#
# AUTHOR            Jpchen <jpchen@leadstec.com>
# DOCKER-VERSION    1.7.1
# Copyright         (C) 2015 Leads Technologies Ltd. All rights reserved.
#
# Description       Dockerfile for Image Files MicroServices image base on nodejs
#
FROM       reg.leadstec.com/nodejs:latest
MAINTAINER Jpchen <jpchen@leadstec.com>

# install packages
RUN apk --update add gcc g++ make

# add metadate
COPY assets/setup /setup
RUN chmod 755 /setup/install && \
    exec /setup/install
RUN rm -fr /setup

# add custom/runonce scripts
COPY scripts /scripts

# install npm packages
COPY package.json ${APP_DIR}/package.json
RUN cd ${APP_DIR} && npm config set registry https://registry.npm.taobao.org && sudo -u node -H npm install

# copy code
ONBUILD COPY src ${APP_DIR}
