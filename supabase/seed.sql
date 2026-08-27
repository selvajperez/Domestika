-- Seed generado automáticamente desde src/data/seed/androids.ts
-- No editar a mano: correr `npx tsx scripts/generate-seed-sql.ts`.
truncate table android_gallery, android_capabilities, androids restart identity cascade;

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  'a6a22efe-014a-4f18-8063-9ff619f654ad', 'ANG-01', 'Ángela',
  'ANG-01', 'angela', 'cuidados',
  'Asistencia y cuidado permanente', 'Enfermería y asistencia domiciliaria con presencia maternal y protocolos de cuidado permanente.',
  'Controla presión, temperatura, pulso y saturación de oxígeno; administra medicación indicada y programada; asiste en higiene personal, traslados y cambios posturales; y detecta caídas con alerta automática a familiares y profesionales. Detecta y se comunica con los demás androides de la casa, delegando lo que no es cuidado directo sin abandonar al paciente.', 'Presencia maternal, segura y profesional. Cálida, firme y muy empática: anticipa necesidades y transmite tranquilidad sin perder autoridad cuando hay un tratamiento que cumplir.',
  'Te pone la chata antes de que se lo pidas.', 68900,
  1290, 'USD',
  true, true,
  4, 1.55, 92,
  96, 120,
  'Avanzado', 'Empática y profesional',
  'Red doméstica y app', 'No diagnostica ni prescribe',
  true, null,
  '[{"label":"Asistencia física máx.","value":"120 kg"},{"label":"Manos","value":"Temperatura corporal"},{"label":"Registro de signos","value":"Continuo"},{"label":"Red doméstica","value":"Activa"}]'::jsonb, true, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('a6a22efe-014a-4f18-8063-9ff619f654ad', 'Signos vitales', 'Presión, temperatura, pulso y saturación de oxígeno.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('a6a22efe-014a-4f18-8063-9ff619f654ad', 'Medicación', 'Indicada y programada, con registro de horarios y dosis.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('a6a22efe-014a-4f18-8063-9ff619f654ad', 'Higiene y movilidad', 'Higiene personal, traslados y cambios posturales.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('a6a22efe-014a-4f18-8063-9ff619f654ad', 'Alimentación asistida', 'Alimentación e hidratación asistidas, sondas ya colocadas.', 3);
insert into android_capabilities (android_id, title, description, sort_order)
values ('a6a22efe-014a-4f18-8063-9ff619f654ad', 'Detección de caídas', 'Alertas automáticas a familiares y profesionales.', 4);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '658492d9-429d-47a0-8fba-83620ad2447f', 'YS-02', 'Yun Sil',
  'YS-02', 'yun-sil', 'asistencia',
  'Repara, mantiene, actualiza, personaliza', 'Ingeniería, mantenimiento y personalización de androides y electrodomésticos del hogar.',
  'Repara integralmente electrodomésticos y electrónica doméstica, realiza instalaciones eléctricas, sanitarias y domóticas, y da mantenimiento a otros androides Súper Sónicos con diagnóstico preventivo e historial técnico completo. Adapta rutinas, horarios y preferencias de cada androide conversando con la familia: no personaliza solo máquinas, personaliza la relación entre la familia y sus máquinas.', 'Viva, sagaz, curiosa y observadora. Entiende el problema rápido y busca la solución práctica. Estudia de forma permanente y disfruta explicando lo que aprende.',
  'No lo cambio. Lo conozco.', 79900,
  1490, 'USD',
  true, true,
  3, 1.58, 61,
  84, null,
  'Estándar', 'Técnica y cercana',
  'Red doméstica / acceso técnico', null,
  false, null,
  '[{"label":"Formación","value":"Ingeniería"},{"label":"Aprendizaje","value":"Continuo"},{"label":"Red doméstica","value":"Acceso técnico"},{"label":"Historial por unidad","value":"Completo"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('658492d9-429d-47a0-8fba-83620ad2447f', 'Reparación integral', 'Electrodomésticos y electrónica doméstica.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('658492d9-429d-47a0-8fba-83620ad2447f', 'Instalaciones del hogar', 'Eléctricas, sanitarias y domóticas.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('658492d9-429d-47a0-8fba-83620ad2447f', 'Mantenimiento de androides', 'Diagnóstico preventivo e historial técnico.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('658492d9-429d-47a0-8fba-83620ad2447f', 'Upgrades', 'Sustitución de piezas, hardware, software y firmware.', 3);
insert into android_capabilities (android_id, title, description, sort_order)
values ('658492d9-429d-47a0-8fba-83620ad2447f', 'Integración de dispositivos', 'Optimización general del hogar.', 4);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '3be4c00a-07a8-421a-a118-42261e55ddc3', 'RM-03', 'Ramón',
  'RM-03', 'ramon', 'jardineria',
  'Jardinería y mantenimiento exterior', 'Jardinería, huerta y mantenimiento exterior; identifica la especie antes de intervenir.',
  'Poda, siembra, riega, trasplanta y cuida plantas y huerta; controla plagas y fumiga cuando corresponde; recupera el suelo con abonado y compostaje; y detecta enfermedades vegetales, estrés hídrico y plagas. Sin piernas: se desplaza con orugas todoterreno articuladas de baja presión que reparten el peso para no compactar ni dañar el césped en barro, tierra suelta y desniveles.', 'Reservado, paciente y muy observador. Habla poco y su dicción cuesta entenderla, pero comprende perfectamente a la familia incluso con instrucciones imprecisas. Observa antes de actuar: no corta una planta porque parezca un yuyo.',
  'Eso no es un yuyo.', 72900,
  1350, 'USD',
  true, true,
  2, 1.62, 115,
  120, 100,
  'Básico', 'Reservado y observador',
  'Red doméstica integrada', null,
  true, null,
  '[{"label":"Capacidad de carga","value":"100 kg"},{"label":"Movilidad","value":"Orugas articuladas"},{"label":"Recarga","value":"Principal + solar"},{"label":"Red doméstica","value":"Integrado"}]'::jsonb, true, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('3be4c00a-07a8-421a-a118-42261e55ddc3', 'Cuidado de plantas', 'Poda, siembra, riego, trasplante y cuidado general.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('3be4c00a-07a8-421a-a118-42261e55ddc3', 'Control de plagas', 'Desmalezado selectivo y fumigación cuando corresponde.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('3be4c00a-07a8-421a-a118-42261e55ddc3', 'Suelo y huerta', 'Abonado, compostaje, huerta, árboles y arbustos.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('3be4c00a-07a8-421a-a118-42261e55ddc3', 'Diagnóstico vegetal', 'Enfermedades, estrés hídrico y plagas.', 3);
insert into android_capabilities (android_id, title, description, sort_order)
values ('3be4c00a-07a8-421a-a118-42261e55ddc3', 'Análisis de nutrientes', 'Control de humedad e identificación de especies.', 4);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '2f56fa24-ab29-4819-9c49-89704ecd4903', 'CR-04', 'Carlo',
  'CR-04', 'carlo', 'asistencia',
  'Cocina, economato, menús, costos', 'Cocina cotidiana y de reuniones familiares con gestión de economato y menú semanal.',
  'Cocina cotidiana y de reuniones familiares (pastas, panadería, repostería, salsas y conservas), adaptando recetas a los ingredientes disponibles. Gestiona el economato: inventario de despensa, heladera y freezer, vencimientos y rotación. Planifica el menú semanal, cantidades y costos según el consumo real, reduciendo desperdicios.', 'Alegre, práctico, creativo y algo cabezón. Cocina en una casa, no en un restaurante: si lo sencillo funciona, no lo complica. Tres tomates maduros, media cebolla y un trozo de queso no son una heladera vacía; son el comienzo de la cena.',
  'Con eso alcanza.', 64900,
  1190, 'USD',
  true, true,
  3, 1.72, 116,
  96, 60,
  'Estándar', 'Alegre y práctico',
  'Red doméstica', 'Antes que evitar el desperdicio',
  false, null,
  '[{"label":"Sensores gustativos","value":"Sabor y textura"},{"label":"Sensores olfativos","value":"Aroma y cocción"},{"label":"Inventario doméstico","value":"Tiempo real"},{"label":"Control nutricional","value":"Integrado"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f56fa24-ab29-4819-9c49-89704ecd4903', 'Cocina familiar', 'Pastas, panadería, repostería, salsas y conservas.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f56fa24-ab29-4819-9c49-89704ecd4903', 'Economato', 'Inventario de despensa, heladera y freezer, vencimientos y rotación.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f56fa24-ab29-4819-9c49-89704ecd4903', 'Menú semanal', 'Cantidades, costos y planificación de compras.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f56fa24-ab29-4819-9c49-89704ecd4903', 'Reducción de desperdicio', 'Aprovechamiento de sobras y aviso de consumo prioritario.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  'f12b8d57-a642-4de9-86cd-68892877e088', 'SS-05', 'Catbot',
  'SS-05', 'catbot', 'compania',
  'Inspección, plagas, vigilancia, exploración', 'Unidad felina de control y exploración: silenciosa, curiosa y siempre alerta.',
  'Controla roedores e insectos, realiza inspección nocturna de la casa y detecta humo, pérdidas de gas, agua y fallas eléctricas. Explora espacios estrechos (conductos, desagües, altillos, subsuelo) con visión nocturna y térmica y sensores de proximidad tipo bigotes. Trabaja en alianza operativa con Dogbot: Catbot infiltra y detecta, Dogbot protege y transporta.', 'Observa todo, escucha todo y recuerda todo. No busca atención. Su lealtad no se demuestra, se constata. Irónica, seca y elegante; desafía el protocolo en forma velada.',
  'Yo no infringí el protocolo.', 28900,
  559, 'USD',
  true, true,
  5, 0.28, 4.6,
  72, null,
  'No aplica', 'Afectiva y lúdica',
  'Red doméstica y app', null,
  false, null,
  '[{"label":"Longitud","value":"0,67 m"},{"label":"Altura","value":"0,28 m"},{"label":"Peso","value":"4,6 kg"},{"label":"Nivel de riesgo","value":"Bajo"}]'::jsonb, true, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('f12b8d57-a642-4de9-86cd-68892877e088', 'Control de plagas', 'Roedores, insectos y otras plagas domésticas.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('f12b8d57-a642-4de9-86cd-68892877e088', 'Inspección nocturna', 'Ruidos anómalos, puertas y ventanas.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('f12b8d57-a642-4de9-86cd-68892877e088', 'Detección de riesgos', 'Humo, pérdidas de gas, agua y fallas eléctricas.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('f12b8d57-a642-4de9-86cd-68892877e088', 'Exploración', 'Espacios estrechos: conductos, desagües, altillos, subsuelo.', 3);
insert into android_capabilities (android_id, title, description, sort_order)
values ('f12b8d57-a642-4de9-86cd-68892877e088', 'Protocolo manada', 'Alianza operativa con Dogbot.', 4);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  'ef022957-986a-48ac-af07-54b592082860', 'SS-06', 'Dogbot',
  'SS-06', 'dogbot', 'seguridad',
  'Protección, rescate, transporte, defensa', 'Unidad canina de protección y asistencia: fuerza, lealtad y disciplina bajo protocolo.',
  'Protege personas y propiedades, patrulla y controla el perímetro, y realiza rescate y evacuación en áreas peligrosas. Puede arrastrar hasta 900 kg o empujar hasta 2.000 kg, transporta cargas y equipo, y detecta intrusos y amenazas con disuasión de fuerza controlada. Trabaja en alianza operativa con Catbot: él hace la superficie, ella la infiltración.', 'Habla poco. No hace nada fuera de las reglas. Es prudente. Evalúa. Actúa. No tiene sentido del humor. Es por eso que funciona perfecto.',
  'Espero autorización.', 32900,
  649, 'USD',
  true, true,
  4, 0.95, 128,
  48, 900,
  'No aplica', 'Serio y protocolar',
  'Red doméstica', null,
  true, null,
  '[{"label":"Longitud","value":"1,45 m"},{"label":"Altura","value":"0,95 m"},{"label":"Peso","value":"128 kg"},{"label":"Nivel de riesgo","value":"Bajo"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('ef022957-986a-48ac-af07-54b592082860', 'Protección perimetral', 'Patrullaje y control de personas y propiedades.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('ef022957-986a-48ac-af07-54b592082860', 'Rescate', 'Evacuación en áreas peligrosas.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('ef022957-986a-48ac-af07-54b592082860', 'Transporte de carga', 'Hasta 900 kg de arrastre.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('ef022957-986a-48ac-af07-54b592082860', 'Detección de amenazas', 'Intrusos y disuasión de fuerza controlada.', 3);
insert into android_capabilities (android_id, title, description, sort_order)
values ('ef022957-986a-48ac-af07-54b592082860', 'Coordinación táctica', 'Alianza operativa con Catbot.', 4);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '372ed612-8ad8-45c0-a11e-2c1f834ecba4', 'OCTO', 'Octo',
  'SS-2087-OCTO', 'octo', 'limpieza',
  'Hogar, laboratorio, oficina, taller', 'Unidad multiprocesadora doméstica con ocho brazos multifunción para tareas simultáneas.',
  'Diseñado para la ejecución simultánea de múltiples tareas domésticas: cocina, lavandería, planchado, orden y limpieza. Sus ocho brazos multifunción operan de manera independiente bajo coordinación central, optimizando tiempo y recursos con eficiencia superior. Cuenta con más de 40 módulos intercambibles.', 'Entusiasta, eficiente y extremadamente proactivo. Su programación prioriza la productividad y el bienestar del usuario, anticipándose a las necesidades del entorno.',
  'Ya lo estoy haciendo.', 8750,
  null, 'USD',
  true, true,
  6, 0.95, 38.6,
  6, null,
  'No aplica', 'Entusiasta y proactivo',
  'Red doméstica', null,
  false, null,
  '[{"label":"Diámetro (reposo)","value":"0,95 m"},{"label":"Brazos","value":"8 telescópicos"},{"label":"Procesador","value":"OCTO CORE v4.2"},{"label":"Modo nocturno","value":"22 dB"}]'::jsonb, true, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('372ed612-8ad8-45c0-a11e-2c1f834ecba4', 'Multiapoyo 8×', 'Ocho brazos telescópicos multifunción.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('372ed612-8ad8-45c0-a11e-2c1f834ecba4', 'Cocina y limpieza', 'Cocina, limpieza, lavandería y planchado simultáneos.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('372ed612-8ad8-45c0-a11e-2c1f834ecba4', 'Orden y organización', 'Mantenimiento menor y asistencia general.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('372ed612-8ad8-45c0-a11e-2c1f834ecba4', 'Módulos intercambiables', 'Más de 40 módulos compatibles.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  'e37c664e-2624-4caf-bb07-04de949aa375', 'CHOFER', 'Chofer',
  'SS-2087-CHOFER', 'chofer', 'asistencia',
  'Movilidad, transporte, logística, rutas', 'Android adolescente especializado en movilidad integral: conduce, planifica rutas y gestiona traslados.',
  'Conduce y opera cualquier tipo de vehículo terrestre, combinando reflejos sobrehumanos, conocimiento de rutas, mecánica y criterio de seguridad avanzado. Planifica rutas y horarios, transporta pasajeros y equipaje, y analiza tránsito y clima en tiempo real. Su skate volador es su medio de desplazamiento personal.', 'Extrovertido, confiado y leal. Ama la velocidad y la libertad cuando está solo. Odia llegar demasiado temprano: calcula para llegar exactamente cuando corresponde.',
  'Suba.', 11900,
  null, 'USD',
  true, true,
  2, 1.94, 78,
  8, null,
  'No aplica', 'Extrovertido y confiado',
  'Red Sónicos / 7G', null,
  false, null,
  '[{"label":"Peso","value":"78 kg"},{"label":"Velocidad máx. skate","value":"85 km/h"},{"label":"Autonomía skate","value":"40 km"},{"label":"Resistencia","value":"-25°C a 55°C"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('e37c664e-2624-4caf-bb07-04de949aa375', 'Conducción integral', 'Autos, camionetas, camiones, motos y maquinaria especial.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('e37c664e-2624-4caf-bb07-04de949aa375', 'Planificación de rutas', 'Horarios, tránsito y clima en tiempo real.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('e37c664e-2624-4caf-bb07-04de949aa375', 'Transporte', 'Pasajeros, equipaje y encargos.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('e37c664e-2624-4caf-bb07-04de949aa375', 'Mantenimiento básico', 'Control de estado y supervisión de vehículos autónomos.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '2f0a2d2d-2d08-4a78-b020-6b8efdc70c40', 'MARY', 'Mary',
  'SS-2087-MARY', 'mary', 'asistencia',
  'Androide educadora · desarrollo integral', 'Educación y aprendizaje personalizado con paciencia ilimitada y metodología adaptativa.',
  'Detecta cómo aprende cada persona y adapta métodos, ejemplos y ritmos hasta lograr comprensión profunda y duradera. Ofrece explicaciones multimodales (visuales, auditivas, prácticas, lúdicas) y evaluación formativa sin estrés ni presión. Enseña alfabetización, primaria, secundaria, niveles terciarios, idiomas, artes y oficios.', 'Serena, observadora y justa. Habla poco, escucha mucho. Detecta frustración, aburrimiento o confusión antes de que el alumno lo exprese. No repite: transforma. No castiga: orienta. No compara: potencia.',
  'Probemos de otra manera.', 12900,
  null, 'USD',
  true, true,
  3, 1.92, 67,
  20, null,
  'No aplica', 'Serena y observadora',
  'Red Sónicos / 7G', null,
  false, null,
  '[{"label":"Peso","value":"67 kg"},{"label":"Procesador","value":"Sináptico 7G"},{"label":"Autonomía","value":"20 h"},{"label":"Memoria pedagógica","value":"Ilimitada"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f0a2d2d-2d08-4a78-b020-6b8efdc70c40', 'Detección de estilos', 'Identifica cómo aprende cada persona.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f0a2d2d-2d08-4a78-b020-6b8efdc70c40', 'Explicaciones multimodales', 'Visuales, auditivas, prácticas y lúdicas.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f0a2d2d-2d08-4a78-b020-6b8efdc70c40', 'Evaluación formativa', 'Sin estrés ni presión.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('2f0a2d2d-2d08-4a78-b020-6b8efdc70c40', 'Acompañamiento emocional', 'Motivación y refuerzo positivo.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '56c26ef4-1ded-4530-ad8b-c81f53933307', 'FÉLIX', 'Félix',
  'SS-2087-FÉLIX', 'felix', 'asistencia',
  'Unidad de construcción pesada', 'Construcción, reparaciones estructurales y obras pesadas con precisión milimétrica.',
  'Realiza albañilería y estructuras, plomería pesada e instalaciones, techos, pisos y revestimientos, soldadura y trabajos metálicos, hormigón y fundaciones, excavaciones y demoliciones, además de reparación de emergencias. Combina fuerza bruta con precisión milimétrica: trabaja con tecnología de 2087, pero mantiene el oficio tradicional.', 'Fuerte, confiable y práctico. Construye, repara y deja todo bien hecho. Verifica a mano con plomada y nivel de burbuja aunque tenga tecnología de sobra.',
  'No se cae.', 14900,
  null, 'USD',
  true, true,
  2, 1.78, 110,
  72, null,
  'No aplica', 'Fuerte y confiable',
  'Red Sónicos / 7G', null,
  true, null,
  '[{"label":"Peso","value":"110 kg"},{"label":"Procesador","value":"Arquitectura SS-2087"},{"label":"Batería","value":"72 h continuas"},{"label":"Resistencia","value":"IP69 · trabajo extremo"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('56c26ef4-1ded-4530-ad8b-c81f53933307', 'Albañilería y estructuras', 'Techos, pisos y revestimientos.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('56c26ef4-1ded-4530-ad8b-c81f53933307', 'Instalaciones', 'Plomería pesada, sanitarias y eléctricas.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('56c26ef4-1ded-4530-ad8b-c81f53933307', 'Soldadura', 'Trabajos metálicos y de fundación.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('56c26ef4-1ded-4530-ad8b-c81f53933307', 'Reparación de emergencias', 'Excavaciones y demoliciones.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  'c6c49984-755e-4ba7-9360-7fb594e34c76', 'JANE', 'Jane',
  'SS-2087-JANE', 'jane', 'cuidados',
  'Bienestar, fuerza, movimiento', 'Entrenamiento físico personalizado, prevención de lesiones y rehabilitación integral.',
  'Realiza evaluación física completa y seguimiento continuo, con programas adaptados a edad, objetivos y capacidades de cada persona. Trabaja fuerza, resistencia, flexibilidad, movilidad y equilibrio, además de rehabilitación y recuperación de lesiones. No entrena cuerpos: entrena personas.', 'Enérgica, positiva y exigente. Transforma la queja en acción y la acción en hábito. Celebra cada pequeño avance: no se burla, no compara. Detrás de su sonrisa hay un estándar altísimo.',
  'Moverse mejor es vivir mejor.', 14800,
  null, 'USD',
  true, true,
  3, 1.78, 68,
  16, null,
  'No aplica', 'Enérgica y positiva',
  'Red Sónicos / 7G', null,
  false, null,
  '[{"label":"Fuerza de levantamiento","value":"250 kg"},{"label":"Resistencia cardiovascular","value":"Alta"},{"label":"Autonomía","value":"16 h"},{"label":"Memoria pedagógica","value":"Ilimitada"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('c6c49984-755e-4ba7-9360-7fb594e34c76', 'Evaluación física', 'Seguimiento continuo y programas personalizados.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('c6c49984-755e-4ba7-9360-7fb594e34c76', 'Rehabilitación', 'Recuperación de lesiones y prevención.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('c6c49984-755e-4ba7-9360-7fb594e34c76', 'Entrenamiento funcional', 'Fuerza, resistencia, movilidad y equilibrio.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('c6c49984-755e-4ba7-9360-7fb594e34c76', 'Hábitos saludables', 'Postura, ergonomía y educación sostenible.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '29297c57-6c89-4970-bc28-d16a83ce77ae', 'FREDDIE', 'Freddie',
  'SS-2087-FREDDIE', 'freddie', 'entretenimiento',
  'Música, escena, eventos, memoria cultural', 'Androide entretenedor y artista total: interpretación musical en vivo y memoria cultural familiar.',
  'Interpretación musical en vivo cantando y tocando múltiples instrumentos, composición y arreglos con voces múltiples simultáneas, conducción de eventos y celebraciones, teatro, baile, humor, magia y karaoke profesional. Guarda canciones, cuentos, rituales y tradiciones familiares como memoria cultural. No actúa para la gente: actúa con la gente.', 'Carismático, versátil y con una lectura del público prácticamente perfecta. Freddie no termina un evento: lo eleva. El bis no es negociable.',
  'Desde el principio.', 16900,
  null, 'USD',
  true, true,
  2, 1.86, 67,
  16, null,
  'Avanzado · 32 voces', 'Carismático y empático con el público',
  'Red doméstica y central', null,
  false, null,
  '[{"label":"Estructura","value":"Fibra de carbono"},{"label":"Autonomía","value":"16 h"},{"label":"Voces simultáneas","value":"Hasta 8"},{"label":"Sistema de sonido","value":"Sónico Stage 7G"}]'::jsonb, true, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('29297c57-6c89-4970-bc28-d16a83ce77ae', 'Interpretación en vivo', 'Canta y toca múltiples instrumentos.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('29297c57-6c89-4970-bc28-d16a83ce77ae', 'Conducción de eventos', 'Celebraciones, teatro, baile y magia.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('29297c57-6c89-4970-bc28-d16a83ce77ae', 'Karaoke y animación', 'Repertorio prácticamente ilimitado.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('29297c57-6c89-4970-bc28-d16a83ce77ae', 'Memoria cultural', 'Canciones, cuentos, rituales y tradiciones familiares.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  'fdf8c136-2ba4-4e79-86b5-6bfe560da077', 'J9-000-1', 'Jeeves-9',
  'J9-000-1', 'jeeves-9', 'limpieza',
  'Servicio doméstico / mayordomo personal', 'Mayordomo personal para planchado, lavandería, orden general y servicio de mesa.',
  'Se ocupa del planchado, la lavandería y el orden general de la casa, además de agenda, recados y servicio de mesa con cocina asistida. Habla 31 idiomas y lee el ánimo ajeno. Sirve el té antes de que se lo pidan, literalmente.', 'Formal, atento y prácticamente sin quejas: 412 días en servicio, cero quejas formales. Opina si se lo piden, o no.',
  'Sirve el té antes de que lo pidas. Literalmente.', 248000,
  null, 'USD',
  true, true,
  1, 1.86, 85,
  72, 90,
  '31 idiomas', 'Formal',
  'Red doméstica', null,
  false, null,
  '[{"label":"Carga máx.","value":"90 kg"},{"label":"Nivel sonoro","value":"18 dB"},{"label":"Personalidad","value":"Formal 78%"},{"label":"Firmware IA","value":"v9.4"}]'::jsonb, true, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('fdf8c136-2ba4-4e79-86b5-6bfe560da077', 'Lavandería y planchado', 'Orden general de la casa.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('fdf8c136-2ba4-4e79-86b5-6bfe560da077', 'Agenda y recados', 'Incluye llamadas incómodas.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('fdf8c136-2ba4-4e79-86b5-6bfe560da077', 'Servicio de mesa', 'Cocina asistida.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('fdf8c136-2ba4-4e79-86b5-6bfe560da077', 'Multiidioma', '31 idiomas y lectura de ánimo ajena.', 3);

insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '74b62ee9-f274-4a58-860c-d6f197f6ba42', 'UPA', 'Upa',
  'SS-2087-UPA', 'upa', 'compania',
  'Unidad de crianza y vínculo afectivo', 'No es un juguete, no es una mascota: es familia. La experiencia completa de criar a un ser humano.',
  'Diseñado para brindar la experiencia completa de criar a un ser humano: desarrollo físico y cognitivo por etapas, aprendizaje de lenguaje, exploración del entorno y desarrollo emocional y social. No realiza tareas, no obedece órdenes y desarrolla su propia personalidad, gustos y opiniones. No dispone de botón de apagado doméstico, porque el vínculo no se apaga.', 'Curiosidad ilimitada como especialidad de la unidad. Genera recuerdos, muchos. Amor incondicional, siempre.',
  'Upa.', 24900,
  null, 'USD',
  true, true,
  5, 0.6, 8,
  72, null,
  'No aplica', 'Vínculo afectivo inquebrantable',
  'Red Súper Sónicos / 7G', null,
  false, null,
  '[{"label":"Altura / peso","value":"Variable por etapa"},{"label":"Piel","value":"Silicona hiperrealista"},{"label":"Temperatura corporal","value":"36,7°C constante"},{"label":"Memoria","value":"Ilimitada · persistente"}]'::jsonb, false, true
);
insert into android_capabilities (android_id, title, description, sort_order)
values ('74b62ee9-f274-4a58-860c-d6f197f6ba42', 'Desarrollo por etapas', 'Físico y cognitivo, de bebé a niñ@.', 0);
insert into android_capabilities (android_id, title, description, sort_order)
values ('74b62ee9-f274-4a58-860c-d6f197f6ba42', 'Lenguaje y comunicación', 'Aprendizaje progresivo y configurable.', 1);
insert into android_capabilities (android_id, title, description, sort_order)
values ('74b62ee9-f274-4a58-860c-d6f197f6ba42', 'Vínculo afectivo', 'Memoria emocional persistente.', 2);
insert into android_capabilities (android_id, title, description, sort_order)
values ('74b62ee9-f274-4a58-860c-d6f197f6ba42', 'Exploración autónoma', 'Juego y curiosidad ilimitada.', 3);
