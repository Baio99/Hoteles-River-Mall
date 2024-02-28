/*==============================================================*/
/* DBMS name:      ORACLE Version 12c                           */
/* Created on:     27/2/2024 12:05:28                           */
/*==============================================================*/


alter table HABITACION
   drop constraint FK_HABITACI_TIENE_HOTEL;

alter table HOTEL
   drop constraint FK_HOTEL_PERTENECE_EMPRESA;

alter table RESERVACION
   drop constraint FK_RESERVAC_HACE_CLIENTE;

alter table RESERVACION
   drop constraint FK_RESERVAC_PAGO_HABITACI;

drop table CLIENTE cascade constraints;

drop table EMPRESA cascade constraints;

drop index TIENE_FK;

drop table HABITACION cascade constraints;

drop index PERTENECE_FK;

drop table HOTEL cascade constraints;

drop index PAGO_FK;

drop index HACE_FK;

drop table RESERVACION cascade constraints;

/*==============================================================*/
/* Table: CLIENTE                                               */
/*==============================================================*/
create table CLIENTE (
   CEDULA_CLIENTE       VARCHAR2(10)          not null,
   APELLIDOS_CLIENTE    VARCHAR2(50)          not null,
   NOMBRES_CLIENTE      VARCHAR2(50)          not null,
   DIRECCION_CLIENTE    VARCHAR2(50)          not null,
   TELEFONO_CLIENTE     VARCHAR2(10)          not null,
   EMAIL_CLIENTE        VARCHAR2(50)          not null,
   constraint PK_CLIENTE primary key (CEDULA_CLIENTE)
);

/*==============================================================*/
/* Table: EMPRESA                                               */
/*==============================================================*/
create table EMPRESA (
   COD_EMP              VARCHAR2(10)          not null,
   NOMBRE_EMP           VARCHAR2(20),
   DIRECCION_EMP        VARCHAR2(40),
   TELEFONO_EMP         VARCHAR2(11),
   constraint PK_EMPRESA primary key (COD_EMP)
);

/*==============================================================*/
/* Table: HABITACION                                            */
/*==============================================================*/
create table HABITACION (
   ID_HABITACION        VARCHAR2(10)          not null,
   ID_HOTEL             VARCHAR2(5)           not null,
   TIPO_HABITACION      VARCHAR2(50)          not null,
   PRECIO_HABITACION    NUMBER(9,2)           not null,
   DISPONIBILIDAD_HABITACION SMALLINT              not null,
   constraint PK_HABITACION primary key (ID_HABITACION)
);

/*==============================================================*/
/* Index: TIENE_FK                                              */
/*==============================================================*/
create index TIENE_FK on HABITACION (
   ID_HOTEL ASC
);

/*==============================================================*/
/* Table: HOTEL                                                 */
/*==============================================================*/
create table HOTEL (
   ID_HOTEL             VARCHAR2(5)           not null,
   COD_EMP              VARCHAR2(10)          not null,
   UBICACION_HOTEL      VARCHAR2(50)          not null,
   NUMEROHABITACIONES_HOTEL INTEGER               not null,
   CATEGORIA_HOTEL      VARCHAR2(50)          not null,
   NOMBRE_HOTEL         VARCHAR2(50)          not null,
   constraint PK_HOTEL primary key (ID_HOTEL)
);

/*==============================================================*/
/* Index: PERTENECE_FK                                          */
/*==============================================================*/
create index PERTENECE_FK on HOTEL (
   COD_EMP ASC
);

/*==============================================================*/
/* Table: RESERVACION                                           */
/*==============================================================*/
CREATE TABLE RESERVACION (
   CEDULA_CLIENTE       VARCHAR2(10)          not null,
   ID_HABITACION        VARCHAR2(10)          not null,
   ESTATUS_RES          CHAR(3)               not null
      constraint CKC_ESTATUS_RES_RESERVAC check (ESTATUS_RES in ('Conf','Canc','Pend')),
   FECHAINGRESO_RES     DATE,
   FECHASALIDA_RES      DATE,
   constraint PK_RESERVACION primary key (CEDULA_CLIENTE, ID_HABITACION)
)
PARTITION BY RANGE (FECHAINGRESO_RES) (
   PARTITION part_2019 VALUES LESS THAN (TO_DATE('01-01-2020', 'DD-MM-YYYY')) TABLESPACE ts_reservacion_2019,
   PARTITION part_2020 VALUES LESS THAN (TO_DATE('01-01-2021', 'DD-MM-YYYY')) TABLESPACE ts_reservacion_2020,
   PARTITION part_2021 VALUES LESS THAN (TO_DATE('01-01-2022', 'DD-MM-YYYY')) TABLESPACE ts_reservacion_2021,
   PARTITION part_2022 VALUES LESS THAN (TO_DATE('01-01-2023', 'DD-MM-YYYY')) TABLESPACE ts_reservacion_2022
   -- Agrega más particiones y tablespaces según sea necesario
);

/*==============================================================*/
/* Index: HACE_FK                                               */
/*==============================================================*/
create index HACE_FK on RESERVACION (
   CEDULA_CLIENTE ASC
);

/*==============================================================*/
/* Index: PAGO_FK                                               */
/*==============================================================*/
create index PAGO_FK on RESERVACION (
   ID_HABITACION ASC
);

alter table HABITACION
   add constraint FK_HABITACI_TIENE_HOTEL foreign key (ID_HOTEL)
      references HOTEL (ID_HOTEL);

alter table HOTEL
   add constraint FK_HOTEL_PERTENECE_EMPRESA foreign key (COD_EMP)
      references EMPRESA (COD_EMP);

alter table RESERVACION
   add constraint FK_RESERVAC_HACE_CLIENTE foreign key (CEDULA_CLIENTE)
      references CLIENTE (CEDULA_CLIENTE);

alter table RESERVACION
   add constraint FK_RESERVAC_PAGO_HABITACI foreign key (ID_HABITACION)
      references HABITACION (ID_HABITACION);

