#!/usr/bin/env bash

# go to root directory of Neos.Neos.Ui
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../../

# load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# break on failures can only be applied AFTER nvm was loaded.
set -e

nvm install
nvm use

GIT_SHA1=`git rev-parse HEAD`

npm install
npm run build

rm -Rf tmp_compiled_pkg
git clone git@github.com:neos/neos-ui-compiled.git tmp_compiled_pkg
mkdir -p tmp_compiled_pkg/Resources/Public/JavaScript
mkdir -p tmp_compiled_pkg/Resources/Public/Styles

cp -Rf Resources/Public/JavaScript/* tmp_compiled_pkg/Resources/Public/JavaScript
cp -Rf Resources/Public/Styles/* tmp_compiled_pkg/Resources/Public/Styles

cd tmp_compiled_pkg
git add Resources/Public/
git commit -m "Compile Neos UI - $GIT_SHA1"
git push
