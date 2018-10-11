module.exports = {
    environment: 'development',
    port:'4009',
    protocol : 'http',
    TAG: "development",
    mongo: {
        dbName: 'soLow',
        dbUrl: 'mongodb://localhost:27017/',
        options: {
        }
    },
    user_secret:'user_secret',
    admin_secret:'admin_secret',
    cloudinary_key:'cloudinary_key',
    cloudinary_secret:'cloudinary_secret',
    cloudinary_name:'cloudinary_name',
    cloudinary_env_variable:'cloudinary_env_variable',
    cloudinary_upload_url:'cloudinary_upload_url',
    isDev:true
};
