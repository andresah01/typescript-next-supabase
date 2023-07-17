import { GetServerSideProps, NextPage } from 'next'
import { AdminLayout } from '/home/proyectos/Artur/Frontend/nextjs-dashboard-main/src/layout/index'
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { supabase } from '../../supabase/client'
import { Button, ButtonGroup, Card, Dropdown, ProgressBar, Modal, Form, FormGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faDownload, faEllipsisVertical, faMars, faSearch, faUsers, faVenus } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/Vehiculos.module.css'
import { useTabContext } from "../../context/TabContext"
import { tableContainerClasses } from '@mui/material';

type Props = {
    page: number;
    perPage: number;
    sort: string;
    order: string;
}

const Vehiculos: NextPage<Props> = (props) => {
    const { handleAddTab } = useTabContext();
    // const [datos, setDatos] = useState<Array<{ [key: string]: any }> | null>(null);
    const [Vehiculos, setVehiculos] = useState<Array<{ [key: string]: any }> | null>(null);
    const [columnsDinamic, setColumnsDinamic] = useState<{ name: string; label: string; options: {} }[]>([]);

    const [modalAddShow, setModalAddShow] = useState(false);
    const handleModalAddClose = () => setModalAddShow(false);

    const [modalEditShow, setModalEditShow] = useState(false);
    const handleModalEditClose = () => setModalEditShow(false);

    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const handleModalDeleteClose = () => setModalDeleteShow(false);


    const [dataSeleccionada, setDataSelecionada] = useState({
        id: "",
        placa: "",
        tipoVehiculo: "",
        propietario: "",
        marca: "",
        tipoCarroceria: "",
        motor: "",
        chasis: "",
        serie: "",
        cilindradaCC: "",
        color: "",
        modelo: "",
        linea: "",
        capacidad: "",
        valor: "",
        total: "",
        estado: "",
        terceroId: "",
        terceroNom: "",
        fechaIngreso: "",
        fechaImportacion: "",
        valorAvaluo: "",
        tipoDocProp: "",
        documentoProp: "",
        servicio: "",
        valorReal: "",
        tipoCombustible: "",
        transito: "",
        userCreate: "",
        update_at: "",
        userUpdate: "",
        delete_at: "",
        userDelete: "",
        create_at: ""
    })
    const seleccionarDataTable = (data: any, caso: string) => {
        console.log(`aca estoy en seleccionarDataTable ${data}`)
        setDataSelecionada({ id: data[0], placa: data[1], tipoVehiculo: data[2], propietario: data[3], marca: data[4], tipoCarroceria: data[5], motor: data[6], chasis: data[7], serie: data[8], cilindradaCC: data[9], color: data[10], modelo: data[11], linea: data[12], capacidad: data[13], valor: data[14], total: data[15], estado: data[16], terceroId: data[17], terceroNom: data[18], fechaIngreso: data[19], fechaImportacion: data[20], valorAvaluo: data[21], tipoDocProp: data[22], documentoProp: data[23], servicio: data[24], valorReal: data[25], tipoCombustible: data[26], transito: data[27], userCreate: data[28], update_at: data[29], userUpdate: data[30], delete_at: data[31], userDelete: data[32], create_at: data[33] });        // (caso==="Editar") ? setModalEditShow(true) : setModalDeleteShow(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setDataSelecionada(prevState => ({
            ...prevState,
            [name]: value
        }));
        // console.log(dataSeleccionada)
    }

    const postData = async () => {
        // console.log(dataSeleccionada)
        var today = new Date();
        var opciones = { timeZone: 'America/Bogota' };
        var now = today.toLocaleTimeString('en-US', opciones);
        console.log(now);
        await supabase.from('tbl_vehiculos').insert({
            placa: dataSeleccionada.placa,
            tipoVehiculo: dataSeleccionada.tipoVehiculo,
            propietario: dataSeleccionada.propietario,
            marca: dataSeleccionada.marca,
            tipoCarroceria: dataSeleccionada.tipoCarroceria,
            motor: dataSeleccionada.motor,
            chasis: dataSeleccionada.chasis,
            serie: dataSeleccionada.serie,
            cilindradaCC: dataSeleccionada.cilindradaCC,
            color: dataSeleccionada.color,
            modelo: dataSeleccionada.modelo,
            linea: dataSeleccionada.linea,
            capacidad: dataSeleccionada.capacidad,
            valor: dataSeleccionada.valor,
            total: dataSeleccionada.total,
            estado: dataSeleccionada.estado,
            terceroId: dataSeleccionada.terceroId,
            terceroNom: dataSeleccionada.terceroNom,
            fechaIngreso: dataSeleccionada.fechaIngreso,
            fechaImportacion: dataSeleccionada.fechaImportacion,
            valorAvaluo: dataSeleccionada.valorAvaluo,
            tipoDocProp: dataSeleccionada.tipoDocProp,
            documentoProp: dataSeleccionada.documentoProp,
            servicio: dataSeleccionada.servicio,
            valorReal: dataSeleccionada.valorReal,
            tipoCombustible: dataSeleccionada.tipoCombustible,
            transito: dataSeleccionada.transito,
            create_at: today
            // userCreate: dataSeleccionada.userC_at,
            // update_at: dataSeleccionada.update_at,
            // userUpdate: dataSeleccionada.userU_at,
            // delete_at: dataSeleccionada.delete_at,
            // userDelete: dataSeleccionada.userD_at,


        }).single().then(response => {

            if (response.status != 201) {
                console.log(response)
                alert("Error: " + response.error?.message)
            }
            // console.log(response)
            getData()
            // getMenkus()
            handleModalAddClose()
        })
    }

    const getData = async () => {

        await supabase.from('tbl_vehiculos').select('*').then((response) => {
            const data = response.data
            console.log(response)
            var dataKeyJson = data ? data[0] : ["No hay columns"]
            var columDinamic = [];

            //Obtener las key del objeto json
            for (var key in dataKeyJson) {
                columDinamic.push(key);
            }
            // setDataSelecionada2(coldin)
            // Generar dinámicamente el array 'columns' a partir de las columnas obtenidas
            const generatedColumns = columDinamic.map(column => ({
                name: column,
                label: column.toUpperCase(),
                options: {
                    display: column == 'placa' || column == 'marca' || column == 'linea' || column == 'modelo' || column == 'tipoVehiculo' || column == 'valor' || column == 'estado' || column == 'propietario' ? 'true' : 'excluded',
                }
            }));
            // Agregar la columna 'Acciones' al array 'columns'
            generatedColumns.push({
                name: "Acciones",
                label: "ACCIONES",
                options: {
                    customBodyRender: (value: any, tableMeta: any) => {
                        return renderColumnAcciones(value, tableMeta);
                    }
                }
            });

            // console.log(generatedColumns)
            setColumnsDinamic(generatedColumns)
            setVehiculos(data)
        })
    }


    const putData = async () => {
        // console.log(dataSeleccionada.nombre)
        await supabase.from('tbl_vehiculos').update(dataSeleccionada).eq('id', dataSeleccionada.id).then(response => {
            console.log(response)
            if (response.status != 204) {
                alert("Error: " + response.error?.message)
            }
            getData()
            handleModalEditClose()
        })
    }


    const deleteData = async () => {
        await supabase.from('tbl_vehiculos').delete().eq('id', dataSeleccionada.id).then(response => {
            if (response.status != 204) {
                alert("Error: " + response.error?.message)
            }
            getData()
            handleModalDeleteClose()
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = columnsDinamic;

    const renderColumnAcciones = (value: any, tableMeta: any) => {
        return (
            <Dropdown align="end">
                <Dropdown.Toggle
                    as="button"
                    bsPrefix="btn"
                    className="btn-link rounded-0 text-black-50 shadow-none p-0"
                    id="action-user1">

                    <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* <Dropdown.Item onClick={() => seleccionarDataTable(tableMeta.rowData, "Editar")}>Edit</Dropdown.Item>*/}
                    <Dropdown.Item onClick={() => handleAddTab("Editar Vehiculo", "EditarVehiculo", { handleChange: handleChange, data: tableMeta.rowData, putData: putData })}>Edit</Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => seleccionarDataTable(tableMeta.rowData, "Eliminar")}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    };

    const modalInsertar = (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    {/* <Form.Control type="text" placeholder="Id" name="id" onChange={handleChange} /> */}
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control type="text" placeholder="Placa" name="placa" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control type="text" placeholder="Marca" name="marca" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Línea</Form.Label>
                            <Form.Control type="text" placeholder="Linea" name="linea" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Vechículo</Form.Label>
                            <Form.Control type="text" placeholder="Tipo de Vehiculo" name="tipoVehiculo" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Carrocería</Form.Label>
                            <Form.Control type="text" placeholder="Tipo de Carroceria" name="tipoCarroceria" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Servicio</Form.Label>
                            <Form.Control type="text" placeholder="Servicio" name="servicio" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control type="number" placeholder="Modelo" name="modelo" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Estado Vehículo</Form.Label>
                            <Form.Control type="text" placeholder="Estado" name="estado" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Valor Comercial</Form.Label>
                            <Form.Control type="number" placeholder="Valor" name="valor" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Motor</Form.Label>
                            <Form.Control type="text" placeholder="Motor" name="motor" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Chasis</Form.Label>
                            <Form.Control type='text' placeholder="Chasis" name="chasis" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Serie</Form.Label>
                            <Form.Control type="text" placeholder="Serie" name="serie" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Clindraje</Form.Label>
                            <Form.Control type="text" placeholder="Cilindraje" name="cilindradaCC" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Combustible</Form.Label>
                            <Form.Control type="text" placeholder="Tipo de Combustible" name="tipoCombustible" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Capacidad</Form.Label>
                            <Form.Control type="text" placeholder="Capacidad" name="capacidad" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" placeholder="Color" name="color" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Transito</Form.Label>
                            <Form.Control type="text" placeholder="Transito" name="transito" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Intermedario</Form.Label>
                            <Form.Control type="text" placeholder="Tercero Nombre" name="terceroNom" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control type="text" placeholder="Tercero Id" name="terceroId" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Fecha de Ingreso</Form.Label>
                            <Form.Control type="date" placeholder="Fecha de Ingreso" name="fechaIngreso" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Propietario</Form.Label>
                            <Form.Control type="text" placeholder="Propietario" name="propietario" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Documento</Form.Label>
                            <Form.Control type="text" placeholder="Tipo Doc Propietario" name="tipoDocProp" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control type="text" placeholder="Documento Propietario" name="documentoProp" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-3">
                            <Form.Label>Fecha de Importación</Form.Label>
                            <Form.Control type="date" placeholder="Fecha de Importacion" name="fechaImportacion" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-3">
                            <Form.Label>Valor Avaluo</Form.Label>
                            <Form.Control type="number" placeholder="Valor del Avaluo" name="valorAvaluo" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-3">
                            <Form.Label>Costo Real</Form.Label>
                            <Form.Control type="number" placeholder="Valor Real" name="valorReal" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup className="col-3">
                            <Form.Label>Total</Form.Label>
                            <Form.Control type="number" placeholder="Total" name="total" onChange={handleChange} />
                        </FormGroup>
                    </FormGroup>
                    {/* <Form.Control type="date" placeholder="create_at" name="create_at" onChange={handleChange} defaultValue={dataSeleccionada.create_at}hidden/>
                    <Form.Control type="text" placeholder="userC_at" name="userC_at" onChange={handleChange} defaultValue={dataSeleccionada.userC_at} hidden/>
                    <Form.Control type="date" placeholder="update_at" name="update_at" onChange={handleChange} defaultValue={dataSeleccionada.update_at}hidden/>
                    <Form.Control type="text" placeholder="userU_at" name="userU_at" onChange={handleChange} defaultValue={dataSeleccionada.userU_at}hidden/>
                    <Form.Control type="date" placeholder="delete_at" name="delete_at" onChange={handleChange} defaultValue={dataSeleccionada.delete_at}hidden/>
                    <Form.Control type="text" placeholder="userD_at" name="userD_at" onChange={handleChange} defaultValue={dataSeleccionada.userD_at}hidden/> */}
                    {/*<Form.Control type="bool" placeholder="Estado de Tercero" name="estadoTercero" onChange={handleChange} />*/}
                    {/* <Form.Control as="select" name="estadoTercero" onChange={handleChange} defaultValue={dataSeleccionada.estadoTercero}>
                        <option>Seleccione un estado</option>
                        <option value="TRUE">TRUE</option>
                        <option value="FALSE">FALSE</option>
                    </Form.Control> */}
                </Form.Group>
            </Form>
        </div>
    )

    const modalEditar = (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Id" name="id" onChange={handleChange} defaultValue={dataSeleccionada.id} disabled />
                    <h5>Datos principales Vehiculo</h5>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control type="text" placeholder="Placa" name="placa" onChange={handleChange} defaultValue={dataSeleccionada.placa} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control type="text" placeholder="Marca" name="marca" onChange={handleChange} defaultValue={dataSeleccionada.marca} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Línea</Form.Label>
                            <Form.Control type="text" placeholder="Linea" name="linea" onChange={handleChange} defaultValue={dataSeleccionada.linea} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Vechículo</Form.Label>
                            <Form.Control type="text" placeholder="Tipo de Vehiculo" name="tipoVehiculo" onChange={handleChange} defaultValue={dataSeleccionada.tipoVehiculo} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Carrocería</Form.Label>
                            <Form.Control type="text" placeholder="Tipo de Carroceria" name="tipoCarroceria" onChange={handleChange} defaultValue={dataSeleccionada.tipoCarroceria} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Servicio</Form.Label>
                            <Form.Control type="text" placeholder="Servicio" name="servicio" onChange={handleChange} defaultValue={dataSeleccionada.servicio} />
                        </FormGroup>
                    </FormGroup>
                    <h5>Datos Vehiculo</h5>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control type="number" placeholder="Modelo" name="modelo" onChange={handleChange} defaultValue={dataSeleccionada.modelo} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Estado Vehículo</Form.Label>
                            <Form.Control type="text" placeholder="Estado" name="estado" onChange={handleChange} defaultValue={dataSeleccionada.estado} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Valor Comercial</Form.Label>
                            <Form.Control type="number" placeholder="Valor" name="valor" onChange={handleChange} defaultValue={dataSeleccionada.valor} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Motor</Form.Label>
                            <Form.Control type="text" placeholder="Motor" name="motor" onChange={handleChange} defaultValue={dataSeleccionada.motor} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Chasis</Form.Label>
                            <Form.Control type='text' placeholder="Chasis" name="chasis" onChange={handleChange} defaultValue={dataSeleccionada.chasis} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Serie</Form.Label>
                            <Form.Control type="text" placeholder="Serie" name="serie" onChange={handleChange} defaultValue={dataSeleccionada.serie} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Clindraje</Form.Label>
                            <Form.Control type="text" placeholder="Cilindraje" name="cilindradaCC" onChange={handleChange} defaultValue={dataSeleccionada.cilindradaCC} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Combustible</Form.Label>
                            <Form.Control type="text" placeholder="Tipo de Combustible" name="tipoCombustible" onChange={handleChange} defaultValue={dataSeleccionada.tipoCombustible} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Capacidad</Form.Label>
                            <Form.Control type="text" placeholder="Capacidad" name="capacidad" onChange={handleChange} defaultValue={dataSeleccionada.capacidad} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" placeholder="Color" name="color" onChange={handleChange} defaultValue={dataSeleccionada.color} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Transito</Form.Label>
                            <Form.Control type="text" placeholder="Transito" name="transito" onChange={handleChange} defaultValue={dataSeleccionada.transito} />
                        </FormGroup>
                    </FormGroup>
                    <h5>Datos Intermediario</h5>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Intermedario</Form.Label>
                            <Form.Control type="text" placeholder="Tercero Nombre" name="terceroNom" onChange={handleChange} defaultValue={dataSeleccionada.terceroNom} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control type="text" placeholder="Tercero Id" name="terceroId" onChange={handleChange} defaultValue={dataSeleccionada.terceroId} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Fecha de Ingreso</Form.Label>
                            <Form.Control type="date" placeholder="Fecha de Ingreso" name="fechaIngreso" onChange={handleChange} defaultValue={dataSeleccionada.fechaIngreso} />
                        </FormGroup>
                    </FormGroup>
                    <h5>Datos matricula</h5>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-4">
                            <Form.Label>Propietario</Form.Label>
                            <Form.Control type="text" placeholder="Propietario" name="propietario" onChange={handleChange} defaultValue={dataSeleccionada.propietario} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Tipo Documento</Form.Label>
                            <Form.Control type="text" placeholder="Tipo Doc Propietario" name="tipoDocProp" onChange={handleChange} defaultValue={dataSeleccionada.tipoDocProp} />
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control type="text" placeholder="Documento Propietario" name="documentoProp" onChange={handleChange} defaultValue={dataSeleccionada.documentoProp} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <FormGroup className="col-3">
                            <Form.Label>Fecha de Importación</Form.Label>
                            <Form.Control type="date" placeholder="Fecha de Importacion" name="fechaImportacion" onChange={handleChange} defaultValue={dataSeleccionada.fechaImportacion} />
                        </FormGroup>
                        <FormGroup className="col-3">
                            <Form.Label>Valor Avaluo</Form.Label>
                            <Form.Control type="number" placeholder="Valor del Avaluo" name="valorAvaluo" onChange={handleChange} defaultValue={dataSeleccionada.valorAvaluo} />
                        </FormGroup>
                        <FormGroup className="col-3">
                            <Form.Label>Costo Real</Form.Label>
                            <Form.Control type="number" placeholder="Valor Real" name="valorReal" onChange={handleChange} defaultValue={dataSeleccionada.valorReal} />
                        </FormGroup>
                        <FormGroup className="col-3">
                            <Form.Label>Total</Form.Label>
                            <Form.Control type="number" placeholder="Total" name="total" onChange={handleChange} defaultValue={dataSeleccionada.total} />
                        </FormGroup>
                    </FormGroup>
                    {/* <Form.Control type="date" placeholder="create_at" name="create_at" onChange={handleChange} defaultValue={dataSeleccionada.create_at}hidden/>
                    <Form.Control type="text" placeholder="userC_at" name="userC_at" onChange={handleChange} defaultValue={dataSeleccionada.userC_at} hidden/>
                    <Form.Control type="date" placeholder="update_at" name="update_at" onChange={handleChange} defaultValue={dataSeleccionada.update_at}hidden/>
                    <Form.Control type="text" placeholder="userU_at" name="userU_at" onChange={handleChange} defaultValue={dataSeleccionada.userU_at}hidden/>
                    <Form.Control type="date" placeholder="delete_at" name="delete_at" onChange={handleChange} defaultValue={dataSeleccionada.delete_at}hidden/>
                    <Form.Control type="text" placeholder="userD_at" name="userD_at" onChange={handleChange} defaultValue={dataSeleccionada.userD_at}hidden/> */}
                    {/*<Form.Control type="bool" placeholder="Estado de Tercero" name="estadoTercero" onChange={handleChange} />*/}
                    {/* <Form.Control as="select" name="estadoTercero" onChange={handleChange} defaultValue={dataSeleccionada.estadoTercero}>
                        <option>Seleccione un estado</option>
                        <option value="TRUE">TRUE</option>
                        <option value="FALSE">FALSE</option>
                    </Form.Control> */}
                </Form.Group>
            </Form>
        </div>
    )

    const modalEliminar = (
        <div>
            <br />
            <b>{dataSeleccionada.propietario}</b>
            <br />
            <b>{dataSeleccionada.tipoVehiculo}</b>
            <br />
            <b>{dataSeleccionada.marca}</b>
        </div>
    )

    return (
        <div>
            <div>
                {/* <Button variant="info" onClick={()=>setModalAddShow(true)} className="me-2">Agregar</Button> */}
                <Button variant="info" onClick={() => handleAddTab("Agregar Vehiculo", "AgregarVehiculo", { handleChange: handleChange, postData: postData })} className="me-2">Agregar</Button>

                <br />
                <br />
            </div>

            <div>
                <MUIDataTable
                    title={"Datos Maestros (Vehiculos)"}
                    data={Vehiculos || []}
                    columns={columns}
                />
            </div>

            <div>
                <Modal
                    size="lg"
                    show={modalAddShow}
                    onHide={() => setModalAddShow(false)}
                    backdrop="static"
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Agregar Maestro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalInsertar}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalAddClose}>Cerrar</Button>
                        <Button variant="primary" onClick={() => postData()}>Guardar cambios</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size="lg"
                    show={modalEditShow}
                    onHide={() => setModalEditShow(false)}
                    backdrop="static"
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Editar Maestro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalEditar}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalEditClose}>Cerrar</Button>
                        <Button variant="primary" onClick={() => putData()}>Guardar cambios</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={modalDeleteShow}
                    onHide={() => setModalDeleteShow(false)}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Esta seguro que desea eliminar el item: {modalEliminar}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalDeleteClose}>Cerrar</Button>
                        <Button variant="primary" onClick={() => deleteData()}>Eliminar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )

}

export default Vehiculos