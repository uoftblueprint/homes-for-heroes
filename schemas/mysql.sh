#!/bin/bash
echo "CREATE DATABASE IF NOT EXISTS homes_for_heroes;" >  /mainschema.sql
echo "USE homes_for_heroes;" >>  /mainschema.sql
echo "ALTER USER root@localhost IDENTIFIED WITH caching_sha2_password BY '$MYSQL_ROOT_PASSWORD';">>  /mainschema.sql
echo "CREATE USER IF NOT EXISTS '$MYSQL_USER'@'%' IDENTIFIED WITH caching_sha2_password BY '$MYSQL_PASSWORD';" >> /mainschema.sql

echo "GRANT ALL PRIVILEGES ON homes_for_heroes.* to  '$MYSQL_USER'@'%' ;" >>  /mainschema.sql
echo "USE homes_for_heroes;" >>  /mainschema.sql
echo "FLUSH PRIVILEGES;" >>  /mainschema.sql

echo "USE homes_for_heroes;" >>  /mainschema.sql


cat admin_client_schema.sql >> /mainschema.sql
cat user_schema.sql >> /mainschema.sql
cat chapters_schema.sql >> /mainschema.sql
cat custom_form_schemas.sql >> /mainschema.sql
cat external_relations_schema.sql >> /mainschema.sql
#cat sample_schema.sql >> /mainschema.sql


if  [ -d  "/var/lib/mysql"  ]; then 
    mysqld --initialize
    mysqld --user=root  --init-file="/mainschema.sql"

else 
    mysqld  --user=root --init-file="/mainschema.sql"

fi