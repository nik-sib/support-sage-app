# Support Sage App

This repository hosts an ML-driven tool designed to offer support ticket suggestions. It utilizes machine learning models and Flask as the backend application.

## Prerequisites

- [docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Run the following command to run and build container images.
```
cd support-sage
make build
```

2. Run the following to UP the docker containers.
```
make run
```

3. By default the app will run `7007` port
```
Ex. URL - 0.0.0.0:7000/summarise
```