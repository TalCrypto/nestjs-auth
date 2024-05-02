export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        dbName: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        synchronize: process.env.IS_SYNC,
    },
    jwtAuth: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10
    }
  });