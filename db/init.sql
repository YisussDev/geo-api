SELECT 'CREATE DATABASE test_database'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test_database')\gexec