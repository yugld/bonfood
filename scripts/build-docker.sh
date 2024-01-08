#!/bin/bash
export DOCKER_CLI_EXPERIMENTAL=enabled
docker buildx create --use
docker buildx build --platform linux/amd64,linux/amd64/v2,linux/amd64/v3,linux/arm64,linux/386,linux/arm/v7,linux/arm/v6 -t initkz/init-wp:latest --push -f ./docker/Dockerfile .
