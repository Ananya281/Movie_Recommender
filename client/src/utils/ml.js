export const getTopMoviesByGenre = (genre) => {
    const sampleMovies = {
      Action: [
        {
          title: 'Black Friday (2007 film)',
          image: 'https://upload.wikimedia.org/wikipedia/en/5/5c/Black_Friday_poster.jpg',
          rating: 4.25,
        },
        {
          title: 'Uri: The Surgical Strike',
          image: 'https://upload.wikimedia.org/wikipedia/en/7/72/Uri_The_Surgical_Strike_film_poster.jpg',
          rating: 4.2,
        },
        {
          title: 'Dangal (film)',
          image: 'https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg',
          rating: 4.2,
        },
        {
          title: 'Raag Desh (film)',
          image: 'https://upload.wikimedia.org/wikipedia/en/8/84/Raag_Desh_poster.jpg',
          rating: 4.15,
        },
        {
          title: 'Satya (1998 film)',
          image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Satya_poster.jpg',
          rating: 4.1,
        }
      ],
      Comedy: [
        {
          title: 'Gol Maal',
          image: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Golmaal_1979.jpg',
          rating: 4.3,
        },
        {
          title: 'Chupke Chupke',
          image: 'https://upload.wikimedia.org/wikipedia/en/3/33/ChupkeChupke1975FilmPoster.jpg',
          rating: 4.2,
        },
        {
          title: 'Angoor (1982 film)',
          image: 'https://upload.wikimedia.org/wikipedia/en/4/47/Angoor_film_poster.jpg',
          rating: 4.2,
        },
        {
          title: '3 Idiots',
          image: 'https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg',
          rating: 4.2,
        },
        {
          title: 'Do Aankhen Barah Haath',
          image: 'https://upload.wikimedia.org/wikipedia/en/3/37/Do_Ankhen_Barah_Haath_poster.jpg',
          rating: 4.2,
        }
      ],
      Romance: [
        {
          title: 'Dilwale Dulhania Le Jayenge',
          image: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Dilwale_Dulhania_Le_Jayenge_poster.jpg',
          rating: 4.4,
        },
        {
          title: 'Jab We Met',
          image: 'https://upload.wikimedia.org/wikipedia/en/f/f5/Jab_We_Met_Poster.jpg',
          rating: 4.3,
        },
        {
          title: 'Veer-Zaara',
          image: 'https://upload.wikimedia.org/wikipedia/en/7/75/Veer-Zaara_poster.jpg',
          rating: 4.25,
        },
        {
          title: 'Barfi!',
          image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Barfi%21_poster.jpg',
          rating: 4.2,
        },
        {
          title: 'Mughal-e-Azam',
          image: 'https://upload.wikimedia.org/wikipedia/en/4/41/Mughal-e-Azam_poster.jpg',
          rating: 4.2,
        }
      ],
      Thriller: [
        {
          title: 'Kahaani',
          image: 'https://upload.wikimedia.org/wikipedia/en/9/96/Kahaani_poster.jpg',
          rating: 4.3,
        },
        {
          title: 'Drishyam',
          image: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Drishyam.jpg',
          rating: 4.3,
        },
        {
          title: 'Andhadhun',
          image: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Andhadhun_poster.jpg',
          rating: 4.2,
        },
        {
          title: 'Talaash',
          image: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Talaash_poster.jpg',
          rating: 4.1,
        },
        {
          title: 'A Wednesday!',
          image: 'https://upload.wikimedia.org/wikipedia/en/9/91/A_Wednesday%21_poster.jpg',
          rating: 4.2,
        }
      ]
    };
  
    return sampleMovies[genre] || [];
  };
  