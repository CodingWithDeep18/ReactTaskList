import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchBar from "./SearchBar";
import { useGetPokemonListQuery } from "../api/apiSlice";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
];

const DataGridComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: pokemonData, isLoading } = useGetPokemonListQuery({
    limit: 50,
  });

  if (isLoading) return <div>Loading...</div>;

  // Check if pokemonData is not available
  if (!pokemonData) return <div>No data available</div>;
  const pokemonResults = pokemonData.results || [];

  const filteredData = searchQuery
    ? pokemonResults.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pokemonResults;

  const rows = filteredData.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name,
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <h2>Pokeman DataGrid Api</h2>
        <SearchBar setSearchQuery={setSearchQuery} />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 15, 20, 50, 100]}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { pageSize: 15, page: 0 },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataGridComponent;
