import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";

const Heroes = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => res.json())
        .then((data) => setSelectedCharacter(data));
    } else {
      setSelectedCharacter(null);
    }
  }, [id]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  const handleRowClick = (params) => {
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
