#!/bin/bash

# call nodejs image's runonce_nodejs script
source /scripts/runonce_nodejs.sh
runonce_nodejs

UPDATE_DBNAME=${UPDATE_DBNAME:-updateservice}
UPDATE_ENV=${UPDATE_ENV:-development}
# get db user info from linked container
UPDATE_DBUSER=${DB_ENV_DBUSER:-}
UPDATE_DBPASS=${DB_ENV_DBPASS:-}

#
# Services setup
#
runonce_updateservice() {

    # Services main configs
    printf "Configuring updateservice basis settings ... "
    # db configs
    if [[ -n "DB_PORT_27017_TCP_ADDR}" ]]; then
        sudo -u node -H sed -i "s/{{UPDATE_DBHOST}}/${DB_PORT_27017_TCP_ADDR}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
    fi
    sudo -u node -H sed -i "s/{{UPDATE_DBNAME}}/${UPDATE_DBNAME}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
    sudo -u node -H sed -i "s/{{UPDATE_DBUSER}}/${UPDATE_DBUSER}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
    sudo -u node -H sed -i "s/{{UPDATE_DBPASS}}/${UPDATE_DBPASS}/" ${APP_DIR}/config/env/${UPDATE_ENV}.js
    
    printf "${green}OK\n${end}"

    echo "Initialization for updateservice completed !!!"
}
