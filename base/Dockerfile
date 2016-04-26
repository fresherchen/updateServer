#
# AUTHOR            Jpchen <jpchen@leadstec.com>
# DOCKER-VERSION    1.9.2
# Copyright         (C) 2016 Leads Technologies Ltd. All rights reserved.
#
# Description       Dockerfile for Update image base on nodejs
#
FROM       reg.leadstec.com/nodejs:latest
MAINTAINER Jpchen <jpchen@leadstec.com>

# install packages
RUN apk --update add gcc g++ make

# install npm packages
COPY package.json ${APP_DIR}/package.json
RUN cd ${APP_DIR} && sudo -u node -H npm install
