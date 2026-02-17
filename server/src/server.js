import 'dotenv/config';
import express from "express";
import connectDB from './config/mongoose.js';
import Routes from './routes/index.js'
import cors from "cors";

//swagger
import { swaggerUi, swaggerDocument } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Task Manager API Documentation",
  customfavIcon: "/favicon.ico"
}));
app.use('/',Routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Task Manager API',
    documentation: '/api-docs'
  });
});

connectDB()
.then(
  app.listen(PORT, () => {
  console.log(`<-------------------------------------------------->Server running on port ${PORT}`);
}))
.catch((error)=>{console.log('Connection Failed');})
.finally(()=>{console.log('Here we Go!');})

export default app