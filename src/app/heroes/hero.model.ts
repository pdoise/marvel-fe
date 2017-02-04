import gql from 'graphql-tag';

//show
export const hero = gql`
  query hero($id: ID) {
    superhero(id: $id) {
      id
      name
      alias
    }
  }
`
//list
export const heroes = gql`
  query heroes {
    superheros {
      id
      alias
    }
  }
`