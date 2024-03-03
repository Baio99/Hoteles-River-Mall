from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import cx_Oracle
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Path
# Configura la conexión a la base de datos Oracle
connection = cx_Oracle.connect("academico/academico@localhost:1521/XE")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Esto permitirá solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class Cliente(BaseModel):
    cedula_cliente: str
    apellidos_cliente: str
    nombres_cliente: str
    direccion_cliente: str
    telefono_cliente: str
    email_cliente: str

class Hotel(BaseModel):
    id_hotel: str
    cod_emp: str
    ubicacion_hotel: str
    numerohabitaciones_hotel: int
    categoria_hotel: str
    nombre_hotel: str

class Habitacion(BaseModel):
    id_habitacion: str
    id_hotel: str
    tipo_habitacion: str
    precio_habitacion: float
    disponibilidad_habitacion: int

class Reservacion(BaseModel):
    cedula_cliente: str
    id_habitacion: str
    estatus_res: str
    fechaingreso_res: str
    fechasalida_res: str


@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de hoteles"}

@app.get("/favicon.ico")
async def favicon():
    # Aquí puedes devolver un ícono de favicon si lo tienes, o simplemente ignorar la solicitud
    return



# Ruta para guardar un cliente
@app.post("/clientes/")
async def create_cliente(cliente: Cliente):
    cursor = connection.cursor()
    try:
        cursor.execute("""
            INSERT INTO CLIENTE (CEDULA_CLIENTE, APELLIDOS_CLIENTE, NOMBRES_CLIENTE, DIRECCION_CLIENTE, TELEFONO_CLIENTE, EMAIL_CLIENTE)
            VALUES (:cedula_cliente, :apellidos_cliente, :nombres_cliente, :direccion_cliente, :telefono_cliente, :email_cliente)
        """, cliente.dict())
        connection.commit()
        return {"message": "Cliente creado exitosamente"}
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al crear cliente: {error}")

@app.get("/clientes/")
async def get_clientes():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM CLIENTE")
        rows = cursor.fetchall()
        clientes = []
        for row in rows:
            clientes.append({
                "cedula_cliente": row[0],
                "apellidos_cliente": row[1],
                "nombres_cliente": row[2],
                "direccion_cliente": row[3],
                "telefono_cliente": row[4],
                "email_cliente": row[5]
            })
        return clientes
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al obtener clientes: {error}")
    
@app.get("/hoteles/")
async def get_hoteles():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM HOTEL")
        rows = cursor.fetchall()
        hoteles = []
        for row in rows:
            hoteles.append({
                "id_hotel": row[0],
                "cod_emp": row[1],
                "ubicacion_hotel": row[2],
                "numerohabitaciones_hotel": row[3],
                "categoria_hotel": row[4],
                "nombre_hotel": row[5]
            })
        return hoteles
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al obtener hoteles: {error}")

@app.post("/hoteles/")
async def create_hotel(hotel: Hotel):
    cursor = connection.cursor()
    try:
        cursor.execute("""
            INSERT INTO HOTEL (ID_HOTEL, COD_EMP, UBICACION_HOTEL, NUMEROHABITACIONES_HOTEL, CATEGORIA_HOTEL, NOMBRE_HOTEL)
            VALUES (:id_hotel, :cod_emp, :ubicacion_hotel, :numerohabitaciones_hotel, :categoria_hotel, :nombre_hotel)
        """, hotel.dict())
        connection.commit()
        return {"message": "Hotel creado exitosamente"}
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al crear hotel: {error}")

@app.get("/habitaciones/")
async def get_habitaciones():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM HABITACION")
        rows = cursor.fetchall()
        habitaciones = []
        for row in rows:
            habitaciones.append({
                "id_habitacion": row[0],
                "id_hotel": row[1],
                "tipo_habitacion": row[2],
                "precio_habitacion": row[3],
                "disponibilidad_habitacion": row[4]
            })
        return habitaciones
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al obtener habitaciones: {error}")

@app.post("/habitaciones/")
async def create_habitacion(habitacion: Habitacion):
    cursor = connection.cursor()
    try:
        cursor.execute("""
            INSERT INTO HABITACION (ID_HABITACION, ID_HOTEL, TIPO_HABITACION, PRECIO_HABITACION, DISPONIBILIDAD_HABITACION)
            VALUES (:id_habitacion, :id_hotel, :tipo_habitacion, :precio_habitacion, :disponibilidad_habitacion)
        """, habitacion.dict())
        connection.commit()
        return {"message": "Habitación creada exitosamente"}
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al crear habitación: {error}")

#habitaciones con idhotel
    
@app.get("/habitaciones/{id_hotel}")
async def get_habitaciones_by_hotel(id_hotel: str = Path(...)):
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM HABITACION WHERE ID_HOTEL = :id_hotel", {"id_hotel": id_hotel})
        rows = cursor.fetchall()
        habitaciones = []
        for row in rows:
            habitaciones.append({
                "id_habitacion": row[0],
                "id_hotel": row[1],
                "tipo_habitacion": row[2],
                "precio_habitacion": row[3],
                "disponibilidad_habitacion": row[4]
            })
        return habitaciones
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al obtener habitaciones del hotel: {error}")



#@app.post("/reservaciones/")
#async def create_reservacion(reservacion: Reservacion):
#    cursor = connection.cursor()
#    try:
#        cursor.execute("""
#            INSERT INTO RESERVACION (CEDULA_CLIENTE, ID_HABITACION, ESTATUS_RES, FECHAINGRESO_RES, FECHASALIDA_RES)
#            VALUES (:cedula_cliente, :id_habitacion, :estatus_res, TO_DATE(:fechaingreso_res, 'DD-MM-YYYY'), TO_DATE(:fechasalida_res, 'DD-MM-YYYY'))
#        """, reservacion.dict())
#        connection.commit()
#        return {"message": "Reservación creada exitosamente"}
#    except cx_Oracle.Error as error:
#        raise HTTPException(status_code=500, detail=f"Error al crear reservación: {error}")
    


@app.post("/reservaciones/")
async def create_reservacion(reservacion: Reservacion):
    cursor = connection.cursor()
    try:
        cursor.execute("""
            INSERT INTO RESERVACION (CEDULA_CLIENTE, ID_HABITACION, ESTATUS_RES, FECHAINGRESO_RES, FECHASALIDA_RES)
            VALUES (:cedula_cliente, :id_habitacion, :estatus_res, TO_DATE(:fechaingreso_res, 'DD-MM-YYYY'), TO_DATE(:fechasalida_res, 'DD-MM-YYYY'))
        """, reservacion.dict())
        connection.commit()
        return {"message": "Reservación creada exitosamente"}
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al crear reservación: {error}")


@app.get("/reservaciones/")
async def get_reservaciones():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM RESERVACION")
        rows = cursor.fetchall()
        reservaciones = []
        for row in rows:
            reservaciones.append({
                "cedula_cliente": row[0],
                "id_habitacion": row[1],
                "estatus_res": row[2],
                "fechaingreso_res": row[3].strftime("%d-%m-%Y"),
                "fechasalida_res": row[4].strftime("%d-%m-%Y")
            })
        return reservaciones
    except cx_Oracle.Error as error:
        raise HTTPException(status_code=500, detail=f"Error al obtener reservaciones: {error}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
