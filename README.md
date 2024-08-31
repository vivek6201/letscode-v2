<h2 align="center">LETS CODE</h2>

- Techstack Used
  - NextJS
  - Prisma
  - Shadcn UI (For styling)
  - PostgreSQL - (But you can say that it has Some NoSQL tendencies)
  - NextAuth
  
- What is this project all about
  - All this content delivery platform and the code structure is litle bit inspired from CMS Reposity of code100x.
  - Currently this platform supports tutorials in form of books with multiple chapters.
  - Slowly thinking of expanding to course as well.
 
- Working part of the code till now
  - Admin panel where you can create the tutorial
  - user side where you can read tutorial
  - Authentication and Authorization

- Pending Work
    - Searching Functionality
    - Implementing Dockerfile and docker-compose as well.

## HOW TO SETUP

1. Clone the Repository
   ```bash
   git clone https://github.com/vivek6201/letscode-v2.git
   ```
2. Install dependencies with
   ```bash
   yarn install
   ```
3. Copy .env.example to .env
   ```bash
   cp .env.example .env
   ```
4. Paste your DB URL in .env:
   - Either get from any provider
   - or start a local instance using docker
     ```bash
       docker volume create lets-code-volume
       docker run -d -p 5432:5432 --name lets-code -v lets-code-volume -e POSTGRES_PASSWORD=mysecretpass postgres 
     ```
5. Migrate your database
  ```bash
   npx prisma migrate dev
   ```
6. finally run app with 
   ```bash
   yarn dev
   ```
<br/>
<h2 align="center">HOPE YOU WILL LIKE MY WORK</h2> 
  

