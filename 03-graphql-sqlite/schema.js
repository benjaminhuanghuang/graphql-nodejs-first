import {makeExecutableSchema} from 'graphql-tools'
import {resolvers} from './resolvers'

const typeDefs = `
  type Query {
    hello: String
    friend: Friend
    getFriend(id:ID):Friend
  } 

  type Friend {
    id: ID
    name: String
    gender: Gender
  }
  enum Gender {
    MALE
    FEMALE
  }
  input FriendInput {
    id: ID
    name: String
    gender: Gender
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
  }
`
const schema = makeExecutableSchema({typeDefs, resolvers})

export default schema;