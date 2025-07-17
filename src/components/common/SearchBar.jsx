import React from 'react';
import useDebounce from '../../hooks/useDebounce';

const SearchBar = ({ chatrooms, setFilteredChatrooms }) => {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    if (!debouncedQuery) {
      setFilteredChatrooms(chatrooms);
    } else {
      setFilteredChatrooms(
        chatrooms.filter(room =>
          room.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );
    }
  }, [debouncedQuery, chatrooms, setFilteredChatrooms]);

  return (
    <input
      type="text"
      className="w-full p-2 mb-4 border rounded"
      placeholder="Search chatrooms..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      aria-label="Search chatrooms"
    />
  );
};

export default SearchBar; 