import { useState, Suspense, Fragment } from 'react'
import Spinner from './components/spinner'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'
import { DataContext } from './components/context/DataContext'

function App() {
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState(null)
  
    
    const handleSearch = (e, searchTerm) => {
        e.preventDefault()
        setData(fetchData(searchTerm))
    }

    const renderGallery = () => {
        if(data){
          return (
            <Suspense fallback={<Spinner />}>
              <Gallery />
            </Suspense>
          )
        }
      }

    
      return (
        <div className="App">
          {message}
          <Router>
            <Routes>
            <Route path='/' element={
              <Fragment>
                <SearchBar handleSearch={handleSearch} />
                <DataContext.Provider value={data}>
                  {renderGallery()}
                </DataContext.Provider>
                </Fragment>
            } />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/album/:id" element={<ArtistView />} />
            </Routes>
          </Router>
        </div>
      );
    }

export default App;



