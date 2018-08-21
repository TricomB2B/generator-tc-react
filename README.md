# TricomB2B React Generator

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-tc-react` using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/).

```bash
yarn global add yo
yarn global add generator-tc-react
```

Then set configurations for your new project:

```bash
yo tc-react
```

## Available commands

```bash
yo tc-react // Sets config file, must be run first in the root of your project
yo tc-react:action // Creates a redux action
yo tc-react:action-reducer // Creates a redux action/reducer pair
yo tc-react:component // Creates a component
yo tc-react:container // Creates a container
yo tc-react:middleware // Creates new middleware
yo tc-react:reducer // Creates a redux reducer
yo tc-react:wrapper // Creates a wrapper (a.k.a. HOC)
```

## Notes
Since this was banged up pretty quickly, i didnt add any auto-import for `reducers`, `middleware`, or `actions`, so after you generate (or remove) one of these object be sure to update the corresponding files that may rely on that file.