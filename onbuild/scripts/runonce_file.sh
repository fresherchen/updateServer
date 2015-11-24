#!/bin/bash

# call nodejs image's runonce_nodejs script
source /scripts/runonce_nodejs.sh
runonce_nodejs

FILE_DBNAME=${FILE_DBNAME:-filemicroservices}
FILE_ENV=${FILE_ENV:-development}
# get db user info from linked container
FILE_DBUSER=${DB_ENV_DBUSER:-}
FILE_DBPASS=${DB_ENV_DBPASS:-}

#
# Stack setup
#
runonce_file() {
    # db configs
    if [[ -n "DB_PORT_27017_TCP_ADDR}" ]]; then
        sudo -u node -H sed -i "s/{{STACK_DBHOST}}/${DB_PORT_27017_TCP_ADDR}/" ${APP_DIR}/config/env/${FILE_ENV}.js
    fi
    sudo -u node -H sed -i "s/{{FILE_DBNAME}}/${FILE_DBNAME}/" ${APP_DIR}/config/env/${FILE_ENV}.js
    sudo -u node -H sed -i "s/{{FILE_DBUSER}}/${FILE_DBUSER}/" ${APP_DIR}/config/env/${FILE_ENV}.js
    sudo -u node -H sed -i "s/{{FILE_DBPASS}}/${FILE_DBPASS}/" ${APP_DIR}/config/env/${FILE_ENV}.js
    
    printf "${green}OK\n${end}"

    echo "Initialization for image file completed !!!"
}
