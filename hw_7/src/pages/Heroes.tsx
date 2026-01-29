
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from "ahooks";

import { getCharacters, getCharacterById } from "../api/characters";
import { Hero } from "../types/heroes";


const Heroes = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: characters = [], loading } = useRequest<Hero[], []>(getCharacters);
  const { data: selectedCharacter, loading: loadingCharacter } = useRequest<Hero, [string]>(
  () => getCharacterById(id!),
  {
    ready: !!id,
    refreshDeps: [id],
  }
);


  const columns: GridColDef<Hero>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  const handleRowClick = (params: GridRowParams<Hero>) => {
    navigate(`/heroes/${params.id}`);
  };

  return (
    <Box  sx={{
      display: "flex",
      flexDirection: "row",
      borderColor: "divider",
      width: "100%",       
      minHeight: "100vh" 
    }}>
      <Box sx={{ p: 2 }}>
        <DataGrid
          rows={characters}
          columns={columns}
          autoHeight
          loading={loading}
          onRowClick={handleRowClick}
          sx={{ cursor: "pointer" }}
        />
      </Box>

      {selectedCharacter && (
        <Box
          sx={{
            flex: 1,
            p: 2,
            borderLeft: 1,
            display: "flex",
            flexDirection: "column",
            borderColor: "divider",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            style={{ width: "50%", borderRadius: 8 }}
          />
          <Box
            sx={{
              width: 500,
              p: 2,
              my: 3,
              borderLeft: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
              <Typography variant="h5" sx={{ my: 3 }}>
                {selectedCharacter.name}
              </Typography>
              <Typography sx={{ my: 1 }}>Status: {selectedCharacter.status}</Typography>
              <Typography sx={{ my: 1 }}>Species: {selectedCharacter.species}</Typography>
              <Typography sx={{ my: 1 }}>Gender: {selectedCharacter.gender}</Typography>
          </Box>
          
        </Box>
      )}
    </Box>
  );
};

export default Heroes;
