# Variables
IMAGE_NAME = support-sage-docker
CONTAINER_NAME = support-sage-container
PORT = 8091

.PHONY: build run stop clean

# Build Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run Docker container
run:
	docker run -d -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Stop Docker container
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

# Clean up Docker images
clean:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME) || true
