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

//delete
export const deleteHero = gql`
  mutation deleteHero($id: ID!) {
    deleteHero(input: {id: $id}) {
      hero { id }
    }
  }
`;