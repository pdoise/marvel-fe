import { ApolloModule }                         from 'angular2-apollo'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { environment }                          from '../environments/environment'

interface Result {
  id?         :string
  __typename? :string
}
const client = new ApolloClient({
  dataIdFromObject: (o: Result) => `${o.__typename}-${o.id},`,
  networkInterface: createNetworkInterface({
    uri: `http://${environment.svc_url}/graphql`
  })
})

export function provideClient(): ApolloClient {
  return client
}