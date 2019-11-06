#!python3
import boto3
from os import environ, listdir, path

bucket = environ['AWS_S3_BUCKET']

dist_files = [f for f in [path.join('dist', f) for f in listdir('dist')] if path.isfile(f)]
to_upload = ['index.html', *dist_files]
S3 = boto3.client('s3')
for file in to_upload:
  print(f'uploading {file}')
  S3.upload_file(file, bucket, file)