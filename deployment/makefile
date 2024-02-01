NODE_VERSION=v20.10.0
use-node: ## Uses nodejs version v20.10.0
	@ if [ -s "$$HOME/.nvm/nvm.sh" ]; then \
        . "$$HOME/.nvm/nvm.sh"; \
        nvm use $(NODE_VERSION); \
    else \
        echo "nvm is not installed. Please install nvm (Node Version Manager) to continue."; \
    fi

#### For Containerization, use the following commands
container-up: ## Builds and Containerizes all services
	@ docker-compose up -d 
container-build: ## Builds the images only
	@ docker-compose build
container-down: ## Destroys all containers
	@ docker-compose down

clone-all-project-bash:
	@ chmod +x ./scripts/clone-all-repos.sh
	@ ./scripts/clone-all-repos.sh
clone: ## Clone all repositories
	@ make clone-all-project-bash

make-script:
	@ chmod +x ./scripts/provisioner.sh
	@ ./scripts/provisioner.sh
automate:
	@ make use-node
	@ make make-script