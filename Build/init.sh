#!/usr/bin/env bash

set -e

#
# Make sure the node & npm version matches our required constraints.
#
nvm install
nvm use

# check if yarn is installed, else install it
which yarn &>/dev/null

if [ $? -ne 0 ];
then
    sudo npm install -g yarn
fi

#
# First of, install all application dependencies.
# install is the default of yarn
#
yarn

#
# Copy githooks
#
cd .git/hooks && ln -sf ../../Build/GitHooks/* . && cd -
