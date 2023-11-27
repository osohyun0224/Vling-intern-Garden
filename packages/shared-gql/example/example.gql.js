// import { gql } from '@apollo/client'

export const getExampleList = gql`
  query getExampleList($variable: String) {
    getExampleList(variable: $variable) {
      list {
        id
        name
      }
    }
  }
`
