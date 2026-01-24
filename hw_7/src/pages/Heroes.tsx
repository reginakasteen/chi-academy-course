import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";

type Status = 'Alive' | 'Dead' | 'unknown';

interface LocationRef {
  name: string;
  url: string;
}

interface Hero {
  id: number;
  name: string;
  status: Status;
  species: string;
  gender: string;
  image: string;
  origin: LocationRef;
  location: LocationRef;
}

interface CharactersResponse {
  results: Hero[];
}


const Heroes = () => {
  const [characters, setCharacters] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [selectedCharacter, setSelectedCharacter] = useState<Hero | null>(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data: CharactersResponse) => setCharacters(data.results))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => res.json())
        .then((data: Hero) => setSelectedCharacter(data));
    } else {
      setSelectedCharacter(null);
    }
  }, [id]);

  const columns: GridColDef<Hero>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  const handleRowClick = (params: GridRowParams<Hero>) => {
    navigate(`/heroes/${params.id}`);
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Box sx={{ flex: 1, p: 2 }}>
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
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            style={{ width: "100%", borderRadius: 8 }}
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
