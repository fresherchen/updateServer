#
# AUTHOR            Jpchen <jpchen@leadstec.com>
# DOCKER-VERSION    1.7.1
# Copyright         (C) 2015 Leads Technologies Ltd. All rights reserved.
#
# Description       Dockerfile for Image Files MicroServices image base on nodejs
#
FROM       reg.leadstec.com/nodejs:latest
MAINTAINER Jpchen <jpchen@leadstec.com>

# add metadate and install npm 
COPY assets/setup /setup
RUN chmod 755 /setup/install && \
    exec /setup/install
RUN rm -fr /setup

RUN chown -R node:node ${APP_DIR} && \
	echo "notemicroservices" > /.image_name

# add custom/runonce scripts
COPY scripts /scripts

# copy files
# ONBUILD COPY src ${APP_DIR}
