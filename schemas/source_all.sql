-- SOURCE THIS FILE WITHIN PWD homes-for-heroes/schemas
-- Run sql command `source ./source_all.sql`
DROP DATABASE IF EXISTS homes_for_heroes;
CREATE DATABASE homes_for_heroes;
source ./admin_client_schema.sql;
USE homes_for_heroes;
source ./user_schema.sql;
source ./chapters_schema.sql;
source ./custom_form_schemas.sql;
source ./external_relations_schema.sql;
source ./sample_schema.sql;
