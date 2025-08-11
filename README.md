HormonalCare - AI

Este proyecto es una demo de una aplicación web desarrollada con Next.js, orientada al monitoreo y gestión del cuidado hormonal (“HormonalCare-AI”). Utiliza Firebase como backend para autenticación, almacenamiento y manejo de datos, y emplea herramientas modernas para facilitar el desarrollo y la escalabilidad.

## Descripción

HormonalCare-AI está diseñado como un asistente de historias clínicas, donde los datos utilizados son completamente estáticos y simulados por inteligencia artificial (IA). La aplicación implementa un chat donde Gemini actúa como el motor de IA, empleando RAG (Retrieval-Augmented Generation) sobre los datos simulados de las historias clínicas para responder las consultas del usuario de forma contextual.

Entre las funcionalidades principales se encuentran:
- Chat de asistente de historias clínicas, con respuestas basadas únicamente en datos simulados.
- Implementación de Gemini como modelo de IA, usando RAG sobre los datos estáticos.
- Guardrail básico para evitar que el modelo genere contenido no deseado, como recomendaciones médicas, diagnósticos o cualquier información fuera del alcance permitido.
- Autenticación de usuarios con Firebase.
- Interfaz responsiva y moderna desarrollada con Next.js.
- Integración con servicios de Google y Firebase para backend y despliegue.

> **Nota:** Esta aplicación es solo una demo y no debe usarse para ningún propósito médico. Todas las respuestas del asistente se generan únicamente a partir de datos simulados y con restricciones para evitar alucinaciones o contenido sensible.

Para comenzar, revisa el archivo `src/app/page.tsx`.
