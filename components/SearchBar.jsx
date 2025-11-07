

import React from 'react'

export const SearchBar = () => {
  return (
    <input
        //Validando el campo de busqueda
        // ref={inputRef}
        maxLength={50}
        placeholder="Buscar producto"
        // onChangeText={setSearchQuery}
        // value={searchQuery}
        // style={mostrarResultados ? styles.searchResult : styles.search}
        //hacer la programacion que haga que se muestren los resultados
        // onSubmitEditing={handleSearchSubmit}
      />
  )
}
