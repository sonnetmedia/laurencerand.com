## TODO

- ~~Run webpack so Hugo can run then run both in parallel~~

- ~~~~pass arguments~~~~

- ~~pass env variable~~

- Run from binary and local
    - If binary, run chmod
    - otherwise, skip chmod

- ~~~~Update binary either for all, or just macOS~~~~

- Smell test


## build

Run task `chmod`.

Run tasks `hugo` and `webpack_watch` in parallel after this.


## deploy

Run task `chmod`, `webpack`, and then run `hugo`.

## chmod

```bash
chmod a+x ./bin/hugo.macos && echo 'chmod complete'
```

## os
```js
var os = require('os');
```


## hugo

Run task os before this.

```js

//const platform =  platform == "darwin" ? console.log('yay') : console.log('boo')



const { spawn } = require('child_process');
//const hugo_source = `./bin/hugo.macos`;
const hugo_source = 'hugo';
//const hugo_source = require('hugo-bin');
const args = process.argv.slice(3)
const hugoArgs = args.length === 0 ? ['--gc', '--minify'] : args;

console.log('flags: ', hugoArgs)

const hugo = spawn(hugo_source, hugoArgs, { 
  stdio: "pipe"
});

hugo.stdout.on('data', (data) => {
  console.log(`${data}`);
});

hugo.on("close", function(code) {
  if (code === 0) {
    console.log('build complete');
  } else {
    console.log('build failed');
  }
});

```

## webpack

```bash
NODE_ENV=production webpack
```

## webpack_watch

```bash
NODE_ENV=development webpack --progress --watch
```

## getHugo

```js
var http = require('https');
var fs = require('fs');


const pkg = require('./package.json');
const hugoVersion = pkg.hugoVersion;
const baseUrl = `https://github.com/gohugoio/hugo/releases/download/v${hugoVersion}/`;



const initCwd = process.env.INIT_CWD;
const cwd = process.cwd();
var file = fs.createWriteStream("file.jpg");
var request = http.get(baseUrl, function(response) {
  response.pipe(file);
  console.log(baseUrl);
  
});
```

## hugoUpdate

Update the Hugo Binaries to the specified version.

```py
from six.moves import urllib
import tarfile
import zipfile
import os
import shutil
import sys

print('Updating Hugo binaries')

os.chdir("./bin")

## Need to set the version number.
version = sys.argv[2]
print(version)
tarNames = ["macOS","Linux"]
zipNames = ["Windows"]
urlBase = "https://github.com/gohugoio/hugo/releases/download/v{}/".format(version)

for i in range(len(tarNames)):
  tarFilename = "hugo_extended_{}_{}-64bit.tar.gz".format(version,tarNames[i])
  print("Processing: "+tarFilename)
  urllib.request.urlretrieve(urlBase+tarFilename, tarFilename)
  tar = tarfile.open(tarFilename, "r:gz")
  tar.extractall("temp")
  tar.close()
  shutil.copyfile("./temp/hugo", "hugo_extended.{}".format(tarNames[i].lower()))
  shutil.rmtree("temp")
  os.remove(tarFilename)
  i += 1

for i in range(len(zipNames)):
  zipFilename = "hugo_extended_{}_{}-64bit.zip".format(version,zipNames[i])
  print("Processing: "+zipFilename)
  urllib.request.urlretrieve(urlBase+zipFilename, zipFilename)
  with zipfile.ZipFile(zipFilename,"r") as zip_ref:
    zip_ref.extractall("temp")
  shutil.copyfile("./temp/hugo.exe", "hugo_extended-{}.exe".format(zipNames[i].lower()))
  shutil.rmtree("temp")
  os.remove(zipFilename)
  i += 1

print("Hugo has been updated to version {}.".format(version))
```



## hugoMacUpdate

Update the Hugo Binaries to the specified version.

```py
from six.moves import urllib
import tarfile
import os
import shutil
import sys

print('Updating Hugo binaries')

os.chdir("./bin")

## Need to set the version number.
version = sys.argv[2]
print(version)
tarNames = ["macOS"]
urlBase = "https://github.com/gohugoio/hugo/releases/download/v{}/".format(version)

for i in range(len(tarNames)):
  tarFilename = "hugo_{}_{}-64bit.tar.gz".format(version,tarNames[i])
  print("Processing: "+tarFilename)
  urllib.request.urlretrieve(urlBase+tarFilename, tarFilename)
  tar = tarfile.open(tarFilename, "r:gz")
  tar.extractall("temp")
  tar.close()
  shutil.copyfile("./temp/hugo", "hugo.{}".format(tarNames[i].lower()))
  shutil.rmtree("temp")
  os.remove(tarFilename)
  i += 1

print("Hugo has been updated to version {}.".format(version))

```