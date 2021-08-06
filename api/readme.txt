npm install
npm run dev -> start Your app
npm run build -> build Your app


# Web Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  POST   | /auth  
  GET    | /project
  GET    | /projectuser
  GET    | /task
  GET    | /mytask  
+--------+-------------------------+

# API Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+  
  POST   | /auth/register
  POST   | /api/login  
  GET    | /project
  POST   | /project/add
  GET    | /project/view/:id
  GET    | /project/delete/:id
  POST   | /project/update
  GET    | /projectuser
  POST   | /projectuser/add
  GET    | /projectuser/view/:id  
  POST   | /projectuser/update
  GET    | /task
  POST   | /task/add
  GET    | /task/view/:id  
  POST   | /task/update
  GET    | /mytask 
  POST   | /mytask/statusupdate

+--------+-------------------------+