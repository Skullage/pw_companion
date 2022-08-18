#!/usr/bin/env bash

set -e
npm run build

git add -A
git commit -m 'deploy'

git push -f git@github.com:Skullage/pw_companion.git master

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Skullage/pw_companion.git master:gh-pages

cd -