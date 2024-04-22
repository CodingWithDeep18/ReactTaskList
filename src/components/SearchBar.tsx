import React from 'react';

interface SearchBarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by name"
      onChange={handleSearchChange}
      style={{ marginBottom: '10px' }}
    />
  );
};

export default SearchBar;
