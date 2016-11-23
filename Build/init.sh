#!/usr/bin/env bash

#
# Make sure the node & npm version matches our required constraints.
#
nvm install
nvm use

#
# First of, install all application dependencies.
#
npm install

#
# Prune the node directory in case npm did something unexpected.
#
npm prune


#
# Copy githooks
#

# get the directory of this script no matter where it is called from
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cp -f $DIR/GitHooks/* $DIR/../.git/hooks/
