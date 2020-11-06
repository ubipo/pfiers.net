#!/bin/bash

cd .presite
find . -type f -name "*.html" -exec sed -E -i 's/http:\/\/(content.local|dist.local|localhost):8000/https:\/\/pfiers.net/g' {} +
