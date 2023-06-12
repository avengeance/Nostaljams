import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS_SONGS = {'mp3'}
ALLOWED_EXTENSIONS_IMAGES = {'jpg','png','jpeg'}

s3 = boto3.client(
    "s3",
    aws_access_key_id = os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)

def if_allowed_songs(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS_SONGS

def if_allowed_image(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS_IMAGES

def file_unique_name(filename):
    ext = filename.rsplit(".",1)[1].lower()
    unique_name = uuid.uuid4().hex
    return f'{unique_name}.{ext}'

def upload_S3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL":acl,
                "ContentType":file.content_type    
            }
        )
    except Exception as e:
        return {"errors":str(e)}
    
    return {"url":f"{S3_LOCATION}{file.filename}"}