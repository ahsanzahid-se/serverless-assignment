# Prerequisite for offline

You must have JDK installed on your machine in order to run dynamoDB locally. 
** [Link:]** (https://www.oracle.com/java/technologies/downloads/)

You should be having serverless globally installed on your machine.

1. **Install via npm:**

```bash
npm install -g serverless
```

# Quick Start

```bash
Npm install
```

```bash
sls dynamodb install
```

```bash
npm start
```

# Deploying to aws

**Set-up your [Provider Credentials](./docs/providers/aws/guide/credentials.md)**. [Watch the video on setting up credentials](https://youtu.be/VUKDRoUdMek)

After configuring your aws cli with access key id and secret access key. You can simply run the command to publish your lambda's

```bash
npm run puslish
```

# Build

```bash
npm run build
```
