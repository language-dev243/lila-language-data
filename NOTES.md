# Notes

- app permanently runs, listens to port xxxx
- local test postgres database, in sync with supabase
- dev app connects to local db, prod app to supabase

---

Next tasks:

1. Configure GitHub Actions for CI Testing

To configure GitHub Actions for CI testing, create a workflow file in the .github/workflows directory of your project. This workflow should automatically run tests on every push or pull request to specific branches. Include steps to install dependencies, set up the testing environment, and execute your test suite. Use secrets for sensitive data like API keys or database credentials.

Documentation: GitHub Actions - CI/CD Workflow

https://docs.github.com/en/actions/using-workflows

---

2. Create Docker Test Environment

Design a Docker environment specifically for testing. Create a new Dockerfile stage or a separate file that installs test dependencies and sets NODE_ENV=test. Update docker-compose.yml to include a service for testing, ensuring it mimics the production environment while allowing fast, repeatable tests.

Documentation: Dockerizing Applications

https://docs.docker.com/samples/

---

3. Set Up Test Containers

Add containers to your docker-compose.yml for running isolated tests. Ensure the test containers include required services like the database, caching layers, or any external dependencies. Configure dependencies and networking so the test containers can communicate seamlessly.

Documentation: Docker Compose Networking

https://docs.docker.com/compose/networking/

---

4. Configure Test Database Container

Set up a dedicated database container for testing. Initialize it with mock or seed data specific to test scenarios. Ensure the database container is configured for persistence during test runs but cleans up between sessions. Use environment variables to point the application to the test database.

Documentation: PostgreSQL Docker Setup

https://hub.docker.com/_/postgres

---

5. Implement Integration Test Environment

Develop an integration test environment where services, including the database, APIs, and other dependencies, can be tested together. Use tools like Jest to write integration tests that simulate real-world scenarios. Run these tests in the Dockerized test environment to ensure compatibility and reliability.

Documentation: Jest Integration Testing Guide

https://jestjs.io/docs/testing-frameworks

---

Phase 2: Core Infrastructure (Weeks 3-4)

---

6. Set Up Local PostgreSQL Database for Development

Install and configure PostgreSQL locally or as a Docker container for development. Create a development database and set up connection credentials in .env files. Configure the application to use this database during local development.

Documentation: PostgreSQL Documentation

---

7. Create Database Connection Configuration for Dev/Prod Environments

Create a centralized configuration for managing database connections. Use environment-specific settings to determine which database (development, production, or testing) the application connects to. Avoid hardcoding credentials and rely on .env files.

Documentation: Node.js PostgreSQL Guide

---

8. Implement Environment-Based Database Switching

Enable dynamic database switching based on the NODE_ENV variable. For example, use the test database when running tests and the development database during local development. Update configuration files to handle this switching seamlessly.

Documentation: dotenv for Environment Variables

---

9. Set Up Supabase Project

Create a project in Supabase and configure it with the necessary tables, schemas, and roles. Retrieve connection details and API keys for integration with your application. Set up a secure storage mechanism for these keys.

Documentation: Supabase Documentation

---

10. Create Database Sync Mechanism Between Local and Supabase

Implement a mechanism to sync your local database schema and data with the Supabase database. Use tools like pg_dump for exporting and psql for importing schemas and data. Automate the process with scripts for ease of use.

Documentation: PostgreSQL pg_dump

---

11. Create Database Schema with TDD Approach

Define your database schema based on test-driven development principles. Write tests that validate the schema, ensuring fields, relations, constraints, and data types meet the application's requirements. Adjust the schema based on test feedback.

Documentation: Database Design Basics

---

12. Write Tests for Database Schema

Write test cases that validate schema elements, including tables, columns, relations, and constraints. Use tools like Jest with database libraries to automate schema testing. Incorporate these tests into your CI pipeline.

Documentation: Jest and Databases

---

13. Define Tables for Adjectives

Plan the structure of the adjectives table. Include fields such as singular/plural forms, gender, translations, and any additional metadata. Ensure the table structure aligns with the requirements of your application.

Documentation: PostgreSQL Table Creation

---

14. Set Up Relations

Define relationships between the adjectives table and other tables. For instance, create a relation between adjectives and translations using foreign keys. Ensure relationships are designed for scalability and data integrity.

Documentation: PostgreSQL Table Relationships

---

15. Create Indexes

Add indexes to frequently queried columns, such as singular_masculine or plural_masculine. This will optimize database query performance, especially for large datasets.

Documentation: PostgreSQL Indexing Guide

---

16. Configure Database Access

Set up roles and permissions for the database. Create separate roles for development, testing, and production environments to enforce security best practices. Use connection pooling for efficient database access.

Documentation: PostgreSQL Role Management

---

17. Set Up Environment Variables

Define environment variables for database connection strings, API keys, and other sensitive information in .env files. Ensure these variables are securely loaded and not hardcoded in the application.

Documentation: dotenv

---

18. Create Database Migration Scripts

Use a migration tool like knex or sequelize-cli to manage schema changes. Write scripts to add, modify, or remove database objects. Store these migration files in version control for traceability.

Documentation: Knex Migrations

---

19. Set Up Database Container

Create a database container using Docker. Configure it with volumes for persistent data storage. Use the same container configuration for development, testing, and integration tests for consistency.

Documentation: Docker PostgreSQL Setup

---

20. Configure Persistence Volume

Attach a volume to the database container for storing data persistently. This ensures data is not lost when the container restarts. Use named volumes in your Docker configuration.

Documentation: Docker Volumes

---

21. Set Up Backup Container

Add a service in docker-compose.yml to automate database backups. Use PostgreSQL tools like pg_dump to create backups and store them in a volume or external storage. Schedule regular backups for critical data.

Documentation: PostgreSQL Backup and Restore

---

22. Implement Health Checks

Configure health checks for your database container to monitor its availability. Use pg_isready to ensure the database is responsive. Integrate these checks into your container orchestration platform for automated recovery.

Documentation: PostgreSQL pg_isready

---

Each point now provides a detailed description of what to do to complete the task, along with a link to the relevant documentation. Let me know if you need more assistance!
