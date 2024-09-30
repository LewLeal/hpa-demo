# HPA Demo en Kubernetes

Este proyecto es una demostración del uso del **Horizontal Pod Autoscaler (HPA)** en Kubernetes. El HPA permite escalar automáticamente el número de réplicas de una aplicación basada en el uso de recursos, como la CPU. Aquí se detalla cómo configurar y probar el HPA usando una aplicación Node.js simple en un cluster local de Minikube.

## Índice
1. [Requisitos previos](#requisitos-previos)
2. [Pasos para configurar el proyecto](#pasos-para-configurar-el-proyecto)
    - [1. Crear la aplicación Node.js](#1-crear-la-aplicación-nodejs)
    - [2. Construir y publicar la imagen Docker](#2-construir-y-publicar-la-imagen-docker)
    - [3. Crear los manifiestos de Kubernetes](#3-crear-los-manifiestos-de-kubernetes)
    - [4. Desplegar la aplicación y el servicio](#4-desplegar-la-aplicación-y-el-servicio)
    - [5. Configurar el Horizontal Pod Autoscaler](#5-configurar-el-horizontal-pod-autoscaler)
3. [Pruebas y monitoreo del HPA](#pruebas-y-monitoreo-del-hpa)
4. [Conclusiones y próximos pasos](#conclusiones-y-próximos-pasos)

## Requisitos previos
- Tener instalado [Docker](https://www.docker.com/) y [Minikube](https://minikube.sigs.k8s.io/docs/start/).
- Conocimientos básicos de Kubernetes y Docker.
- Una cuenta en [Docker Hub](https://hub.docker.com/) para subir la imagen Docker.

## Pasos para configurar el proyecto

### 1. Crear la aplicación Node.js
1. Crea un archivo llamado `server.js` que contenga una aplicación Node.js simple para generar carga en la CPU.

### 2. Construir y publicar la imagen Docker
1. Crea un archivo `Dockerfile` para construir la imagen Docker de tu aplicación.
2. Construye la imagen usando el comando:

    ```bash
    docker build -t <your-docker-username>/hpa-demo:latest .
    ```

3. Publica la imagen en Docker Hub:

    ```bash
    docker push <your-docker-username>/hpa-demo:latest
    ```

### 3. Crear los manifiestos de Kubernetes
1. Crea un archivo `deployment.yaml` para definir el despliegue de tu aplicación en el cluster de Kubernetes.
2. Crea un archivo `service.yaml` para exponer la aplicación mediante un servicio de tipo `LoadBalancer`.

### 4. Desplegar la aplicación y el servicio
1. Despliega la aplicación usando el manifiesto del despliegue:

    ```bash
    kubectl apply -f deployment.yaml
    ```

2. Crea el servicio ejecutando:

    ```bash
    kubectl apply -f service.yaml
    ```

3. Obtén la URL del servicio para acceder a la aplicación:

    ```bash
    minikube service hpa-demo --url
    ```

### 5. Configurar el Horizontal Pod Autoscaler
1. Habilita el servidor de métricas en Minikube:

    ```bash
    minikube addons enable metrics-server
    ```

2. Crea un archivo `hpa.yaml` para configurar el HPA y establecer los valores mínimos, máximos y el umbral de CPU para el escalado.
3. Aplica el manifiesto del HPA:

    ```bash
    kubectl apply -f hpa.yaml
    ```

## Pruebas y monitoreo del HPA

1. Genera tráfico en la aplicación para activar el escalado automático:

    ```bash
    while true; do curl http://<minikube-url>; done
    ```

2. Monitorea el estado del HPA en tiempo real:

    ```bash
    kubectl get hpa -w
    ```

3. Verifica cómo Kubernetes escala el número de pods:

    ```bash
    kubectl get pods -w
    ```

## Conclusiones y próximos pasos
Este proyecto muestra cómo configurar un `Horizontal Pod Autoscaler` en Kubernetes para ajustar automáticamente las aplicaciones según la carga.
 🎓
## Exitos L3