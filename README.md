# lila language data collection app

a node.js application for collecting and processing language data to support my flashcard application. it also serves as a learning opportunity to explore various technologies:

- javascript
- typescript
- testing
- web scraping
- git
- sql
- ci/cd

## core requirements

### functional requirements
- process source json files containing word lists (e.g., adjectives, nouns)
- fetch word attributes depending on word type
- store processed data in supabase
- support multiple word types (adjectives, nouns, etc.)

### technical requirements
- all code written in typescript
- minimum 80% test coverage
- robust error handling and logging
- rate limiting for external api calls
- data validation to ensure input integrity
- local data caching for performance
- automated ci/cd pipeline for deployment

## quality standards
- eslint + prettier: enforce consistent code formatting and quality
- git hooks (husky): pre-commit checks to prevent errors from entering the repository
- documentation: basic overview for the project's scope and commands
- error reporting and monitoring: ensure issues are visible
- performance metrics: monitor and optimize processing times

### Project Structure

src/
├── core/
├── services/
├── types/
├── utils/
├── config/
└── tests/

data/
├── source/
├── processed/
└── cache/

## development roadmap

### phase 1: setup & core infrastructure

1. **project initialization**
   - initialize the project and create `package.json`.
   - add basic metadata like name, version, and author.
   - define core scripts: `dev`, `build`, and `start`.

2. **typescript setup**
   - configure `tsconfig.json` for strict type checking and clear output structure.
   - set the `rootdir` to `./src` and the `outdir` to `./dist`.

3. **directory structure**
   - create folders for `adjectives`, `utils`, `data`, and `types`.
   - ensure logical separation of functionality for easy navigation.

4. **dependency installation**
   - install essential libraries for functionality:
     - `chalk`, `axios`, `dotenv`, `@supabase/supabase-js`, `papaparse`, `cheerio`.
   - install dev dependencies for development and testing:
     - `typescript`, `eslint`, `jest`, and related tools.

5. **eslint and prettier setup**
   - configure eslint for consistent code quality.
   - add prettier for automatic code formatting.
   - integrate linting and formatting scripts in `package.json`.

6. **supabase integration**
   - set up the supabase client with environment variables for credentials.
   - create `.env` file to store sensitive configuration values.

7. **basic functionality**
   - implement core utilities for word processing:
     - fetching word attributes (inflections, ipa, syllabifications, translations).
     - uploading processed data to supabase.
     - reading and syncing local data.

8. **testing framework**
   - install and configure jest for typescript testing.
   - write basic tests to verify utility functions.

9. **ci/cd pipeline**
   - configure a github actions workflow to automate:
     - code linting.
     - running tests.
     - building the project.

10. **documentation**
    - update `readme.md` with:
      - core requirements.
      - commands to run the app (install, build, start, test).
      - basic usage instructions.

### phase 2: core features
- implement a word processing pipeline
- integrate with external apis for data fetching
- develop mechanisms for data storage in supabase

### phase 3: quality & optimization
- add comprehensive error handling and logging
- implement rate limiting to manage api usage effectively
- introduce caching to improve efficiency

### phase 4: expansion
- extend support for additional word types
- add support for more languages
- focus on performance improvements and scalability

## tech stack
- node.js (v23)
- typescript (v5+)
- jest for testing
- eslint + prettier
- supabase for database and storage
- github actions for ci/cd

