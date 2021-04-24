# applicants
Hi,<br/>
in server:<br/>

configuration for MySQL db:<br/>
https://github.com/mar1n/applicants/blob/main/server/config/db.config.js<br/>
connect to MySQL:<br/>
https://github.com/mar1n/applicants/blob/main/server/config/db.js<br/>

we need to create 2 tables.<br/>
applicant for Create, Read, Update, Delete:<br/>
https://github.com/mar1n/applicants/blob/main/server/config/testmysql_applicants.sql<br/>
users: registration new user, login, authentication<br/>
After registarion you have role subscriber and you don't have access.<br/>
So you need to change in database manualy form subscriber to admin.<br/>
**Inside users table is my demo account**<br/>
email: cykcykacz@gmail.com<br/>
password: asdasdasdasda<br/>
https://github.com/mar1n/applicants/blob/main/server/config/testmysql_users.sql<br/>

Models of tables:<br/>
https://github.com/mar1n/applicants/blob/main/server/models/mysqlUsers.js<br/>
https://github.com/mar1n/applicants/blob/main/server/models/mysqlApplicants.js<br/>

All End points:<br/>
https://github.com/mar1n/applicants/blob/main/server/controllers/auth.js<br/>

Hope this is enough information provide.<br/>
If not pls send me email szym0nd4widowicz@gmail.com<br/>
