alter role postgres password 'password';
create database post_db with owner postgres;
\c post_db postgres;