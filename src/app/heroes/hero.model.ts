import gql from 'graphql-tag';

export const heroes = gql`
  query heroes {
    superheros {
      id
      name
    }
  }
`