const sampleTopics = ['Unidad 1: Fundamentos', 'Unidad 2: Aplicaciones', 'Unidad 3: Evaluaciones'];
const trueFalseTopics = ['Unidad A: Conceptos clave', 'Unidad B: Casos practicos'];

const createSampleQuestions = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `sample-q-${index + 1}`,
    prompt: `Pregunta ${index + 1}: cual es la respuesta correcta para el formulario de ejemplo?`,
    options: ['Opcion A', 'Opcion B', 'Opcion C', 'Opcion D'],
    correctOptionIndexes: [index % 4],
    correctOptionIndex: index % 4,
    topic: sampleTopics[index % sampleTopics.length],
    explanation: `Para la pregunta ${index + 1}, la respuesta correcta es la opcion ${String.fromCharCode(
      65 + (index % 4)
    )}. Personaliza este texto con la explicacion de tu formulario.`
  }));

const createTrueFalseQuestions = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `tf-q-${index + 1}`,
    prompt: `Verdadero o falso ${index + 1}: ajusta esta afirmacion segun tu temario especifico.`,
    options: ['Verdadero', 'Falso'],
    correctOptionIndexes: [index % 2],
    correctOptionIndex: index % 2,
    topic: trueFalseTopics[index % trueFalseTopics.length],
    explanation: `Amplia esta explicacion para justificar por que la respuesta correcta es ${
      index % 2 === 0 ? 'Verdadero' : 'Falso'
    }.`
  }));

const cloudEngineerAssociateQuestions = [
  {
    id: 'cea-q1',
    prompt: 'Necesitas un deposito de Cloud Storage para usuarios en Nueva York y San Francisco sin usar ACL. Que comando CLI usas?',
    options: [
      'Ejecutar gcloud storage buckets create sin especificar --location',
      'Ejecutar gsutil mb con ubicacion multirregional y desactivar ACL',
      'Ejecutar gcloud storage buckets create con --placement us-east1,europe-west2',
      'Ejecutar gcloud storage objects update --remove-acl-grant'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Storage / Cloud Storage',
    explanation: 'Si no indicas --location el bucket se crea por defecto en la region multirregional us y no se requiere ACL.'
  },
  {
    id: 'cea-q2',
    prompt: 'Necesitas desplegar rapido una aplicacion web en contenedores sin administrar infraestructura y pagar solo por solicitud. Que tecnologia usas?',
    options: ['Cloud Run', 'App Engine standard', 'Compute Engine', 'Cloud Functions'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Serverless / Cloud Run',
    explanation: 'Cloud Run es totalmente administrado, sin servidores, expone endpoints HTTP y solo cobra cuando atiende peticiones.'
  },
  {
    id: 'cea-q3',
    prompt: 'El equipo de cadena de suministro necesita un pequeno cluster Kubernetes piloto disponible solo para el equipo. Como lo implementas?',
    options: [
      'Crear un cluster Autopilot en us-central1-a con imagen Ubuntu',
      'Crear un cluster regional estandar privado en us-central1 con imagen optimizada',
      'Crear un cluster zonal estandar privado en us-central1-a con node pool predeterminado e imagen Ubuntu',
      'Crear un cluster Autopilot regional en us-east1-b con node pool personalizado'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Kubernetes / GKE',
    explanation: 'Los clusters estandar pueden ser zonales; un cluster privado zonal en us-central1-a da control total de nodos e imagen.'
  },
  {
    id: 'cea-q4',
    prompt: 'Debes procesar archivos nuevos en un bucket usando Cloud Functions. Que valor usas en --trigger-event al implementar con gcloud?',
    options: [
      '--trigger-event google.storage.object.change',
      '--trigger-event google.storage.object.add',
      '--trigger-event google.storage.object.finalize',
      '--trigger-event google.pubsub.topic.publish'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Serverless / Cloud Functions',
    explanation: 'El evento finalize se dispara cuando un objeto se escribe completamente en Cloud Storage y es el gatillo correcto.'
  },
  {
    id: 'cea-q5',
    prompt: 'Que tipo de red VPC te permite controlar totalmente los rangos IP y las subredes regionales?',
    options: ['Red de modo personalizado', 'Red de modo automatico', 'Shared VPC', 'VPC peer'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Networking / VPC',
    explanation: 'Las VPC de modo personalizado permiten definir rangos IP y crear subredes solo en las regiones deseadas.'
  },
  {
    id: 'cea-q6',
    prompt: 'Debes migrar una base MySQL con funciones definidas por el usuario de forma rapida y economica. Que haces?',
    options: [
      'Restaurar un backup en Cloud SQL',
      'Crear una instancia MySQL desde Cloud Marketplace',
      'Crear una VM e2-standard-8 e instalar MySQL',
      'Crear una VM Compute Engine N2, instalar MySQL y restaurar los datos'
    ],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Databases / MySQL',
    explanation: 'Cloud SQL no soporta funciones UDF, por lo que se recomienda una VM N2 administrada para instalar MySQL manualmente.'
  },
  {
    id: 'cea-q7',
    prompt: 'Que accion realiza terraform apply?',
    options: [
      'Crea o actualiza los recursos definidos en la configuracion',
      'Calcula el plan sin aplicar cambios',
      'Elimina los recursos definidos',
      'Valida la sintaxis del archivo'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'IaC / Terraform',
    explanation: 'terraform apply ejecuta los cambios del plan y provisiona los recursos descritos en los archivos de configuracion.'
  },
  {
    id: 'cea-q8',
    prompt: 'Quieres Cloud SQL con conmutacion por error automatica usando gcloud sql instances create. Que argumento necesitas?',
    options: ['--replica-type', '--availability-type', '--backup-start-time', '--failover-replica-name'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Databases / Cloud SQL',
    explanation: 'El flag --availability-type permite elegir regional para tener replicas automaticas con failover entre zonas.'
  },
  {
    id: 'cea-q9',
    prompt: 'Marketing debe cargar datos lentos cada hora desde Cloud Storage a BigQuery minimizando costos. Que haces?',
    options: [
      'Cloud Functions que escriba en BigQuery via Dataflow',
      'Programar un import con la API de streaming',
      'Configurar BigQuery Data Transfer Service desde el bucket',
      'Cargar manualmente con bq load cada hora'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Data / BigQuery',
    explanation: 'BigQuery Data Transfer Service automatiza la importacion desde Cloud Storage sin costo adicional y con pocos pasos.'
  },
  {
    id: 'cea-q10',
    prompt: 'Debes actualizar el sistema operativo de un MIG usando recursos minimos. Que configuracion eliges?',
    options: [
      'Crear nueva plantilla y establecer max surge en 5',
      'Crear nueva plantilla y actualizar con modo PROACTIVE',
      'Usar min ready seconds para pausar instancias',
      'Deshabilitar autohealing temporalmente'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Compute / Managed Instance Groups',
    explanation: 'La actualizacion PROACTIVE usa rolling update con surge 1 por defecto, minimizando recursos adicionales.'
  },
  {
    id: 'cea-q11',
    prompt: 'Necesitas configurar dependencias especificas de sistema operativo para una aplicacion migrada. Que servicio usas?',
    options: ['Google Kubernetes Engine', 'Compute Engine con maquinas virtuales', 'Cloud Run', 'App Engine standard'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Compute / Compute Engine',
    explanation: 'Compute Engine permite elegir y personalizar el sistema operativo cumpliendo requerimientos especificos.'
  },
  {
    id: 'cea-q12',
    prompt: 'Necesitas un balanceo de carga seguro y economico para un servicio web de tres niveles en us-central1. Que arquitectura eliges?',
    options: [
      'Proxy SSL externo y LB TCP/UDP interno',
      'HTTP(S) externo standard level y LB interno regional',
      'HTTP(S) global premium y TCP interno regional',
      'Solo un LB de red interno'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Networking / Load Balancing',
    explanation: 'Un load balancer HTTP(S) externo de nivel estandar cubre el front-end regional y un LB interno regional protege el trafico privado.'
  },
  {
    id: 'cea-q13',
    prompt: 'Debes almacenar datos historicos basados en tiempo para paneles analiticos. Que dos soluciones podrias usar?',
    options: ['Cloud Firestore', 'BigQuery', 'Cloud SQL', 'Cloud Bigtable', 'Cloud Storage'],
    correctOptionIndexes: [1, 3],
    correctOptionIndex: 1,
    topic: 'Data / Analytics',
    explanation: 'BigQuery y Cloud Bigtable son adecuados para cargas analiticas historicas; Firestore, Cloud SQL y Cloud Storage no cumplen el caso.'
  },
  {
    id: 'cea-q14',
    prompt: 'Necesitas estimar 10 TB de almacenamiento inmediato y 30 TB historico accesible cada 30 dias. Que calculo haces?',
    options: [
      'Usar la calculadora para 10 TB multirregional Nearline',
      'Usar la calculadora para 10 TB Standard multirregional, 30 TB Nearline regional y egresos',
      'Multiplicar manualmente GB por costo mensual promedio',
      'Planificar Coldline para ambos escenarios'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Storage / Costos',
    explanation: 'Los datos activos usan Standard multirregional, los historicos Nearline regional y se estima el egreso esperado.'
  },
  {
    id: 'cea-q15',
    prompt: 'Que opcion de balanceo de carga opera en la capa 7 de la pila TCP?',
    options: ['Global TCP Proxy', 'Global HTTP(S)', 'Regional Network Load Balancer', 'Global SSL Proxy'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Networking / Load Balancing',
    explanation: 'El balanceador HTTP(S) trabaja en la capa de aplicacion interpretando peticiones HTTP.'
  },
  {
    id: 'cea-q16',
    prompt: 'Analistas necesitan evaluar proyecciones de ventas usando SQL. Que solucion implementas?',
    options: ['BigQuery', 'Cloud SQL', 'Looker Studio', 'Cloud Spanner'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Data / BigQuery',
    explanation: 'BigQuery ofrece un motor de consultas SQL serverless ideal para analisis historico a gran escala.'
  },
  {
    id: 'cea-q17',
    prompt: 'Debes migrar rapido una aplicacion que depende de Ubuntu altamente personalizado. Como procedes?',
    options: [
      'Reescribir en App Engine',
      'Usar Cloud Run para empaquetar contenedores',
      'Crear VMs en Compute Engine y migrar la aplicacion',
      'Mover el codigo a Cloud Functions'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Compute / Lift and Shift',
    explanation: 'Compute Engine permite levantar la aplicacion con minimos cambios aprovechando configuraciones de sistema operativos personalizadas.'
  },
  {
    id: 'cea-q18',
    prompt: 'Quieres implementar microservicios con control total de contenedores y escalado, sin administrar el plano de control. Que usas?',
    options: ['App Engine', 'Google Kubernetes Engine', 'Compute Engine', 'Cloud Run'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Kubernetes / GKE',
    explanation: 'GKE gestiona el plano de control pero entrega control sobre nodos, despliegues y autoscaling de contenedores.'
  },
  {
    id: 'cea-q19',
    prompt: 'Para un piloto de punto de venta quieres centrarte en codigo y portabilidad. Que estrategia sigues?',
    options: [
      'Empaquetar la aplicacion y desplegar en Cloud Run',
      'Desplegar en Compute Engine con imagen personalizada',
      'Crear una aplicacion App Engine flexible',
      'Implementar funciones HTTP en Cloud Functions'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Serverless / Cloud Run',
    explanation: 'Cloud Run ejecuta contenedores portables, gestionados y sin servidores, permitiendo enfocarse en el codigo.'
  },
  {
    id: 'cea-q20',
    prompt: 'La aplicacion de cadena de suministro lee grandes volumenes de datos frecuentemente. Que clase de almacenamiento eliges?',
    options: ['Standard', 'Nearline', 'Coldline', 'Archive'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Storage / Clases',
    explanation: 'El almacenamiento Standard esta disenado para datos calientes con accesos frecuentes, maximizando rendimiento.'
  },
  {
    id: 'cea-q21',
    prompt: 'Quieres limitar costos en Cloud Run restringiendo conexiones al backend. Que configuracion ajustas?',
    options: ['Utilizacion de CPU', 'Instancias maximas', 'Concurrencia por instancia', 'Tiempo de espera'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Serverless / Cloud Run',
    explanation: 'Max instances limita el numero de contenedores simultaneos y por ende conexiones y costos.'
  },
  {
    id: 'cea-q22',
    prompt: 'Que recurso de GKE implementa un balanceador HTTP(S)?',
    options: ['Service', 'Pods', 'Deployments', 'Ingress'],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Kubernetes / Networking',
    explanation: 'El objeto Ingress configura un balanceador HTTP(S) basado en los servicios y reglas definidas.'
  },
  {
    id: 'cea-q23',
    prompt: 'Que servicios de Google Cloud se basan en logica empaquetada en contenedores? (Elige dos)',
    options: ['Google Kubernetes Engine', 'Cloud Run', 'Cloud SQL', 'App Engine standard', 'Cloud Functions'],
    correctOptionIndexes: [0, 1],
    correctOptionIndex: 0,
    topic: 'Containers / Servicios',
    explanation: 'GKE y Cloud Run ejecutan contenedores directamente; App Engine standard y Cloud Functions abstraen en gran medida el contenedor.'
  },
  {
    id: 'cea-q24',
    prompt: 'Que servicio de datos es una base relacional global y escalable horizontalmente?',
    options: ['Cloud Spanner', 'Cloud SQL', 'Firestore', 'BigQuery'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Databases / Cloud Spanner',
    explanation: 'Cloud Spanner combina semantica relacional con escalado horizontal global y consistencia fuerte.'
  },
  {
    id: 'cea-q25',
    prompt: 'Cual es la forma declarativa de inicializar y actualizar objetos de Kubernetes?',
    options: ['kubectl run', 'kubectl create', 'kubectl apply', 'kubectl replace'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Kubernetes / Operacion',
    explanation: 'kubectl apply procesa manifestos declarativos y mantiene el estado deseado de los recursos.'
  },
  {
    id: 'cea-q26',
    prompt: 'Que objeto de Kubernetes expone la logica del cluster a traves de endpoints definidos?',
    options: ['Deployments', 'Pod templates', 'Services', 'Pods'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Kubernetes / Networking',
    explanation: 'Un Service define pods seleccionados por etiquetas y los expone mediante el tipo configurado.'
  },
  {
    id: 'cea-q27',
    prompt: 'Tu cluster GKE requiere un balanceador HTTP(S) interno. Que configuracion aplicas?',
    options: [
      'Anotar Ingress con ingress.class GCE',
      'Configurar el Service con tipo LoadBalancer',
      'Anotar el Service con una referencia NEG',
      'Implementar rutas estaticas personalizadas'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Kubernetes / Ingress',
    explanation: 'Los balanceadores HTTP(S) internos necesitan NEGs; se logra anotando el Service con la referencia NEG adecuada.'
  },
  {
    id: 'cea-q28',
    prompt: 'Que tareas forman parte de configurar un grupo de instancias administrado? (Elige dos)',
    options: [
      'Especificar discos persistentes',
      'Elegir tipo de maquina en la plantilla',
      'Definir checks de estado',
      'Configurar el sistema operativo',
      'Indicar el numero de instancias'
    ],
    correctOptionIndexes: [2, 4],
    correctOptionIndex: 2,
    topic: 'Compute / Managed Instance Groups',
    explanation: 'Para el MIG debes definir health checks y la cantidad de instancias; discos y sistema operativo pertenecen a la plantilla base.'
  },
  {
    id: 'cea-q29',
    prompt: 'La eliminacion de una programacion de instantaneas falla. Que haces?',
    options: [
      'Eliminar las instantaneas incrementales posteriores',
      'Borrar el disco origen',
      'Desasociar la programacion antes de borrarla',
      'Restaurar la instantanea y repetir'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Storage / Snapshots',
    explanation: 'Las programaciones deben estar desacopladas de los discos antes de eliminarlas; de lo contrario el comando falla.'
  },
  {
    id: 'cea-q30',
    prompt: 'Debes ampliar la subred mysubnet 10.1.2.0/24 para soportar 2000 IPs. Que comando ejecutas?',
    options: [
      'gcloud compute networks subnets expand-ip-range mysubnet --region us-central1 --prefix-length 20',
      'gcloud compute networks subnets expand-ip-range mysubnet --region us-central1 --prefix-length 22',
      'gcloud compute networks subnets expand-ip-range mysubnet --region us-central1 --prefix-length 21',
      'gcloud networks subnets expand-ip-range mysubnet --region us-central1 --prefix-length 21'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Networking / VPC',
    explanation: 'Un prefijo /21 entrega 2046 IPs utilizables. El comando debe incluir el grupo compute y la region correcta.'
  },
  {
    id: 'cea-q31',
    prompt: 'Quieres limitar conexiones al backend de Cloud Run. Que ajuste deberias aplicar?',
    options: ['Instancias maximas', 'Concurrencia por instancia', 'CPU minima', 'Memoria maxima'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Serverless / Cloud Run',
    explanation: 'Al limitar max instances evitas que se creen demasiadas instancias y restringes conexiones al backend.'
  },
  {
    id: 'cea-q32',
    prompt: 'Deseas mover objetos de Standard a Nearline a partir de una fecha especifica con reglas de ciclo de vida. Que condiciones usas? (Elige dos)',
    options: ['Age', 'CreatedBefore', 'NumberOfNewerVersions', 'IsLive', 'MatchesStorageClass'],
    correctOptionIndexes: [1, 4],
    correctOptionIndex: 1,
    topic: 'Storage / Lifecycle',
    explanation: 'CreatedBefore permite definir la fecha y MatchesStorageClass filtra objetos Standard antes de migrar a Nearline.'
  },
  {
    id: 'cea-q33',
    prompt: 'Quieres alertar cuando el uso de CPU de cada VM en us-central1 supere 60% por 5 minutos. Que politica defines?',
    options: [
      'Monitorear VM instance con la metrica cpu/utilization y condicion above 0.60 durante 5m',
      'Monitorear metricas de proyecto con condicion outside 60-100',
      'Configurar uptime checks con threshold 60%',
      'Usar metricas de firewall para CPU'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Monitoring / Alerting',
    explanation: 'La politica usa el recurso VM instance, la metrica cpu/utilization y una condicion above 0.60 sostenida 5 minutos.'
  },
  {
    id: 'cea-q34',
    prompt: 'Que comando gcloud muestra la descripcion de instantaneas disponibles?',
    options: [
      'gcloud compute snapshots describe',
      'gcloud compute snapshots list',
      'gcloud compute disks list',
      'gcloud compute snapshots get-iam-policy'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Compute / Snapshots',
    explanation: 'El subcomando list enumera las instantaneas y sus campos principales desde la CLI.'
  },
  {
    id: 'cea-q35',
    prompt: 'Tienes un rol personalizado y deseas agregar permisos para Cloud Run. Que haces?',
    options: [
      'Crear un nuevo rol y reasignarlo a los usuarios',
      'Copiar el rol existente y eliminar el anterior',
      'Actualizar la definicion localmente y usar gcloud iam roles update',
      'Solicitar roles/iam.securityAdmin para el proyecto'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'IAM / Roles',
    explanation: 'La practica recomendada es modificar el rol personalizado existente y actualizarlo con gcloud iam roles update.'
  },
  {
    id: 'cea-q36',
    prompt: 'En que escenario usarias una cuenta de servicio?',
    options: ['Para entornos de desarrollo', 'Para acceder a datos de usuario directamente', 'Para pods o modulos individuales en GKE', 'Para autenticar usuarios finales'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'IAM / Service Accounts',
    explanation: 'Se asignan cuentas de servicio a workloads como pods en GKE para otorgar permisos a nivel de aplicacion.'
  },
  {
    id: 'cea-q37',
    prompt: 'Necesitas que un microservicio en GKE acceda a Cloud Spanner. Que tipo de cuenta asignas?',
    options: ['Cuenta de Cloud Identity', 'Cuenta de Google personal', 'Cuenta de servicio referenciada por la aplicacion', 'Cuenta de servicio compartida de proyecto'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'IAM / Service Accounts',
    explanation: 'Una cuenta de servicio asociada a la workload proporciona credenciales no interactivas y control granular de permisos.'
  },
  {
    id: 'cea-q38',
    prompt: 'Asignar roles IAM en proyectos dev y prod falla. Los proyectos estan en una carpeta comercio electronico. Que pides?',
    options: [
      'roles/iam.securityAdmin a nivel organizacion',
      'roles/resourcemanager.folderIamAdmin en la carpeta',
      'roles/owner en cada proyecto',
      'roles/resourcemanager.projectCreator'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'IAM / Jerarquia',
    explanation: 'Folder IAM Admin en la carpeta permite administrar permisos solo dentro de esa unidad respetando privilegios minimos.'
  },
  {
    id: 'cea-q39',
    prompt: 'Que tipo de registro de Cloud Audit esta deshabilitado por defecto salvo excepciones?',
    options: ['Data Access logs', 'Admin Activity logs', 'System Event logs', 'Policy Denied logs'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Logging / Audit',
    explanation: 'Los registros de acceso a datos generan mucho volumen y normalmente se habilitan de forma selectiva.'
  },
  {
    id: 'cea-q40',
    prompt: 'Una app movil necesita leer ubicacion de camiones desde Pub/Sub siguiendo mejores practicas. Que credencial usas?',
    options: ['Cliente OAuth 2.0', 'Cuenta de servicio provista por el entorno', 'API key publica', 'Service account key dedicada'],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'IAM / Credenciales',
    explanation: 'Para apps moviles que acceden a servicios de backend se usa una clave de cuenta de servicio segura y rotada.'
  },
  {
    id: 'cea-q41',
    prompt: 'Quieres saber cuando se agregan objetos a un bucket usando Cloud Audit Logs. Que entradas vigilas?',
    options: ['DATA_WRITE', 'ADMIN_READ', 'SYSTEM_EVENT', 'DATA_READ'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Logging / Audit',
    explanation: 'Las entradas DATA_WRITE registran creaciones y eliminaciones de objetos en Cloud Storage.'
  },
  {
    id: 'cea-q42',
    prompt: 'En Cloud Logging cual es el periodo predeterminado de retencion para los registros de acceso a datos?',
    options: ['400 dias', '30 dias', '3650 dias', '365 dias'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Logging / Cloud Logging',
    explanation: 'Los registros de acceso a datos se conservan 30 dias de manera predeterminada a menos que se configure otra politica.'
  },
  {
    id: 'cea-q43',
    prompt: 'Donde puedes almacenar y versionar tus plantillas de Terraform en Google Cloud?',
    options: ['Cloud Source Repositories', 'Cloud Profiler', 'Cloud Trace', 'Cloud Monitoring'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'DevOps / Version Control',
    explanation: 'Cloud Source Repositories provee repositorios Git administrados por Google para gestionar plantillas de infraestructura.'
  },
  {
    id: 'cea-q44',
    prompt: 'Cual de los siguientes proporciona acceso a los registros creados por desarrolladores que implementan codigo en Google Cloud?',
    options: ['Agent logs', 'Service logs', 'Cloud Audit Logs', 'Network logs'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Logging / Cloud Logging',
    explanation: 'Los service logs contienen eventos generados por servicios de Google Cloud y exponen lo que producen los despliegues.'
  },
  {
    id: 'cea-q45',
    prompt: 'Que herramienta ingiere metricas eventos y metadatos para paneles del Metrics Explorer y alertas automatizadas?',
    options: ['Cloud Profiler', 'Cloud Trace', 'Cloud Source Repositories', 'Cloud Monitoring'],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Observability / Monitoring',
    explanation: 'Cloud Monitoring recolecta metricas y eventos para visualizaciones, tableros y alertas.'
  },
  {
    id: 'cea-q46',
    prompt: 'Cuales campos identifican la region del backend en un Application Load Balancer?',
    options: ['Hostname', 'Server Location', 'Client IP'],
    correctOptionIndexes: [0, 1],
    correctOptionIndex: 0,
    topic: 'Networking / Load Balancing',
    explanation: 'El hostname y el server location indican a donde se enruta el trafico; el client IP no define la region del backend.'
  },
  {
    id: 'cea-q47',
    prompt: 'Para crear instancias identicas mediante plantillas, que atributos incluye una instance template?',
    options: [
      'Tipo de maquina, imagen de disco o contenedor, zona y etiquetas',
      'Definiciones de buckets de Cloud Storage',
      'Descripcion de un balanceador de carga',
      'Archivo de configuracion de App Engine'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Compute / Instance Templates',
    explanation: 'Las plantillas definen configuraciones de VM como tipo de maquina, imagen, zona y etiquetas; no describen buckets ni balanceadores.'
  },
  {
    id: 'cea-q48',
    prompt: 'Que comando de linea crea un bucket de Cloud Storage?',
    options: ['gcloud mb', 'gsutil mb', 'gcloud mkbucket', 'gsutil mkbucket'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Storage / Cloud Storage',
    explanation: 'El comando `gsutil mb` (make bucket) es la forma oficial de crear buckets desde la CLI.'
  },
  {
    id: 'cea-q49',
    prompt: 'Como migras automaticamente objetos de almacenamiento regional a Nearline tras 90 dias?',
    options: [
      'Creando una Cloud Function que copie los objetos',
      'Configurando MigrateObjectAfter=90 dias en el objeto',
      'Copiando a un disco persistente y luego a Nearline',
      'Aplicando una politica de ciclo de vida con edad 90 y SetStorageClass Nearline'
    ],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Storage / Lifecycle',
    explanation: 'Las politicas de lifecycle permiten cambiar la clase de almacenamiento basadas en edad sin scripts adicionales.'
  },
  {
    id: 'cea-q50',
    prompt: 'Que comando sincroniza el contenido de dos buckets de Cloud Storage?',
    options: ['gsutil rsync', 'gcloud cp sync', 'gcloud rsync', 'gsutil cp sync'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Storage / Cloud Storage',
    explanation: '`gsutil rsync` compara y replica objetos entre buckets.'
  },
  {
    id: 'cea-q51',
    prompt: 'Las redes VPC en Google Cloud son recursos de alcance:',
    options: ['Regional', 'Zonal', 'Global', 'De subred'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Networking / VPC',
    explanation: 'Las VPC son globales y pueden abarcar multiples regiones con subredes regionales.'
  },
  {
    id: 'cea-q52',
    prompt: 'Si un comando gsutil falla por un error de red transitorio, que ocurre por defecto?',
    options: [
      'Termina y registra un mensaje en Cloud Logging',
      'Reintenta con estrategia de retroceso exponencial truncada',
      'Pregunta al usuario si reintenta',
      'Termina y registra en Cloud Shell'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Storage / gsutil',
    explanation: 'gsutil aplica reintentos automaticos con backoff exponencial truncado en errores transitorios.'
  },
  {
    id: 'cea-q53',
    prompt: 'Cual de los siguientes no es un componente de una regla de firewall?',
    options: ['Direccion del trafico', 'Accion cuando coincide', 'Tiempo de vida (TTL)', 'Protocolo'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Networking / Firewalls',
    explanation: 'Las reglas incluyen direccion, accion, prioridad y protocolos/puertos; no utilizan TTL.'
  },
  {
    id: 'cea-q54',
    prompt: 'Que evento no puede activar el escalado automatico de un grupo de instancias?',
    options: ['Uso de CPU', 'Metricas de Cloud Monitoring', 'Violacion de politicas IAM', 'Capacidad de servicio del balanceador'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Compute / Autoscaling',
    explanation: 'El escalado responde a metricas de carga (CPU, metricas personalizadas, balanceador), no a incidentes de IAM.'
  },
  {
    id: 'cea-q55',
    prompt: 'Necesitas transacciones y SQL completo para una aplicacion de cuentas. Que opciones de datos usas?',
    options: ['Spanner y Cloud SQL', 'Datastore y Bigtable', 'Spanner y Cloud Storage', 'Datastore y Cloud SQL'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Databases / SQL',
    explanation: 'Spanner y Cloud SQL ofrecen transacciones ACID con interfaces SQL completas.'
  },
  {
    id: 'cea-q56',
    prompt: 'El area de marketing quiere desplegar una web sin administrar servidores ni clusters. Que servicio recomiendas?',
    options: ['Compute Engine', 'Kubernetes Engine', 'App Engine', 'Cloud Functions'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Compute / Serverless',
    explanation: 'App Engine es PaaS gestionado que abstrae servidores para aplicaciones web completas.'
  },
  {
    id: 'cea-q57',
    prompt: 'Necesitas consultas SQL sobre petabytes sin administrar infraestructura. Que servicio eliges?',
    options: ['Cloud Storage', 'BigQuery', 'Bigtable', 'Datastore'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Data / BigQuery',
    explanation: 'BigQuery es el almacen de datos serverless de Google con SQL estandar sobre grandes volmenes.'
  },
  {
    id: 'cea-q58',
    prompt: 'Una startup IoT requiere filtrar y transformar datos en streaming antes de guardarlos. Que servicio usas?',
    options: ['Dataproc', 'Cloud Dataflow', 'Cloud Endpoints', 'Cloud Interconnect'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Data / Streaming',
    explanation: 'Cloud Dataflow maneja pipelines de stream y batch para ETL serverless.'
  },
  {
    id: 'cea-q59',
    prompt: 'Una VM preemptible puede ser detenida en cualquier momento pero siempre finaliza tras:',
    options: ['6 horas', '12 horas', '24 horas', '48 horas'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Compute / Preemptible VMs',
    explanation: 'Google fuerza la detencion de preemptibles antes de las 24 horas de ejecucion.'
  },
  {
    id: 'cea-q60',
    prompt: 'Que componentes puedes usar para organizar recursos en una jerarquia de Google Cloud?',
    options: [
      'Organization, folders y projects',
      'Buckets, directorios y subdirectorios',
      'Organizations, buckets y projects',
      'Folders, buckets y projects'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'IAM / Organizacion',
    explanation: 'La jerarquia nativa usa Organization en la cima, luego folders y proyectos.'
  },
  {
    id: 'cea-q61',
    prompt: 'Como listarias los roles otorgables para un recurso al investigar una incidencia IAM?',
    options: [
      'gutil iam list-grantable-roles',
      'gcloud iam list-grantable-roles',
      'gcloud list-grantable-roles',
      'gcloud resources grantable-roles'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'IAM / CLI',
    explanation: 'El comando `gcloud iam list-grantable-roles` devuelve roles aplicables a un recurso.'
  },
  {
    id: 'cea-q62',
    prompt: 'Que comando muestra los tipos de CPU disponibles en una zona especifica?',
    options: [
      'gcloud compute zones describe',
      'gcloud iam zones describe',
      'gutil zones describe',
      'gcloud compute regions list'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Compute / CLI',
    explanation: '`gcloud compute zones describe` incluye la lista de CPU soportadas en la zona.'
  },
  {
    id: 'cea-q63',
    prompt: 'Que permiso se requiere para crear un rol personalizado?',
    options: ['iam.create', 'compute.roles.create', 'iam.roles.create', 'compute.roles.add'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'IAM / Roles',
    explanation: 'El permiso `iam.roles.create` forma parte de roles como IAM Admin y permite definir roles personalizados.'
  },
  {
    id: 'cea-q64',
    prompt: 'Que sufijo CIDR eliges para disponer de al menos 1000 direcciones IP con minimo desperdicio?',
    options: ['/20', '/22', '/28', '/32'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Networking / Subnets',
    explanation: 'Una subnet /22 ofrece 1022 IPs utilizables, suficiente para 1000 hosts sin exceso.'
  },
  {
    id: 'cea-q65',
    prompt: 'Tus cientificos de datos necesitan un cluster Spark gestionado. Que servicio GCP recomiendas?',
    options: ['Cloud Dataproc', 'Cloud Dataflow', 'Cloud Hadoop', 'BigQuery'],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Data / Analytics',
    explanation: 'Cloud Dataproc es el servicio gestionado de Hadoop y Spark en Google Cloud.'
  },
  {
    id: 'cea-q66',
    prompt: 'Tras subir un archivo a Cloud Storage quieres actualizar el uso del usuario. Que opcion serverless ejecuta logica al cargar?',
    options: ['Cloud Dataflow', 'Cloud Dataproc', 'Cloud Storage', 'Cloud Functions'],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Serverless / Cloud Functions',
    explanation: 'Cloud Functions puede dispararse con eventos de Cloud Storage para procesar archivos al volar.'
  },
  {
    id: 'cea-q67',
    prompt: 'Necesitas una conexion dedicada desde tu data center hacia Google Cloud. Que servicio eliges?',
    options: [
      'Google Cloud Carrier Internet Peering',
      'Google Cloud Interconnect - Dedicated',
      'Google Cloud Internet Peering',
      'Google Cloud DNS'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Networking / Interconnect',
    explanation: 'Dedicated Interconnect provee enlaces fisicos privados entre instalaciones y Google.'
  },
  {
    id: 'cea-q68',
    prompt: 'Antes de crear llaves en Cloud KMS debes:',
    options: [
      'Habilitar la API de Cloud KMS y configurar billing',
      'Habilitar la API y crear carpetas',
      'Crear carpetas y habilitar billing',
      'Otorgar roles creables a todos los usuarios'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Security / KMS',
    explanation: 'Como cualquier servicio gestionado, debes habilitar la API y tener billing activo antes de operar.'
  },
  {
    id: 'cea-q69',
    prompt: 'En Kubernetes Engine un node pool es:',
    options: [
      'Un subconjunto de nodos entre clusters',
      'VMs gestionadas fuera de GKE',
      'Un conjunto de VMs preemptibles',
      'Un subconjunto de nodos dentro del cluster con la misma configuracion'
    ],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Kubernetes / GKE',
    explanation: 'Los node pools agrupan nodos de un cluster que comparten configuracion (tipo, imagen, metadatos).'
  },
  {
    id: 'cea-q70',
    prompt: 'Que servicio GCP almacena y gestiona imagenes Docker?',
    options: ['Cloud Source Repositories', 'Cloud Build', 'Container Registry', 'Docker Repository'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Containers / Registry',
    explanation: 'Container Registry es el repositorio administrado de imagenes Docker en Google Cloud.'
  },
  {
    id: 'cea-q71',
    prompt: 'Que lenguajes soporta Cloud Functions en esta certificacion?',
    options: [
      'Node.js y Python',
      'Node.js, Python y Go',
      'Python y Go',
      'Python y C'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Serverless / Cloud Functions',
    explanation: 'Para el examen ACE se consideran las runtimes principales de Cloud Functions: Node.js y Python.'
  },
  {
    id: 'cea-q72',
    prompt: 'Que servicio de Stackdriver se utiliza para generar alertas cuando la utilizacion de CPU de una VM supera el 80 %?',
    options: ['Logging', 'Monitoring', 'Cloud Trace', 'Cloud Debug'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Observabilidad / Stackdriver Monitoring',
    explanation: 'Stackdriver Monitoring permite definir condiciones sobre metricas como la CPU y disparar alertas al superar umbrales.'
  },
  {
    id: 'cea-q73',
    prompt: 'Acabas de crear una VM y quieres recibir correo si la CPU supera 75 % durante 5 minutos. Que debes hacer en la VM?',
    options: [
      'Instalar un Workspace de Stackdriver',
      'Instalar el agente de Stackdriver Monitoring en la VM',
      'Marcar Monitor With Stackdriver en la configuracion',
      'Configurar un canal de notificacion'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Observabilidad / Stackdriver Monitoring',
    explanation: 'El agente de Stackdriver Monitoring recolecta metricas del sistema operativo y las envia al servicio para evaluar la condicion.'
  },
  {
    id: 'cea-q74',
    prompt: 'Donde puede Stackdriver monitorear recursos?',
    options: [
      'Solo en Google Cloud Platform',
      'En Google Cloud Platform y Amazon Web Services',
      'En Google Cloud Platform y centros on-premise',
      'En Google Cloud Platform, AWS y centros on-premise'
    ],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Observabilidad / Stackdriver Monitoring',
    explanation: 'Stackdriver admite escenarios hibridos y puede supervisar recursos en Google Cloud, AWS y on-premise.'
  },
  {
    id: 'cea-q75',
    prompt: 'Agrupar metricas en ventanas de tamano uniforme se conoce como:',
    options: ['Agregacion', 'Alineacion', 'Minimizacion', 'Consolidacion'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Observabilidad / Stackdriver Monitoring',
    explanation: 'La alineacion ajusta los datos crudos a intervalos regulares antes de aplicar estadisticos o detectar alertas.'
  },
  {
    id: 'cea-q76',
    prompt: 'Ya definiste una condicion sobre la CPU y deseas recibir alertas. Que canales admite Stackdriver Monitoring?',
    options: ['Email solamente', 'PagerDuty solamente', 'Hipchat y PagerDuty', 'Email, PagerDuty y Hipchat'],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Observabilidad / Stackdriver Monitoring',
    explanation: 'Las politicas de alerta pueden notificar por correo y herramientas externas como PagerDuty o Hipchat/Slack.'
  },
  {
    id: 'cea-q77',
    prompt: 'Para que sirve la documentacion opcional en una politica de alerta?',
    options: [
      'Se guarda en Cloud Storage',
      'Aporta contexto sobre la politica',
      'Incluye pasos para resolver el incidente',
      'Opciones B y C'
    ],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Observabilidad / Stackdriver Monitoring',
    explanation: 'La documentacion ayuda a entender la intencion de la politica y describe acciones recomendadas al dispararse.'
  },
  {
    id: 'cea-q78',
    prompt: 'Que es el alerta fatiga y por que representa un riesgo?',
    options: [
      'Demasiadas alertas irrelevantes generan que el equipo deje de prestarles atencion',
      'Demasiadas alertas cargan los sistemas',
      'Muy pocas alertas dejan dudas del estado de los servicios',
      'Exceso de alertas falsas'
    ],
    correctOptionIndexes: [0],
    correctOptionIndex: 0,
    topic: 'Observabilidad / Operaciones',
    explanation: 'Si se notifican eventos que no requieren accion, los ingenieros pueden ignorar alertas criticas futuras.'
  },
  {
    id: 'cea-q79',
    prompt: 'Durante cuanto tiempo conserva Stackdriver Logging los registros por defecto?',
    options: ['7 dias', '15 dias', '30 dias', '60 dias'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Observabilidad / Stackdriver Logging',
    explanation: 'La retencion predeterminada de Stackdriver Logging es de 30 dias.'
  },
  {
    id: 'cea-q80',
    prompt: 'Necesitas retener logs mas tiempo que el periodo predeterminado. Que opcion recomienda Google?',
    options: [
      'No existe opcion; los datos expiran',
      'Crear un sink y exportar los logs a otro servicio',
      'Escribir un script que use la API y guarde en Cloud Storage',
      'Escribir un script que use la API y guarde en BigQuery'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Observabilidad / Stackdriver Logging',
    explanation: 'Los sinks permiten enviar registros a destinos como Cloud Storage, BigQuery o Pub/Sub para almacenarlos mas tiempo.'
  },
  {
    id: 'cea-q81',
    prompt: 'Cuales son destinos validos para un logging sink de Stackdriver?',
    options: [
      'Un bucket de Cloud Storage unicamente',
      'Dataset de BigQuery y bucket de Cloud Storage',
      'Tema de Cloud Pub/Sub unicamente',
      'Bucket de Cloud Storage, dataset de BigQuery y tema de Cloud Pub/Sub'
    ],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Observabilidad / Stackdriver Logging',
    explanation: 'Los sinks soportan exportar a Cloud Storage, BigQuery o Pub/Sub segun la necesidad.'
  },
  {
    id: 'cea-q82',
    prompt: 'Que filtros puedes aplicar al revisar logs en Stackdriver Logging?',
    options: [
      'Etiqueta o texto solamente',
      'Tipo de recurso y tipo de log solamente',
      'Tiempo y tipo de recurso solamente',
      'Etiqueta o texto, tipo de recurso, tipo de log y rango de tiempo'
    ],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Observabilidad / Stackdriver Logging',
    explanation: 'El visor de logs permite combinar filtros por recurso, severidad, texto, etiquetas y periodo de tiempo.'
  },
  {
    id: 'cea-q83',
    prompt: 'Cual de los siguientes niveles de log no es un nivel estandar disponible?',
    options: ['Critical', 'Halted', 'Warning', 'Info'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Observabilidad / Stackdriver Logging',
    explanation: 'Los niveles estandar incluyen Critical, Error, Warning, Info y Debug; Halted no existe.'
  },
  {
    id: 'cea-q84',
    prompt: 'Quieres ver rapidamente todos los detalles de un registro sospechoso. Que accion realizas en el visor?',
    options: [
      'Expandir manualmente cada estructura',
      'Click en Expand all',
      'Escribir un script para reformatear',
      'Click en Show Detail'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Observabilidad / Stackdriver Logging',
    explanation: 'La opcion Expand all despliega el contenido completo del registro sin pasos adicionales.'
  },
  {
    id: 'cea-q85',
    prompt: 'Que servicio de Stackdriver es ideal para detectar cuellos de botella en la aplicacion?',
    options: ['Monitoring', 'Logging', 'Trace', 'Debug'],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Observabilidad / Stackdriver Trace',
    explanation: 'Stackdriver Trace genera trazas distribuidas que muestran la latencia de cada segmento de una solicitud.'
  },
  {
    id: 'cea-q86',
    prompt: 'Necesitas inspeccionar el estado de una aplicacion en puntos especificos para depurar. Que servicio usas?',
    options: ['Monitoring', 'Logging', 'Trace', 'Debug'],
    correctOptionIndexes: [3],
    correctOptionIndex: 3,
    topic: 'Observabilidad / Stackdriver Debug',
    explanation: 'Stackdriver Debug captura snapshots del estado sin detener la ejecucion y permite insertar logpoints.'
  },
  {
    id: 'cea-q87',
    prompt: 'Quieres verificar rapidamente el estado de BigQuery en us-central. Que sitio consultas?',
    options: [
      'Enviar un correo al soporte de Google Cloud',
      'https://status.cloud.google.com/',
      'https://bigquery.status.cloud.google.com/',
      'Llamar al soporte tecnico'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Operaciones / Estatus de Servicios',
    explanation: 'El panel https://status.cloud.google.com/ muestra la disponibilidad de cada servicio por region.'
  },
  {
    id: 'cea-q88',
    prompt: 'Para estimar costos necesitas informacion sobre tipos de VM. Que servicios la requieren?',
    options: [
      'Compute Engine y BigQuery',
      'Compute Engine y Kubernetes Engine',
      'BigQuery y Kubernetes Engine',
      'BigQuery y Cloud Pub/Sub'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Costos / Estimaciones',
    explanation: 'El calculo de costos en Compute Engine y Kubernetes Engine depende del tipo de maquina y cantidades de nodos.'
  },
  {
    id: 'cea-q89',
    prompt: 'En la calculadora de BigQuery el campo Query Pricing en TB representa:',
    options: [
      'Datos almacenados en BigQuery',
      'Datos devueltos por la consulta',
      'Datos escaneados por la consulta',
      'Datos en Cloud Storage'
    ],
    correctOptionIndexes: [2],
    correctOptionIndex: 2,
    topic: 'Costos / BigQuery',
    explanation: 'BigQuery cobra por la cantidad de datos escaneados; por eso se ingresa el volumen estimado en TB.'
  },
  {
    id: 'cea-q90',
    prompt: 'Por que la calculadora de costos pide el sistema operativo al estimar una VM?',
    options: [
      'Todos los sistemas tienen tarifa fija',
      'Algunos sistemas operativos generan cargos adicionales',
      'Solo sirve para documentar',
      'Es requerido para BYOL'
    ],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Costos / Compute Engine',
    explanation: 'Imagenes como Windows Server incluyen licenciamiento y agregan un cargo extra al costo base de la VM.'
  },
  {
    id: 'cea-q91',
    prompt: 'Quieres crear metricas personalizadas en Stackdriver Monitoring sin usar la API de bajo nivel. Que proyecto open source puedes utilizar?',
    options: ['Prometheus', 'OpenCensus', 'Grafana', 'Nagios'],
    correctOptionIndexes: [1],
    correctOptionIndex: 1,
    topic: 'Observabilidad / Metricas Personalizadas',
    explanation: 'OpenCensus ofrece SDKs para instrumentar aplicaciones y enviar metricas custom hacia Stackdriver.'
  }
];

const cloudEngineerAssociateForm = {
  id: 'cloud-engineer-associate',
  title: 'Cloud Engineer Associate',
  description:
    'Formulario orientado a la certificacion Google Cloud Associate Cloud Engineer. Incluye escenarios de almacenamiento, redes, IAM y automatizacion.',
  questions: cloudEngineerAssociateQuestions,
  questionLimit: 50
};

export const forms = [
  {
    id: 'formulario-demo',
    title: 'Formulario de Ejemplo',
    description:
      'Formulario de muestra con 60 preguntas para demostrar el flujo de estudio. Reemplaza o complementa este contenido con tus propios formularios.',
    questions: createSampleQuestions(60),
    questionLimit: 50
  },
  {
    id: 'formulario-rapido',
    title: 'Repaso rapido Verdadero/Falso',
    description: 'Plantilla ideal para evaluaciones rapidas de conceptos clave en formato verdadero/falso.',
    questions: createTrueFalseQuestions(40),
    questionLimit: 20
  },
  cloudEngineerAssociateForm
];

export const DEFAULT_QUESTION_LIMIT = 50;
