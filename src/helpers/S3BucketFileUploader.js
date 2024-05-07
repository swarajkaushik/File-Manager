const AWS = require("aws-sdk");
const fsPromise = require("fs").promises;
const axios = require("axios");
require("dotenv").config();
const aws_bucket_name = process.env.AWS_BUCKET_NAME;
const aws_access_key = process.env.AWS_ACCESS_KEY;
const aws_secret_access_key = process.env.AWS_SECRET_KEY;

class S3BucketFileUploader {
  s3Bucket = new AWS.S3({
    accessKeyId: aws_access_key,
    secretAccessKey: aws_secret_access_key,
  });

  async upload(multerFileObject, clientFolderName, objectTypeFolderName) {
    if (multerFileObject && Object.keys(multerFileObject).length > 0) {
      const fileContent = await fsPromise.readFile(multerFileObject.path);
      const bucketNameWithFolderName = `${aws_bucket_name}/${clientFolderName}/${objectTypeFolderName}`;
      const params = {
        Bucket: bucketNameWithFolderName,
        Key: multerFileObject.filename,
        Body: fileContent,
        CreateBucketConfiguration: {
          LocationConstraint: process.env.aws_region,
        },
      };
      const result = await this.s3Bucket
        .upload({ ...params, ContentType: multerFileObject.mimetype })
        .promise();
      return result;
    }
    return null;
  }

  async uploadFromlocal(
    fileContent,
    clientFolderName,
    objectTypeFolderName,
    filename,
    mimeType
  ) {
    // const fileContent = await fsPromise.readFile(filepath);
    const bucketNameWithFolderName = `${config.get(
      "aws.bucket_name"
    )}/${clientFolderName}/${objectTypeFolderName}`;
    const params = {
      Bucket: bucketNameWithFolderName,
      Key: filename,
      Body: fileContent,
      CreateBucketConfiguration: {
        LocationConstraint: process.env.aws_region,
      },
    };
    const result = await this.s3Bucket
      .upload({ ...params, ContentType: mimeType })
      .promise();
    return result;
  }

  async uploadFromLink(url, clientFolderName, objectTypeFolderName, fileName) {
    try {
      if (url) {
        const fileContent = await axios.get(url, {
          responseType: "arraybuffers",
        });
        axios
          .get(url, { responseType: "arraybuffer" })
          .then(async (fileContent) => {
            const mimetype = fileContent.headers["content-type"];
            const bucketNameWithFolderName = `${config.get(
              "aws.bucket_name"
            )}/${clientFolderName}/${objectTypeFolderName}`;
            const params = {
              Bucket: bucketNameWithFolderName,
              Key: fileName,
              Body: fileContent.data,
              CreateBucketConfiguration: {
                LocationConstraint: process.env.aws_region,
              },
            };
            const result = await this.s3Bucket
              .upload({ ...params, ContentType: mimetype })
              .promise();
            return result;
          })
          .catch((error) => {
            if (error.response) {
              console.error(
                "Request failed with status code:",
                error.response.status
              );
            } else {
              console.error("Request failed:", error.message);
            }
          });
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  async buildProfilePhotoS3URL(clientName, fileName) {
    const fileUrl = await this.buildS3ObjectURL(
      clientName,
      config.get("aws.folders.profile_photo"),
      fileName
    );
    return fileUrl;
  }

  //   async buildBusinessLogoS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.business_logo"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildJobDescriptionS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.job_description"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildfeedbackFileS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.feedback_file"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildResumeS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.resume"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildExitFormS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.exit_forms"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildCARFileS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.car_files"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildPanCardS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.pan_card"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildResumeOldS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.resume_old"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildFileS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.customFieldFiles"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildSupportFileS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.user_support"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }

  //   async buildReportS3URL(clientName, fileName) {
  //     const fileUrl = await this.buildS3ObjectURL(
  //       clientName,
  //       config.get("aws.folders.reports"),
  //       fileName
  //     );
  //     return fileUrl;
  //   }
  //   async buildS3ObjectURL(clientName, objectTypeFolderName, fileName) {
  //     if (fileName) {
  //       return `${config.get(
  //         "aws.s3_url"
  //       )}/${clientName}/${objectTypeFolderName}/${fileName}`;
  //     }
  //     return null;
  //   }

  //   async generatePdfAndUploadToS3(htmlString, bucketName, objectKey) {
  //     const browser = await puppeteer.launch();
  //     const page = await browser.newPage();

  //     // Set content to HTML string
  //     await page.setContent(htmlString);

  //     // Generate PDF from the HTML content
  //     const pdfBuffer = await page.pdf();

  //     // Upload PDF to S3
  //     const params = {
  //       Bucket: bucketName,
  //       Key: objectKey,
  //       Body: pdfBuffer,
  //       ContentType: "application/pdf",
  //     };

  //     try {
  //       const result = await this.s3Bucket.upload(params).promise();
  //       // console.log("PDF uploaded to S3:", result.Location);
  //       return result.Location;
  //     } catch (error) {
  //       // console.error("Error uploading PDF to S3:", error);
  //       throw error;
  //     } finally {
  //       await browser.close();
  //     }
  //   }
}

export default () => new S3BucketFileUploader();
