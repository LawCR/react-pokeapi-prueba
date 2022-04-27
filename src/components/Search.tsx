import { Box, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { FC } from 'react';

interface Props {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    onSearch: (search: string) => void
}

const Search: FC<Props> = ({search, setSearch, onSearch}) => {

    return (
        <Box sx={{width: 500,  maxWidth: '100%'}} display='flex'>
            <TextField 
                fullWidth label="Buscar un pokemon" variant='outlined' size="small"
                name="search" value={search} onChange={(e) => setSearch(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' ? onSearch(search) : null}
                sx={{paddingY: 0}}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={() => onSearch(search)}>
                <SearchIcon  />
            </IconButton>
        </Box>
    )
}

export default Search