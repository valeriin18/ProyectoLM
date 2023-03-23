CREATE DATABASE IF NOT EXISTS basePrueba;
use basePrueba;
CREATE TABLE Usuario(
dni VARCHAR(9) NOT NULL PRIMARY KEY,
nombre VARCHAR(15) NOT NULL,
apellidos VARCHAR(15) NOT NULL,
email VARCHAR(80) NOT NULL UNIQUE KEY,
id_ciudad INT NOT NULL,
fecha_nacimiento DATE NOT NULL,
descuento INT UNSIGNED,
fecha_alta DATE NOT NULL,
contraseña varchar(16) NOT NULL,
CONSTRAINT UsuarioReserva
FOREIGN KEY(id_ciudad) REFERENCES Ciudad (id_ciudad)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE UsuarioActividad(
dniUsuario varchar(9) NOT NULL PRIMARY KEY,
idActividad varchar(9),
CONSTRAINT Actividad
FOREIGN KEY(idActividad) REFERENCES Actividad(id),
CONSTRAINT Usuario
FOREIGN KEY(dniUsuario) REFERENCES Usuario(dni)
)ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE Actividad(
id varchar(9) NOT NULL PRIMARY KEY,
idCategoria varchar(9) NOT NULL,
descripcion varchar(2000) NOT NULL,
CONSTRAINT Categoria
FOREIGN KEY(idCategoria)REFERENCES Categoria(id)
)ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE Categoria(
id varchar(9) NOT NULL PRIMARY KEY,
tipo varchar(20) NOT NULL

)ENGINE=MyISAM DEFAULT CHARSET=latin1;