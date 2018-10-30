#!/bin/bash

npm update

VERSION=$(node --eval "console.log(require('./package.json').version);")

npm test || exit 1

echo "Ready to publish version $VERSION."
echo "Has the version number been bumped?"
read -n1 -r -p "Press Ctrl+C to cancel, or any other key to continue." key

export NODE_ENV=production

npm run-script build

echo "Creating git tag v$VERSION..."

git commit -am "v$VERSION"
git tag v$VERSION -f
git push --tags -f

echo "Uploading to NPM..."

npm publish

echo "All done."