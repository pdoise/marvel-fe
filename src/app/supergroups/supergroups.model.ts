import gql from 'graphql-tag';

//show
export const supergroup = gql`
  query Supergroup($id: ID) {
    supergroup(id: $id) {
      id
      name
      leader
      location
      superheroes {
        id
        name
      }
    }
  }
`
//list
export const supergroups = gql`
  query supergroups {
    supergroups {
      id
      name
    }
  }
`