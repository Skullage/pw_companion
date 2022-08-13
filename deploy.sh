set -e
npm run deploy

git add -A
git commit -m 'deploy'

git push -f git@github.com:Skullage/pw_companion.git master

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Skullage/pw_companion.git master:gh-pages

cd -