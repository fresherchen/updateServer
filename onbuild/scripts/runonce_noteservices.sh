#!/bin/bash

# call nodejs image's runonce_nodejs script
source /scripts/runonce_nodejs.sh
runonce_nodejs

NOTE_DBNAME=${NOTES_DBNAME:-notesmicroservices}
NODE_ENV=${NODE_ENV:-development}
# get db user info from linked container
NOTE_DBUSER=${DB_ENV_DBUSER:-}
NOTE_DBPASS=${DB_ENV_DBPASS:-}

#
# Stack setup
#
runonce_file() {
    # db configs
    if [[ -n "DB_PORT_27017_TCP_ADDR}" ]]; then
        sudo -u node -H sed -i "s/{{STACK_DBHOST}}/${DB_PORT_27017_TCP_ADDR}/" ${APP_DIR}/config/env/${NODE_ENV}.js
    fi
    sudo -u node -H sed -i "s/{{NOTE_DBNAME}}/${NOTE_DBNAME}/" ${APP_DIR}/config/env/${NODE_ENV}.js
    sudo -u node -H sed -i "s/{{NOTE_DBUSER}}/${NOTE_DBUSER}/" ${APP_DIR}/config/env/${NODE_ENV}.js
    sudo -u node -H sed -i "s/{{NOTE_DBPASS}}/${NOTE_DBPASS}/" ${APP_DIR}/config/env/${NODE_ENV}.js
    
    printf "${green}OK\n${end}"

    echo "Initialization for image file completed !!!"
}
