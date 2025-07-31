# Jobsearch Application

## Overview
This application is designed to provide meaningful job search functionality by integrating external APIs to fetch and display relevant job data. It offers users the ability to interact with the data through sorting, filtering, and searching, ensuring a practical and valuable user experience.

---
APP link
https://enock04.github.io/job-search-app/

## Docker Image Details
- **Docker Hub Repository:** https://hub.docker.com/r/ntwari30/jobsearch
- **Image Name:** ntwari30/jobsearch
- **Tags:** v1


## Build Instructions
To build the Docker image locally, navigate to the project directory containing the Dockerfile and run:

bash
docker build -t ntwari30/jobsearch:v1 .



## Run Instructions on Web01 and Web02
SSH into each web server and execute the following commands to pull and run the Docker image:

 bash
docker pull ntwari30/jobsearch:v1
docker run -d --name app --restart unless-stopped -p 8081:80 ntwari30/jobsearch:v1


This maps the container's internal port 80 to the host's port 8081.



## Load Balancer Configuration (HAProxy)

To distribute traffic between Web01 and Web02, update the HAProxy configuration (`/etc/haproxy/haproxy.cfg`) with the following backend configuration:


backend webapps
    balance roundrobin
    server web01 172.20.0.11:8081 check
    server web02 172.20.0.12:8081 check


Reload HAProxy to apply changes:

 bash
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'

 


## Testing Steps & Evidence

- Access the application via the load balancer URL multiple times.
- Verify that requests are distributed alternately between Web01 and Web02.
- Navigate through all pages and sections, interacting with links, buttons, and inputs to ensure expected behavior.
- Use `curl` or browser developer tools to confirm round-robin load balancing:

bash
curl http://load-balancer-url


Repeat the request multiple times to observe responses from different backend servers.

- Capture screenshots or logs demonstrating balanced traffic distribution.



## Hardening and Security

- **Handling Secrets:** Do not bake API keys or sensitive information into the Docker image.
- Use environment variables to pass secrets at runtime:

bash
docker run -d --name app --restart unless-stopped -p 8081:80 -e API_KEY=your_api_key ntwari30/jobsearch:v1
```

- For production environments, consider using Docker secrets or external secret management tools to securely manage sensitive data.



## Application Features

- Integrates external APIs to fetch real-time job data.
- Provides user-friendly interaction with data including sorting, filtering, and searching.
- Robust error handling to manage API downtime or invalid responses gracefully.
- Responsive and intuitive UI built with HTML, CSS, and JavaScript.

---

## Credits

- External APIs used are credited within the application and documentation.
- Thanks to the API developers and open-source communities for their valuable resources.

---

## Demo Video

A short demo video (under 2 minutes) is available showcasing:

- Local application usage.
- Deployment on Web01 and Web02.
- Load balancer configuration and traffic distribution.
- Key features and user interactions.






