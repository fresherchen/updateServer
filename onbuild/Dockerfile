#
# AUTHOR            Jpchen <jpchen@leadstec.com>
# DOCKER-VERSION    1.7.1
# Copyright         (C) 2015 Leads Technologies Ltd. All rights reserved.
#
# Description       Dockerfile for Image Files MicroServices image base on nodejs
#
FROM       reg.leadstec.com/nodejs:latest
MAINTAINER Jpchen <jpchen@leadstec.com>

# clone code 
RUN git clone http://jpchen:jinpei0930@git.leadstec.com/webapp/imageUpgradeFile-tpl.git
# install npm packages
RUN cd mic-tpl/src && \
    npm install

# clone code 
ONBUILD git clone http://jpchen:jinpei0930@git.leadstec.com/webapp/imageUpgradeFile.git
# copy node_module
ONBUILD COPY mic-tpl/src/node_modules note-microServers/src

# rm files
# ONBUILD RUN rm mic-tpl
