# Deploying a Node.js Application on AWS EC2

My first Node.js project, built and deployed on an AWS EC2 instance —
by Abdul Basit Hansi. The live page shows what I'm currently learning
and highlights popular services in the AWS ecosystem.

## Testing the project locally

1. Clone this project

```
git clone https://github.com/abdulbasithansi/aws-first-deploy.git
```

2. Setup the following environment variables - `(.env)` file

```
DOMAIN=""
PORT=3000
STATIC_DIR="./client"

PUBLISHABLE_KEY=""
SECRET_KEY=""
```

3. Initialise and start the project

```
npm install
npm run start
```

Visit `http://localhost:3000` to see it running.

## Set up an AWS EC2 instance

1. Create an IAM user & login to your AWS Console
   * Access Type - Password
   * Permissions - Admin
2. Create an EC2 instance
   * Select an OS image - Ubuntu
   * Create a new key pair & download `.pem` file
   * Instance type - t2.micro
3. Connecting to the instance using ssh

```
ssh -i instance.pem ubuntu@<IP_ADDRESS>
```

## Configuring Ubuntu on remote VM

1. Updating the outdated packages and dependencies

```
sudo apt update && sudo apt upgrade -y
```

2. Install Git - [Guide by DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-22-04)
3. Configure Node.js and `npm` - [Guide by DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)

## Deploying the project on AWS

1. Clone this project in the remote VM

```
git clone https://github.com/abdulbasithansi/aws-first-deploy.git
```

2. Setup the following environment variables - `(.env)` file

```
DOMAIN=""
PORT=3000
STATIC_DIR="./client"

PUBLISHABLE_KEY=""
SECRET_KEY=""
```

For this project, we'll have to set up an [Elastic IP Address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)
for our EC2 instance & that would be our `DOMAIN`.

3. Initialise and start the project

```
npm install
npm run start
```

**NOTE** - Edit the inbound rules in the security group of the EC2 instance
to allow traffic on the port the app listens on (`3000` by default, or `80`
if you put it behind Nginx).

### Optional: keep the app running after you disconnect

SSH sessions die when you close your terminal, and the Node process dies
with them unless it's managed by something else.

```
sudo npm install -g pm2
pm2 start server.js --name aws-first-deploy
pm2 save
pm2 startup
```

### Optional: run it with Docker instead

```
docker build -t aws-first-deploy .
docker run -d -p 3000:3000 --env-file .env aws-first-deploy
```

## Project structure

```
.
├── client/
│   ├── assets/         # Static assets (logo, images)
│   ├── css/
│   │   └── style.css   # Site styling
│   ├── workshops/
│   │   └── index.html  # Notes on workshops/resources followed
│   ├── app.js           # Client-side JS (fetches /api/* data)
│   ├── cancel.html       # Generic "cancelled" page
│   ├── index.html        # Landing page - About, Learning, Trending, Deploy
│   └── success.html      # Generic "success" page
├── node_modules/         # Installed dependencies (gitignored)
├── .env                  # Environment variables (gitignored)
├── .gitignore
├── Dockerfile
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── server.js              # Express server + small JSON API
```

## What this page shows

- **About Me** - a short introduction to Abdul Basit Hansi
- **What I'm Learning** - EC2, security groups, SSH, environment variables,
  keeping a process alive, Elastic IPs, reverse proxies and Docker
- **Popular in the AWS World** - EC2, S3, Lambda, RDS, CloudFront, IAM,
  Route 53, ECS/EKS
- **How This Got Deployed** - a simplified terminal walkthrough of the
  actual deployment steps

Project is deployed on AWS 🎉
