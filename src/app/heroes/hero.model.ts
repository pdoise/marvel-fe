import gql from 'graphql-tag';

//show
export const hero = gql`
  query hero($id: ID) {
    hero(id: $id) {
      id
      name
      alias
    }
  }
`
//list
export const heroes = gql`
  query heroes {
    heros {
      id
      alias
    }
  }
`
//edit
export const updateHero = gql`
  mutation updateHero($id: Int, $name: String!, $alias: String!) {
    updateHero(input: {id: $id, name: $name, alias: $alias}) {
      hero { id }
    }
  }
`;

//delete
export const deleteHero = gql`
  mutation deleteHero($id: ID!) {
    deleteHero(input: {id: $id}) {
      hero { id }
    }
  }
`;