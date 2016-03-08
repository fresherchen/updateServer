#!/bin/bash

#
# Update setup
#
runonce_updateservice() {

    echo "${yellow}UPDATE: Initialize container settings ...${end}"

    ###############################################
    #
    # Procedure 1: Processing working directories
    #
    ###############################################
    chown -R node:node ${APP_DIR}


    ###############################################
    #
    # Procedure 2: Determine new install or updating
    #
    ###############################################

    if [[ ${LXC_NEW_INSTALL} == true ]]; then
        UPDATE_ENV=${UPDATE_ENV:-development}
        UPDATE_TITLE=${UPDATE_TITLE:-UpdateService}
        UPDATE_DESC=${UPDATE_DESC:-$UPDATE_TITLE}
        UPDATE_DBNAME=${UPDATE_DBNAME:-updateservice}
        # get db user info from linked container
        UPDATE_DBUSER=${DB_ENV_DBUSER:-}
        UPDATE_DBPASS=${DB_ENV_DBPASS:-}

        # UpdateService main configs
        printf "Configuring UpdateService basis settings ... "
        sudo -u node -H sed -i "s/{{UPDATE_TITLE}}/${{UPDATE_TITLE}}/" ${APP_DIR}/config/env/all.js
        sudo -u node -H sed -i "s/{{UPDATE_DESC}}/${{UPDATE_DESC}}/" ${APP_DIR}/config/env/all.js
        # db configs
        if [[ -n "DB_PORT_27017_TCP_ADDR}" ]]; then
            sudo -u node -H sed -i "s/{{UPDATE_DBHOST}}/${DB_PORT_27017_TCP_ADDR}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
        fi
        sudo -u node -H sed -i "s/{{UPDATE_DBNAME}}/${UPDATE_DBNAME}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
        sudo -u node -H sed -i "s/{{UPDATE_DBUSER}}/${UPDATE_DBUSER}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
        sudo -u node -H sed -i "s/{{UPDATE_DBPASS}}/${UPDATE_DBPASS}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
        printf "${green}OK\n${end}"

        printf "Configuring container.json ..."
        #update service env
        captool config --set -i updateservice -k UPDATE_ENV -v ${UPDATE_ENV}
        captool config --set -i updateservice -k UPDATE_TITLE -v ${UPDATE_TITLE}
        captool config --set -i updateservice -k UPDATE_DESC -v ${UPDATE_DESC}
        printf "${green}OK\n${end}"
    else
        printf "Restoring update service's ENVs from container.json ... "
        for env_param in UPDATE_ENV UPDATE_TITLE UPDATE_DESC; do
            export ${env_param}=$(captool config --get -i updateservice -k ${env_param})
        done
        printf "${green}OK\n${end}"
    fi

    #
    # Persist directories and files
    #
    cd ${APP_DIR}
    mkdir files_update
    captool persist --link -c -s files_update -b updateservice

    # cd ${APP_DIR}/config
    # captool persist --link -c -s env -b updateservice

    # fix permission for node user
    chown -R node:node ${LXC_PERSIST_DIR}/updateservice

    #####################################################
    #
    # Procedure 3: Deal with the post-initialized setups
    #
    #####################################################
    # nothing to do here

    echo "${yellow}UPDATE: Initialization completed.${end}"
}
