CREATE DATABASE IF NOT EXISTS DBaplicattionPlenaInclusion;
USE	DBaplicattionPlenaInclusion;

CREATE TABLE IF NOT EXISTS USUARIOS(
	codUsuario varchar(10) not null,
	dni varchar(10) not null,
    nombre varchar(20),
    apellido1 varchar(20),
    apellido2 varchar(20),
    anyoNacimiento date default null,
    correoElectronico varchar(25) not null,
    numTlfn varchar(15) default null,
    contraseña varchar(255) not null,
    primary key(`codUsuario`)
    )ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;

CREATE TABLE IF NOT EXISTS CLIENTES(
    codUsuario varchar(10) not null,
    genero varchar(10) default null,
    cuidadosEspeciales boolean not null,
    datosDelTutor varchar(100) default null,
    primary key(`codUsuario`),
    foreign key(`codUsuario`) REFERENCES USUARIOS(`codUsuario`)
    )ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;

CREATE TABLE IF NOT EXISTS PROFESIONALES(
	codUsuario varchar(10) not null,
    disponibilidad boolean not null,
	primary key(`codUsuario`),
    foreign key(`codUsuario`) REFERENCES USUARIOS(`codUsuario`)
    )ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
CREATE TABLE IF NOT EXISTS PROVINCIA(
    codProvincia varchar(10) not null,
    nombreProvincia varchar(10) not null,
    primary key(`codProvincia`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
    
CREATE TABLE IF NOT EXISTS CIUDAD(
    codCiudad varchar(10) not null,
    nombreCiudad varchar(10) not null,
    codProvincia varchar(10) not null,
    primary key(`codCiudad`),
    foreign key(`codProvincia`) REFERENCES PROVINCIA(`codProvincia`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
    
CREATE TABLE IF NOT EXISTS DISTRITO(
    codigoPostal integer(5) not null,
    nombreDistrito varchar(10) not null,
    codCiudad varchar(10) not null,
    primary key(`codigoPostal`),
    foreign key(`codCiudad`) REFERENCES CIUDAD(`codCiudad`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;

CREATE TABLE IF NOT EXISTS UBICACION_CENTRO(
    idUbicacion varchar(10) not null,
    calle varchar(100) not null,
    nombre_numero varchar(10) default null,
    codigoPostal integer(5) not null,
    primary key(`idUbicacion`),
	foreign key(`codigoPostal`) REFERENCES DISTRITO(`codigoPostal`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
    
CREATE TABLE IF NOT EXISTS ACTIVIDADES(
	idActividad varchar(10) not null,
    codUsuario varchar(10) not null,
    nombre varchar(25) not null,
    descripcion varchar(100) default null,
    primary key(`idActividad`),
    foreign key(`codUsuario`) REFERENCES PROFESIONALES(`codUsuario`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
    
CREATE TABLE IF NOT EXISTS ACTIVIDAD_REPETICION(
	idActividadRepetcion varchar(10) not null,
    codUsuario varchar(10) not null,
	fechaYhora datetime not null,
    idUbicacion varchar(10) not null,
    idActividad varchar(10) not null,
    primary key(`idActividadRepetcion`),
    foreign key(`codUsuario`) REFERENCES PROFESIONALES(`codUsuario`),
    foreign key(`idUbicacion`) REFERENCES UBICACION_CENTRO(`idUbicacion`),
    foreign key(`idActividad`) REFERENCES ACTIVIDADES(`idActividad`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
    
CREATE TABLE IF NOT EXISTS CLIENTES_ACTVREPETICION(
	codUsuario varchar(10) not null,
    idActividadRepetcion varchar(10) not null,
    primary key(`codUsuario`,`idActividadRepetcion`),
    foreign key(`codUsuario`) REFERENCES CLIENTES(`codUsuario`),
    foreign key(`idActividadRepetcion`) REFERENCES ACTIVIDAD_REPETICION(`idActividadRepetcion`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
    
CREATE TABLE IF NOT EXISTS VALORACIONES(
	idValoracion varchar(10) not null,
    posicionPulgar boolean default null,
    descripcion varchar(100) default null,
    codUsuario varchar(10) not null,
    idActividadRepetcion varchar(10) not null,
    primary key(`idValoracion`),
    foreign key(`codUsuario`) REFERENCES CLIENTES_ACTVREPETICION(`codUsuario`),
     foreign key(`idActividadRepetcion`) REFERENCES CLIENTES_ACTVREPETICION(`idActividadRepetcion`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;

CREATE TABLE IF NOT EXISTS TEMATICAS(
    idTematica varchar(10) not null,
    nombre varchar(20) not null,
    descripcion varchar(100) default null,
    primary key(`idTematica`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;
    
CREATE TABLE IF NOT EXISTS ACTIVIDADES_TEMATICAS(
	idActividad varchar(10) not null,
    idTematica varchar(10) not null,
    primary key(`idActividad`,`idTematica`),
    foreign key(`idActividad`) REFERENCES ACTIVIDADES(`idActividad`),
    foreign key(`idTematica`) REFERENCES TEMATICAS(`idTematica`)
	)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=201;

-- INSERTS

INSERT INTO USUARIOS(codUsuario, dni, nombre, apellido1,
			apellido2,anyoNacimiento, correoElectronico, contraseña)
VALUES		('PI2023001','29097357A','Amadeo','Flores','Espinosa'
			,'1999-06-20','amadeoFE99@gmail.com','AmadeoFE9923'),
			('PI2023002','26587632N','Lucia','De Pablo','Gil'
			,'2001-09-22','luciluci01@gmail.com','LuciaDPG0123'),
			('PI2023003','25332654H','Leire','Degrassa','Alcibar'
			,'2001-09-27','leigrasalci@gmail.com','LeireDA0123'),
            ('PI2023004','23764587S','Joselito','Heredia','Jimenez'
			,'1987-02-04','ElJoselito@gmail.com','JoselitoHJ8723'),
            ('PI2023005','94565310D','Miguel','martinez','martinez'
			,'1991-05-16','mimarmi16@gmail.com','MiguelMM9123'),
            ('PI2023006','23095867B','Desire','Dimitrova','Micheva'
			,'2000-07-05','desireTiraDM@gmail.com','DesireDM0023');

INSERT INTO CLIENTES(codUsuario, genero,cuidadosEspeciales)
VALUES		('PI2023001','MASCULINO',true),
			('PI2023003','FEMENINO',false),
            ('PI2023006','FEMENINO',false);

INSERT INTO PROFESIONALES(codUsuario,disponibilidad)
VALUES		('PI2023002',true),
			('PI2023004',true),
            ('PI2023005',false);
            
INSERT INTO ACTIVIDADES(idActividad,codUsuario,nombre)
VALUES		('ACT0000001','PI2023002','futbol'),
			('ACT0000002','PI2023004','peonza'),
            ('ACT0000003','PI2023004','cocina Asiatica'),
            ('ACT0000004','PI2023002','natacion'),
            ('ACT0000005','PI2023005','papiroflexia'),
            ('ACT0000006','PI2023002','Scape Room'),
			('ACT0000007','PI2023005','baloncesto'),
            ('ACT0000008','PI2023002','bachata');

INSERT INTO PROVINCIA(codProvincia, nombreProvincia)
VALUES		('PRV001', 'ZARAGOZA'),
			('PRV002', 'TUDELA'),
            ('PRV003', 'GALICIA');

INSERT INTO CIUDAD(codCiudad, nombreCiudad, codProvincia)
VALUES		('CIU001', 'ZARAGOZA', 'PRV001'),
			('CIU002', 'TARAZONA', 'PRV001'),
            ('CIU003', 'TUDELA', 'PRV002');

INSERT INTO DISTRITO(codigoPostal, nombreDistrito, codCiudad)
VALUES		('50011', 'OLIVER', 'CIU001'),
			('50012', 'VALDEFIERO', 'CIU001'),
            ('50018', 'ACTUR', 'CIU001');

INSERT INTO UBICACION_CENTRO(idUbicacion, calle, nombre_numero, codigoPostal)
VALUES		('UBC001', 'C. de Joaquina Zamora Sarrate', 'Numero 4','50018'),
			('UBC002', 'C. de San Alberto Magno', 'Numero 7','50011');
            
INSERT INTO ACTIVIDAD_REPETICION(idActividadRepetcion,
            codUsuario,fechaYhora,idUbicacion,idActividad)
VALUES		('ACTRE00001','PI2023002','2023-04-14 18:00:00','UBC002','ACT0000008'),
			('ACTRE00002','PI2023005','2020-01-12 10:30:00','UBC001','ACT0000001'),
            ('ACTRE00003','PI2023004','2023-09-21 18:00:00','UBC001','ACT0000007'),
            ('ACTRE00004','PI2023002','2023-04-04 16:30:00','UBC001','ACT0000005'),
            ('ACTRE00005','PI2023002','2023-04-05 16:30:00','UBC001','ACT0000005'),
            ('ACTRE00006','PI2023004','2022-04-14 18:00:00','UBC002','ACT0000008'),
            ('ACTRE00007','PI2023004','2021-04-14 18:00:00','UBC002','ACT0000008'),
            ('ACTRE00008','PI2023005','2023-04-02 18:00:00','UBC001','ACT0000001');

INSERT INTO CLIENTES_ACTVREPETICION(codUsuario, idActividadRepetcion)
VALUES		('PI2023001','ACTRE00001'),
			('PI2023003','ACTRE00001'),
            ('PI2023001','ACTRE00002'),
            ('PI2023006','ACTRE00002'),
			('PI2023003','ACTRE00003'),
            ('PI2023006','ACTRE00003'),
            ('PI2023001','ACTRE00004'),
            ('PI2023003','ACTRE00004'),
            ('PI2023003','ACTRE00005'),
            ('PI2023006','ACTRE00005'),
            ('PI2023001','ACTRE00006'),
            ('PI2023006','ACTRE00006'),
            ('PI2023001','ACTRE00007'),
            ('PI2023003','ACTRE00007'),
            ('PI2023003','ACTRE00008'),
            ('PI2023006','ACTRE00008');

INSERT INTO TEMATICAS(idTematica, nombre)
VALUES		('TEM001','DEPORTES'),
			('TEM002', 'JUEGOS'),
            ('TEM003', 'APTITUDES SOCIALES'),
            ('TEM004', 'IDIOMAS'),
            ('TEM005', 'ESCURSIONES'),
            ('TEM006', 'CURSOS');

INSERT INTO ACTIVIDADES_TEMATICAS(idActividad, idTematica)
VALUES		('ACT0000001','TEM001'),
			('ACT0000002','TEM002'),
            ('ACT0000003','TEM003'),
            ('ACT0000004','TEM001'),
            ('ACT0000005','TEM002'),
            ('ACT0000006','TEM002'),
			('ACT0000007','TEM001'),
            ('ACT0000008','TEM001');

INSERT INTO VALORACIONES(idValoracion, posicionPulgar, codUsuario, idActividadRepetcion)
VALUES		('VAL001',true,'PI2023001','ACTRE00001'),
			('VAL002',true,'PI2023003','ACTRE00001'),
			('VAL003',true,'PI2023001','ACTRE00002'),
            ('VAL004',true,'PI2023006','ACTRE00002'),
			('VAL005',true,'PI2023001','ACTRE00003'),
            ('VAL006',true,'PI2023006','ACTRE00003'),
            ('VAL007',true,'PI2023001','ACTRE00004'),
            ('VAL008',true,'PI2023006','ACTRE00004'),
            ('VAL009',true,'PI2023001','ACTRE00005'),
            ('VAL0010',true,'PI2023003','ACTRE00005'),
            ('VAL0011',true,'PI2023001','ACTRE00006'),
            ('VAL0012',true,'PI2023006','ACTRE00006'),
            ('VAL0013',true,'PI2023001','ACTRE00007'),
            ('VAL0014',true,'PI2023003','ACTRE00007'),
            ('VAL0015',true,'PI2023003','ACTRE00008'),
            ('VAL0016',true,'PI2023006','ACTRE00008');

-- USERS

CREATE USER ADMINISTRADOR identified by '1234';
GRANT ALL PRIVILEGES
ON	DBaplicattionPlenaInclusion.*
TO	ADMINISTRADOR;

CREATE USER LECTOR identified by '1234';
GRANT SELECT
ON	DBaplicattionPlenaInclusion.*
TO	LECTOR;

SHOW grants for ADMINISTRADOR;
SHOW grants for LECTOR;