
import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, TextField } from '@material-ui/core';
import { useLiveQuery } from 'dexie-react-hooks';

import { DataGrid } from '@material-ui/data-grid';

import { db } from '../data/db';



const Home = () => {


    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const friends = useLiveQuery(
        () => db.friends.toArray()
    );

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'description',
            headerName: 'Nome',
            width: 150,
            editable: true,
        },

    ];
    // eslint-disable-next-line no-var
    var rows: any = [];
    rows = friends;


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
                            label="Descrição"
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
                        /* onRowOver={(params: { id: string; }) => { return alert("entrou" + params.id); }} */
                        // onRowOut={(params: any) => { console.log('Saiu'); console.log(params) }}
                        checkboxSelection
                    /* disableSelectionOnClick */
                    />
                </div>
            </Container>


        </Box>

    )

}

export default Home;