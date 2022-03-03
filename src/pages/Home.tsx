/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { Box, Button, Checkbox, Tooltip, Container, CssBaseline, Grid, TextField } from '@material-ui/core';
import { useLiveQuery } from 'dexie-react-hooks';
import { IconButton } from "@material-ui/core";
import { GridColDef, DataGrid, GridApi, GridCellValue } from '@material-ui/data-grid';
import { db, Friend } from '../data/db';
import { blue } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import { Favorite, FavoriteBorder } from '@material-ui/icons';



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
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
              const onClick = (e: { stopPropagation: () => void; }) => {
                e.stopPropagation();
        
                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};
        
                api
                  .getAllColumns()
                  .filter((c) => c.field !== '__check__' && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                  );
        
                return console.log(JSON.stringify(thisRow, null, 4));
              };
        
                return <Button onClick={onClick}>Click</Button>;
                        
            },
          },
        
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