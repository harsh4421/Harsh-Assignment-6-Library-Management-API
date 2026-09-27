const swaggerJsdoc=require('swagger-jsdoc');
const options={definition:{openapi:'3.0.0',info:{title:'Harsh Library Management API',version:'1.0.0',description:'Library catalogue, authentication, borrowing, returns, transactions and user administration.'},servers:[{url:'/api'}],components:{securitySchemes:{bearerAuth:{type:'http',scheme:'bearer',bearerFormat:'JWT'}}}},apis:['./docs/swagger.js']};
module.exports=swaggerJsdoc(options);
