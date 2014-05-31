# generator-typescript [![Build Status](https://secure.travis-ci.org/mrkev/generator-typescript.png?branch=master)](https://travis-ci.org/mrkev/generator-typescript)

[Yeoman](http://yeoman.io) generator for typescript projects.

## Getting Started

### Get to know Yeoman.

He's a cool guy. He wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Run the generator

To install generator-typescript from npm, run:

```
$ npm install -g generator-typescript
```

Finally, initiate the generator:

```
$ yo typescript
```

Tell it what to name your project, where to put your files and how to setup your typescript compilation. 

### Enjoy!

This generator comes with Gulp with tasks for compiling and running. 

To build all typescript source:

`$ gulp build`

To run the newly generated `index.js`:

`$ gulp run`

To automatically compile when a file changes:

`$ gulp watch`

To automatically compile and run when a file changes

`$ gulp watchrun`

### Extend?

Edit `gulpfile.js` to change de default file to run or the paths to watch. Do you feel like flipping tables because this generator is missing some kick-ass feature? I'll keep an eye at issues for table flips `(╯°□°）╯︵ ┻━┻`.

## License

MIT
