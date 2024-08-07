

# Memoria Técnica: Comparador de Países

https://comparadordepaises.netlify.app/

## 1. Introducción

### 1.1 Breve introducción al proyecto y su propósito
El "Comparador de Países" es una aplicación web diseñada para proporcionar información sobre las tarifas de cambio de divisas entre diferentes países. Además, incluye una sección de información detallada sobre países y una sección de trivia para mejorar el conocimiento geográfico de los usuarios. Su propósito es ayudar a los usuarios a tomar decisiones informadas sobre tarifas de divisas y ampliar su conocimiento general sobre los países que poseen moneda.

### 1.2 Objetivos del documento y visión general del contenido
Este documento técnico detalla el proceso de creación del "Comparador de Países", incluyendo su concepto, las necesidades que resuelve, los usuarios a los que se dirige, las tecnologías utilizadas, el proceso de desarrollo, evaluación de puntos fuertes y débiles, y las posibles líneas futuras de evolución de la aplicación.

## 2. Descripción del proyecto

### 2.1 Explicación detallada de la aplicación
El "Comparador de Países" permite a los usuarios:

- Comparar, filtrar y ordenar una lista de todos los países que tienen divisa, y compararlos con cualquiera de acuerdo al importe y tarifa elegido por el usuario.
- Acceder a información detallada sobre cada país, incluyendo datos geográficos, económicos y poblacionales.
- Participar en una trivia educativa para poner a prueba y ampliar sus conocimientos sobre las banderas del mundo.

### 2.2 Propósito de la aplicación y la necesidad que resuelve
La aplicación satisface la necesidad común de habitantes de países con inflación, viajeros, empresas y público en general de acceder a información precisa y actualizada sobre tarifas de cambio de divisas. Además, proporciona un componente educativo a través de la trivia, fomentando el aprendizaje interactivo sobre geografía.

## 3. Usuarios objetivo

### 3.1 Descripción de los usuarios
Los usuarios objetivo incluyen:

- Habitantes de países con inflación: Personas que viven en economías inestables y necesitan información actualizada sobre tarifas de cambio para gestionar sus finanzas diarias.
- Viajeros internacionales: Personas que viajan al extranjero y requieren comparar tarifas de cambio, además de información sobre idiomas y geografía de los países que visitarán.
- Empresas: Organizaciones que realizan transacciones financieras internacionales y necesitan datos precisos y actualizados para optimizar sus operaciones.
- Estudiantes y académicos: Individuos interesados en estudios geográficos, estadísticos y económicos que utilizan la aplicación como herramienta educativa.
- Público general: Personas interesadas en aprender de manera interactiva y entretenida sobre diferentes países y sus características económicas y geográficas.

### 3.2 Necesidades específicas
- Viajeros: Buscan tasas de cambio precisas y rápidas, además de información útil sobre los países que visitan.
- Habitantes de países con inflación: Necesitan información clara y precisa sobre el valor de la divisa local para sus transacciones económicas cotidianas.
- Empresas: Requieren datos fiables para optimizar sus operaciones financieras internacionales.
- Académicos y estudiantes: Buscan información detallada y herramientas educativas en geografía, estadística y economía.
- Público general: Busca entretenimiento educativo y conocimientos sobre geografía, estadísticas y economía global.

## 4. Tecnologías y lenguajes utilizados

### 4.1 Lista detallada de tecnologías
- HTML, CSS, JavaScript.
- LocalStorage
- Librería: Bootstrap
- API: Integración con API de tasas de cambio
- JSON
- Visual Studio Code, Git, GitHub

### 4.2 Justificación de la elección de cada tecnología
- **HTML, CSS, JavaScript**: Estas tecnologías fueron elegidas por su eficiencia y capacidad para desarrollar interfaces de usuario dinámicas.
- **LocalStorage**: Se integra para proporcionar almacenamiento local de datos, mejorando la experiencia del usuario al recordar los países favoritos, el país que se está conociendo y la estadística de puntos en la trivia sin depender de un servidor.
- **Librería Bootstrap**: Se seleccionó por su capacidad para acelerar el desarrollo y garantizar una interfaz de usuario responsiva y estéticamente agradable, por sus plantillas, además de sus componentes preestablecidos y estilos CSS.
- **API de tasas de cambio**: La integración con esta API proporciona datos actualizados y precisos sobre las tarifas de cambio de divisas, asegurando que los usuarios puedan realizar comparaciones precisas y relevantes.
- **JSON**: Utilizado para manejar y almacenar datos estructurados de manera eficiente, facilitando la integración con la API de tasas de cambio y el almacenamiento de información sobre los países.
- **Visual Studio Code, Git, GitHub**: Estas herramientas fueron elegidas por su eficiencia y soporte para un desarrollo con registro de versiones. Visual Studio Code ofrece un entorno de desarrollo completo, Git gestiona el control de versiones para un seguimiento preciso de cambios, y GitHub facilita la interfaz gráfica del registro y su distribución.

## 5. Ejecución del sitio web principal

### Acceso al Sitio
1. URL: Ingresa a [https://comparadordepaises.netlify.app/](https://comparadordepaises.netlify.app/) desde tu navegador web.

### Carga Inicial
2. Solicitud de Recursos: El navegador solicita los recursos al servidor de Netlify donde está alojado el sitio.
3. Descarga de Archivos: El servidor responde enviando archivos como index.html, hojas de estilo CSS y archivos JavaScript.

### Interpretación del HTML y Carga de Recursos
4. Interpretación del HTML: El navegador interpreta el HTML y comienza a construir la estructura de la página web.
5. Carga de Estilos y Scripts: Carga las hojas de estilo CSS para el diseño y ejecuta los scripts JavaScript para la funcionalidad interactiva.

### Flujo de Funcionamiento
1. Inicialización de la Aplicación
   - La aplicación se inicia cuando el documento HTML ha sido completamente cargado (DOMContentLoaded).
2. Obtención de Datos
   - Se obtienen datos de países y tarifas de cambio mediante funciones de fetch definidas en módulos separados.
3. Configuración del Estado Inicial
   - Se establece un estado inicial que incluye datos de países por defecto, datos filtrados, favoritos y estadísticas de la trivia.
4. Persistencia de Datos
   - Se utiliza LocalStorage para almacenar y recuperar el estado actual de la aplicación.
5. Actualización y Renderización de Datos
   - Se actualizan las tarifas de cambio y se calculan los importes según los datos de los países.
   - Se renderiza la tabla principal y se actualizan los placeholders según los filtros aplicados.
6. Interfaz de Usuario y Gestión de Eventos
   - Se renderizan elementos como selectores y filtros basados en los datos disponibles.
   - Se configuran eventos para manejar interacciones del usuario como cambios en selectores y clics en botones.
7. Gestión de Eventos
   - Se manejan eventos de ordenación y filtrado de datos para proporcionar una experiencia de usuario personalizada.
8. Persistencia de Estado
   - El estado de la aplicación se guarda automáticamente en LocalStorage para mantener los datos entre sesiones.
9. Interacción del Usuario
   - Una vez cargada completamente la página, los usuarios pueden interactuar con botones, inputs y enlaces.

### Subdirectorios Específicos

#### Subcarpeta /pages/países
- Para acceder a esta subcarpeta, se puede seguir un enlace dentro del sitio principal o ingresar directamente a [https://comparadordepaises.netlify.app/pages/paises](https://comparadordepaises.netlify.app/pages/paises).
- Contiene archivos específicos como HTML, CSS y JavaScript destinados a mostrar información detallada sobre cada país incluyendo datos geográficos, económicos y culturales relevantes.

#### Subcarpeta /pages/trivia
- Se accede mediante un enlace específico dentro del sitio principal o directamente en [https://comparadordepaises.netlify.app/pages/trivia](https://comparadordepaises.netlify.app/pages/trivia).
- Contiene la lógica de la trivia, incluyendo la generación de preguntas, manejo de respuestas y gestión del estado del juego.

## 6. Proceso y calendario de desarrollo

### 6.1 Descripción del proceso de desarrollo
El desarrollo del "Comparador de Países" se llevó a cabo trabajando de manera constante con un mínimo de 4 horas por día. Se planteaban los problemas, se resolvían y luego se refactorizaba el código para mejorarlo. Además, se realizaron revisiones continuas para adaptarse a los cambios y garantizar la calidad del producto final.

### 6.2 Proceso y calendario de desarrollo
- **Inicio del proyecto**: El proyecto inició el 23 de mayo de 2024 con la configuración inicial del repositorio y la definición de la estructura base del proyecto.
- **Desarrollo inicial**: Se llevó a cabo desde el 24 de mayo de 2024 hasta el 1 de julio de 2024, enfocándose en la implementación de la estructura base de la interfaz de usuario y la integración inicial con la API de tasas de cambio.
- **Pruebas y refactorización**: Se realizaron refactorizaciones en el código y pruebas de la aplicación del 14 de junio de 2024 al 3 de julio de 2024. Durante este período, se corrigieron errores identificados y se optimizó tanto la legibilidad del código como el rendimiento de la aplicación.
- **Despliegue**: La versión inicial del sitio se completó el 1 de julio de 2024 en un entorno de producción, listo para su despliegue oficial.

### 6.3 Hitos clave
Durante el desarrollo, se alcanzaron varios hitos importantes

:
- Configuración inicial de la interfaz de usuario.
- Creación de una estructura de código que sea óptima para crecer.
- Integración exitosa de la API de tasas de cambio y REST Countries.
- Implementación de la funcionalidad básica de la trivia.
- Culminación oficial del sitio.

## 7. Implementación y funcionalidades clave

### 7.1 Funcionalidades principales
- Comparación de tarifas de cambio entre países.
- Información detallada sobre cada país.
- Trivia educativa para entretenimiento y aprendizaje.
- Gestión de favoritos y funcionalidad de historial.
- Incentivos a la curiosidad ofreciendo fácil acceso a otros países.

### 7.2 Desafíos técnicos y soluciones
- **Datos combinados**: El hecho de tener que combinar dos bases de datos, para evitar inconvenientes con la API de países, se creó un archivo JSON con todos los datos de la misma, llamado `paises.json`. Considerando las diferencias entre las diferentes APIs, implicó unificar la información del país con las tarifas dependiendo de su divisa, ya que algunos países no tenían divisa y otros tenían más de una, por lo que la solución fue crear un array con la información útil para la aplicación, descartando los países sin divisas.
- **LocalStorage y estado**: Para que el sitio se comunique correctamente, fue necesario implementar el estado y guardarlos en LocalStorage para mantener la consistencia, especialmente porque la aplicación principal sirve como puerta de entrada a la página de países.
- **Interactividad de la trivia**: Se diseñaron preguntas dinámicas, se deshabilitaron botones, se mantuvieron estadísticas, se gestionaron respuestas, se implementaron estilos dinámicos, y se utilizó `setInterval` y `setTimeout`, además de limpiar los intervalos al completarse cierto tiempo.

## 8. Evaluación de puntos fuertes y débiles

### 8.1 Puntos fuertes
- Interfaz intuitiva y fácil de usar.
- Datos actualizados y precisos.
- Alto rendimiento y escalabilidad.
- Componente educativo integrado.
- Incentivo a la curiosidad.

### 8.2 Puntos débiles
- Dependencia de la estabilidad de la API externa.
- La estética y diseño.
- Necesidad de mejorar la optimización para motores de búsqueda (SEO).
- Ampliar la variedad y dificultad de las preguntas en la trivia.

## 9. Líneas futuras de evolución del producto

### 9.1 Mejoras propuestas
- Mejorar la interfaz de usuario.
- Agregar placeholders.
- Optimización para móviles.
- Agregar más información a la tabla y más filtros.
- Establecer paginación para la tabla.
- Mejora en la integración con API para notificaciones de cambios en tarifas.
- Optimización SEO para mejorar visibilidad en buscadores.
- Expansión de la trivia con más categorías y niveles de dificultad.

## 10. Conclusiones

### 10.1 Resumen de los logros alcanzados
El "Comparador de Países" ha logrado ser una aplicación en desarrollo que combina funcionalidad práctica con componentes estadísticos, económicos, educativos y de entretenimiento, satisfaciendo las necesidades de un amplio espectro de usuarios.

### 10.2 Importancia del proyecto
El proyecto no solo responde a necesidades prácticas como la comparación de tarifas de cambio de divisas, sino que también contribuye al aprendizaje y la educación sobre economía, geografía y economía global de manera accesible y divertida.

## 11. Referencias y recursos adicionales

### 11.1 Referencias utilizadas
- Documentación de Bootstrap y MDN.
- API de tarifas de cambio: [https://www.exchangerate-api.com/docs/free](https://www.exchangerate-api.com/docs/free)
- API de países: [https://restcountries.com/](https://restcountries.com/)

---