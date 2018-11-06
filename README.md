# @neos/neos-ui
[![Build Status](https://travis-ci.org/neos/neos-ui.svg?branch=master)](https://travis-ci.org/neos/neos-ui) [![Dependency Status](https://david-dm.org/neos/neos-ui.svg)](https://david-dm.org/neos/neos-ui) [![devDependency Status](https://david-dm.org/neos/neos-ui/dev-status.svg)](https://david-dm.org/neos/neos-ui#info=devDependencies&view=table)
[![Slack](http://slack.neos.io/badge.svg)](http://slack.neos.io) [![Forum](https://img.shields.io/badge/forum-Discourse-39c6ff.svg)](https://discuss.neos.io/) [![Twitter](https://img.shields.io/twitter/follow/neoscms.svg?style=social)](https://twitter.com/NeosCMS)

> The next generation Neos CMS interface written in ReactJS with Immutable data structures.

## Browser support

The new interface supports all evergreen (i.e. self-updating) browsers, including: Chrome, Firefox, Safari, Edge, Opera and other webkit-based browsers. In addition IE11 should also work, but please try to use more modern browsers, as the performance might suffer. If you discover bugs in any of the supported browsers, please [report them](https://github.com/neos/neos-ui/issues/new)!

## Features

* Better editing experience for responsive websites.
* Faster load times for the backend.
* No reload constraint for the correct stylesheets on multi-site systems.
* Updated Font-Awesome to v5.0 (old icon names are migrated on the fly).


## Installation and usage

The new UI is [already included](https://github.com/neos/neos-base-distribution/blob/3.3/composer.json#L24) in the base Neos distribution. If you don't have it installed yet, follow these steps:

1. You need to have Neos CMS 3.3 or newer up & running.

2. Run the following command:
   ```
   composer require neos/neos-ui neos/neos-ui-compiled
   ```

3. Now you are all set up and you can login to the new interface as usual via `/neos` route.

### Updating

```
composer update neos/neos-ui neos/neos-ui-compiled
```

### Installing dev-master

For trying out the new UI, we recommend you to run the regularily released beta releases.
However, if you want to stay on bleeding-edge, or want to help out developing, you'll
need the `dev-master` release. You can install the master release using:

```
composer require neos/neos-ui:dev-master neos/neos-ui-compiled:dev-master
```

## Contributing

In order to start contributing, follow the following steps:

1) Ensure you have the `dev-master` version installed (see above).

2) We require [Chrome](https://www.google.com/chrome/browser/desktop/index.html) as well as the `yarn`(https://yarnpkg.com/en/) command and GNU Make(https://www.gnu.org/software/make/) to be installed on your system.

3) The currently supported version of `node` is defined in `.nvmrc` file. If you have [nvm](https://github.com/creationix/nvm) installed, you can just run `nvm install && nvm use` from the project directory.

4) Inside `Configuration/Settings.yaml`, set the following property for disabling the pre-compiled files:

   ```
   Neos:
     Neos:
       Ui:
         frontendDevelopmentMode: true
   ```

5) Run the initialization script:

   ```
   make setup
   ```

6) Get an overview about the codebase. We've recorded [an introduction on YouTube](https://www.youtube.com/watch?v=RYBUS5Nxxxk) which
   gets you acquainted with the basics. Additionally, please get in touch with us on [Slack](http://slack.neos.io) in the
   channel #project-ui-rewrite. We're eager to help you get started!

#### Development commands
| Command         | Description                    |
| --------------- | ------------------------------ |
| `make clean` | delete all node_modules in every subdirectory. |
| `make build` |  Runs the development build. |
| `make build-watch` | Watches the source files for changes and runs a build in case. |
| `make build-watch-poll` | Watches (and polls) the source files on a file share. Should preferably be used when working an a VM for example. |
| `make storybook` | Starts the storybook server on port 9001. |
| `make lint`  | Executes `make lint-js` and `make lint-editorconfig`. |
| `make lint-js`  | Runs test in all subpackages via lerna. |
| `make lint-editorconfig`  | Tests if all files respect the `.editorconfig`. |
| `make test`  | Executes the test on all source files. |
| `make test-e2e`  | Executes integration tests. |

##### Custom webpack live reload options

If you are developing inside a virtual machine and you are running the
watch command on your local system it is may be needed for you to adjust
the live reload optons.

This can be done by putting an `.webpack.livereload.local.js` inside the
repository root.

An example file would look like this:

```
module.exports = {
       protocol: 'http',
       port: '123',
       hostname: 'localhost'
};
```

#### Code style
Our code style is based upon `xo`, with one big difference - We use 4 spaces instead of tabs, to align our code style a bit with the PSR-2 standard for our PHP codebase. To lint the code, execute `make lint` in your shell.

#### Writing unit tests
The unit tests are executed with [jest](https://facebook.github.io/jest/).
To run the unit tests, execute `make test` in your shell.

Adding unit tests is fairly simple, just create a file on the same tree level as your changed/new feature, named `[filename].spec.js` and karma will execute all tests found within the spec file, other than that, just orient yourself on the existing tests.

Use `it.only(() => {})` and `describe.only(() => {})` if you want to run a specific test and not the whole test suite.

#### Integration tests

For end to end testing we use the headless chrome. So it is mandatory to install the chrome browser for integration tests.
Since Chrome 59 the headless mode is integrated. So please install a Chome 59 or higher to execute the end to end tests.

#### Releasing

You only need to trigger the jenkins release with the version you want to release.
After jenkins has finished you need release a new version on github.

## License
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
