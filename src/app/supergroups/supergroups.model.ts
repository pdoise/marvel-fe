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
export const submitHero = gql`
  mutation submitHero($name: String!, $alias: String!, $supergroup_id: ID) {
    createHero(name: $name, alias: $alias, supergroup_id: $supergroup_id) {
      name
      alias
      supergroup_id
    }
  }
`;