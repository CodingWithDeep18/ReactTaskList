import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetPokemonListQuery } from "../api/apiSlice";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "url", headerName: "Url", width: 300 },
];

const DataGridComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { data: pokemonData, isLoading } = useGetPokemonListQuery({
    limit: 10,
    offset: (currentPage - 1) * 10,
    search: searchText, // Pass search text to the query
  });

  // State to hold filtered data
  const [filteredRows, setFilteredRows] = useState<any[]>([]);

  useEffect(() => {
    if (!pokemonData) return;

    // Filter rows based on search text
    const filteredResults = pokemonData.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const rowsWithIds = filteredResults.map((pokemon, index) => ({
      id: `${index}`, 
      name: pokemon.name,
      url: pokemon.url,
    }));

    setFilteredRows(rowsWithIds);
  }, [pokemonData, searchText]);

  if (isLoading) return <div>Loading...</div>;

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
        <h2>Pokemon DataGrid Api</h2>
        <div style={{ height: 400, width: "700px" }}>
          <input
            type="text"
            placeholder="Search Pokemon"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10, 15, 20, 50, 100]}
            paginationMode="server"
            onPaginationModelChange={(paginationModel) => {
              setCurrentPage(paginationModel.page + 1);
            }}
            rowCount={pokemonData.count}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataGridComponent;
