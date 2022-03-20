# HomesForHeroes

# Getting Started

## Installing dependencies

To install all of the required dependencies in both the front and backend run the command:
```
npm run install:all
```

## Setting up secrets

Duplicate the `.env.example` file found in the Backend folder and rename to `.env` then proceed to fill out the secrets with the appropriate constants.

## Setting up the development environment

In order to integrate eslint and prettier into visible IDE errors, install the `eslint` and `prettier` VSCode extensions. (These should be already preinstalled with WebStorm).

Some may find it easy to setup run configurations for the `npm` commands in the package.json, this is highly recommended if you are using VSCode or WebStorm

# Linting

The project should automatically lint itself before a committ is made, however, if you would like to manually lint, here are your options.

### Check for ESLint errors
```
npm run lint
```

### Autmomatically fix ESLint errors
Note that the error must be automatically fixable (as shown by the wrench emoji [here](https://eslint.org/docs/rules/))
```
npm run lint:fix
```

### Format all files with prettier
```
npm run format
```

# Running the project

## Development

In order to run the project in development mode with code watching (auto-reload on save), run:
```
npm run dev
```

## Production

### Building
Before deploying the application, the React app must be built, this can be done with the following command:
```
npm run build
```

### PM2 Clustering

This project uses `pm2` to cluster the backend into multiple processes across the CPU for performance, this can be deployed with the command:
```
npm run pm2:start
```

In order to kill all of the running pm2 processes, run the command:
```
npm run pm2:delete
```
