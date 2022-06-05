FROM mysql:8
COPY . .

RUN chmod -R +x ./mysql.sh ./docker-entrypoint-initdb.d/ ./init.sh

RUN ./mysql.sh

ADD ./mainschema.sql ./docker-entrypoint-initdb.d

ENTRYPOINT ./init.sh