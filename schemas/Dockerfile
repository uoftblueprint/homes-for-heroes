FROM mysql:8
COPY . .

RUN chmod +x ./mysql.sh

RUN ./mysql.sh

ADD ./mainschema.sql ./docker-entrypoint-initdb.d