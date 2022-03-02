/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { Box, Button, Checkbox, Tooltip, Container, CssBaseline, Grid, TextField } from '@material-ui/core';
import { useLiveQuery } from 'dexie-react-hooks';
import { IconButton } from "@material-ui/core";
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { db, Friend } from '../data/db';
import { blue } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import { Favorite, FavoriteBorder } from '@material-ui/icons';



/* const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
 */





// eslint-disable-next-line react/prop-types
const MatEdit = ({ index }: any ) => {
    const handleEditClick = (index:any) => {
        console.log('Clicou', index[1])
    };

    return (
        <div>
            {
                <Tooltip title="Editar">
                    <IconButton
                        color="secondary"
                        aria-label="add an alarm"
                        onClick={() => {handleEditClick(index) } }


                    >

                        <EditIcon style={{ color: blue[500] }} />

                    </IconButton>
                </Tooltip>
            }
        </div>
    );
};


{/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> */ }



const Home = () => {


    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const friends = useLiveQuery(
        () => db.friends.toArray()
    );


    let rows: Friend[] | undefined;
    // eslint-disable-next-line prefer-const
    rows = friends;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'description',
            headerName: 'Nome',
            width: 150,
            editable: true,
        },
        {
            field: "actions",
            headerName: "Editar",
            sortable: false,
            width: 140,
            /* disableClickEventBubbling: true, */
            renderCell: (params) => {
                return (
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                    >
                        <MatEdit index={0} />
                    </div>
                );
            }

        }
    ];
    // eslint-disable-next-line no-var



    async function addDescription() {
        try {
            // Add the new description!
            const id = await db.friends.add({
                description,
            });
            setStatus(`Descrição ${description} add com sucesso id: ${id}`);
            /* setDescription(""); */
        } catch (error) {
            setStatus(`Failed to add description ${description}: ${error}`);
        }
    }



    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Container component="main" maxWidth="xl">




                <div>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Nome"
                            id="nome"
                            type="text"
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            autoFocus

                        />
                    </Grid>
                </div>
                <br />




                <Button onClick={addDescription} type="button" variant="contained" color="primary">
                    Enviar
                </Button>


                <p>
                    {status}
                </p>


                <div style={{ height: 400, width: '100%', }}>
                    <DataGrid
                        rows={rows || []}
                        columns={columns}
                        pageSize={12}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                       

                    />
                </div>
            </Container>


        </Box>

    )

}

export default Home;