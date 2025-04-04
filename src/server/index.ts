import dotenv from 'dotenv';
dotenv.config();

import connection from './DB/connect';
import app from './modules/serverExpress';

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connection(); 
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
    }
};

startServer();