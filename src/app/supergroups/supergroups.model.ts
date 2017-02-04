import gql from 'graphql-tag';

//show
export const supergroup = gql`
  query Supergroup($id: ID) {
    supergroup(id: $id) {
      id
      name
      leader
      location
      heroes {
        id
        alias
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

//new
export const createHero = gql`
  mutation createHero($name: String!, $alias: String!, $supergroup_id: Int!) {
    createHero(input: {name: $name, alias: $alias, supergroup_id: $supergroup_id}) {
      hero { id }
    }
  }
`;