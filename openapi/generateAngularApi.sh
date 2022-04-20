#!/bin/sh

version="5.3.1"

if [ ! -f openapi-generator-cli.jar ]; then
        wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$version/openapi-generator-cli-$version.jar -O openapi-generator-cli.jar
fi

if [ -e "$1" ] && [ -e "$2" ]; then
	java -jar openapi-generator-cli.jar generate -i $1 -c $2 -l typescript-angular -o ../src/app/api
else 
	echo "Path to Swagger-File or Config-File is missing"
	echo "Trying default path..."
	export config="config.json"
	export openapi="openapi.json"

    if [ -e "$openapi" ] && [ -e "$config" ]; then
        java -jar openapi-generator-cli.jar generate -i $openapi -c $config -g typescript-angular -o ../src/app/api

    else
        echo "Error - No Swagger-File or Config-File found"
    fi
fi
