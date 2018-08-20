psql -U postgres -c "DROP DATABASE IF EXISTS api;"
psql -U postgres -c "CREATE DATABASE api;"
psql -U postgres -c "DROP DATABASE IF EXISTS test;"
psql -U postgres -c "CREATE DATABASE test;"