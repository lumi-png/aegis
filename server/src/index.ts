import express from 'express';
import router from './routes/index';
import { errorHandler } from './middleware/errorHandler.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
